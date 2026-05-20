import { Ruler, UserRound } from 'lucide-react'
import type { LocaleCode } from '@/types/api'

interface RoomMetaProps {
  occupancy: number
  sizeSqm: number
  price: number | null
  locale: LocaleCode
  className?: string
}

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

function getGuestLabel(locale: LocaleCode, value: number) {
  if (locale === 'en') {
    return value === 1 ? 'guest' : 'guests'
  }

  return value === 1 ? 'ospite' : 'ospiti'
}

function formatRoomPrice(locale: LocaleCode, value: number) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function RoomMeta({
  occupancy,
  sizeSqm,
  price,
  locale,
  className,
}: RoomMetaProps) {
  return (
    <div className={joinClasses('flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-soft', className)}>
      <span className="inline-flex items-center gap-1.5">
        <UserRound size={14} strokeWidth={1.75} className="text-ink" aria-hidden="true" />
        <span>{occupancy} {getGuestLabel(locale, occupancy)}</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Ruler size={14} strokeWidth={1.75} className="text-ink" aria-hidden="true" />
        <span>{sizeSqm} m²</span>
      </span>
      {price != null ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="font-medium text-ink">{formatRoomPrice(locale, price)}</span>
          <span>{locale === 'en' ? '/ night' : '/ notte'}</span>
        </span>
      ) : null}
    </div>
  )
}
