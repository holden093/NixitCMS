import type { NextFunction, Request, Response } from 'express'
import { config } from '../config'
import { ApiError } from '../lib/http'

function parseOrigin(value: string | undefined): string | null {
  if (!value) {
    return null
  }

  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

export function requireTrustedOrigin(req: Request, _res: Response, next: NextFunction) {
  const requestOrigin = parseOrigin(req.get('origin'))

  if (!requestOrigin || !config.trustedOrigins.includes(requestOrigin)) {
    next(new ApiError(403, 'Untrusted request origin'))
    return
  }

  next()
}
