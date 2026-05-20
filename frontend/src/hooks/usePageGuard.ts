import { useMemo } from 'react'
import { isManagedPublicPageSlug } from '@/lib/public/pageRoutes'
import { usePublicPages } from './usePublicPages'

export function usePageGuard(slug: string) {
  const pages = usePublicPages()

  return useMemo(() => {
    if (!isManagedPublicPageSlug(slug)) {
      return true
    }

    if (pages === null) {
      return null
    }

    return pages.some(page => page.slug === slug)
  }, [pages, slug])
}
