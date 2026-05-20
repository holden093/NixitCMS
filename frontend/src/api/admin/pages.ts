import client from '../client'
import type { Page } from '@/types/api'

export const getAdminPages = () =>
  client.get<Page[]>('/admin/pages').then(r => r.data)

export const updatePageVisibility = (slug: string, isVisible: boolean) =>
  client.put<Page>(`/admin/pages/${slug}`, { isVisible }).then(r => r.data)
