import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, CalendarCheck } from 'lucide-react'
import PhoneActions from '@/components/layout/PhoneActions'
import { useBookingOverlay } from '@/hooks/useBookingOverlay'
import { useSettings } from '@/hooks/useSettings'
import { usePublicPages } from '@/hooks/usePublicPages'

export default function FloatingActions() {
  const { t } = useTranslation()
  const settings = useSettings()
  const publicPages = usePublicPages()
  const { openBooking } = useBookingOverlay()
  const [visible, setVisible] = useState(false)

  const phone = settings?.phone?.trim()
  const isHomeVisible = !publicPages || publicPages.some(p => p.slug === 'home')

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const hasPhone = !!phone
  const hasBooking = isHomeVisible

  if (!hasPhone && !hasBooking) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 pointer-events-none transition-all duration-500 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 px-4 pb-4">
        {hasPhone && phone && (
          <PhoneActions
            phone={phone}
            menuPosition="top-left"
            className="flex-1"
            menuClassName="w-full"
            trigger={({ toggle, open: menuOpen }) => (
              <button
                type="button"
                onClick={toggle}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label={t('floatingActions.contact')}
                className="fab-btn fab-btn-call w-full"
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t('floatingActions.contact')}</span>
              </button>
            )}
          />
        )}
        {hasBooking && (
          <button
            type="button"
            onClick={openBooking}
            className="fab-btn fab-btn-book flex-1 md:flex-initial"
            aria-label={t('floatingActions.book')}
          >
            <CalendarCheck size={16} strokeWidth={2} />
            <span>{t('floatingActions.book')}</span>
          </button>
        )}
      </div>
    </div>
  )
}
