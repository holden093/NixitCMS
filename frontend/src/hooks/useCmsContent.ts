import { useEffect, useState } from 'react'
import type { Content, PublicSiteSlug } from '@/types/api'
import {
  loadCmsContentFromStore,
  primeCmsContentCache,
  readCmsContentCache,
} from '@/services/cmsContentStore'

export { primeCmsContentCache as updateCmsContentCache } from '@/services/cmsContentStore'

export function useCmsContent(slug: PublicSiteSlug) {
  const [content, setContent] = useState<Content | null>(readCmsContentCache(slug))

  useEffect(() => {
    let active = true

    loadCmsContentFromStore(slug)
      .then(entry => {
        if (active) {
          setContent(primeCmsContentCache(entry))
        }
      })
      .catch(() => {
        if (active) {
          setContent(null)
        }
      })

    return () => {
      active = false
    }
  }, [slug])

  return content
}
