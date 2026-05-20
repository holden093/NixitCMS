import crypto from 'crypto'
import { prisma } from '../lib/prisma'
import { config } from '../config'
import { buildAbsoluteMediaUrl, buildNewsArticleUrl, normalizeNewsLocale } from '../lib/newsPayloads'
import { sendNewsletterConfirmation, sendNewsTeaserEmail, type SiteInfo } from './mailer'
import { publishArticleToFacebook, publishArticleToInstagram } from './meta'
import {
  claimDueAsyncJob,
  countNewsEmailDeliveriesByArticle,
  countPermanentFailedNewsletterDeliveries,
  countRemainingNewsletterDeliveries,
  createAsyncJob,
  createNewsEmailDeliveries,
  deleteAsyncJobsByDedupeKey,
  getNewsArticleById,
  getNewsletterSubscriberById,
  listActiveNewsletterSubscriberIds,
  listNewsletterDispatchDeliveries,
  updateAsyncJob,
  updateNewsArticle,
  updateNewsEmailDelivery,
  updateNewsletterSubscriber,
  upsertAsyncJobByDedupeKey,
} from './newsStore'

type AsyncJobPayload = Record<string, unknown>

interface QueueJobInput {
  type: string
  dedupeKey?: string
  payload: AsyncJobPayload
  runAt?: Date
  maxAttempts?: number
}

interface JobProgressResult {
  rescheduleAt?: Date
}

const JOB_TYPE_PUBLISH_ARTICLE = 'publish-article'
const JOB_TYPE_NEWSLETTER_CONFIRMATION = 'newsletter-confirmation'
const JOB_TYPE_NEWSLETTER_DISPATCH = 'newsletter-dispatch'
const JOB_TYPE_FACEBOOK_PUBLISH = 'facebook-publish'
const JOB_TYPE_INSTAGRAM_PUBLISH = 'instagram-publish'

let runnerInterval: NodeJS.Timeout | null = null
let runnerTickInProgress = false

function getPublishJobKey(articleId: number) {
  return `news:publish:${articleId}`
}

function getNewsletterConfirmationJobKey(subscriberId: number) {
  return `newsletter:confirm:${subscriberId}`
}

function getNewsletterDispatchJobKey(articleId: number) {
  return `news:newsletter:${articleId}`
}

function getFacebookPublishJobKey(articleId: number) {
  return `news:facebook:${articleId}`
}

function getInstagramPublishJobKey(articleId: number) {
  return `news:instagram:${articleId}`
}

function parseJobPayload<T extends AsyncJobPayload>(payload: string) {
  try {
    const parsed = JSON.parse(payload)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as T
    }
  } catch {
    // fall through
  }

  return {} as T
}

function getRetryDelayMs(attempts: number) {
  return Math.min(30 * 60_000, 15_000 * (attempts + 1))
}

async function getSiteInfo(): Promise<SiteInfo & { defaultLocale: 'it' | 'en' }> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })

  return {
    hotelName: settings?.hotelName?.trim() || 'Hotel CMS',
    address: settings?.registeredAddress?.trim() || '',
    city: [settings?.postalCode?.trim(), settings?.city?.trim()].filter(Boolean).join(' '),
    phone: settings?.phone?.trim() || '',
    email: settings?.email?.trim() || '',
    defaultLocale: normalizeNewsLocale(settings?.defaultLocale) ?? 'it',
  }
}

async function queueJob({ type, dedupeKey, payload, runAt = new Date(), maxAttempts = 5 }: QueueJobInput) {
  if (!dedupeKey) {
    await createAsyncJob({
      type,
      payload: JSON.stringify(payload),
      runAt,
      maxAttempts,
    })
    return
  }

  await upsertAsyncJobByDedupeKey({
    type,
    dedupeKey,
    payload: JSON.stringify(payload),
    runAt,
    maxAttempts,
  })
}

async function deleteJobByDedupeKey(dedupeKey: string) {
  await deleteAsyncJobsByDedupeKey(dedupeKey)
}

async function claimDueJob() {
  const lockExpiry = new Date(Date.now() - config.newsJobLockTimeoutMs)
  return claimDueAsyncJob(lockExpiry, crypto.randomUUID())
}

async function finalizeJob(jobId: number) {
  await updateAsyncJob(jobId, {
    status: 'completed',
    lastError: '',
    completedAt: new Date(),
    lockedAt: null,
    lockToken: null,
    dedupeKey: null,
  })
}

async function rescheduleJob(jobId: number, runAt: Date) {
  await updateAsyncJob(jobId, {
    status: 'pending',
    runAt,
    lockedAt: null,
    lockToken: null,
    lastError: '',
  })
}

async function failJob(job: { id: number; attempts: number; maxAttempts: number }, error: Error) {
  const nextAttempts = job.attempts + 1
  const permanent = nextAttempts >= job.maxAttempts

  await updateAsyncJob(job.id, permanent
    ? {
        status: 'failed',
        attempts: nextAttempts,
        lastError: error.message,
        completedAt: new Date(),
        lockedAt: null,
        lockToken: null,
        dedupeKey: null,
      }
    : {
        status: 'pending',
        attempts: nextAttempts,
        lastError: error.message,
        runAt: new Date(Date.now() + getRetryDelayMs(job.attempts)),
        lockedAt: null,
        lockToken: null,
      })

  return permanent
}

async function createNewsletterDeliveriesSnapshot(articleId: number) {
  const existingDeliveries = await countNewsEmailDeliveriesByArticle(articleId)

  if (existingDeliveries > 0) {
    return existingDeliveries
  }

  const activeSubscriberIds = await listActiveNewsletterSubscriberIds()

  if (!activeSubscriberIds.length) {
    return 0
  }

  await createNewsEmailDeliveries(articleId, activeSubscriberIds)

  return activeSubscriberIds.length
}

async function queuePublishedArticleDistributionJobs(articleId: number) {
  const article = await getNewsArticleById(articleId)

  if (!article || article.status !== 'published') {
    return
  }

  if (article.publishToNewsletter && !article.newsletterDispatchedAt) {
    const deliveryCount = await createNewsletterDeliveriesSnapshot(article.id)

    if (deliveryCount === 0) {
      await updateNewsArticle(article.id, {
        newsletterDispatchedAt: new Date(),
        newsletterError: '',
      })
    } else {
      await queueJob({
        type: JOB_TYPE_NEWSLETTER_DISPATCH,
        dedupeKey: getNewsletterDispatchJobKey(article.id),
        payload: { articleId: article.id },
      })
    }
  }

  if (article.publishToFacebook && !article.facebookPublishedAt) {
    await queueJob({
      type: JOB_TYPE_FACEBOOK_PUBLISH,
      dedupeKey: getFacebookPublishJobKey(article.id),
      payload: { articleId: article.id },
    })
  }

  if (article.publishToInstagram && !article.instagramPublishedAt) {
    await queueJob({
      type: JOB_TYPE_INSTAGRAM_PUBLISH,
      dedupeKey: getInstagramPublishJobKey(article.id),
      payload: { articleId: article.id },
    })
  }
}

export async function publishNewsArticleNow(articleId: number, publishedAt = new Date()) {
  const article = await getNewsArticleById(articleId)

  if (!article) {
    return
  }

  if (article.status !== 'published' || !article.publishedAt) {
    await updateNewsArticle(article.id, {
      status: 'published',
      publishedAt,
      scheduledAt: null,
    })
  }

  await deleteJobByDedupeKey(getPublishJobKey(article.id))
  await queuePublishedArticleDistributionJobs(article.id)
}

export async function syncNewsArticleLifecycle(articleId: number) {
  const article = await getNewsArticleById(articleId)

  if (!article) {
    return
  }

  if (article.status === 'scheduled' && article.scheduledAt) {
    await queueJob({
      type: JOB_TYPE_PUBLISH_ARTICLE,
      dedupeKey: getPublishJobKey(article.id),
      payload: { articleId: article.id },
      runAt: article.scheduledAt,
    })

    await Promise.all([
      deleteJobByDedupeKey(getNewsletterDispatchJobKey(article.id)),
      deleteJobByDedupeKey(getFacebookPublishJobKey(article.id)),
      deleteJobByDedupeKey(getInstagramPublishJobKey(article.id)),
    ])

    return
  }

  await deleteJobByDedupeKey(getPublishJobKey(article.id))

  if (article.status === 'published') {
    if (!article.publishToNewsletter || article.newsletterDispatchedAt) {
      await deleteJobByDedupeKey(getNewsletterDispatchJobKey(article.id))
    }
    if (!article.publishToFacebook || article.facebookPublishedAt) {
      await deleteJobByDedupeKey(getFacebookPublishJobKey(article.id))
    }
    if (!article.publishToInstagram || article.instagramPublishedAt) {
      await deleteJobByDedupeKey(getInstagramPublishJobKey(article.id))
    }
    await queuePublishedArticleDistributionJobs(article.id)
    return
  }

  await Promise.all([
    deleteJobByDedupeKey(getNewsletterDispatchJobKey(article.id)),
    deleteJobByDedupeKey(getFacebookPublishJobKey(article.id)),
    deleteJobByDedupeKey(getInstagramPublishJobKey(article.id)),
  ])
}

export async function cancelNewsArticleJobs(articleId: number) {
  await Promise.all([
    deleteJobByDedupeKey(getPublishJobKey(articleId)),
    deleteJobByDedupeKey(getNewsletterDispatchJobKey(articleId)),
    deleteJobByDedupeKey(getFacebookPublishJobKey(articleId)),
    deleteJobByDedupeKey(getInstagramPublishJobKey(articleId)),
  ])
}

export async function queueNewsletterConfirmationJob(subscriberId: number, confirmToken: string) {
  await queueJob({
    type: JOB_TYPE_NEWSLETTER_CONFIRMATION,
    dedupeKey: getNewsletterConfirmationJobKey(subscriberId),
    payload: {
      subscriberId,
      confirmToken,
    },
  })
}

async function handlePublishArticleJob(jobPayload: { articleId?: number }) {
  if (!jobPayload.articleId) {
    return
  }

  await publishNewsArticleNow(jobPayload.articleId)
}

async function handleNewsletterConfirmationJob(jobPayload: { subscriberId?: number; confirmToken?: string }) {
  if (!jobPayload.subscriberId || !jobPayload.confirmToken) {
    return
  }

  const subscriber = await getNewsletterSubscriberById(jobPayload.subscriberId)

  if (!subscriber || subscriber.status !== 'pending' || !subscriber.unsubscribeToken) {
    return
  }

  const site = await getSiteInfo()

  await sendNewsletterConfirmation({
    recipientEmail: subscriber.email,
    confirmUrl: `${config.appOrigin}/api/newsletter/confirm?token=${encodeURIComponent(jobPayload.confirmToken)}`,
    unsubscribeUrl: `${config.appOrigin}/api/newsletter/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribeToken)}`,
    locale: normalizeNewsLocale(subscriber.locale) ?? site.defaultLocale,
  }, site)

  await updateNewsletterSubscriber(subscriber.id, {
    lastConfirmationEmailSentAt: new Date(),
  })
}

async function handleNewsletterDispatchJob(jobPayload: { articleId?: number }): Promise<JobProgressResult> {
  if (!jobPayload.articleId) {
    return {}
  }

  const article = await getNewsArticleById(jobPayload.articleId)

  if (!article || article.status !== 'published' || !article.publishToNewsletter) {
    return {}
  }

  const site = await getSiteInfo()
  const deliveries = await listNewsletterDispatchDeliveries(article.id, config.newsEmailBatchSize)

  if (!deliveries.length) {
    const failedCount = await countPermanentFailedNewsletterDeliveries(article.id)

    await updateNewsArticle(article.id, {
      newsletterDispatchedAt: article.newsletterDispatchedAt ?? new Date(),
      newsletterError: failedCount > 0 ? `${failedCount} newsletter deliveries failed permanently.` : '',
    })

    return {}
  }

  for (const delivery of deliveries) {
    const locale = normalizeNewsLocale(delivery.subscriber.locale) ?? site.defaultLocale
    const articleUrl = buildNewsArticleUrl(article.slug, locale)

    if (delivery.subscriber.status !== 'active' || !delivery.subscriber.unsubscribeToken) {
      await updateNewsEmailDelivery(delivery.id, {
        status: 'skipped',
        lastError: '',
        attempts: delivery.attempts + 1,
      })
      continue
    }

    try {
      await sendNewsTeaserEmail({
        recipientEmail: delivery.subscriber.email,
        articleTitle: locale === 'en' ? article.title_en : article.title_it,
        articleExcerpt: locale === 'en' ? article.excerpt_en : article.excerpt_it,
        articleUrl,
        unsubscribeUrl: `${config.appOrigin}/api/newsletter/unsubscribe?token=${encodeURIComponent(delivery.subscriber.unsubscribeToken)}`,
        featuredImageUrl: article.featuredMedia?.key ? buildAbsoluteMediaUrl(article.featuredMedia.key, 'card') : null,
        locale,
      }, site)

      await Promise.all([
        updateNewsEmailDelivery(delivery.id, {
          status: 'sent',
          sentAt: new Date(),
          lastError: '',
          attempts: delivery.attempts + 1,
        }),
        updateNewsletterSubscriber(delivery.subscriber.id, {
          lastNewsletterSentAt: new Date(),
        }),
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Newsletter delivery failed'

      await updateNewsEmailDelivery(delivery.id, {
        status: 'failed',
        lastError: message,
        attempts: delivery.attempts + 1,
      })
    }
  }

  const remaining = await countRemainingNewsletterDeliveries(article.id)

  if (remaining > 0) {
    return {
      rescheduleAt: new Date(Date.now() + 15_000),
    }
  }

  const failedCount = await countPermanentFailedNewsletterDeliveries(article.id)

  await updateNewsArticle(article.id, {
    newsletterDispatchedAt: new Date(),
    newsletterError: failedCount > 0 ? `${failedCount} newsletter deliveries failed permanently.` : '',
  })

  return {}
}

async function handleFacebookPublishJob(jobPayload: { articleId?: number }) {
  if (!jobPayload.articleId) {
    return
  }

  const article = await getNewsArticleById(jobPayload.articleId)

  if (!article || article.status !== 'published' || !article.publishToFacebook || article.facebookPublishedAt) {
    return
  }

  const site = await getSiteInfo()
  await publishArticleToFacebook(article, site.defaultLocale)

  await updateNewsArticle(article.id, {
    facebookPublishedAt: new Date(),
    facebookError: '',
  })
}

async function handleInstagramPublishJob(jobPayload: { articleId?: number }) {
  if (!jobPayload.articleId) {
    return
  }

  const article = await getNewsArticleById(jobPayload.articleId)

  if (!article || article.status !== 'published' || !article.publishToInstagram || article.instagramPublishedAt) {
    return
  }

  const site = await getSiteInfo()
  await publishArticleToInstagram(article, site.defaultLocale)

  await updateNewsArticle(article.id, {
    instagramPublishedAt: new Date(),
    instagramError: '',
  })
}

async function processJob(job: {
  id: number
  type: string
  payload: string
  attempts: number
  maxAttempts: number
}) {
  const payload = parseJobPayload(job.payload)

  switch (job.type) {
    case JOB_TYPE_PUBLISH_ARTICLE:
      await handlePublishArticleJob(payload)
      return {}
    case JOB_TYPE_NEWSLETTER_CONFIRMATION:
      await handleNewsletterConfirmationJob(payload)
      return {}
    case JOB_TYPE_NEWSLETTER_DISPATCH:
      return handleNewsletterDispatchJob(payload)
    case JOB_TYPE_FACEBOOK_PUBLISH:
      await handleFacebookPublishJob(payload)
      return {}
    case JOB_TYPE_INSTAGRAM_PUBLISH:
      await handleInstagramPublishJob(payload)
      return {}
    default:
      return {}
  }
}

async function persistJobTypeError(type: string, payload: string, message: string) {
  const parsed = parseJobPayload<{ articleId?: number }>(payload)
  if (!parsed.articleId) {
    return
  }

  if (type === JOB_TYPE_FACEBOOK_PUBLISH) {
    await updateNewsArticle(parsed.articleId, {
      facebookError: message,
    }).catch(() => undefined)
    return
  }

  if (type === JOB_TYPE_INSTAGRAM_PUBLISH) {
    await updateNewsArticle(parsed.articleId, {
      instagramError: message,
    }).catch(() => undefined)
  }
}

async function runQueueTick() {
  if (runnerTickInProgress) {
    return
  }

  runnerTickInProgress = true

  try {
    for (let index = 0; index < 6; index += 1) {
      const job = await claimDueJob()
      if (!job) {
        break
      }

      try {
        const progress = await processJob(job)
        if (progress.rescheduleAt) {
          await rescheduleJob(job.id, progress.rescheduleAt)
        } else {
          await finalizeJob(job.id)
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Async job failed')
        await persistJobTypeError(job.type, job.payload, err.message)
        await failJob(job, err)
      }
    }
  } finally {
    runnerTickInProgress = false
  }
}

export function startAsyncJobRunner() {
  if (runnerInterval) {
    return
  }

  runnerInterval = setInterval(() => {
    void runQueueTick()
  }, config.newsJobPollMs)

  void runQueueTick()
}

export function stopAsyncJobRunner() {
  if (runnerInterval) {
    clearInterval(runnerInterval)
    runnerInterval = null
  }
}
