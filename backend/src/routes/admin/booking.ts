import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import {
  asyncHandler,
  badRequest,
  parseBoolean,
  parseInteger,
  parseJsonObject,
  parsePositiveInt,
  trimString,
} from '../../lib/http'
import {
  BOOKING_PROVIDER_TYPES,
  isBookingProviderType,
} from '../../services/booking'

const router = Router()

function validateBookingProviderType(value: unknown) {
  if (!isBookingProviderType(value)) {
    badRequest(`type must be one of: ${BOOKING_PROVIDER_TYPES.join(', ')}`)
  }
  return value
}

function validateBookingProviderConfig(type: string, config: string) {
  if (type !== 'gestore-alberghi') {
    return
  }

  const parsed = JSON.parse(config)
  const url = typeof parsed.bookingUrl === 'string' ? parsed.bookingUrl.trim() : ''
  if (url) {
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      badRequest('bookingUrl must be a valid URL')
    }

    if (parsedUrl.protocol !== 'https:') {
      badRequest('bookingUrl must use https://')
    }
  }
}

function normalizeBookingPayload(body: Record<string, unknown>) {
  const type = validateBookingProviderType(body.type)
  const label = trimString(body.label, 'label', 120)
  const config = trimString(body.config, 'config', 8000)
  parseJsonObject(config, 'config')
  validateBookingProviderConfig(type, config)
  const isEnabled = parseBoolean(body.isEnabled, 'isEnabled')
  const order = parseInteger(body.order, 'order')

  return { type, label, config, isEnabled, order }
}

function normalizePartialBookingPayload(body: Record<string, unknown>) {
  const data: {
    type?: string
    label?: string
    config?: string
    isEnabled?: boolean
    order?: number
  } = {}

  if (body.type !== undefined) {
    data.type = validateBookingProviderType(body.type)
  }
  if (body.label !== undefined) {
    data.label = trimString(body.label, 'label', 120)
  }
  if (body.config !== undefined) {
    const config = trimString(body.config, 'config', 8000)
    parseJsonObject(config, 'config')
    data.config = config
  }
  if (body.isEnabled !== undefined) {
    data.isEnabled = parseBoolean(body.isEnabled, 'isEnabled')
  }
  if (body.order !== undefined) {
    data.order = parseInteger(body.order, 'order')
  }

  return data
}

async function updateProviderWithSingleActiveRule(id: number | null, data: {
  type?: string
  label?: string
  config?: string
  isEnabled?: boolean
  order?: number
}) {
  return prisma.$transaction(async tx => {
    if (data.isEnabled) {
      await tx.bookingProvider.updateMany({
        where: id ? { id: { not: id } } : undefined,
        data: { isEnabled: false },
      })
    }

    if (id) {
      const existing = await tx.bookingProvider.findUnique({
        where: { id },
        select: { type: true, config: true },
      })
      const mergedType = data.type ?? existing?.type
      const mergedConfig = data.config ?? existing?.config
      if (mergedType && mergedConfig) {
        validateBookingProviderConfig(mergedType, mergedConfig)
      }

      return tx.bookingProvider.update({
        where: { id },
        data,
      })
    }

    const createData = data as {
      type: string
      label: string
      config: string
      isEnabled: boolean
      order: number
    }

    return tx.bookingProvider.create({ data: createData })
  })
}

router.get('/booking', requireAuth, asyncHandler(async (_req, res) => {
  const providers = await prisma.bookingProvider.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  })
  res.json(providers)
}))

router.post('/booking', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const provider = await updateProviderWithSingleActiveRule(null, normalizeBookingPayload(req.body ?? {}))
  res.status(201).json(provider)
}))

router.put('/booking/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const provider = await updateProviderWithSingleActiveRule(
    parsePositiveInt(req.params.id, 'id'),
    normalizePartialBookingPayload(req.body ?? {}),
  )
  res.json(provider)
}))

router.delete('/booking/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  await prisma.bookingProvider.delete({ where: { id: parsePositiveInt(req.params.id, 'id') } })
  res.json({ ok: true })
}))

export default router
