import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { getMediaUrl } from '@/api/media'
import { getRooms } from '@/api/rooms'
import RichText from '@/components/common/RichText'
import { PublicPageFrame, PublicPageIntro } from '@/components/layout/PublicPageFrame'
import SafeImage from '@/components/SafeImage'
import RoomMeta from '@/components/rooms/RoomMeta'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePageGuard } from '@/hooks/usePageGuard'
import { getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import type { LocaleCode, RoomCategory } from '@/types/api'
import NotFoundPage from './NotFoundPage'

function stripMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function RoomsPage() {
  const { i18n, t } = useTranslation()
  const settings = useSettings()
  const content = useCmsContent('rooms')
  const isPageVisible = usePageGuard('rooms')
  const [rooms, setRooms] = useState<RoomCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const localizedTitle = content
    ? (locale === 'en' ? content.title_en : content.title_it)
    : t('rooms.pageTitle')
  const localizedSubtitle = content
    ? (locale === 'en' ? content.subtitle_en : content.subtitle_it)
    : t('rooms.pageIntro')
  const localizedBody = content
    ? (locale === 'en' ? content.body_en : content.body_it)
    : ''
  const documentTitle = settings?.hotelName ? `${localizedTitle} | ${settings.hotelName}` : localizedTitle

  useDocumentTitle(documentTitle)

  useEffect(() => {
    let mounted = true

    getRooms()
      .then(nextRooms => {
        if (mounted) {
          setRooms(nextRooms)
        }
      })
      .catch(() => {
        if (mounted) {
          setLoadError(true)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const roomCards = useMemo(
    () => rooms.map(room => ({
      ...room,
      name: locale === 'en' ? room.name_en : room.name_it,
      description: stripMarkdown(locale === 'en' ? room.description_en : room.description_it),
      photoCategoryName: locale === 'en' ? room.photoCategory?.name_en : room.photoCategory?.name_it,
      href: locale === 'en' ? `/camere/${room.slug}?lang=en` : `/camere/${room.slug}`,
    })),
    [locale, rooms],
  )

  if (isPageVisible === false) {
    return <NotFoundPage />
  }

  if (isPageVisible === null || loading) {
    return (
      <div className="page-grid pb-16 pt-[var(--public-fixed-offset)]">
        <div className="space-y-6">
          <div className="h-4 w-24 animate-pulse bg-stone-200" />
          <div className="h-12 w-full max-w-xl animate-pulse bg-stone-200" />
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse bg-stone-100" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('rooms')}>
      <PublicPageIntro>
        <div className="max-w-3xl">
          <p className="eyebrow">{t('nav.rooms')}</p>
          <h1 className="display-title mt-3">{localizedTitle}</h1>
          {localizedSubtitle ? (
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink-soft">
              {localizedSubtitle}
            </p>
          ) : null}
          {localizedBody ? (
            <RichText className="editorial-prose mt-8 max-w-2xl">
              {localizedBody}
            </RichText>
          ) : null}
        </div>
      </PublicPageIntro>

      <section className="page-grid mt-16">
        {loadError ? (
          <p className="border border-stone-300 bg-stone-100 px-4 py-3 text-small text-ink-soft">
            {t('errors.dynamicContentUnavailable')}
          </p>
        ) : null}

        {roomCards.length === 0 ? (
          <div className="border border-line bg-stone-50 p-8">
            <h2 className="text-h2 font-semibold text-ink">{t('rooms.emptyTitle')}</h2>
            <p className="mt-3 max-w-xl text-[14px] leading-6 text-ink-soft">
              {t('rooms.emptyBody')}
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {roomCards.map(room => (
              <Link key={room.id} to={room.href} className="group flex flex-col border-t border-line pt-5">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  {room.galleryPreview ? (
                    <SafeImage
                      src={getMediaUrl(room.galleryPreview.key, 'card')}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="eyebrow">{room.name}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-1 flex-col">
                  {room.photoCategoryName ? (
                    <p className="eyebrow">{room.photoCategoryName}</p>
                  ) : null}
                  <h2 className="mt-2 text-h3 font-semibold text-ink">{room.name}</h2>
                  <RoomMeta occupancy={room.occupancy} sizeSqm={room.sizeSqm} price={room.price} locale={locale} className="mt-3 text-[12px]" />
                  <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-soft line-clamp-3">
                    {room.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
                    {t('services.readMore')}
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PublicPageFrame>
  )
}
