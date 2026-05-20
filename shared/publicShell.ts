export type SharedLocaleCode = 'it' | 'en'

export const MANAGED_PUBLIC_PAGE_SLUGS = ['home', 'about', 'rooms', 'contacts', 'news'] as const
export type ManagedPublicPageSlug = typeof MANAGED_PUBLIC_PAGE_SLUGS[number]

export const PUBLIC_ROUTE_IDS = [
  ...MANAGED_PUBLIC_PAGE_SLUGS,
  'service',
  'room',
  'newsArticle',
  'notFound',
] as const

export type PublicRouteId = typeof PUBLIC_ROUTE_IDS[number]

export const PUBLIC_PAGE_FRAME_VARIANTS = ['hero', 'standard', 'detail', 'form', 'notFound'] as const
export type PublicPageFrameVariant = typeof PUBLIC_PAGE_FRAME_VARIANTS[number]

export interface PublicNavigationLink {
  id: ManagedPublicPageSlug
  href: string
  label: string
}

export interface PublicShellCopy {
  navHome: string
  navAbout: string
  navRooms: string
  navNews: string
  navContacts: string
  navBook: string
  navTagline: string
  menu: string
  footerDescription: string
  footerExplore: string
  footerBooking: string
  footerCompanyData: string
  footerLegalName: string
  footerAddress: string
  footerVatNumber: string
  footerTaxCode: string
  footerPhone: string
  footerEmail: string
  footerLocationLink: string
}

export interface PublicShellSite {
  hotelName: string
  logoUrl?: string
  logoAlt: string
  monogram: string
  legalName?: string
  address?: string
  vatNumber?: string
  taxCode?: string
  phone?: string
  email?: string
  locationHref?: string
}

export interface PublicHeaderModel {
  brandHref: string
  navItems: PublicNavigationLink[]
  showBookingAction: boolean
  menuLabel: string
  activeNavItemId?: ManagedPublicPageSlug
}

export interface PublicFooterModel {
  navItems: PublicNavigationLink[]
  description: string
  exploreLabel: string
  bookingLabel: string
  companyDataLabel: string
  legalNameLabel: string
  addressLabel: string
  vatNumberLabel: string
  taxCodeLabel: string
  phoneLabel: string
  emailLabel: string
  locationLabel: string
  locationHref?: string
}

export interface PublicPromoModel {
  isVisible: boolean
  text: string
  link?: string
}

export interface PublicShellModel {
  locale: SharedLocaleCode
  copy: PublicShellCopy
  site: PublicShellSite
  header: PublicHeaderModel
  footer: PublicFooterModel
  promo: PublicPromoModel
}

export const MANAGED_PUBLIC_PAGE_ROUTE_MAP: Record<ManagedPublicPageSlug, {
  pathname: string
  adminLabel: string
}> = {
  home: {
    pathname: '/',
    adminLabel: 'Homepage',
  },
  about: {
    pathname: '/chi-siamo',
    adminLabel: 'Chi siamo',
  },
  rooms: {
    pathname: '/camere',
    adminLabel: 'Camere',
  },
  contacts: {
    pathname: '/contatti',
    adminLabel: 'Contatti',
  },
  news: {
    pathname: '/news',
    adminLabel: 'News',
  },
}

const PUBLIC_PAGE_FRAME_VARIANT_MAP: Record<PublicRouteId, PublicPageFrameVariant> = {
  home: 'hero',
  about: 'hero',
  rooms: 'standard',
  contacts: 'form',
  news: 'standard',
  service: 'detail',
  room: 'detail',
  newsArticle: 'detail',
  notFound: 'notFound',
}

const MANAGED_PUBLIC_PAGE_ORDER = new Map(
  MANAGED_PUBLIC_PAGE_SLUGS.map((slug, index) => [slug, index]),
)

function normalizeVisiblePageSlugs(
  value?: readonly ManagedPublicPageSlug[] | null,
): readonly ManagedPublicPageSlug[] {
  return value && value.length > 0 ? value : MANAGED_PUBLIC_PAGE_SLUGS
}

export function isManagedPublicPageSlug(value: string): value is ManagedPublicPageSlug {
  return value in MANAGED_PUBLIC_PAGE_ROUTE_MAP
}

export function getPublicPagePath(slug: string) {
  return isManagedPublicPageSlug(slug)
    ? MANAGED_PUBLIC_PAGE_ROUTE_MAP[slug].pathname
    : `/${slug}`
}

export function getLocalizedPublicPagePath(slug: ManagedPublicPageSlug, locale: SharedLocaleCode) {
  const pathname = getPublicPagePath(slug)
  return locale === 'en' ? `${pathname}?lang=en` : pathname
}

export function getPublicPageFrameVariant(routeId: PublicRouteId) {
  return PUBLIC_PAGE_FRAME_VARIANT_MAP[routeId]
}

export function sortManagedPublicPages<T extends Pick<{ slug: string }, 'slug'>>(pages: T[]) {
  return [...pages].sort((left, right) => {
    const leftOrder = MANAGED_PUBLIC_PAGE_ORDER.get(left.slug as ManagedPublicPageSlug) ?? Number.MAX_SAFE_INTEGER
    const rightOrder = MANAGED_PUBLIC_PAGE_ORDER.get(right.slug as ManagedPublicPageSlug) ?? Number.MAX_SAFE_INTEGER
    return leftOrder - rightOrder
  })
}

export function buildMonogram(hotelName: string) {
  return hotelName
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export function buildPublicNavigationItems(input: {
  locale: SharedLocaleCode
  copy: PublicShellCopy
  visiblePageSlugs?: readonly ManagedPublicPageSlug[] | null
}) {
  const visiblePageSlugs = new Set(normalizeVisiblePageSlugs(input.visiblePageSlugs))

  return MANAGED_PUBLIC_PAGE_SLUGS
    .filter(slug => visiblePageSlugs.has(slug))
    .map<PublicNavigationLink>(slug => ({
      id: slug,
      href: getLocalizedPublicPagePath(slug, input.locale),
      label: ({
        home: input.copy.navHome,
        about: input.copy.navAbout,
        rooms: input.copy.navRooms,
        news: input.copy.navNews,
        contacts: input.copy.navContacts,
      })[slug],
    }))
}

export function buildPublicShellModel(input: {
  locale: SharedLocaleCode
  copy: PublicShellCopy
  site: Omit<PublicShellSite, 'monogram'> & { monogram?: string }
  visiblePageSlugs?: readonly ManagedPublicPageSlug[] | null
  promo?: {
    isActive?: boolean
    text?: string | null
    link?: string | null
  }
  showBookingAction?: boolean
  brandRouteId?: ManagedPublicPageSlug
  activeNavItemId?: ManagedPublicPageSlug
}) {
  const navItems = buildPublicNavigationItems({
    locale: input.locale,
    copy: input.copy,
    visiblePageSlugs: input.visiblePageSlugs,
  })
  const brandRouteId = input.brandRouteId ?? 'home'
  const showBookingAction = input.showBookingAction ?? navItems.some(link => link.id === 'home')
  const promoText = input.promo?.text?.trim() ?? ''
  const promoLink = input.promo?.link?.trim() || undefined
  const promo = {
    isVisible: Boolean(input.promo?.isActive && promoText),
    text: promoText,
    link: promoLink,
  } satisfies PublicPromoModel

  return {
    locale: input.locale,
    copy: input.copy,
    site: {
      ...input.site,
      monogram: input.site.monogram?.trim() || buildMonogram(input.site.hotelName),
    },
    header: {
      brandHref: getLocalizedPublicPagePath(brandRouteId, input.locale),
      navItems,
      showBookingAction,
      menuLabel: input.copy.menu,
      activeNavItemId: input.activeNavItemId,
    },
    footer: {
      navItems,
      description: input.copy.footerDescription,
      exploreLabel: input.copy.footerExplore,
      bookingLabel: input.copy.footerBooking,
      companyDataLabel: input.copy.footerCompanyData,
      legalNameLabel: input.copy.footerLegalName,
      addressLabel: input.copy.footerAddress,
      vatNumberLabel: input.copy.footerVatNumber,
      taxCodeLabel: input.copy.footerTaxCode,
      phoneLabel: input.copy.footerPhone,
      emailLabel: input.copy.footerEmail,
      locationLabel: input.copy.footerLocationLink,
      locationHref: input.site.locationHref,
    },
    promo,
  } satisfies PublicShellModel
}
