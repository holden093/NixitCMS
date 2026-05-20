import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { subscribeNewsletter } from '@/api/newsletter'
import type { LocaleCode } from '@/types/api'
import { extractErrorMessage } from '@/utils/errors'

interface NewsletterSignupCardProps {
  locale: LocaleCode
  compact?: boolean
  initialMessage?: string
  surface?: 'card' | 'plain'
}

export function NewsletterSignupCard({
  locale,
  compact = false,
  initialMessage = '',
  surface = 'card',
}: NewsletterSignupCardProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    setMessage(initialMessage)
  }, [initialMessage])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('sending')
    setMessage('')

    try {
      await subscribeNewsletter({
        email,
        locale,
        consent,
        website,
      })
      setEmail('')
      setConsent(false)
      setWebsite('')
      setStatus('ok')
      setMessage(t('news.formPending'))
    } catch (error) {
      setStatus('error')
      setMessage(extractErrorMessage(error, t('news.formError')))
    }
  }

  return (
    <div className={surface === 'card' ? 'border border-line bg-stone-50 p-6 md:p-8' : ''}>
      <p className="eyebrow">{t('news.newsletterLabel')}</p>
      <h3 className="mt-3 text-h2 font-semibold text-ink md:text-[28px]">
        {compact ? t('news.newsletterCompactTitle') : t('news.newsletterTitle')}
      </h3>
      <p className="mt-3 max-w-xl text-[14px] leading-6 text-ink-soft">
        {compact ? t('news.newsletterCompactBody') : t('news.newsletterBody')}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor={`newsletter-email-${compact ? 'compact' : 'full'}`} className="eyebrow mb-2 block">
            {t('news.emailLabel')}
          </label>
          <input
            id={`newsletter-email-${compact ? 'compact' : 'full'}`}
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="field-shell"
          />
        </div>

        <label className="flex items-start gap-3 text-[13px] leading-6 text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={event => setConsent(event.target.checked)}
            required
            className="mt-1 h-4 w-4 rounded border border-stone-300"
          />
          <span>{t('news.consentLabel')}</span>
        </label>

        <input
          type="text"
          value={website}
          onChange={event => setWebsite(event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={status === 'sending'} className="btn-primary">
            {status === 'sending' ? t('news.formSending') : t('news.subscribe')}
          </button>
          {message ? (
            <p className="text-small text-ink-soft" aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}
