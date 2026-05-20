import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS, clearAuthCookie } from '../lib/authCookies'
import { requireAuth, AuthRequest } from '../middleware/requireAuth'
import { requireTrustedOrigin } from '../middleware/requireTrustedOrigin'
import { prisma } from '../lib/prisma'
import { asyncHandler, trimString, unauthorized } from '../lib/http'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: config.authLoginRateLimitWindowMs,
  max: config.authLoginRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: true, message: 'Too many login attempts, please try again later.' },
})

router.post('/login', requireTrustedOrigin, loginLimiter, asyncHandler(async (req: Request, res: Response) => {
  const email = trimString(req.body?.email, 'email', 120).toLowerCase()
  const password = trimString(req.body?.password, 'password', 200)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    unauthorized('Invalid credentials')
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    unauthorized('Invalid credentials')
  }

  const token = jwt.sign(
    { userId: user.id },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'] },
  )
  res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS)
  res.json({ email: user.email })
}))

router.post('/logout', requireTrustedOrigin, (_req: Request, res: Response) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ userId: req.userId })
})

export default router
