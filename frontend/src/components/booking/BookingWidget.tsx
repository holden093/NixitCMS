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
      return JSON.parse(provider.config) as Record<string, string>
    } catch {
      return {}
    }
  }, [provider.config])

  if (provider.type === 'octorate' && config.siteKey) {
    return <OctorateWidget siteKey={config.siteKey} />
  }

  if (provider.type === 'gestore-alberghi') {
    return <GestoreAlberghiWidget bookingUrl={config.bookingUrl} />
  }

  return (
    <div className="border border-line bg-paper p-6 text-sm leading-6 text-muted">
      {t('booking.temporarilyUnavailable')}
    </div>
  )
}
