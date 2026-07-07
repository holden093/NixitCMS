import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BookingProvider } from '@/types/api'
import GestoreAlberghiWidget from './GestoreAlberghiWidget'
import OctorateWidget from './OctorateWidget'

interface Props {
  provider: BookingProvider
}

export default function BookingWidget({ provider }: Props) {
  const { t } = useTranslation()

  const config = useMemo(() => {
    try {
      const raw = JSON.parse(provider.config)
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        return raw as Record<string, unknown>
      }
      return {}
    } catch {
      return {}
    }
  }, [provider.config])

  if (provider.type === 'octorate' && typeof config.siteKey === 'string' && config.siteKey) {
    return <OctorateWidget siteKey={config.siteKey} />
  }

  if (provider.type === 'gestore-alberghi') {
    const bookingUrl = typeof config.bookingUrl === 'string' ? config.bookingUrl : ''
    return <GestoreAlberghiWidget bookingUrl={bookingUrl} />
  }

  return (
    <div className="border border-line bg-paper p-6 text-sm leading-6 text-muted">
      {t('booking.temporarilyUnavailable')}
    </div>
  )
}
