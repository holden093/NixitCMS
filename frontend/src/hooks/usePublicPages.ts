import { useEffect, useState } from 'react'
import type { Page } from '@/types/api'
import {
  loadPublicPagesFromStore,
  readPublicPagesCache,
} from '@/services/pagesStore'

export function usePublicPages() {
  const [pages, setPages] = useState<Page[] | null>(readPublicPagesCache())

  useEffect(() => {
    let active = true

    loadPublicPagesFromStore()
      .then(nextPages => {
        if (active) {
          setPages(nextPages)
        }
      })
      .catch(() => {
        if (active) {
          setPages(readPublicPagesCache())
        }
      })

    return () => {
      active = false
    }
  }, [])

  return pages
}
