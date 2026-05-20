import client from './client'
import type { PhotoCategory } from '@/types/api'

export const getPhotoCategories = () =>
  client.get<PhotoCategory[]>('/photo-categories').then(r => r.data)
