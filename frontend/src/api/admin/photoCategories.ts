import client from '../client'
import type { PhotoCategoryWithCount } from '@/types/api'

export interface PhotoCategoryInput {
  name_it: string
  name_en: string
  sortOrder: number
}

export const getAdminPhotoCategories = () =>
  client.get<PhotoCategoryWithCount[]>('/admin/photo-categories').then(r => r.data)

export const createPhotoCategory = (data: PhotoCategoryInput) =>
  client.post<PhotoCategoryWithCount>('/admin/photo-categories', data).then(r => r.data)

export const updatePhotoCategory = (id: number, data: Partial<PhotoCategoryInput>) =>
  client.put<PhotoCategoryWithCount>(`/admin/photo-categories/${id}`, data).then(r => r.data)

export const deletePhotoCategory = (id: number) =>
  client.delete(`/admin/photo-categories/${id}`).then(r => r.data)
