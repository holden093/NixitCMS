import { useTranslation } from 'react-i18next'
export default function GestoreAlberghiWidget({ bookingUrl }: { bookingUrl?: string }) {
  const { t } = useTranslation()

  return (
    <div
      className="border border-line bg-paper p-6"
      aria-live="polite"
      role="status"
    >
      <p className="eyebrow">
        {t('booking.checkAvailability')}
      </p>
      <p className="mt-4 text-sm leading-6 text-muted">
        {bookingUrl ? t('booking.directBookingNotice') : t('booking.temporarilyUnavailable')}
      </p>
      {bookingUrl ? (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          {t('booking.bookNow')}
        </a>
      ) : null}
    </div>
  )
}
