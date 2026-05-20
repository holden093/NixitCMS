import { useEffect, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getActiveBookingProvider } from '@/api/booking'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useBookingOverlay } from '@/hooks/useBookingOverlay'
import {
  getDefaultHomeSections,
  getDefaultSiteChromeContent,
  HOME_SECTION_FIELDS,
  resolveStructuredSections,
  SITE_CHROME_FIELDS,
} from '@/utils/publicSiteContent'
import type { BookingProvider, LocaleCode } from '@/types/api'
import RichText from '@/components/common/RichText'
import BookingWidget from './BookingWidget'

function BookingOverlayLoadingState() {
  return (
    <div className="space-y-4">
      <div className="h-3 w-24 animate-pulse bg-stone-200" />
      <div className="h-8 w-2/3 animate-pulse bg-stone-200" />
      <div className="h-[20rem] animate-pulse bg-stone-100" />
    </div>
  )
}

export default function BookingOverlay() {
  const { i18n, t } = useTranslation()
  const homeContent = useCmsContent('home')
  const siteContent = useCmsContent('site')
  const { isOpen, openBooking, closeBooking } = useBookingOverlay()
  const [bookingProvider, setBookingProvider] = useState<BookingProvider | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let mounted = true

    getActiveBookingProvider()
      .then(provider => {
        if (!mounted) {
          return
        }

        setBookingProvider(provider)
        setLoadError(false)
      })
      .catch(() => {
        if (!mounted) {
          return
        }

        setBookingProvider(null)
        setLoadError(true)
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const homeSections = useMemo(
    () => resolveStructuredSections(homeContent, locale, HOME_SECTION_FIELDS, getDefaultHomeSections(t)),
    [homeContent, locale, t],
  )
  const siteChrome = useMemo(
    () => resolveStructuredSections(siteContent, locale, SITE_CHROME_FIELDS, getDefaultSiteChromeContent(t)),
    [locale, siteContent, t],
  )
  const bookingPanelTitle = bookingProvider?.label?.trim() || siteChrome.navBook

  return (
    <Dialog.Root
      modal={false}
      open={isOpen}
      onOpenChange={nextOpen => {
        if (nextOpen) {
          openBooking()
        } else {
          closeBooking()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1400] bg-ink/70" />
        <Dialog.Content
          onOpenAutoFocus={event => event.preventDefault()}
          onCloseAutoFocus={event => event.preventDefault()}
          className="fixed left-1/2 top-1/2 z-[1410] flex max-h-[90vh] w-[min(96vw,48rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-line bg-paper outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
            <div className="min-w-0 flex-1">
              <p className="eyebrow">{homeSections.bookingLabel}</p>
              <Dialog.Title className="mt-2 text-h2 font-semibold text-ink md:text-[24px]">
                {bookingPanelTitle}
              </Dialog.Title>
              <Dialog.Description asChild>
                <RichText
                  inline
                  className="mt-2 block max-w-2xl text-[14px] leading-6 text-ink-soft"
                >
                  {homeSections.bookingIntro}
                </RichText>
              </Dialog.Description>
            </div>

            <button
              type="button"
              onClick={closeBooking}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:bg-stone-100"
              aria-label={t('booking.closeDialog')}
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8">
            {loadError ? (
              <p className="mb-5 border border-stone-300 bg-stone-100 px-4 py-3 text-small text-ink-soft">
                {t('errors.dynamicContentUnavailable')}
              </p>
            ) : null}

            {loading ? (
              <BookingOverlayLoadingState />
            ) : bookingProvider ? (
              <BookingWidget provider={bookingProvider} />
            ) : (
              <div>
                <h3 className="text-h2 font-semibold text-ink">
                  {t('home.bookingFallbackTitle')}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-ink-soft">
                  {t('home.bookingFallbackBody')}
                </p>
                <Link to="/contatti" onClick={closeBooking} className="btn-primary mt-6 inline-flex">
                  {siteChrome.navContacts}
                </Link>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
