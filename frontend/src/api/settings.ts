import client from './client'
import type { SiteSettings } from '@/types/api'

export const getSettings = () => client.get<SiteSettings>('/settings').then(r => r.data)
