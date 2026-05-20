import path from 'path'
import { readBootstrapAdminCredentials } from './lib/bootstrapAdmin'

type NodeEnv = 'development' | 'test' | 'production'
type CookieSameSite = 'lax' | 'strict' | 'none'

const DEFAULT_PRODUCTION_JWT_SECRET = 'change_me_in_production'

interface Config {
  nodeEnv: NodeEnv
  host: string
  port: number
  trustProxy: boolean | number
  appOrigin: string
  databaseUrl: string
  databaseFilePath: string
  adminEmail: string
  adminPasswordHash: string
  jwtSecret: string
  jwtExpiresIn: string
  cookie: {
    name: string
    domain?: string
    sameSite: CookieSameSite
    secure: boolean
    maxAgeMs: number
    path: string
  }
  allowedOrigins: string[]
  trustedOrigins: string[]
  jsonBodyLimit: string
  uploadMaxBytes: number
  siteTransferMaxBytes: number
  mediaRoot: string
  mediaPublicBasePath: string
  mediaCacheMaxAgeSeconds: number
  authLoginRateLimitWindowMs: number
  authLoginRateLimitMax: number
  contactRateLimitWindowMs: number
  contactRateLimitMax: number
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPass: string
  smtpFrom: string
  contactEmailTo: string
  newsJobPollMs: number
  newsJobLockTimeoutMs: number
  newsEmailBatchSize: number
  newsConfirmTokenTtlHours: number
  metaAccessToken: string
  metaAccessTokenExpiresAt: Date | null
  metaFacebookPageId: string
  metaInstagramBusinessAccountId: string
}

function fail(message: string): never {
  throw new Error(`[config] ${message}`)
}

function requireString(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    fail(`Missing required env var ${name}`)
  }
  return value
}

function optionalString(name: string, fallback = ''): string {
  return process.env[name]?.trim() ?? fallback
}

function parseInteger(name: string, fallback?: number): number {
  const raw = process.env[name]
  if ((raw === undefined || raw.trim() === '') && fallback !== undefined) {
    return fallback
  }
  const value = Number.parseInt(raw ?? '', 10)
  if (!Number.isInteger(value)) {
    fail(`${name} must be an integer`)
  }
  return value
}

function parsePositiveInteger(name: string, fallback?: number): number {
  const value = parseInteger(name, fallback)
  if (value < 1) {
    fail(`${name} must be greater than 0`)
  }
  return value
}

function parseBoolean(name: string, fallback?: boolean): boolean {
  const raw = process.env[name]
  if ((raw === undefined || raw.trim() === '') && fallback !== undefined) {
    return fallback
  }
  if (raw === 'true') return true
  if (raw === 'false') return false
  fail(`${name} must be "true" or "false"`)
}

function parseNodeEnv(): NodeEnv {
  const raw = optionalString('NODE_ENV', 'development')
  if (raw === 'development' || raw === 'test' || raw === 'production') {
    return raw
  }
  fail('NODE_ENV must be one of: development, test, production')
}

function parseSameSite(name: string, fallback: CookieSameSite): CookieSameSite {
  const raw = optionalString(name, fallback)
  if (raw === 'lax' || raw === 'strict' || raw === 'none') {
    return raw
  }
  fail(`${name} must be one of: lax, strict, none`)
}

function parseOrigin(name: string, value: string): string {
  try {
    return new URL(value).origin
  } catch {
    fail(`${name} contains an invalid URL: ${value}`)
  }
}

function parseOptionalOrigin(name: string): string | undefined {
  const raw = process.env[name]?.trim()
  if (!raw) {
    return undefined
  }

  return parseOrigin(name, raw)
}

function parseOptionalOriginList(name: string): string[] {
  const raw = process.env[name]
  if (!raw || !raw.trim()) {
    return []
  }

  const origins = raw
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
    .map(value => parseOrigin(name, value))

  return Array.from(new Set(origins))
}

function mergeOrigins(...lists: string[][]): string[] {
  return Array.from(new Set(lists.flat().filter(Boolean)))
}

function parseTrustProxy(name: string, fallback: boolean | number): boolean | number {
  const raw = process.env[name]
  if (!raw || !raw.trim()) {
    return fallback
  }
  if (raw === 'true') return true
  if (raw === 'false') return false
  if (/^\d+$/.test(raw.trim())) {
    return Number.parseInt(raw.trim(), 10)
  }
  fail(`${name} must be "true", "false", or an integer`)
}

function parseOptionalDate(name: string): Date | null {
  const raw = process.env[name]?.trim()
  if (!raw) {
    return null
  }

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    fail(`${name} must be a valid ISO date/time`)
  }

  return parsed
}

function normalizeBasePath(name: string, fallback: string): string {
  const raw = optionalString(name, fallback)
  if (!raw.startsWith('/')) {
    fail(`${name} must start with "/"`)
  }
  return raw !== '/' ? raw.replace(/\/+$/, '') : raw
}

function parseSqliteDatabaseFilePath(databaseUrl: string) {
  if (!databaseUrl.startsWith('file:')) {
    fail('DATABASE_URL must use a SQLite file: path')
  }

  const rawPath = databaseUrl
    .slice('file:'.length)
    .split('?')[0]
    .split('#')[0]

  if (!rawPath) {
    fail('DATABASE_URL must include a SQLite file path')
  }

  if (path.isAbsolute(rawPath)) {
    return rawPath
  }

  // Resolve relative SQLite URLs from the backend package root. Using
  // `__dirname` breaks after TypeScript compilation because runtime files live
  // under `dist/backend/src`, while Prisma still reads the DB from `./prisma`.
  const backendRoot = process.cwd()
  return path.resolve(backendRoot, 'prisma', rawPath)
}

const nodeEnv = parseNodeEnv()
const host = optionalString('HOST', '0.0.0.0')
const port = parsePositiveInteger('PORT', 3001)
const trustProxy = parseTrustProxy('TRUST_PROXY', 1)
const databaseUrl = requireString('DATABASE_URL')
const databaseFilePath = parseSqliteDatabaseFilePath(databaseUrl)
const { email: adminEmail, passwordHash: adminPasswordHash } = readBootstrapAdminCredentials()
const jwtSecret = requireString('JWT_SECRET')

if (nodeEnv === 'production' && jwtSecret === DEFAULT_PRODUCTION_JWT_SECRET) {
  fail('JWT_SECRET must be overridden in production')
}

const jwtExpiresIn = optionalString('JWT_EXPIRES_IN', '7d')
const cookieSameSite = parseSameSite('COOKIE_SAME_SITE', 'lax')
const cookieSecure = parseBoolean('COOKIE_SECURE', nodeEnv === 'production')
const cookieMaxAgeMs = parsePositiveInteger('COOKIE_MAX_AGE_MS', 7 * 24 * 60 * 60 * 1000)
const appOrigin = parseOptionalOrigin('APP_ORIGIN')
const extraAllowedOrigins = parseOptionalOriginList('ALLOWED_ORIGINS')
const allowedOrigins = mergeOrigins(appOrigin ? [appOrigin] : [], extraAllowedOrigins)
const extraTrustedOrigins = parseOptionalOriginList('TRUSTED_ORIGINS')
const trustedOrigins = extraTrustedOrigins.length > 0
  ? mergeOrigins(appOrigin ? [appOrigin] : [], extraTrustedOrigins)
  : allowedOrigins
const mediaRoot = path.resolve(optionalString('MEDIA_STORAGE_ROOT', './media-storage'))
const mediaPublicBasePath = normalizeBasePath('MEDIA_PUBLIC_BASE_PATH', '/media')
const authLoginRateLimitWindowMs = parsePositiveInteger('AUTH_LOGIN_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000)
const authLoginRateLimitMax = parsePositiveInteger('AUTH_LOGIN_RATE_LIMIT_MAX', 5)
const smtpHost = optionalString('SMTP_HOST')
const smtpFrom = optionalString('SMTP_FROM')
const contactEmailTo = optionalString('CONTACT_EMAIL_TO')

if (cookieSameSite === 'none' && !cookieSecure) {
  fail('COOKIE_SAME_SITE=none requires COOKIE_SECURE=true')
}

if (!allowedOrigins.length) {
  fail('Set APP_ORIGIN or ALLOWED_ORIGINS with at least one public origin')
}

if (smtpHost && !smtpFrom) {
  fail('SMTP_FROM is required when SMTP_HOST is configured')
}

if (smtpHost && !contactEmailTo) {
  fail('CONTACT_EMAIL_TO is required when SMTP_HOST is configured')
}

export const config: Config = {
  nodeEnv,
  host,
  port,
  trustProxy,
  appOrigin: appOrigin ?? allowedOrigins[0],
  databaseUrl,
  databaseFilePath,
  adminEmail,
  adminPasswordHash,
  jwtSecret,
  jwtExpiresIn,
  cookie: {
    name: optionalString('COOKIE_NAME', 'token'),
    domain: optionalString('COOKIE_DOMAIN') || undefined,
    sameSite: cookieSameSite,
    secure: cookieSecure,
    maxAgeMs: cookieMaxAgeMs,
    path: optionalString('COOKIE_PATH', '/'),
  },
  allowedOrigins,
  trustedOrigins,
  jsonBodyLimit: optionalString('JSON_BODY_LIMIT', '1mb'),
  uploadMaxBytes: parsePositiveInteger('UPLOAD_MAX_BYTES', 10 * 1024 * 1024),
  siteTransferMaxBytes: parsePositiveInteger('SITE_TRANSFER_MAX_BYTES', 512 * 1024 * 1024),
  mediaRoot,
  mediaPublicBasePath,
  mediaCacheMaxAgeSeconds: parsePositiveInteger('MEDIA_CACHE_MAX_AGE_SECONDS', 3600),
  authLoginRateLimitWindowMs,
  authLoginRateLimitMax,
  contactRateLimitWindowMs: parsePositiveInteger('CONTACT_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
  contactRateLimitMax: parsePositiveInteger('CONTACT_RATE_LIMIT_MAX', 5),
  smtpHost,
  smtpPort: parsePositiveInteger('SMTP_PORT', 587),
  smtpUser: optionalString('SMTP_USER'),
  smtpPass: optionalString('SMTP_PASS'),
  smtpFrom,
  contactEmailTo,
  newsJobPollMs: parsePositiveInteger('NEWS_JOB_POLL_MS', 5_000),
  newsJobLockTimeoutMs: parsePositiveInteger('NEWS_JOB_LOCK_TIMEOUT_MS', 60_000),
  newsEmailBatchSize: parsePositiveInteger('NEWS_EMAIL_BATCH_SIZE', 25),
  newsConfirmTokenTtlHours: parsePositiveInteger('NEWS_CONFIRM_TOKEN_TTL_HOURS', 24),
  metaAccessToken: optionalString('META_ACCESS_TOKEN'),
  metaAccessTokenExpiresAt: parseOptionalDate('META_ACCESS_TOKEN_EXPIRES_AT'),
  metaFacebookPageId: optionalString('META_FACEBOOK_PAGE_ID'),
  metaInstagramBusinessAccountId: optionalString('META_INSTAGRAM_BUSINESS_ACCOUNT_ID'),
}
