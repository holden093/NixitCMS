import type { BookingProvider, BookingProviderInput } from '@/types/api'

export const KNOWN_TYPES = ['octorate', 'gestore-alberghi'] as const

function parseBookingConfig(config: string) {
  if (!config.trim()) {
    return {}
  }

  try {
    const parsed = JSON.parse(config)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : {}
  } catch {
    return {}
  }
}

export function normalizeBookingConfig(type: BookingProviderInput['type'], config: string) {
  const parsed = parseBookingConfig(config)

  if (type === 'octorate') {
    return JSON.stringify({
      ...parsed,
      siteKey: typeof parsed.siteKey === 'string' ? parsed.siteKey : '',
    }, null, 2)
  }

  return JSON.stringify({
    ...parsed,
    bookingUrl: typeof parsed.bookingUrl === 'string' ? parsed.bookingUrl : '',
  }, null, 2)
}

export type BookingConfigField = 'siteKey' | 'bookingUrl'

export function getBookingConfigField(config: string, field: BookingConfigField) {
  const parsed = parseBookingConfig(config)
  return typeof parsed[field] === 'string' ? parsed[field] : ''
}

export function updateBookingConfigField(
  config: string,
  type: BookingProviderInput['type'],
  field: BookingConfigField,
  value: string,
) {
  const parsed = JSON.parse(normalizeBookingConfig(type, config)) as Record<string, string>
  return JSON.stringify({ ...parsed, [field]: value }, null, 2)
}

export function createEmptyBookingForm(): BookingProviderInput {
  return {
    type: 'octorate',
    label: 'Prenota ora',
    config: normalizeBookingConfig('octorate', ''),
    isEnabled: true,
    order: 0,
  }
}

export function mapBookingProviderToForm(provider: BookingProvider): BookingProviderInput {
  return {
    type: provider.type,
    label: provider.label,
    config: normalizeBookingConfig(provider.type, provider.config),
    isEnabled: provider.isEnabled,
    order: provider.order,
  }
}
