import type { PointOfInterest } from '@/types/api'
import type { PoiInput } from '@/api/admin/pois'
import { isCoordinateInRange, parseCoordinateValue } from '@/lib/admin/validation/pois'

export interface PoiFormState {
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  lat: string
  lng: string
  category: string
}

export function createEmptyPoiForm(): PoiFormState {
  return {
    name_it: '',
    name_en: '',
    description_it: '',
    description_en: '',
    lat: '',
    lng: '',
    category: 'other',
  }
}

export function mapPoiToForm(poi: PointOfInterest): PoiFormState {
  return {
    name_it: poi.name_it,
    name_en: poi.name_en,
    description_it: poi.description_it,
    description_en: poi.description_en,
    lat: String(poi.lat),
    lng: String(poi.lng),
    category: poi.category,
  }
}

export function toPoiPayload(form: PoiFormState): PoiInput | null {
  const lat = parseCoordinateValue(form.lat)
  const lng = parseCoordinateValue(form.lng)

  if (
    lat === null
    || lng === null
    || !isCoordinateInRange('lat', lat)
    || !isCoordinateInRange('lng', lng)
  ) {
    return null
  }

  return {
    name_it: form.name_it,
    name_en: form.name_en,
    description_it: form.description_it,
    description_en: form.description_en,
    lat,
    lng,
    category: form.category,
  }
}
