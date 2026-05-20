import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Compass, Mail, MapPin } from 'lucide-react'
import { getMediaUrl } from '@/api/media'
import { getNews } from '@/api/news'
import { getPois } from '@/api/pois'
import { getRooms } from '@/api/rooms'
import { getServices } from '@/api/services'
import { PublicPageFrame, PublicPageSection } from '@/components/layout/PublicPageFrame'
import RichText from '@/components/common/RichText'
import ScrollReveal from '@/components/common/ScrollReveal'
import { NewsSummaryCard } from '@/components/news/NewsSummaryCard'
import SafeImage from '@/components/SafeImage'
import HotelMap from '@/components/map/HotelMap'
import TourismPoiDialog from '@/components/map/TourismPoiDialog'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePageGuard } from '@/hooks/usePageGuard'
import { getLocalizedPublicPagePath, getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import {
  getDefaultHomeSections,
  getDefaultServiceTemplateContent,
  getDefaultSiteChromeContent,
  HOME_SECTION_FIELDS,
  resolveStructuredSections,
  SERVICE_TEMPLATE_FIELDS,
  SITE_CHROME_FIELDS,
} from '@/utils/publicSiteContent'
import type { LocaleCode, NewsArticleSummary, PointOfInterest, RoomCategory, Service } from '@/types/api'
import NotFoundPage from './NotFoundPage'

function stripMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatRoomPrice(locale: LocaleCode, value: number) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function HomePage() {
  const { i18n, t } = useTranslation()
  const settings = useSettings()
  const content = useCmsContent('home')
  const siteContent = useCmsContent('site')
  const serviceTemplateContent = useCmsContent('service-template')
  const [pois, setPois] = useState<PointOfInterest[]>([])
  const [rooms, setRooms] = useState<RoomCategory[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [newsItems, setNewsItems] = useState<NewsArticleSummary[]>([])
  const [loadError, setLoadError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isTourismOpen, setIsTourismOpen] = useState(false)
  const [poiLoadFailed, setPoiLoadFailed] = useState(false)

  const isPageVisible = usePageGuard('home')
  const isNewsPageVisible = usePageGuard('news')
  const isRoomsPageVisible = usePageGuard('rooms')
  useDocumentTitle(settings?.hotelName ?? t('home.defaultTitle'))

  useEffect(() => {
    let mounted = true

    void Promise.allSettled([
      getPois(),
      getRooms(),
      getServices(),
      getNews(3),
    ]).then(([poisResult, roomsResult, servicesResult, newsResult]) => {
      if (!mounted) {
        return
      }

      let hasError = false

      if (poisResult.status === 'fulfilled') {
        setPois(poisResult.value)
        setPoiLoadFailed(false)
      } else {
        hasError = true
        setPoiLoadFailed(true)
      }

      if (roomsResult.status === 'fulfilled') {
        setRooms(roomsResult.value)
      } else {
        hasError = true
      }

      if (servicesResult.status === 'fulfilled') {
        setServices(servicesResult.value)
      } else {
        hasError = true
      }

      if (newsResult.status === 'fulfilled') {
        setNewsItems(newsResult.value)
      } else {
        hasError = true
      }

      if (hasError) {
        setLoadError(true)
      }
    }).finally(() => {
      if (mounted) {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const heroImageUrl = settings?.heroImageKey ? getMediaUrl(settings.heroImageKey, 'hero') : ''
  const title = content
    ? (locale === 'en' ? content.title_en : content.title_it)
    : settings?.hotelName ?? t('home.defaultTitle')
  const subtitle = content
    ? (locale === 'en' ? content.subtitle_en : content.subtitle_it)
    : t('home.defaultSubtitle')
  const homeSections = useMemo(
    () => resolveStructuredSections(content, locale, HOME_SECTION_FIELDS, getDefaultHomeSections(t)),
    [content, locale, t],
  )
  const siteChrome = useMemo(
    () => resolveStructuredSections(siteContent, locale, SITE_CHROME_FIELDS, getDefaultSiteChromeContent(t)),
    [locale, siteContent, t],
  )
  const serviceTemplate = useMemo(
    () => resolveStructuredSections(
      serviceTemplateContent,
      locale,
      SERVICE_TEMPLATE_FIELDS,
      getDefaultServiceTemplateContent(t),
    ),
    [locale, serviceTemplateContent, t],
  )
  const hasValidMap = Boolean(
    settings
    && Number.isFinite(settings.mapLat)
    && Number.isFinite(settings.mapLng),
  )
  const directionsUrl = hasValidMap
    ? `https://www.google.com/maps/dir/?api=1&destination=${settings?.mapLat},${settings?.mapLng}`
    : null
  const hasTourismPois = !poiLoadFailed && pois.length > 0
  const addressValue = [
    settings?.registeredAddress?.trim(),
    [settings?.postalCode?.trim(), settings?.city?.trim()].filter(Boolean).join(' '),
    settings?.region?.trim(),
    settings?.country?.trim(),
  ].filter(Boolean).join(', ')
  const contactsPath = getLocalizedPublicPagePath('contacts', locale)
  const roomsPath = getLocalizedPublicPagePath('rooms', locale)
  const featuredRoom = rooms[0] ?? null
  const startingRoomPrice = (() => {
    const pricedRooms = rooms
      .map(room => room.price)
      .filter((price): price is number => price != null)

    return pricedRooms.length > 0 ? Math.min(...pricedRooms) : null
  })()
  const showRoomsTeaser = isRoomsPageVisible === true && featuredRoom !== null
  const contactItems = [
    {
      label: t('home.locationAddress'),
      value: addressValue,
      href: directionsUrl ?? undefined,
    },
    {
      label: t('home.locationPhone'),
      value: settings?.phone?.trim() ?? '',
      href: settings?.phone?.trim() ? `tel:${settings.phone.trim()}` : undefined,
    },
    {
      label: t('home.locationEmail'),
      value: settings?.email?.trim() ?? '',
      href: settings?.email?.trim() ? `mailto:${settings.email.trim()}` : undefined,
    },
  ].filter(item => item.value)

  if (isPageVisible === false) {
    return <NotFoundPage />
  }

  if (isPageVisible === null || loading) {
    return (
      <div className="pb-16">
        <section className="relative min-h-[36rem] overflow-hidden bg-ink">
          <div className="absolute inset-0 animate-pulse bg-stone-700" />
          <div className="page-grid relative flex min-h-[36rem] flex-col justify-end gap-6 pb-16 pt-28 md:pt-32">
            <div className="h-3 w-24 animate-pulse bg-paper/20" />
            <div className="h-16 w-full max-w-xl animate-pulse bg-paper/20" />
            <div className="h-10 w-full max-w-md animate-pulse bg-paper/10" />
          </div>
        </section>
        <section className="page-grid py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-stone-100" />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('home')}>
      <section className="relative isolate overflow-hidden bg-ink">
        {heroImageUrl ? (
          <SafeImage
            src={heroImageUrl}
            alt={title || t('home.defaultTitle')}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,14,0.35)_0%,rgba(20,16,14,0.55)_60%,rgba(20,16,14,0.75)_100%)]" />

        <ScrollReveal className="page-grid relative flex min-h-[36rem] flex-col justify-end gap-5 pb-20 pt-28 md:min-h-[42rem] md:pt-32">
          <p className="eyebrow text-paper/75">{homeSections.eyebrow}</p>
          <h1 className="display-title max-w-3xl text-paper">{title}</h1>
          <p className="max-w-xl text-[15px] leading-7 text-paper/85">
            {subtitle}
          </p>
        </ScrollReveal>
      </section>

      {loadError ? (
        <section className="page-grid pt-6">
          <p className="border border-stone-300 bg-stone-100 px-4 py-3 text-small text-ink-soft">
            {t('errors.dynamicContentUnavailable')}
          </p>
        </section>
      ) : null}

      {showRoomsTeaser ? (
        <PublicPageSection id="rooms" divider>
          <ScrollReveal>
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="eyebrow">{homeSections.roomsLabel}</p>
                <h2 className="mt-3 text-h2 font-semibold text-ink md:text-[28px]">
                  {homeSections.roomsTitle}
                </h2>
              </div>
              <RichText className="md:col-span-7 md:col-start-6 text-[15px] leading-7 text-ink-soft [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-ink">
                {homeSections.roomsIntro}
              </RichText>
            </div>

            <Link
              to={roomsPath}
              className="group mt-12 grid gap-6 border-t border-line pt-5 md:grid-cols-[1.1fr_0.9fr] md:items-stretch"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                {featuredRoom?.galleryPreview ? (
                  <SafeImage
                    src={getMediaUrl(featuredRoom.galleryPreview.key, 'card')}
                    alt={homeSections.roomsTitle}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="eyebrow">{homeSections.roomsTitle}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-6 border-l-0 border-line md:border-l md:pl-8">
                <div className="space-y-4">
                  <p className="eyebrow">
                    {featuredRoom ? (locale === 'en' ? featuredRoom.name_en : featuredRoom.name_it) : ''}
                  </p>
                  <h3 className="text-h2 font-semibold text-ink">{homeSections.roomsTitle}</h3>
                  {startingRoomPrice !== null ? (
                    <p className="text-[14px] font-medium text-ink">
                      {locale === 'en' ? 'from ' : 'da '}
                      {formatRoomPrice(locale, startingRoomPrice)}
                      <span className="font-normal text-ink-soft"> {locale === 'en' ? '/ night' : '/ notte'}</span>
                    </p>
                  ) : null}
                  <p className="max-w-xl text-[14px] leading-6 text-ink-soft">
                    {homeSections.roomsIntro}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
                  {homeSections.roomsCta}
                  <ArrowRight size={14} strokeWidth={1.75} />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </PublicPageSection>
      ) : null}

      <PublicPageSection id="services" divider>
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">{homeSections.servicesLabel}</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink md:text-[28px]">
                {homeSections.servicesTitle}
              </h2>
            </div>
            <RichText className="md:col-span-7 md:col-start-6 text-[15px] leading-7 text-ink-soft [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-ink">
              {homeSections.servicesIntro}
            </RichText>
          </div>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {services.map(service => {
                const name = locale === 'en' ? service.name_en : service.name_it
                const description = stripMarkdown(locale === 'en' ? service.description_en : service.description_it)
                const galleryCategoryName = locale === 'en'
                  ? service.photoCategory?.name_en
                  : service.photoCategory?.name_it

                return (
                  <Link
                    key={service.id}
                    to={locale === 'en' ? `/servizi/${service.slug}?lang=en` : `/servizi/${service.slug}`}
                    className="group flex flex-col border-t border-line pt-5"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                      {service.galleryPreview ? (
                        <SafeImage
                          src={getMediaUrl(service.galleryPreview.key, 'card')}
                          alt={name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="eyebrow">{name}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                      {galleryCategoryName ? (
                        <p className="eyebrow">{galleryCategoryName}</p>
                      ) : null}
                      <h3 className="mt-2 text-h3 font-semibold text-ink">{name}</h3>
                      <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-soft line-clamp-3">
                        {description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
                        {serviceTemplate.readMore}
                        <ArrowRight size={14} strokeWidth={1.75} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="mt-12 max-w-2xl border-t border-line pt-8">
              <h3 className="text-h2 font-semibold text-ink">{t('home.servicesEmptyTitle')}</h3>
              <p className="mt-3 text-[14px] leading-6 text-ink-soft">
                {t('home.servicesEmptyBody')}
              </p>
              <Link to={contactsPath} className="btn-primary mt-6">
                {siteChrome.navContacts}
              </Link>
            </div>
          )}
        </ScrollReveal>
      </PublicPageSection>

      {isNewsPageVisible ? (
        <PublicPageSection divider>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="eyebrow">{t('news.eyebrow')}</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink md:text-[28px]">
                {t('news.homeTitle')}
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink-soft">
                {t('news.homeIntro')}
              </p>
            </div>

            {newsItems.length > 0 ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {newsItems.map(article => (
                  <NewsSummaryCard key={article.id} article={article} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="mt-8 max-w-2xl border-t border-line pt-8">
                <h3 className="text-h3 font-semibold text-ink">{t('news.emptyTitle')}</h3>
                <p className="mt-3 text-[14px] leading-6 text-ink-soft">
                  {t('news.emptyBody')}
                </p>
              </div>
            )}
          </ScrollReveal>
        </PublicPageSection>
      ) : null}

      <PublicPageSection id="location" divider>
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{homeSections.mapLabel}</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink md:text-[28px]">
                {homeSections.mapTitle}
              </h2>
              <RichText className="mt-5 max-w-md text-[15px] leading-7 text-ink-soft [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-ink">
                {homeSections.mapIntro}
              </RichText>

              {contactItems.length > 0 ? (
                <div className="mt-8">
                  {contactItems.map(item => (
                    <div key={item.label} className="detail-row">
                      <p className="detail-label">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="detail-value break-words transition-colors hover:text-accent"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="detail-value">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {directionsUrl ? (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <MapPin size={14} strokeWidth={1.75} />
                    {homeSections.mapCta}
                  </a>
                ) : null}
                {hasTourismPois ? (
                  <button type="button" onClick={() => setIsTourismOpen(true)} className="btn-secondary">
                    <Compass size={14} strokeWidth={1.75} />
                    {homeSections.tourismCta}
                  </button>
                ) : null}
                <Link to={contactsPath} className="btn-link">
                  <Mail size={14} strokeWidth={1.75} />
                  {siteChrome.navContacts}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              {hasValidMap && settings ? (
                <HotelMap
                  lat={settings.mapLat}
                  lng={settings.mapLng}
                  zoom={settings.mapZoom}
                  pois={pois}
                  locale={locale}
                  hotelName={settings.hotelName ?? t('home.defaultTitle')}
                />
              ) : (
                <div className="flex min-h-[24rem] flex-col justify-center border border-line bg-stone-50 p-8">
                  <h3 className="text-h2 font-semibold text-ink">
                    {t('home.locationFallbackTitle')}
                  </h3>
                  <p className="mt-3 max-w-lg text-[14px] leading-6 text-ink-soft">
                    {t('home.locationFallbackBody')}
                  </p>
                  <Link to={contactsPath} className="btn-primary mt-6 self-start">
                    {siteChrome.navContacts}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </PublicPageSection>

      <TourismPoiDialog
        open={isTourismOpen}
        onOpenChange={setIsTourismOpen}
        pois={pois}
        locale={locale}
        hotelName={settings?.hotelName ?? t('home.defaultTitle')}
        hotelLat={settings?.mapLat}
        hotelLng={settings?.mapLng}
        content={{
          tourismLabel: homeSections.tourismLabel,
          tourismTitle: homeSections.tourismTitle,
          tourismIntro: homeSections.tourismIntro,
        }}
      />
    </PublicPageFrame>
  )
}
