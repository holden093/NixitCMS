export type LocaleCode = 'it' | 'en'
export type PublicSiteSlug =
  | 'home'
  | 'about'
  | 'rooms'
  | 'contacts'
  | 'news'
  | 'site'
  | 'service-template'
  | 'not-found'

export interface SiteSettings {
  id: number
  hotelName: string
  logoKey: string
  heroImageKey: string
  legalName: string
  registeredAddress: string
  city: string
  region: string
  postalCode: string
  country: string
  vatNumber: string
  taxCode: string
  phone: string
  email: string
  mapLat: number
  mapLng: number
  mapZoom: number
  defaultLocale: string
  octorateKey: string
  promoIsActive: boolean
  promoText_it: string | null
  promoText_en: string | null
  promoLink: string | null
}

export interface Page {
  id?: number
  slug: string
  isVisible: boolean
  updatedAt?: string
}

export interface Content {
  id: number
  pageSlug: string
  title_it: string
  title_en: string
  subtitle_it: string
  subtitle_en: string
  body_it: string
  body_en: string
  sections_it: string
  sections_en: string
  updatedAt: string
}

export interface HomeSectionContent {
  eyebrow: string
  primaryCta: string
  secondaryCta: string
  bookingLabel: string
  bookingIntro: string
  roomsLabel: string
  roomsTitle: string
  roomsIntro: string
  roomsCta: string
  servicesLabel: string
  servicesTitle: string
  servicesIntro: string
  mapLabel: string
  mapTitle: string
  mapIntro: string
  mapCta: string
  tourismCta: string
  tourismLabel: string
  tourismTitle: string
  tourismIntro: string
}

export interface SiteChromeContent {
  navHome: string
  navAbout: string
  navRooms: string
  navContacts: string
  navBook: string
  navTagline: string
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

export interface AboutSectionContent {
  label: string
  imageKey: string
  quoteLabel: string
  quoteBody: string
}

export interface ContactsSectionContent {
  privacyNote: string
  nameLabel: string
  surnameLabel: string
  emailLabel: string
  messageLabel: string
  sendLabel: string
  successMessage: string
  errorMessage: string
  invalidEmail: string
}

export interface ServiceTemplateContent {
  readMore: string
}

export interface NotFoundSectionContent {
  label: string
  home: string
  contacts: string
}

export interface PointOfInterest {
  id: number
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  lat: number
  lng: number
  category: string
  createdAt?: string
}

export interface PhotoCategory {
  id: number
  slug: string
  name_it: string
  name_en: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface PhotoCategoryWithCount extends PhotoCategory {
  _count: { media: number }
}

export type MediaVariantPreset = 'thumb' | 'logo' | 'card' | 'content' | 'hero' | 'gallery'

export interface MediaFile {
  id: number
  key: string
  thumbnailKey: string | null
  label: string
  mimeType: string
  size: number
  isPublic: boolean
  uploadedAt: string
  categories?: { photoCategory: PhotoCategory }[]
  usage?: MediaFileUsage
}

export interface MediaFileUsage {
  isLogo: boolean
  isHeroImage: boolean
}

export interface Service {
  id: number
  slug: string
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  isPublic: boolean
  sortOrder: number
  photoCategoryId: number | null
  photoCategory?: (PhotoCategory & { media?: MediaFile[] }) | null
  previewMediaId: number | null
  galleryPreview: MediaFile | null
  galleryCount: number
  createdAt: string
  updatedAt: string
}

export interface RoomCategory {
  id: number
  slug: string
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  occupancy: number
  sizeSqm: number
  price: number | null
  isPublic: boolean
  sortOrder: number
  photoCategoryId: number | null
  photoCategory?: (PhotoCategory & { media?: MediaFile[] }) | null
  previewMediaId: number | null
  galleryPreview: MediaFile | null
  galleryCount: number
  createdAt: string
  updatedAt: string
}

export type BookingProviderType = 'octorate' | 'gestore-alberghi'

export interface BookingProvider {
  id: number
  type: BookingProviderType
  label: string
  config: string
  isEnabled: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface BookingProviderInput {
  type: BookingProviderType
  label: string
  config: string
  isEnabled: boolean
  order: number
}

export interface AvailabilityResult {
  count: number
  bookingUrl: string | null
}

export interface ContactFormData {
  name: string
  surname: string
  email: string
  message: string
  website?: string
}

export interface SiteTransferImportResult {
  ok: true
  restoredAt: string
  formatVersion: number
}

export type NewsRichTextDocument = Record<string, unknown>

export interface NewsArticleSummary {
  id: number
  slug: string
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  featuredMedia: MediaFile | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface NewsArticleDetail extends NewsArticleSummary {
  bodyHtml_it: string
  bodyHtml_en: string
}

export type NewsArticleStatus = 'draft' | 'scheduled' | 'published'

export interface AdminNewsArticle extends NewsArticleDetail {
  bodyJson_it: NewsRichTextDocument
  bodyJson_en: NewsRichTextDocument
  status: NewsArticleStatus
  publishToSite: boolean
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  featuredMediaId: number | null
  scheduledAt: string | null
  newsletterDispatchedAt: string | null
  newsletterError: string
  facebookPublishedAt: string | null
  facebookError: string
  instagramPublishedAt: string | null
  instagramError: string
}

export interface NewsletterSubscriber {
  id: number
  email: string
  locale: string
  status: 'pending' | 'active' | 'unsubscribed'
  requestedAt: string
  confirmedAt: string | null
  unsubscribedAt: string | null
  lastConfirmationEmailSentAt: string | null
  lastNewsletterSentAt: string | null
  createdAt: string
  updatedAt: string
}

export interface NewsDeliveryChannelCapability {
  configured: boolean
  available: boolean
  expiresAt?: string | null
  expiresSoon?: boolean
  expired?: boolean
}

export interface NewsDeliveryCapabilities {
  newsletter: NewsDeliveryChannelCapability
  facebook: NewsDeliveryChannelCapability
  instagram: NewsDeliveryChannelCapability
}

export interface AdminNewsStatusResponse {
  capabilities: NewsDeliveryCapabilities
  articles: number
  subscribers: Record<string, number>
}

export interface NewsletterSubscribeInput {
  email: string
  locale: LocaleCode
  consent: boolean
  website?: string
}
