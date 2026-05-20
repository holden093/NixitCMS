import { useEffect, useState } from 'react'
import type { SiteSettings } from '@/types/api'
import {
  loadSettingsFromStore,
  primeSettingsCache,
  readSettingsCache,
} from '@/services/settingsStore'

export { primeSettingsCache as updateSettingsCache } from '@/services/settingsStore'

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(readSettingsCache())

  useEffect(() => {
    if (readSettingsCache()) {
      return
    }

    let mounted = true
    loadSettingsFromStore()
      .then(nextSettings => {
        if (mounted) {
          setSettings(primeSettingsCache(nextSettings))
        }
      })
      .catch(error => {
        if (mounted) {
          console.error(error)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return settings
}
