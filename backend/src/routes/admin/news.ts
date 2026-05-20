import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { asyncHandler, badRequest, parseBoolean, parsePositiveInt, trimString } from '../../lib/http'
import {
  normalizeNewsExcerpt,
  serializeAdminNewsArticle,
  serializeNewsletterSubscriber,
} from '../../lib/newsPayloads'
import { syncNewsArticleLifecycle, cancelNewsArticleJobs, publishNewsArticleNow } from '../../services/asyncJobs'
import { getNewsDeliveryCapabilities } from '../../services/meta'
import { normalizeNewsBodyJson, sanitizeNewsHtml } from '../../services/newsSanitizer'
import {
  countNewsletterSubscribersByStatus,
  countNewsArticles,
  createNewsArticle,
  createUniqueNewsSlug,
  deleteNewsArticle,
  getNewsArticleById,
  getNewsletterSubscriberById,
  listAdminNewsArticles,
  listNewsletterSubscribers,
  updateNewsArticle,
  updateNewsletterSubscriber,
} from '../../services/newsStore'

const router = Router()

function parseArticleStatus(value: unknown): 'draft' | 'scheduled' | 'published' {
  if (value === 'draft' || value === 'scheduled' || value === 'published') {
    return value
  }

  badRequest('status must be draft, scheduled, or published')
}

function parseOptionalDateTime(value: unknown, fieldName: string) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value !== 'string') {
    badRequest(`${fieldName} must be an ISO date string`)
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    badRequest(`${fieldName} must be a valid ISO date string`)
  }

  return parsed
}

function parseOptionalId(value: unknown, fieldName: string) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number.parseInt(value, 10)
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed
    }
  }

  badRequest(`${fieldName} must be a positive integer`)
}

async function assertFeaturedMediaExists(featuredMediaId: number | null) {
  if (featuredMediaId == null) {
    return
  }

  const media = await prisma.mediaFile.findUnique({
    where: { id: featuredMediaId },
    select: { id: true },
  })

  if (!media) {
    badRequest('featuredMediaId must reference an existing media file')
  }
}

function validatePublicationReadiness(input: {
  status: 'draft' | 'scheduled' | 'published'
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  bodyHtml_it: string
  bodyHtml_en: string
  featuredMediaId: number | null
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  scheduledAt: Date | null
}) {
  const needsFullContent = input.status !== 'draft'
    || input.publishToNewsletter
    || input.publishToFacebook
    || input.publishToInstagram

  if (needsFullContent) {
    if (!input.title_it.trim() || !input.title_en.trim()) {
      badRequest('Both Italian and English titles are required')
    }
    if (!input.bodyHtml_it.trim() || !input.bodyHtml_en.trim()) {
      badRequest('Both Italian and English article bodies are required')
    }
  }

  if ((input.publishToNewsletter || input.publishToFacebook || input.publishToInstagram) && input.featuredMediaId == null) {
    badRequest('Newsletter and social distribution require a featured image')
  }

  if (input.status === 'scheduled') {
    if (!input.scheduledAt) {
      badRequest('scheduledAt is required when status is scheduled')
    }
    if (input.scheduledAt.getTime() <= Date.now()) {
      badRequest('scheduledAt must be in the future')
    }
  }
}

async function getSerializedArticleById(id: number) {
  const article = await getNewsArticleById(id)

  if (!article) {
    badRequest('News article not found')
  }

  return serializeAdminNewsArticle(article)
}

router.get('/news/articles', requireAuth, asyncHandler(async (_req, res) => {
  const articles = await listAdminNewsArticles()

  res.json(articles.map(serializeAdminNewsArticle))
}))

router.post('/news/articles', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const capabilities = getNewsDeliveryCapabilities()
  const title_it = trimString(req.body?.title_it, 'title_it', 180)
  const title_en = trimString(req.body?.title_en, 'title_en', 180)
  const bodyHtml_it = sanitizeNewsHtml(trimString(req.body?.bodyHtml_it, 'bodyHtml_it', 200_000, false))
  const bodyHtml_en = sanitizeNewsHtml(trimString(req.body?.bodyHtml_en, 'bodyHtml_en', 200_000, false))
  const publishToNewsletter = parseBoolean(req.body?.publishToNewsletter, 'publishToNewsletter')
  const publishToFacebook = parseBoolean(req.body?.publishToFacebook, 'publishToFacebook')
  const publishToInstagram = parseBoolean(req.body?.publishToInstagram, 'publishToInstagram')
  const featuredMediaId = parseOptionalId(req.body?.featuredMediaId, 'featuredMediaId')
  const status = parseArticleStatus(req.body?.status)
  const scheduledAt = parseOptionalDateTime(req.body?.scheduledAt, 'scheduledAt')
  const excerpt_it = normalizeNewsExcerpt(trimString(req.body?.excerpt_it, 'excerpt_it', 500, false), bodyHtml_it)
  const excerpt_en = normalizeNewsExcerpt(trimString(req.body?.excerpt_en, 'excerpt_en', 500, false), bodyHtml_en)
  const bodyJson_it = normalizeNewsBodyJson(req.body?.bodyJson_it, 'bodyJson_it')
  const bodyJson_en = normalizeNewsBodyJson(req.body?.bodyJson_en, 'bodyJson_en')

  validatePublicationReadiness({
    status,
    title_it,
    title_en,
    excerpt_it,
    excerpt_en,
    bodyHtml_it,
    bodyHtml_en,
    featuredMediaId,
    publishToNewsletter,
    publishToFacebook,
    publishToInstagram,
    scheduledAt,
  })

  if (publishToNewsletter && !capabilities.newsletter.available) {
    badRequest('Newsletter delivery requires SMTP configuration')
  }

  if (publishToFacebook && (!capabilities.facebook.configured || capabilities.facebook.expired)) {
    badRequest('Facebook publishing is not currently available')
  }

  if (publishToInstagram && (!capabilities.instagram.configured || capabilities.instagram.expired)) {
    badRequest('Instagram publishing is not currently available')
  }

  await assertFeaturedMediaExists(featuredMediaId)

  const article = await createNewsArticle({
    slug: await createUniqueNewsSlug(title_it),
    title_it,
    title_en,
    excerpt_it,
    excerpt_en,
    bodyJson_it,
    bodyJson_en,
    bodyHtml_it,
    bodyHtml_en,
    status,
    publishToSite: parseBoolean(req.body?.publishToSite, 'publishToSite'),
    publishToNewsletter,
    publishToFacebook,
    publishToInstagram,
    featuredMediaId,
    scheduledAt: status === 'scheduled' ? scheduledAt : null,
    publishedAt: status === 'published' ? new Date() : null,
  })

  if (status === 'published') {
    await publishNewsArticleNow(article.id, article.publishedAt ?? new Date())
  } else {
    await syncNewsArticleLifecycle(article.id)
  }

  res.status(201).json(await getSerializedArticleById(article.id))
}))

router.put('/news/articles/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')
  const existing = await getNewsArticleById(id)

  if (!existing) {
    badRequest('News article not found')
  }

  const capabilities = getNewsDeliveryCapabilities()
  const existingStatus = parseArticleStatus(existing.status)
  const title_it = trimString(req.body?.title_it ?? existing.title_it, 'title_it', 180)
  const title_en = trimString(req.body?.title_en ?? existing.title_en, 'title_en', 180)
  const bodyHtml_it = sanitizeNewsHtml(trimString(req.body?.bodyHtml_it ?? existing.bodyHtml_it, 'bodyHtml_it', 200_000, false))
  const bodyHtml_en = sanitizeNewsHtml(trimString(req.body?.bodyHtml_en ?? existing.bodyHtml_en, 'bodyHtml_en', 200_000, false))
  const publishToNewsletter = req.body?.publishToNewsletter === undefined
    ? existing.publishToNewsletter
    : parseBoolean(req.body?.publishToNewsletter, 'publishToNewsletter')
  const publishToFacebook = req.body?.publishToFacebook === undefined
    ? existing.publishToFacebook
    : parseBoolean(req.body?.publishToFacebook, 'publishToFacebook')
  const publishToInstagram = req.body?.publishToInstagram === undefined
    ? existing.publishToInstagram
    : parseBoolean(req.body?.publishToInstagram, 'publishToInstagram')
  const publishToSite = req.body?.publishToSite === undefined
    ? existing.publishToSite
    : parseBoolean(req.body?.publishToSite, 'publishToSite')
  const featuredMediaId = req.body?.featuredMediaId === undefined
    ? existing.featuredMediaId
    : parseOptionalId(req.body?.featuredMediaId, 'featuredMediaId')
  const requestedStatus = req.body?.status === undefined
    ? existingStatus
    : parseArticleStatus(req.body?.status)
  const status = existingStatus === 'published' ? 'published' : requestedStatus
  const scheduledAt = req.body?.scheduledAt === undefined
    ? existing.scheduledAt
    : parseOptionalDateTime(req.body?.scheduledAt, 'scheduledAt')
  const excerpt_it = normalizeNewsExcerpt(trimString(req.body?.excerpt_it ?? existing.excerpt_it, 'excerpt_it', 500, false), bodyHtml_it)
  const excerpt_en = normalizeNewsExcerpt(trimString(req.body?.excerpt_en ?? existing.excerpt_en, 'excerpt_en', 500, false), bodyHtml_en)
  const bodyJson_it = req.body?.bodyJson_it === undefined
    ? existing.bodyJson_it
    : normalizeNewsBodyJson(req.body?.bodyJson_it, 'bodyJson_it')
  const bodyJson_en = req.body?.bodyJson_en === undefined
    ? existing.bodyJson_en
    : normalizeNewsBodyJson(req.body?.bodyJson_en, 'bodyJson_en')

  validatePublicationReadiness({
    status,
    title_it,
    title_en,
    excerpt_it,
    excerpt_en,
    bodyHtml_it,
    bodyHtml_en,
    featuredMediaId,
    publishToNewsletter,
    publishToFacebook,
    publishToInstagram,
    scheduledAt: status === 'scheduled' ? scheduledAt : null,
  })

  if (publishToNewsletter && !capabilities.newsletter.available) {
    badRequest('Newsletter delivery requires SMTP configuration')
  }

  if (publishToFacebook && (!capabilities.facebook.configured || capabilities.facebook.expired)) {
    badRequest('Facebook publishing is not currently available')
  }

  if (publishToInstagram && (!capabilities.instagram.configured || capabilities.instagram.expired)) {
    badRequest('Instagram publishing is not currently available')
  }

  await assertFeaturedMediaExists(featuredMediaId)

  const updated = await updateNewsArticle(id, {
    slug: await createUniqueNewsSlug(title_it, id),
    title_it,
    title_en,
    excerpt_it,
    excerpt_en,
    bodyJson_it,
    bodyJson_en,
    bodyHtml_it,
    bodyHtml_en,
    status,
    publishToSite,
    publishToNewsletter,
    publishToFacebook,
    publishToInstagram,
    featuredMediaId,
    scheduledAt: status === 'scheduled' ? scheduledAt : null,
    publishedAt: status === 'published' ? existing.publishedAt ?? new Date() : null,
  })

  if (!updated) {
    badRequest('News article not found')
  }

  if (status === 'published') {
    await publishNewsArticleNow(updated.id, updated.publishedAt ?? new Date())
  } else {
    await syncNewsArticleLifecycle(updated.id)
  }

  res.json(await getSerializedArticleById(updated.id))
}))

router.delete('/news/articles/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')

  await cancelNewsArticleJobs(id)
  await deleteNewsArticle(id)

  res.json({ ok: true })
}))

router.get('/news/subscribers', requireAuth, asyncHandler(async (_req, res) => {
  const subscribers = await listNewsletterSubscribers()

  res.json(subscribers.map(serializeNewsletterSubscriber))
}))

router.put('/news/subscribers/:id/status', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')
  const status = req.body?.status === 'active' || req.body?.status === 'unsubscribed'
    ? req.body.status
    : badRequest('status must be active or unsubscribed')

  const existing = await getNewsletterSubscriberById(id)
  if (!existing) {
    badRequest('Newsletter subscriber not found')
  }

  const updated = await updateNewsletterSubscriber(id, status === 'active'
    ? {
        status: 'active',
        confirmedAt: new Date(),
        unsubscribedAt: null,
      }
    : {
        status: 'unsubscribed',
        unsubscribedAt: new Date(),
      })

  if (!updated) {
    badRequest('Newsletter subscriber not found')
  }

  res.json(serializeNewsletterSubscriber(updated))
}))

router.get('/news/status', requireAuth, asyncHandler(async (_req, res) => {
  const [articles, pendingSubscribers, activeSubscribers, unsubscribedSubscribers] = await Promise.all([
    countNewsArticles(),
    countNewsletterSubscribersByStatus('pending'),
    countNewsletterSubscribersByStatus('active'),
    countNewsletterSubscribersByStatus('unsubscribed'),
  ])

  res.json({
    capabilities: getNewsDeliveryCapabilities(),
    articles,
    subscribers: {
      pending: pendingSubscribers,
      active: activeSubscribers,
      unsubscribed: unsubscribedSubscribers,
    },
  })
}))

export default router
