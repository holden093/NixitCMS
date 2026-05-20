import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

function createBaseDate() {
  const nextDate = new Date()
  nextDate.setHours(12, 0, 0, 0)
  return nextDate
}

function addDays(date: Date, amount: number) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + amount)
  return nextDate
}

function formatDateForInput(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDateForOctorate(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export default function OctorateWidget({ siteKey }: { siteKey: string }) {
  const { i18n, t } = useTranslation()
  const today = useMemo(() => createBaseDate(), [])
  const minCheckIn = useMemo(() => formatDateForInput(today), [today])
  const [checkIn, setCheckIn] = useState(() => formatDateForInput(today))
  const [checkOut, setCheckOut] = useState(() => formatDateForInput(addDays(today, 1)))
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [error, setError] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  const minCheckOut = useMemo(() => {
    if (!checkIn) {
      return formatDateForInput(addDays(today, 1))
    }

    const checkInDate = new Date(`${checkIn}T12:00:00`)
    return formatDateForInput(addDays(checkInDate, 1))
  }, [checkIn, today])

  useEffect(() => {
    if (!checkOut || checkOut < minCheckOut) {
      setCheckOut(minCheckOut)
    }
  }, [checkOut, minCheckOut])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!siteKey.trim() || !checkIn || !checkOut) {
      setError(t('booking.formIncomplete'))
      return
    }

    const checkInDate = new Date(`${checkIn}T12:00:00`)
    const checkOutDate = new Date(`${checkOut}T12:00:00`)

    if (!(checkOutDate > checkInDate)) {
      setError(t('booking.invalidDateRange'))
      return
    }

    const totalGuests = Number(adults) + Number(children)
    if (!Number.isFinite(totalGuests) || totalGuests < 1) {
      setError(t('booking.formIncomplete'))
      return
    }

    setRedirecting(true)

    const bookingUrl = new URL('https://book.octorate.com/octobook/site/reservation/result.xhtml')
    bookingUrl.searchParams.set('siteKey', siteKey)
    bookingUrl.searchParams.set('lang', i18n.language === 'en' ? 'en' : 'it')
    bookingUrl.searchParams.set('ota', 'false')
    bookingUrl.searchParams.set('checkin', formatDateForOctorate(checkIn))
    bookingUrl.searchParams.set('checkout', formatDateForOctorate(checkOut))
    bookingUrl.searchParams.set('pax', String(totalGuests))

    window.location.assign(bookingUrl.toString())
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow mb-2 block">
              {t('booking.checkIn')}
            </span>
            <input
              type="date"
              value={checkIn}
              min={minCheckIn}
              onChange={event => setCheckIn(event.target.value)}
              className="field-shell"
              required
            />
          </label>

          <label className="block">
            <span className="eyebrow mb-2 block">
              {t('booking.checkOut')}
            </span>
            <input
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={event => setCheckOut(event.target.value)}
              className="field-shell"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow mb-2 block">
              {t('booking.adults')}
            </span>
            <select value={adults} onChange={event => setAdults(event.target.value)} className="field-shell">
              {Array.from({ length: 6 }, (_, index) => String(index + 1)).map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="eyebrow mb-2 block">
              {t('booking.children')}
            </span>
            <select value={children} onChange={event => setChildren(event.target.value)} className="field-shell">
              {Array.from({ length: 5 }, (_, index) => String(index)).map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-small leading-6 text-muted">
          {t('booking.directBookingNotice')}
        </p>

        {error ? (
          <p className="border border-stone-300 bg-stone-100 px-4 py-3 text-small text-ink-soft">
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn-primary" disabled={redirecting}>
          {redirecting ? t('booking.checking') : t('booking.checkAvailability')}
        </button>
      </form>
    </div>
  )
}
