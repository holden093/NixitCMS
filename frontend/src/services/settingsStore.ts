import { getSettings } from '@/api/settings'
import type { SiteSettings } from '@/types/api'

let settingsCache: SiteSettings | null = null
let settingsPromise: Promise<SiteSettings> | null = null

export function readSettingsCache() {
  return settingsCache
}

export function primeSettingsCache(settings: SiteSettings) {
  settingsCache = settings
  settingsPromise = Promise.resolve(settings)
  return settings
}

export function clearSettingsCache() {
  settingsCache = null
  settingsPromise = null
}

export async function loadSettingsFromStore(
  loader: () => Promise<SiteSettings> = getSettings,
) {
  if (settingsCache) {
    return settingsCache
  }

  if (!settingsPromise) {
    settingsPromise = loader()
      .then(settings => primeSettingsCache(settings))
      .catch(error => {
        settingsPromise = null
        throw error
      })
  }

  return settingsPromise
}
