import client from '../client'
import { normalizeBaseUrl } from '../baseUrl'
import type { MediaFile, MediaVariantPreset } from '@/types/api'

export const getAdminMedia = () =>
  client.get<MediaFile[]>('/admin/media').then(r => r.data)

export const uploadMedia = (file: File, categoryIds: number[] = []) => {
  const fd = new FormData()
  fd.append('file', file)
  categoryIds.forEach(categoryId => {
    fd.append('categoryIds', String(categoryId))
  })
  return client.post<MediaFile>('/admin/media/upload', fd).then(r => r.data)
}
export const deleteMedia = (id: number) =>
  client.delete(`/admin/media/${id}`).then(r => r.data)

export const updateMediaMetadata = (id: number, payload: { label: string; categoryIds: number[] }) =>
  client.put<MediaFile>(`/admin/media/${id}/metadata`, payload).then(r => r.data)

export const getAdminMediaUrl = (key: string | null | undefined, variant?: MediaVariantPreset) => {
  if (!key) {
    return ''
  }

  const baseUrl = `${normalizeBaseUrl(import.meta.env.VITE_MEDIA_BASE_URL, '/media')}/${key}`
  return variant ? `${baseUrl}?variant=${variant}` : baseUrl
}
