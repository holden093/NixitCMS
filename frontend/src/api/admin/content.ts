import client from '../client'
import type { Content } from '@/types/api'
import {
  primeCmsContentCache,
  primeCmsContentEntries,
} from '@/services/cmsContentStore'

export const getAdminContents = () =>
  client.get<Content[]>('/admin/content').then(r => primeCmsContentEntries(r.data))

export const updateContent = (slug: string, data: Content) =>
  client.put<Content>(`/admin/content/${slug}`, data).then(r => primeCmsContentCache(r.data))
