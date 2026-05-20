import type { Content, Page, SiteSettings } from '../../generated/prisma-client-app'
import { buildAbsoluteMediaUrl } from '../lib/newsPayloads'
import {
  buildPublicShellModel,
  isManagedPublicPageSlug,
  type ManagedPublicPageSlug,
  type PublicShellCopy,
  type PublicShellModel,
  type SharedLocaleCode,
} from '../lib/publicShell'

const SITE_CHROME_KEYS = [
  'navHome',
  'navAbout',
  'navRooms',
  'navContacts',
  'navBook',
  'navTagline',
  'footerDescription',
  'footerExplore',
  'footerBooking',
  'footerCompanyData',
  'footerLegalName',
  'footerAddress',
  'footerVatNumber',
  'footerTaxCode',
  'footerPhone',
  'footerEmail',
  'footerLocationLink',
] as const

function parseSiteChromeSections(raw: string | null | undefined) {
  if (!raw || !raw.trim()) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      return {}
    }

    return SITE_CHROME_KEYS.reduce<Partial<Record<(typeof SITE_CHROME_KEYS)[number], string>>>((accumulator, key) => {
      const value = (parsed as Record<string, unknown>)[key]
      if (typeof value === 'string') {
        accumulator[key] = value
      }
      return accumulator
    }, {})
  } catch {
    return {}
  }
}

function getDefaultPublicShellCopy(locale: SharedLocaleCode): PublicShellCopy {
  if (locale === 'en') {
    return {
      navHome: 'Home',
      navAbout: 'About Us',
      navRooms: 'Rooms',
      navNews: 'News',
      navContacts: 'Contacts',
      navBook: 'Book',
      navTagline: 'Historic hotel',
      menu: 'Menu',
      footerDescription: 'A modern hospitality experience designed for comfort and simplicity in every stay.',
      footerExplore: 'Explore',
      footerBooking: 'Stay',
      footerCompanyData: 'Company details',
      footerLegalName: 'Legal name',
      footerAddress: 'Address',
      footerVatNumber: 'VAT number',
      footerTaxCode: 'Tax code',
      footerPhone: 'Phone',
      footerEmail: 'Email',
      footerLocationLink: 'How to Find Us',
    }
  }

  return {
    navHome: 'Home',
    navAbout: 'Chi Siamo',
    navRooms: 'Camere',
    navNews: 'News',
    navContacts: 'Contatti',
    navBook: 'Prenota',
    navTagline: 'Hotel',
    menu: 'Menu',
    footerDescription: 'Un\'ospitalità curata e contemporanea, pensata per offrire un soggiorno confortevole in ogni dettaglio.',
    footerExplore: 'Esplora',
    footerBooking: 'Soggiorno',
    footerCompanyData: 'Dati aziendali',
    footerLegalName: 'Ragione sociale',
    footerAddress: 'Indirizzo',
    footerVatNumber: 'Partita IVA',
    footerTaxCode: 'Codice fiscale',
    footerPhone: 'Telefono',
    footerEmail: 'Email',
    footerLocationLink: 'Come Raggiungerci',
  }
}

function resolveVisiblePageSlugs(pages: Page[]) {
  return pages
    .map(page => page.slug)
    .filter(isManagedPublicPageSlug) as ManagedPublicPageSlug[]
}

export function buildServerPublicShellModel(input: {
  locale: SharedLocaleCode
  settings: SiteSettings | null
  siteContent: Content | null
  pages: Page[]
  activeNavItemId?: ManagedPublicPageSlug
}): PublicShellModel {
  const settings = input.settings as (SiteSettings & {
    promoIsActive?: boolean
    promoText_it?: string | null
    promoText_en?: string | null
    promoLink?: string | null
  }) | null
  const localeSections = input.locale === 'en'
    ? input.siteContent?.sections_en
    : input.siteContent?.sections_it
  const shellCopy = {
    ...getDefaultPublicShellCopy(input.locale),
    ...parseSiteChromeSections(localeSections),
  }
  const hotelName = settings?.hotelName?.trim() || 'Hotel CMS'
  const visiblePageSlugs = resolveVisiblePageSlugs(input.pages)
  const localizedHomeHref = input.locale === 'en' ? '/?lang=en' : '/'

  return buildPublicShellModel({
    locale: input.locale,
    copy: shellCopy,
    site: {
      hotelName,
      logoUrl: settings?.logoKey?.trim()
        ? buildAbsoluteMediaUrl(settings.logoKey.trim(), 'logo')
        : undefined,
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
      locationHref: `${localizedHomeHref}#location`,
    },
    promo: {
      isActive: settings?.promoIsActive ?? false,
      text: input.locale === 'en'
        ? settings?.promoText_en
        : settings?.promoText_it,
      link: settings?.promoLink,
    },
    visiblePageSlugs,
    activeNavItemId: input.activeNavItemId,
  })
}
