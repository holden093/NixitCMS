import type { NextFunction, Request, RequestHandler, Response } from 'express'

export class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

export function asyncHandler(handler: AsyncHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

export function assert(condition: unknown, statusCode: number, message: string): asserts condition {
  if (!condition) {
    throw new ApiError(statusCode, message)
  }
}

export function badRequest(message: string): never {
  throw new ApiError(400, message)
}

export function unauthorized(message = 'Unauthorized'): never {
  throw new ApiError(401, message)
}

export function forbidden(message = 'Forbidden'): never {
  throw new ApiError(403, message)
}

export function notFound(message = 'Not found'): never {
  throw new ApiError(404, message)
}

export function conflict(message: string): never {
  throw new ApiError(409, message)
}

export function serviceUnavailable(message: string): never {
  throw new ApiError(503, message)
}

export function parsePositiveInt(value: string, fieldName: string): number {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed < 1) {
    badRequest(`Invalid ${fieldName}`)
  }
  return parsed
}

export function trimString(value: unknown, fieldName: string, maxLength: number, required = true): string {
  if (typeof value !== 'string') {
    if (!required && (value === undefined || value === null)) {
      return ''
    }
    badRequest(`${fieldName} must be a string`)
  }

  const trimmed = value.trim()
  if (required && !trimmed) {
    badRequest(`${fieldName} is required`)
  }
  if (trimmed.length > maxLength) {
    badRequest(`${fieldName} is too long`)
  }
  return trimmed
}

export function optionalTrimmedString(value: unknown, fieldName: string, maxLength: number): string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }
  return trimString(value, fieldName, maxLength, false)
}

export function parseBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value === 'boolean') {
    return value
  }
  badRequest(`${fieldName} must be a boolean`)
}

export function parseOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
  if (value === undefined) {
    return undefined
  }
  return parseBoolean(value, fieldName)
}

export function parseNumber(value: unknown, fieldName: string): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  badRequest(`${fieldName} must be a number`)
}

export function parseOptionalNumber(value: unknown, fieldName: string): number | undefined {
  if (value === undefined) {
    return undefined
  }
  return parseNumber(value, fieldName)
}

export function parseInteger(value: unknown, fieldName: string): number {
  const parsed = parseNumber(value, fieldName)
  if (!Number.isInteger(parsed)) {
    badRequest(`${fieldName} must be an integer`)
  }
  return parsed
}

export function parseOptionalInteger(value: unknown, fieldName: string): number | undefined {
  if (value === undefined) {
    return undefined
  }
  return parseInteger(value, fieldName)
}

export function parseJsonObject(value: unknown, fieldName: string): Record<string, unknown> {
  if (typeof value !== 'string') {
    badRequest(`${fieldName} must be a JSON string`)
  }

  try {
    const parsed = JSON.parse(value)
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      badRequest(`${fieldName} must be a JSON object`)
    }
    return parsed as Record<string, unknown>
  } catch {
    badRequest(`${fieldName} must be valid JSON`)
  }
}
