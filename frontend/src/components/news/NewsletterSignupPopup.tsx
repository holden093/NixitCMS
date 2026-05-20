import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Mail, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LocaleCode } from '@/types/api'
import { NewsletterSignupCard } from './NewsletterSignupCard'

const POPUP_DISMISSED_SESSION_KEY = 'news-newsletter-popup-dismissed'

interface NewsletterSignupPopupProps {
  locale: LocaleCode
  initialMessage?: string
  showInlineLauncher?: boolean
}

function readSessionFlag(key: string) {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return window.sessionStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

function writeSessionFlag(key: string) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.sessionStorage.setItem(key, '1')
  } catch {
    // Ignore storage failures so the popup still works in restrictive browsers.
  }
}

export function NewsletterSignupPopup({
  locale,
  initialMessage = '',
  showInlineLauncher = false,
}: NewsletterSignupPopupProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const autoOpenTimerRef = useRef<number | null>(null)
  const hasInitialMessage = initialMessage.trim().length > 0

  const clearAutoOpenTimer = () => {
    if (autoOpenTimerRef.current === null || typeof window === 'undefined') {
      return
    }

    window.clearTimeout(autoOpenTimerRef.current)
    autoOpenTimerRef.current = null
  }

  const openPopup = () => {
    clearAutoOpenTimer()
    setOpen(true)
  }

  useEffect(() => clearAutoOpenTimer, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    clearAutoOpenTimer()

    const isDismissed = readSessionFlag(POPUP_DISMISSED_SESSION_KEY)
    setDismissed(isDismissed)

    if (hasInitialMessage) {
      setOpen(true)
      return
    }

    if (isDismissed) {
      return
    }

    autoOpenTimerRef.current = window.setTimeout(() => {
      setOpen(true)
      autoOpenTimerRef.current = null
    }, 1000)

    return clearAutoOpenTimer
  }, [hasInitialMessage])

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      openPopup()
      return
    }

    if (open) {
      writeSessionFlag(POPUP_DISMISSED_SESSION_KEY)
      setDismissed(true)
    }

    setOpen(false)
  }

  return (
    <>
      {showInlineLauncher ? (
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <button
            type="button"
            onClick={openPopup}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="btn-secondary"
          >
            <Mail size={15} strokeWidth={1.85} />
            <span>{t('news.openPopup')}</span>
          </button>
          <p className="max-w-[18rem] text-[12px] leading-5 text-ink-soft">
            {t('news.popupHint')}
          </p>
        </div>
      ) : null}

      {dismissed && !showInlineLauncher ? (
        <button
          type="button"
          onClick={openPopup}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`fixed bottom-[5.5rem] left-4 right-4 z-[55] inline-flex items-center justify-center gap-2 border border-stone-300 bg-paper px-4 py-3 text-[13px] font-medium text-ink shadow-[0_16px_44px_rgba(20,16,14,0.22)] transition-all duration-200 hover:border-ink hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 md:bottom-6 md:left-auto md:right-6 md:w-auto md:max-w-[22rem] ${
            open ? 'pointer-events-none translate-y-2 opacity-0' : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
        >
          <Mail size={15} strokeWidth={1.85} />
          <span>{t('news.openPopup')}</span>
        </button>
      ) : null}

      <Dialog.Root modal={false} open={open} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Content
            onOpenAutoFocus={event => event.preventDefault()}
            onCloseAutoFocus={event => event.preventDefault()}
            className="fixed bottom-[5.5rem] left-4 right-4 z-[60] flex max-h-[calc(100vh-7.5rem)] w-auto flex-col overflow-hidden border border-line bg-paper shadow-[0_18px_60px_rgba(20,16,14,0.18)] outline-none md:bottom-6 md:left-auto md:right-6 md:max-h-[min(85vh,42rem)] md:w-[min(26rem,calc(100vw-3rem))]"
          >
            <Dialog.Title className="sr-only">{t('news.newsletterCompactTitle')}</Dialog.Title>
            <Dialog.Description className="sr-only">{t('news.newsletterCompactBody')}</Dialog.Description>

            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
              <p className="max-w-[18rem] text-[12px] leading-5 text-ink-soft">
                {t('news.popupHint')}
              </p>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2"
                  aria-label={t('news.closePopup')}
                >
                  <X size={16} strokeWidth={1.75} />
                </button>
              </Dialog.Close>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6">
              <NewsletterSignupCard
                locale={locale}
                compact
                initialMessage={initialMessage}
                surface="plain"
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
