import type { LocaleCode } from '@/types/api'

const EARTH_RADIUS_KM = 6371

export interface GeoCoordinate {
  lat: number
  lng: number
}

export type CardinalDirection =
  | 'north'
  | 'northEast'
  | 'east'
  | 'southEast'
  | 'south'
  | 'southWest'
  | 'west'
  | 'northWest'

export interface PoiGeoMetadata {
  distanceKm: number
  bearing: number
  direction: CardinalDirection
}

function toRadians(value: number) {
  return (value * Math.PI) / 180
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI
}

export function hasValidCoordinates(
  lat: number | null | undefined,
  lng: number | null | undefined,
): boolean {
  return typeof lat === 'number'
    && Number.isFinite(lat)
    && typeof lng === 'number'
    && Number.isFinite(lng)
    && lat >= -90
    && lat <= 90
    && lng >= -180
    && lng <= 180
}

export function calculateDistanceKm(origin: GeoCoordinate, destination: GeoCoordinate) {
  if (!hasValidCoordinates(origin.lat, origin.lng) || !hasValidCoordinates(destination.lat, destination.lng)) {
    return null
  }

  const deltaLat = toRadians(destination.lat - origin.lat)
  const deltaLng = toRadians(destination.lng - origin.lng)
  const originLat = toRadians(origin.lat)
  const destinationLat = toRadians(destination.lat)

  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(deltaLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

export function calculateForwardBearing(origin: GeoCoordinate, destination: GeoCoordinate) {
  if (!hasValidCoordinates(origin.lat, origin.lng) || !hasValidCoordinates(destination.lat, destination.lng)) {
    return null
  }

  const originLat = toRadians(origin.lat)
  const destinationLat = toRadians(destination.lat)
  const deltaLng = toRadians(destination.lng - origin.lng)
  const y = Math.sin(deltaLng) * Math.cos(destinationLat)
  const x = Math.cos(originLat) * Math.sin(destinationLat)
    - Math.sin(originLat) * Math.cos(destinationLat) * Math.cos(deltaLng)

  return (toDegrees(Math.atan2(y, x)) + 360) % 360
}

export function getCardinalDirection(bearing: number): CardinalDirection {
  const normalizedBearing = ((bearing % 360) + 360) % 360
  const directions: CardinalDirection[] = [
    'north',
    'northEast',
    'east',
    'southEast',
    'south',
    'southWest',
    'west',
    'northWest',
  ]
  const directionIndex = Math.round(normalizedBearing / 45) % directions.length

  return directions[directionIndex]
}

export function getPoiGeoMetadata(origin: GeoCoordinate, destination: GeoCoordinate): PoiGeoMetadata | null {
  const distanceKm = calculateDistanceKm(origin, destination)
  const bearing = calculateForwardBearing(origin, destination)

  if (distanceKm === null || bearing === null) {
    return null
  }

  return {
    distanceKm,
    bearing,
    direction: getCardinalDirection(bearing),
  }
}

export function formatDistance(distanceKm: number, locale: LocaleCode) {
  const localeCode = locale === 'en' ? 'en-US' : 'it-IT'
  if (distanceKm < 1) {
    return `${new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }).format(distanceKm * 1000)} m`
  }

  const formatter = new Intl.NumberFormat(localeCode, distanceKm >= 10
    ? { maximumFractionDigits: 0 }
    : { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  return `${formatter.format(distanceKm)} km`
}
