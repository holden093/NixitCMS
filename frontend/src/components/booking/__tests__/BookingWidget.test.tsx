import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import BookingWidget from '../BookingWidget'
import type { BookingProvider } from '@/types/api'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'it' },
  }),
}))

function createProvider(overrides: Partial<BookingProvider>): BookingProvider {
  return {
    id: 1,
    type: 'octorate',
    label: 'Provider',
    config: '{}',
    isEnabled: true,
    order: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('BookingWidget', () => {
  it.each([
    ['null config', 'null'],
    ['array config', '[]'],
    ['number config', '42'],
    ['string config', '"hello"'],
    ['malformed config', ''],
  ])('does not crash and falls back for %s', (_label, config) => {
    render(<BookingWidget provider={createProvider({ type: 'octorate', config })} />)

    expect(screen.getByText('booking.temporarilyUnavailable')).toBeInTheDocument()
  })

  it('renders the Octorate widget for a valid octorate siteKey config', () => {
    render(
      <BookingWidget
        provider={createProvider({
          type: 'octorate',
          config: JSON.stringify({ siteKey: 'octo-site' }),
        })}
      />,
    )

    expect(screen.getByText('booking.checkIn')).toBeInTheDocument()
    expect(screen.getByText('booking.checkOut')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'booking.checkAvailability' })).toBeInTheDocument()
  })

  it('renders the Gestore Alberghi widget for a valid https bookingUrl config', () => {
    render(
      <BookingWidget
        provider={createProvider({
          type: 'gestore-alberghi',
          config: JSON.stringify({ bookingUrl: 'https://booking.example.com/reserve' }),
        })}
      />,
    )

    const link = screen.getByRole('link', { name: 'booking.bookNow' })
    expect(link).toHaveAttribute('href', 'https://booking.example.com/reserve')
    expect(screen.getByText('booking.directBookingNotice')).toBeInTheDocument()
  })
})
