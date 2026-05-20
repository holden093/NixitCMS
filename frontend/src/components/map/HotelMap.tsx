import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { hasValidCoordinates } from '@/lib/geo/tourismPoi'
import type { LocaleCode, PointOfInterest } from '@/types/api'

delete (L.Icon.Default.prototype as typeof L.Icon.Default.prototype & { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Props {
  lat: number
  lng: number
  zoom: number
  pois: PointOfInterest[]
  locale: LocaleCode
  hotelName: string
}

export default function HotelMap({ lat, lng, zoom, pois, locale, hotelName }: Props) {
  const { t } = useTranslation()
  const [showHint, setShowHint] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const hintTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const validPois = pois.filter(poi => hasValidCoordinates(poi.lat, poi.lng))

  useEffect(() => (
    () => {
      if (hintTimeoutRef.current !== null) {
        window.clearTimeout(hintTimeoutRef.current)
      }
    }
  ), [])

  if (!hasValidCoordinates(lat, lng)) return null

  const revealHint = () => {
    if (hintDismissed) {
      return
    }

    setShowHint(true)
    if (hintTimeoutRef.current !== null) {
      window.clearTimeout(hintTimeoutRef.current)
    }
    hintTimeoutRef.current = window.setTimeout(() => setShowHint(false), 3000)
  }

  const dismissHint = () => {
    setHintDismissed(true)
    setShowHint(false)
    if (hintTimeoutRef.current !== null) {
      window.clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
  }

  return (
    <div
      className="relative overflow-hidden border border-line bg-paper"
      role="application"
      tabIndex={0}
      aria-label={t('map.ariaLabel')}
      onMouseEnter={revealHint}
      onFocus={revealHint}
      onBlur={() => setShowHint(false)}
      onWheel={event => {
        if (event.ctrlKey) {
          dismissHint()
        }
      }}
    >
      {showHint && (
        <div className="pointer-events-none absolute left-4 top-4 z-[500] bg-ink/80 px-4 py-2 text-xs font-medium text-paper">
          {t('map.zoomHint')}
        </div>
      )}
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        className="h-[22rem] w-full md:h-[28rem] lg:h-[32rem]"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline"
            >
              {hotelName || t('home.defaultTitle')}
            </a>
          </Popup>
        </Marker>

        {validPois.map(poi => (
          <Marker key={poi.id} position={[poi.lat, poi.lng]}>
            <Popup>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline"
              >
                {locale === 'it' ? poi.name_it : poi.name_en}
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
