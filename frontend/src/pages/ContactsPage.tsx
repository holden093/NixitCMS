import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendContact } from '@/api/contact'
import { PublicPageFrame } from '@/components/layout/PublicPageFrame'
import RichText from '@/components/common/RichText'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePageGuard } from '@/hooks/usePageGuard'
import { getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import { extractErrorMessage } from '@/utils/errors'
import {
  CONTACTS_SECTION_FIELDS,
  getDefaultContactsSections,
  resolveStructuredSections,
} from '@/utils/publicSiteContent'
import type { ContactFormData, LocaleCode } from '@/types/api'
import NotFoundPage from './NotFoundPage'

export default function ContactsPage() {
  const { t, i18n } = useTranslation()
  const isPageVisible = usePageGuard('contacts')
  const content = useCmsContent('contacts')
  const settings = useSettings()

  const [form, setForm] = useState<ContactFormData>({ name: '', surname: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const successTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const title = (content ? (locale === 'en' ? content.title_en : content.title_it) : '').trim() || t('contacts.title')
  const contactsCopy = resolveStructuredSections(
    content,
    locale,
    CONTACTS_SECTION_FIELDS,
    getDefaultContactsSections(t),
  )
  const documentTitle = settings?.hotelName
    ? `${t('nav.contacts')} | ${settings.hotelName}`
    : t('nav.contacts')

  useDocumentTitle(documentTitle)

  useEffect(() => (
    () => {
      if (successTimerRef.current !== null) {
        window.clearTimeout(successTimerRef.current)
      }
    }
  ), [])

  useEffect(() => {
    if (status !== 'ok') {
      return
    }

    if (successTimerRef.current !== null) {
      window.clearTimeout(successTimerRef.current)
    }

    successTimerRef.current = window.setTimeout(() => {
      setStatus('idle')
      successTimerRef.current = null
    }, 5000)

    return () => {
      if (successTimerRef.current !== null) {
        window.clearTimeout(successTimerRef.current)
      }
    }
  }, [status])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setEmailError('')
    setSubmitError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setEmailError(contactsCopy.invalidEmail)
      return
    }

    setStatus('sending')

    try {
      await sendContact(form)
      setStatus('ok')
      setForm({ name: '', surname: '', email: '', message: '', website: '' })
    } catch (error) {
      setSubmitError(extractErrorMessage(error, contactsCopy.errorMessage))
      setStatus('error')
    }
  }

  if (isPageVisible === false) {
    return <NotFoundPage />
  }

  if (isPageVisible === null) {
    return (
      <div className="page-grid pb-16 pt-28">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="h-10 w-1/2 bg-stone-200" />
          <div className="mt-8 h-32 bg-stone-100" />
        </div>
      </div>
    )
  }

  const labelClass = 'eyebrow mb-2 block'

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('contacts')}>
      <div className="page-grid">
      <div className="mx-auto max-w-2xl">
        <h1 className="display-title">{title}</h1>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                {contactsCopy.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="given-name"
                required
                value={form.name}
                onChange={event => setForm(value => ({ ...value, name: event.target.value }))}
                className="field-shell"
              />
            </div>

            <div>
              <label htmlFor="contact-surname" className={labelClass}>
                {contactsCopy.surnameLabel}
              </label>
              <input
                id="contact-surname"
                type="text"
                autoComplete="family-name"
                required
                value={form.surname}
                onChange={event => setForm(value => ({ ...value, surname: event.target.value }))}
                className="field-shell"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {contactsCopy.emailLabel}
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={event => setForm(value => ({ ...value, email: event.target.value }))}
              className="field-shell"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? 'contact-email-error' : undefined}
            />
            {emailError ? (
              <p id="contact-email-error" className="mt-2 text-small text-ink-soft">
                {emailError}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              {contactsCopy.messageLabel}
            </label>
            <textarea
              id="contact-message"
              required
              rows={6}
              value={form.message}
              onChange={event => setForm(value => ({ ...value, message: event.target.value }))}
              className="field-shell resize-y"
            />
          </div>

          <input
            type="text"
            value={form.website ?? ''}
            onChange={event => setForm(value => ({ ...value, website: event.target.value }))}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={status === 'sending'} className="btn-primary">
              {status === 'sending' ? (
                <svg
                  className="h-3.5 w-3.5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : null}
              {status === 'sending' ? t('contacts.sending') : contactsCopy.sendLabel}
            </button>

            {(submitError || status === 'ok' || (status === 'error' && !submitError)) ? (
              <div aria-live="polite" role="status" className="text-small">
                {status === 'ok' ? <p className="text-ink-soft">{contactsCopy.successMessage}</p> : null}
                {submitError ? <p className="text-ink-soft">{submitError}</p> : null}
                {status === 'error' && !submitError ? (
                  <p className="text-ink-soft">{contactsCopy.errorMessage}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </form>

        <RichText className="mt-10 border-t border-line pt-6 text-small leading-5 text-muted [&_p+p]:mt-2 [&_strong]:font-semibold [&_strong]:text-ink">
          {contactsCopy.privacyNote}
        </RichText>
      </div>
      </div>
    </PublicPageFrame>
  )
}
