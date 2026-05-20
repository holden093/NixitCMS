import client from './client'
import { normalizeBaseUrl } from './baseUrl'
import type { MediaFile, MediaVariantPreset } from '@/types/api'

export const getMedia = (category?: string) =>
  client.get<MediaFile[]>('/media', { params: category ? { category } : undefined }).then(r => r.data)

export const getMediaUrl = (key: string | null | undefined, variant?: MediaVariantPreset) => {
  if (!key) {
    return ''
  }

  const baseUrl = `${normalizeBaseUrl(import.meta.env.VITE_MEDIA_BASE_URL, '/media')}/${key}`
  return variant ? `${baseUrl}?variant=${variant}` : baseUrl
}
