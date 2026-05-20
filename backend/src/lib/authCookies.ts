import type { CookieOptions, Response } from 'express'
import { config } from '../config'

export const AUTH_COOKIE_NAME = config.cookie.name

export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: config.cookie.sameSite,
  maxAge: config.cookie.maxAgeMs,
  secure: config.cookie.secure,
  path: config.cookie.path,
  domain: config.cookie.domain,
}

export const CLEAR_AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: config.cookie.sameSite,
  secure: config.cookie.secure,
  path: config.cookie.path,
  domain: config.cookie.domain,
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, CLEAR_AUTH_COOKIE_OPTIONS)
}
