import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { getService } from '@/api/services'
import PhotoSlideshow from '@/components/gallery/PhotoSlideshow'
import { PublicPageFrame } from '@/components/layout/PublicPageFrame'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getLocalizedPublicPagePath, getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import {
  getDefaultNotFoundSections,
  NOT_FOUND_SECTION_FIELDS,
  resolveStructuredSections,
} from '@/utils/publicSiteContent'
import type { LocaleCode, Service } from '@/types/api'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const { i18n, t } = useTranslation()
  const settings = useSettings()
  const notFoundContent = useCmsContent('not-found')
  const [service, setService] = useState<Service | null>(null)
  const [error, setError] = useState(false)

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const notFoundSections = resolveStructuredSections(
    notFoundContent,
    locale,
    NOT_FOUND_SECTION_FIELDS,
    getDefaultNotFoundSections(t),
  )

  const notFoundTitle = notFoundContent
    ? (locale === 'en' ? notFoundContent.title_en : notFoundContent.title_it)
    : t('notFound')

  useEffect(() => {
    if (!slug) return
    let mounted = true
    setError(false)
    setService(null)

    getService(slug)
      .then(data => {
        if (mounted) {
          setService(data)
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [slug])

  const localizedService = useMemo(() => {
    if (!service) return null
    return {
      name: locale === 'en' ? service.name_en : service.name_it,
      description: locale === 'en' ? service.description_en : service.description_it,
    }
  }, [locale, service])
  const documentTitle = localizedService?.name
    ? settings?.hotelName
      ? `${localizedService.name} | ${settings.hotelName}`
      : localizedService.name
    : t('home.services')
  const galleryPhotos = service?.photoCategory?.media ?? []
  const galleryPlaceholderTitle = locale === 'en'
    ? 'Gallery coming soon'
    : 'Galleria in aggiornamento'
  const galleryPlaceholderBody = locale === 'en'
    ? 'We are preparing the photo selection for this service. The information below is already available.'
    : 'Stiamo preparando la selezione fotografica per questo servizio. Le informazioni qui sotto sono gia disponibili.'
  const galleryPlaceholderEyebrow = locale === 'en'
    ? 'Image collection'
    : 'Raccolta immagini'
  const gallerySectionIntro = galleryPhotos.length > 0
    ? locale === 'en'
      ? 'Browse the gallery and open every photo in fullscreen for a closer look.'
      : 'Sfoglia la galleria e apri ogni foto a schermo intero per consultarla meglio.'
    : locale === 'en'
      ? 'A dedicated gallery is not available for this service yet.'
      : 'Per questo servizio non e ancora disponibile una galleria dedicata.'
  const homePath = getLocalizedPublicPagePath('home', locale)

  useDocumentTitle(documentTitle)

  if (error) {
    return (
      <PublicPageFrame variant={getPublicPageFrameVariant('notFound')}>
        <div className="page-grid text-center">
        <p className="eyebrow">{notFoundSections.label}</p>
        <h1 className="display-title mt-4">{notFoundTitle}</h1>
        <Link to={homePath} className="btn-secondary mt-8 inline-flex">
          {notFoundSections.home}
        </Link>
        </div>
      </PublicPageFrame>
    )
  }

  if (!service || !localizedService) {
    return (
      <PublicPageFrame variant={getPublicPageFrameVariant('service')}>
        <div className="page-grid">
          <div className="mx-auto max-w-3xl animate-pulse">
            <div className="mx-auto h-10 w-3/4 bg-stone-200" />
            <div className="mt-8 h-[24rem] bg-stone-100" />
            <div className="mt-8 space-y-3">
              <div className="h-3 w-full bg-stone-200" />
              <div className="h-3 w-full bg-stone-200" />
              <div className="h-3 w-5/6 bg-stone-200" />
            </div>
          </div>
        </div>
      </PublicPageFrame>
    )
  }

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('service')}>
      <div className="page-grid">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="text-center">
          <h1 className="display-title mx-auto max-w-3xl">{localizedService.name}</h1>
        </header>

        {galleryPhotos.length > 0 ? (
          <PhotoSlideshow photos={galleryPhotos} locale={locale} />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center border border-line bg-stone-50 p-8 text-center md:p-12">
            <div className="max-w-xl">
              <p className="eyebrow">{galleryPlaceholderEyebrow}</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink">{galleryPlaceholderTitle}</h2>
              <p className="mt-4 text-[14px] leading-6 text-ink-soft">
                {galleryPlaceholderBody}
              </p>
            </div>
          </div>
        )}

        <article className="mx-auto max-w-2xl">
          <p className="text-[14px] leading-6 text-muted">{gallerySectionIntro}</p>
          <div className="editorial-prose mt-6">
            <ReactMarkdown>{localizedService.description}</ReactMarkdown>
          </div>
        </article>
      </div>
      </div>
    </PublicPageFrame>
  )
}
