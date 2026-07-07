import crypto from 'crypto'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { config } from '../../config'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { asyncHandler, badRequest, serviceUnavailable, trimString } from '../../lib/http'
import { normalizeNewsLocale } from '../../lib/newsPayloads'
import { queueNewsletterConfirmationJob } from '../../services/asyncJobs'
import {
  createNewsletterSubscriber,
  getNewsletterSubscriberByConfirmTokenHash,
  getNewsletterSubscriberByEmail,
  getNewsletterSubscriberByUnsubscribeTokenHash,
  updateNewsletterSubscriber,
} from '../../services/newsStore'

const router = Router()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const newsletterLimiter = rateLimit({
  windowMs: config.contactRateLimitWindowMs,
  max: config.contactRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: true, message: 'Too many requests, please try again later.' },
})

const confirmLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: true, message: 'Too many requests, please try again later.' },
})

function createToken() {
  return crypto.randomBytes(24).toString('hex')
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function redirectToNewsletterPage(status: string) {
  return `/news?newsletter=${encodeURIComponent(status)}`
}

router.post('/newsletter/subscribe', requireTrustedOrigin, newsletterLimiter, asyncHandler(async (req, res) => {
  if (!config.smtpHost || !config.smtpFrom) {
    serviceUnavailable('Newsletter signup is not available right now')
  }

  const email = trimString(req.body?.email, 'email', 160).toLowerCase()
  const locale = normalizeNewsLocale(req.body?.locale) ?? 'it'
  const consent = req.body?.consent === true
  const website = typeof req.body?.website === 'string' ? req.body.website.trim() : ''

  if (website) {
    res.json({ ok: true, status: 'pending' })
    return
  }

  if (!emailRegex.test(email)) {
    badRequest('Invalid email format')
  }

  if (!consent) {
    badRequest('Newsletter consent is required')
  }

  const confirmToken = createToken()
  const confirmTokenHash = hashToken(confirmToken)
  const unsubscribeToken = createToken()
  const unsubscribeTokenHash = hashToken(unsubscribeToken)
  const expiresAt = new Date(Date.now() + config.newsConfirmTokenTtlHours * 60 * 60 * 1000)
  const requestIp = req.ip || ''
  const requestUserAgent = req.get('user-agent')?.slice(0, 300) ?? ''

  const existing = await getNewsletterSubscriberByEmail(email)

  if (existing?.status === 'active') {
    await updateNewsletterSubscriber(existing.id, { locale })

    res.json({ ok: true, status: 'active' })
    return
  }

  const subscriber = existing
    ? await updateNewsletterSubscriber(existing.id, {
        locale,
        status: 'pending',
        confirmTokenHash,
        confirmTokenExpiresAt: expiresAt,
        unsubscribeToken,
        unsubscribeTokenHash,
        consentIp: requestIp,
        consentUserAgent: requestUserAgent,
        requestedAt: new Date(),
        unsubscribedAt: null,
      })
    : await createNewsletterSubscriber({
        email,
        locale,
        status: 'pending',
        confirmTokenHash,
        confirmTokenExpiresAt: expiresAt,
        unsubscribeToken,
        unsubscribeTokenHash,
        consentIp: requestIp,
        consentUserAgent: requestUserAgent,
        requestedAt: new Date(),
      })

  if (!subscriber) {
    serviceUnavailable('Newsletter signup is not available right now')
  }

  await queueNewsletterConfirmationJob(subscriber.id, confirmToken)

  res.json({ ok: true, status: 'pending' })
}))

router.get('/newsletter/confirm', confirmLimiter, asyncHandler(async (req, res) => {
  const token = typeof req.query.token === 'string' ? req.query.token.trim() : ''
  if (!token) {
    res.redirect(302, redirectToNewsletterPage('confirm-invalid'))
    return
  }

  const tokenHash = hashToken(token)
  const subscriber = await getNewsletterSubscriberByConfirmTokenHash(tokenHash)

  if (!subscriber) {
    res.redirect(302, redirectToNewsletterPage('confirm-invalid'))
    return
  }

  if (subscriber.status !== 'active') {
    if (!subscriber.confirmTokenExpiresAt || subscriber.confirmTokenExpiresAt.getTime() < Date.now()) {
      res.redirect(302, redirectToNewsletterPage('confirm-expired'))
      return
    }

    await updateNewsletterSubscriber(subscriber.id, {
      status: 'active',
      confirmedAt: subscriber.confirmedAt ?? new Date(),
      confirmTokenExpiresAt: null,
    })
  }

  res.redirect(302, redirectToNewsletterPage('confirmed'))
}))

router.get('/newsletter/unsubscribe', confirmLimiter, asyncHandler(async (req, res) => {
  const token = typeof req.query.token === 'string' ? req.query.token.trim() : ''
  if (!token) {
    res.redirect(302, redirectToNewsletterPage('unsubscribe-invalid'))
    return
  }

  const tokenHash = hashToken(token)
  const subscriber = await getNewsletterSubscriberByUnsubscribeTokenHash(tokenHash)

  if (!subscriber) {
    res.redirect(302, redirectToNewsletterPage('unsubscribe-invalid'))
    return
  }

  if (subscriber.status !== 'unsubscribed') {
    await updateNewsletterSubscriber(subscriber.id, {
      status: 'unsubscribed',
      unsubscribedAt: new Date(),
    })
  }

  res.redirect(302, redirectToNewsletterPage('unsubscribed'))
}))

export default router
