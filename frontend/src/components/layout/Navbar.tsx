import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Phone, X } from 'lucide-react'
import PhoneActions from '@/components/layout/PhoneActions'
import PromoBanner from '@/components/layout/PromoBanner'
import { changeLanguageFromUserPreference } from '@/i18n'
import { useBookingOverlay } from '@/hooks/useBookingOverlay'
import { usePublicShellModel } from '@/hooks/usePublicShellModel'
import type { LocaleCode } from '@/types/api'

type LanguageToggleProps = {
  targetLocale: LocaleCode
  ariaLabel: string
  onClick: () => void
  solidHeader?: boolean
  mobile?: boolean
}

function LanguageFlagIcon({ locale }: { locale: LocaleCode }) {
  if (locale === 'it') {
    return (
      <svg viewBox="0 0 18 14" className="h-[14px] w-[18px] overflow-hidden rounded-[1px]" aria-hidden="true">
        <rect width="6" height="14" fill="#009246" />
        <rect x="6" width="6" height="14" fill="#F1F2F1" />
        <rect x="12" width="6" height="14" fill="#CE2B37" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 18 14" className="h-[14px] w-[18px] overflow-hidden rounded-[1px]" aria-hidden="true">
      <rect width="18" height="14" fill="#012169" />
      <path d="M0 0l18 14M18 0L0 14" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M0 0l18 14M18 0L0 14" stroke="#C8102E" strokeWidth="2" />
      <path d="M9 0v14M0 7h18" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M9 0v14M0 7h18" stroke="#C8102E" strokeWidth="3" />
    </svg>
  )
}

function LanguageToggle({
  targetLocale,
  ariaLabel,
  onClick,
  solidHeader = true,
  mobile = false,
}: LanguageToggleProps) {
  const toneClass = mobile
    ? 'border-line bg-stone-50 text-ink hover:bg-stone-100 focus-visible:ring-accent focus-visible:ring-offset-paper'
    : solidHeader
      ? 'border-line bg-paper text-ink hover:bg-stone-100 focus-visible:ring-accent focus-visible:ring-offset-paper'
      : 'border-paper/20 bg-paper/10 text-paper hover:bg-paper/20 focus-visible:ring-paper focus-visible:ring-offset-ink'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex h-9 min-w-[4.5rem] items-center justify-center gap-2 rounded-[2px] border px-3 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${toneClass}`}
    >
      <LanguageFlagIcon locale={targetLocale} />
      <span>{targetLocale.toUpperCase()}</span>
    </button>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const shell = usePublicShellModel()
  const location = useLocation()
  const { openBooking } = useBookingOverlay()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const homePath = '/'
  const aboutPath = '/chi-siamo'
  const hasImmersiveHero = location.pathname === homePath || location.pathname === aboutPath
  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const links = useMemo(
    () => shell.header.navItems.map(link => ({ slug: link.id, to: link.href, label: link.label })),
    [shell.header.navItems],
  )

  const brandHref = shell.header.brandHref
  const solidHeader = !hasImmersiveHero || scrolled || open
  const phone = shell.site.phone
  const hasPromoBanner = shell.promo.isVisible
  const targetLocale: LocaleCode = locale === 'it' ? 'en' : 'it'
  const switchLanguageAriaLabel = targetLocale === 'en'
    ? t('nav.switchToEnglish')
    : t('nav.switchToItalian')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    void changeLanguageFromUserPreference(targetLocale)
  }

  return (
    <>
      <PromoBanner promo={shell.promo} />
      <nav
        className={`fixed inset-x-0 z-50 transition-[top,color,background-color,border-color] duration-200 ${
          hasPromoBanner ? 'top-8' : 'top-0'
        } ${
          solidHeader
            ? 'border-b border-line bg-paper text-ink'
            : 'border-b border-transparent bg-transparent text-paper'
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-ink"
        >
          {t('accessibility.skipToContent')}
        </a>

        <div className="page-grid flex h-16 items-center justify-between gap-6 md:h-20">
          <Link to={brandHref} className="flex min-w-0 items-center gap-3">
            {shell.site.logoUrl ? (
              <img src={shell.site.logoUrl} alt={shell.site.logoAlt} className="h-9 w-auto object-contain" />
            ) : (
              <span
                className={`font-serif text-[22px] font-medium leading-none ${
                  solidHeader ? 'text-ink' : 'text-paper'
                }`}
              >
                {shell.site.monogram}
              </span>
            )}
            <div className="min-w-0 hidden sm:block">
              <p
                className={`truncate font-serif text-[20px] font-medium leading-none md:text-[22px] ${
                  solidHeader ? 'text-ink' : 'text-paper'
                }`}
              >
                {shell.site.hotelName}
              </p>
              <p
                className={`mt-1 truncate text-[10px] font-medium uppercase tracking-[0.08em] ${
                  solidHeader ? 'text-muted' : 'text-paper/70'
                }`}
              >
                {shell.copy.navTagline}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[13px] font-medium transition-colors ${
                    solidHeader
                      ? isActive
                        ? 'text-ink'
                        : 'text-muted hover:text-ink'
                      : isActive
                        ? 'text-paper'
                        : 'text-paper/70 hover:text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {phone ? (
              <PhoneActions
                phone={phone}
                trigger={({ toggle, open: menuOpen }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-label={t('floatingActions.contact')}
                    className={`inline-flex items-center gap-2 text-[13px] font-medium transition-colors ${
                      solidHeader ? 'text-ink hover:text-accent' : 'text-paper hover:text-paper/80'
                    }`}
                  >
                    <Phone size={14} strokeWidth={2} />
                    <span>{phone}</span>
                  </button>
                )}
              />
            ) : null}

            {shell.header.showBookingAction ? (
              <button
                type="button"
                onClick={openBooking}
                className={`inline-flex h-9 items-center px-4 text-[13px] font-medium transition-colors ${
                  solidHeader
                    ? 'bg-ink text-paper hover:bg-ink-soft'
                    : 'bg-paper text-ink hover:bg-stone-100'
                }`}
              >
                {shell.copy.navBook}
              </button>
            ) : null}

            <LanguageToggle
              targetLocale={targetLocale}
              ariaLabel={switchLanguageAriaLabel}
              onClick={toggleLang}
              solidHeader={solidHeader}
            />
          </div>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center md:hidden ${
              solidHeader ? 'text-ink' : 'text-paper'
            }`}
            onClick={() => setOpen(value => !value)}
            aria-expanded={open}
            aria-label={t('nav.menu')}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-line bg-paper md:hidden">
            <div className="page-grid py-4">
              <div className="flex justify-end pb-4">
                <LanguageToggle
                  targetLocale={targetLocale}
                  ariaLabel={switchLanguageAriaLabel}
                  onClick={() => {
                    setOpen(false)
                    toggleLang()
                  }}
                  mobile
                />
              </div>

              <div className="flex flex-col">
                {links.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-line py-3 text-[14px] font-medium transition-colors ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  )
}
