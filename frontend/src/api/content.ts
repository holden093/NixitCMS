import client from './client'
import type { Content } from '@/types/api'

export const getContent = (slug: string) =>
  client.get<Content>(`/content/${slug}`).then(r => r.data)
