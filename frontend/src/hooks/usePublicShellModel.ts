import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getMediaUrl } from '@/api/media'
import { useCmsContent } from '@/hooks/useCmsContent'
import { usePublicPages } from '@/hooks/usePublicPages'
import { useSettings } from '@/hooks/useSettings'
import {
  buildPublicShellModel,
  isManagedPublicPageSlug,
  type ManagedPublicPageSlug,
  type PublicShellCopy,
} from '@/lib/public/shell'
import {
  getDefaultSiteChromeContent,
  resolveStructuredSections,
  SITE_CHROME_FIELDS,
} from '@/utils/publicSiteContent'
import type { LocaleCode } from '@/types/api'

export function usePublicShellModel() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const siteContent = useCmsContent('site')
  const publicPages = usePublicPages()
  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const siteCopy = resolveStructuredSections(
    siteContent,
    locale,
    SITE_CHROME_FIELDS,
    getDefaultSiteChromeContent(t),
  )

  return useMemo(() => {
    const visiblePageSlugs = publicPages
      ? publicPages
        .map(page => page.slug)
        .filter(isManagedPublicPageSlug) as ManagedPublicPageSlug[]
      : null
    const hotelName = settings?.hotelName?.trim() || 'Hotel CMS'
    const shellCopy: PublicShellCopy = {
      ...siteCopy,
      navRooms: siteCopy.navRooms,
      navNews: t('nav.news'),
      menu: t('nav.menu'),
    }

    return buildPublicShellModel({
      locale,
      copy: shellCopy,
      site: {
        hotelName,
        logoUrl: getMediaUrl(settings?.logoKey, 'logo') || undefined,
        logoAlt: `${hotelName} logo`,
        legalName: settings?.legalName?.trim() || hotelName,
        address: [
          settings?.registeredAddress?.trim(),
          [settings?.postalCode?.trim(), settings?.city?.trim()].filter(Boolean).join(' '),
          settings?.region?.trim(),
          settings?.country?.trim(),
        ].filter(Boolean).join(', '),
        vatNumber: settings?.vatNumber?.trim() || undefined,
        taxCode: settings?.taxCode?.trim() || undefined,
        phone: settings?.phone?.trim() || undefined,
        email: settings?.email?.trim() || undefined,
        locationHref: locale === 'en' ? '/?lang=en#location' : '/#location',
      },
      promo: {
        isActive: settings?.promoIsActive ?? false,
        text: locale === 'en' ? settings?.promoText_en : settings?.promoText_it,
        link: settings?.promoLink,
      },
      visiblePageSlugs,
    })
  }, [locale, publicPages, settings, siteCopy, t])
}
