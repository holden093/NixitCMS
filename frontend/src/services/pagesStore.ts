import { getPages } from '@/api/pages'
import {
  isManagedPublicPageSlug,
  sortManagedPublicPages,
} from '@/lib/public/pageRoutes'
import type { Page } from '@/types/api'

let publicPagesCache: Page[] | null = null
let publicPagesPromise: Promise<Page[]> | null = null

function normalizePublicPages(pages: Page[]) {
  return sortManagedPublicPages(
    pages.filter(page => isManagedPublicPageSlug(page.slug)),
  )
}

export function readPublicPagesCache() {
  return publicPagesCache
}

export function primePublicPagesCache(pages: Page[]) {
  publicPagesCache = normalizePublicPages(pages)
  publicPagesPromise = Promise.resolve(publicPagesCache)
  return publicPagesCache
}

export function patchPublicPagesCache(page: Page) {
  if (!publicPagesCache || !isManagedPublicPageSlug(page.slug)) {
    return
  }

  const nextPages = publicPagesCache.filter(item => item.slug !== page.slug)
  if (page.isVisible) {
    nextPages.push(page)
  }

  publicPagesCache = normalizePublicPages(nextPages)
  publicPagesPromise = Promise.resolve(publicPagesCache)
}

export async function loadPublicPagesFromStore(
  loader: () => Promise<Page[]> = getPages,
) {
  if (publicPagesCache) {
    return publicPagesCache
  }

  if (!publicPagesPromise) {
    publicPagesPromise = loader()
      .then(pages => primePublicPagesCache(pages))
      .catch(error => {
        publicPagesPromise = null
        throw error
      })
  }

  return publicPagesPromise
}
