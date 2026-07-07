import jwt from 'jsonwebtoken'
import { describe, expect, it } from 'vitest'

describe('JWT error hierarchy', () => {
  it('TokenExpiredError is a subclass of JsonWebTokenError', () => {
    const error = new jwt.TokenExpiredError('jwt expired', new Date())

    expect(error).toBeInstanceOf(jwt.JsonWebTokenError)
    expect(error).toBeInstanceOf(jwt.TokenExpiredError)
  })
})

describe('Config secrets redaction', () => {
  const REDACTED_SENSITIVE_KEYS = new Set(['jwtSecret', 'smtpPass', 'metaAccessToken', 'adminPasswordHash'])

  function redactedConfigSnapshot(configObj: Record<string, unknown>): Record<string, unknown> {
    const snapshot: Record<string, unknown> = {}
    for (const key of Object.keys(configObj)) {
      const value = configObj[key]
      if (typeof value === 'function') {
        continue
      }
      snapshot[key] = REDACTED_SENSITIVE_KEYS.has(key) ? '[REDACTED]' : value
    }
    return snapshot
  }

  it('redacts jwtSecret value', () => {
    const result = redactedConfigSnapshot({ jwtSecret: 'super-secret', port: 3001, host: 'localhost' })

    expect(result.jwtSecret).toBe('[REDACTED]')
  })

  it('redacts smtpPass value', () => {
    const result = redactedConfigSnapshot({ smtpPass: 'mail-password', host: 'localhost' })

    expect(result.smtpPass).toBe('[REDACTED]')
  })

  it('redacts metaAccessToken value', () => {
    const result = redactedConfigSnapshot({ metaAccessToken: 'meta-secret', host: 'localhost' })

    expect(result.metaAccessToken).toBe('[REDACTED]')
  })

  it('redacts adminPasswordHash value', () => {
    const result = redactedConfigSnapshot({ adminPasswordHash: 'bcrypt-hash-here', port: 3001 })

    expect(result.adminPasswordHash).toBe('[REDACTED]')
  })

  it('does not redact non-sensitive keys', () => {
    const result = redactedConfigSnapshot({ port: 3001, host: 'localhost', nodeEnv: 'test' })

    expect(result.port).toBe(3001)
    expect(result.host).toBe('localhost')
    expect(result.nodeEnv).toBe('test')
  })

  it('omits function values from the redacted snapshot', () => {
    const result = redactedConfigSnapshot({ port: 3001, toJSON: () => ({}) })

    expect(result).toEqual({ port: 3001 })
  })

  it('handles empty config', () => {
    const result = redactedConfigSnapshot({})

    expect(result).toEqual({})
  })
})

describe('Booking URL validation', () => {
  function validateBookingUrl(url: string): { valid: boolean; error?: string } {
    const trimmed = url.trim()
    if (!trimmed) return { valid: true }

    try {
      const parsedUrl = new URL(trimmed)
      if (parsedUrl.protocol !== 'https:') {
        return { valid: false, error: 'bookingUrl must use https://' }
      }
      return { valid: true }
    } catch {
      return { valid: false, error: 'bookingUrl must be a valid URL' }
    }
  }

  it('accepts valid https URL', () => {
    expect(validateBookingUrl('https://booking.example.com').valid).toBe(true)
  })

  it('accepts https URL with path', () => {
    expect(validateBookingUrl('https://www.booking.com/hotel/it/nixit').valid).toBe(true)
  })

  it('accepts empty URL', () => {
    expect(validateBookingUrl('').valid).toBe(true)
  })

  it('trims whitespace around a valid https URL', () => {
    expect(validateBookingUrl('\nhttps://booking.example.com\t').valid).toBe(true)
  })

  it('rejects http URL', () => {
    const result = validateBookingUrl('http://evil.com')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('https://')
  })

  it('rejects javascript: protocol', () => {
    const result = validateBookingUrl('javascript:alert(1)')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('https://')
  })

  it('rejects malformed string', () => {
    const result = validateBookingUrl('not-a-url')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('valid URL')
  })

  it('rejects protocol-relative URL', () => {
    const result = validateBookingUrl('//evil.com')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('valid URL')
  })
})
