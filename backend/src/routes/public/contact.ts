import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { config } from '../../config'
import { prisma } from '../../lib/prisma'
import { sendContact } from '../../services/mailer'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { asyncHandler, trimString, badRequest } from '../../lib/http'

const router = Router()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const contactLimiter = rateLimit({
  windowMs: config.contactRateLimitWindowMs,
  max: config.contactRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: true, message: 'Too many requests, please try again later.' },
})

router.post('/contact', requireTrustedOrigin, contactLimiter, asyncHandler(async (req, res) => {
  const name = trimString(req.body?.name, 'name', 80)
  const surname = trimString(req.body?.surname, 'surname', 80)
  const email = trimString(req.body?.email, 'email', 120).toLowerCase()
  const message = trimString(req.body?.message, 'message', 5000)
  const website = typeof req.body?.website === 'string' ? req.body.website.trim() : ''

  if (website) {
    res.json({ ok: true })
    return
  }

  if (!emailRegex.test(email)) {
    badRequest('Invalid email format')
  }

  const settings = await prisma.siteSettings.findFirst()
  const site = {
    hotelName: settings?.hotelName || 'Hotel CMS',
    address: settings?.registeredAddress || '',
    city: [settings?.city, settings?.postalCode].filter(Boolean).join(' '),
    phone: settings?.phone || '',
    email: settings?.email || '',
  }

  try {
    await sendContact({ name, surname, email, message }, site)
  } catch (err) {
    console.error('[contact] sendMail failed:', err)
    throw err
  }
  res.json({ ok: true })
}))

export default router
