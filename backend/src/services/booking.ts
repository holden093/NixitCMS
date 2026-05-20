import { prisma } from '../lib/prisma'
import { parseJsonObject } from '../lib/http'

export const BOOKING_PROVIDER_TYPES = ['octorate', 'gestore-alberghi'] as const

export type BookingProviderType = typeof BOOKING_PROVIDER_TYPES[number]

export function isBookingProviderType(value: unknown): value is BookingProviderType {
  return typeof value === 'string' && BOOKING_PROVIDER_TYPES.includes(value as BookingProviderType)
}

export async function ensureDefaultBookingProvider() {
  return prisma.$transaction(async tx => {
    const count = await tx.bookingProvider.count()
    if (count > 0) {
      return tx.bookingProvider.findFirst({
        orderBy: [{ isEnabled: 'desc' }, { order: 'asc' }, { createdAt: 'asc' }],
      })
    }

    const settings = await tx.siteSettings.findUnique({ where: { id: 1 } })
    if (!settings?.octorateKey) {
      return null
    }

    return tx.bookingProvider.create({
      data: {
        type: 'octorate',
        label: 'Prenota ora',
        config: JSON.stringify({ siteKey: settings.octorateKey }),
        isEnabled: true,
        order: 0,
      },
    })
  })
}

export function parseBookingConfig(config: string) {
  return parseJsonObject(config, 'config')
}
