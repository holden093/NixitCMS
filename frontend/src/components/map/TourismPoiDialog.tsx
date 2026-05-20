import { useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUp, ArrowUpRight, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import RichText from '@/components/common/RichText'
import {
  formatDistance,
  getPoiGeoMetadata,
  hasValidCoordinates,
  type CardinalDirection,
} from '@/lib/geo/tourismPoi'
import type { HomeSectionContent, LocaleCode, PointOfInterest } from '@/types/api'

interface TourismPoiDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pois: PointOfInterest[]
  locale: LocaleCode
  hotelName: string
  hotelLat?: number | null
  hotelLng?: number | null
  content: Pick<HomeSectionContent, 'tourismLabel' | 'tourismTitle' | 'tourismIntro'>
}

function getPoiName(poi: PointOfInterest, locale: LocaleCode) {
  return locale === 'en' ? poi.name_en : poi.name_it
}

function getPoiDescription(poi: PointOfInterest, locale: LocaleCode) {
  return locale === 'en' ? poi.description_en : poi.description_it
}

function getDirectionLabel(
  t: (key: string, options?: Record<string, unknown>) => string,
  direction: CardinalDirection,
) {
  return t(`tourismPoi.directions.${direction}`)
}

function getPoiMapsUrl(poi: PointOfInterest) {
  if (!hasValidCoordinates(poi.lat, poi.lng)) {
    return null
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`
}

export default function TourismPoiDialog({
  open,
  onOpenChange,
  pois,
  locale,
  hotelName,
  hotelLat,
  hotelLng,
  content,
}: TourismPoiDialogProps) {
  const { t } = useTranslation()
  const hasHotelCoordinates = hasValidCoordinates(hotelLat, hotelLng)

  const items = useMemo(() => {
    const hotelCoordinates = hasHotelCoordinates
      && typeof hotelLat === 'number'
      && typeof hotelLng === 'number'
      ? { lat: hotelLat, lng: hotelLng }
      : null

    return pois
      .map((poi, index) => ({
        poi,
        index,
        geo: hotelCoordinates
          ? getPoiGeoMetadata(hotelCoordinates, { lat: poi.lat, lng: poi.lng })
          : null,
      }))
      .sort((left, right) => {
        if (left.geo && right.geo) {
          return left.geo.distanceKm - right.geo.distanceKm
        }
        if (left.geo) {
          return -1
        }
        if (right.geo) {
          return 1
        }
        return left.index - right.index
      })
  }, [hasHotelCoordinates, hotelLat, hotelLng, pois])

  return (
    <Dialog.Root modal={false} open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1420] bg-ink/70" />
        <Dialog.Content
          onOpenAutoFocus={event => event.preventDefault()}
          onCloseAutoFocus={event => event.preventDefault()}
          className="fixed inset-x-0 bottom-0 z-[1430] flex max-h-[88vh] flex-col overflow-hidden border border-line bg-paper outline-none md:left-1/2 md:top-1/2 md:bottom-auto md:w-[min(96vw,64rem)] md:-translate-x-1/2 md:-translate-y-1/2 md:max-h-[90vh]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
            <div className="min-w-0 flex-1">
              <p className="eyebrow">{content.tourismLabel}</p>
              <Dialog.Title className="mt-2 text-h2 font-semibold text-ink md:text-[24px]">
                {content.tourismTitle}
              </Dialog.Title>
              {content.tourismIntro.trim() ? (
                <Dialog.Description asChild>
                  <RichText
                    inline
                    className="mt-2 block max-w-2xl text-[14px] leading-6 text-ink-soft"
                  >
                    {content.tourismIntro}
                  </RichText>
                </Dialog.Description>
              ) : null}
              {hasHotelCoordinates ? (
                <p className="mt-3 text-[12px] leading-5 text-muted">
                  {t('tourismPoi.relativeToHotel', { hotelName })}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:bg-stone-100"
              aria-label={t('tourismPoi.closeDialog')}
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8">
            {items.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {items.map(({ poi, geo }) => {
                  const description = getPoiDescription(poi, locale)
                  const poiName = getPoiName(poi, locale)
                  const mapsUrl = getPoiMapsUrl(poi)
                  const distanceSummary = geo
                    ? t('tourismPoi.distanceDirection', {
                      distance: formatDistance(geo.distanceKm, locale),
                      direction: getDirectionLabel(t, geo.direction),
                    })
                    : ''
                  const cardBody = (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex border border-line bg-paper px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                          {t(`tourismPoi.categories.${poi.category}`, { defaultValue: poi.category })}
                        </span>
                      </div>

                      <h3 className="mt-4 text-h3 font-semibold text-ink">
                        {poiName}
                      </h3>

                      {description ? (
                        <p className="mt-3 whitespace-pre-line text-[14px] leading-6 text-ink-soft">
                          {description}
                        </p>
                      ) : null}

                      {distanceSummary ? (
                        <div className="mt-5 flex items-start gap-3 border-t border-line pt-4">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-ink"
                          >
                            <ArrowUp
                              size={18}
                              strokeWidth={1.8}
                              style={{ transform: `rotate(${geo?.bearing ?? 0}deg)` }}
                            />
                          </span>
                          <p className="pt-1 text-[13px] font-medium leading-6 text-ink-soft">
                            {distanceSummary}
                          </p>
                        </div>
                      ) : null}

                      {mapsUrl ? (
                        <p className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent">
                          {t('tourismPoi.openInMaps')}
                          <ArrowUpRight size={14} strokeWidth={1.75} />
                        </p>
                      ) : null}
                    </>
                  )

                  if (mapsUrl) {
                    return (
                      <a
                        key={poi.id}
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('tourismPoi.openInMapsAria', { name: poiName })}
                        className="group flex h-full flex-col border border-line bg-stone-50 px-5 py-5 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {cardBody}
                      </a>
                    )
                  }

                  return (
                    <article key={poi.id} className="flex h-full flex-col border border-line bg-stone-50 px-5 py-5">
                      {cardBody}
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="border border-line bg-stone-50 px-5 py-6">
                <h3 className="text-h3 font-semibold text-ink">{t('tourismPoi.emptyTitle')}</h3>
                <p className="mt-3 max-w-2xl text-[14px] leading-6 text-ink-soft">
                  {t('tourismPoi.emptyBody')}
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
