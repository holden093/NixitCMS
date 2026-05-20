import type { SiteSettings } from '@/types/api'

export type SettingsFieldKey = keyof Pick<
  SiteSettings,
  | 'hotelName'
  | 'legalName'
  | 'registeredAddress'
  | 'city'
  | 'region'
  | 'postalCode'
  | 'country'
  | 'vatNumber'
  | 'taxCode'
  | 'phone'
  | 'email'
  | 'mapLat'
  | 'mapLng'
  | 'mapZoom'
  | 'defaultLocale'
  | 'octorateKey'
  | 'promoIsActive'
  | 'promoText_it'
  | 'promoText_en'
  | 'promoLink'
>

export type SettingsFieldUpdater = <K extends SettingsFieldKey>(
  key: K,
  value: SiteSettings[K],
) => void
