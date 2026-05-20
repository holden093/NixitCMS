import client from '../client'
import type { SiteSettings } from '@/types/api'
import { primeSettingsCache } from '@/services/settingsStore'

export const getAdminSettings = () =>
  client.get<SiteSettings>('/settings').then(r => primeSettingsCache(r.data))

export const updateSettings = (data: Partial<SiteSettings>) =>
  client.put<SiteSettings>('/admin/settings', data).then(r => primeSettingsCache(r.data))
