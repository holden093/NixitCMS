import client from './client'
import type { Page } from '@/types/api'

export const getPages = (): Promise<Page[]> =>
  client.get<Page[]>('/pages').then(r => r.data)
