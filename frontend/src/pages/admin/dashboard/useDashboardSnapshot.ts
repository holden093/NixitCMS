import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getBookingProviders } from '@/api/admin/booking'
import { getAdminContents } from '@/api/admin/content'
import { getAdminMedia } from '@/api/admin/media'
import { getAdminPages } from '@/api/admin/pages'
import { getAdminServices } from '@/api/admin/services'
import { getAdminSettings } from '@/api/admin/settings'
import { ADMIN_PAGE_VISIBILITY_SLUGS } from '@/lib/admin/pageVisibility'
import { extractErrorMessage } from '@/utils/errors'

export interface DashboardSnapshot {
  hotelName: string
  contents: number
  pagesVisible: number
  media: number
  services: number
  bookingProviders: number
}

export function useDashboardSnapshot() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSnapshot = async () => {
    setLoading(true)
    setError('')

    try {
      const [settings, contents, pages, media, services, bookingProviders] = await Promise.all([
        getAdminSettings(),
        getAdminContents(),
        getAdminPages(),
        getAdminMedia(),
        getAdminServices(),
        getBookingProviders(),
      ])
      const publicPages = pages.filter(page => ADMIN_PAGE_VISIBILITY_SLUGS.includes(page.slug as typeof ADMIN_PAGE_VISIBILITY_SLUGS[number]))
      setSnapshot({
        hotelName: settings.hotelName,
        contents: contents.length,
        pagesVisible: publicPages.filter(page => page.isVisible).length,
        media: media.length,
        services: services.length,
        bookingProviders: bookingProviders.length,
      })
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare la panoramica operativa.')
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadSnapshot()
  }, [])

  return {
    snapshot,
    loading,
    error,
    loadSnapshot,
  }
}
