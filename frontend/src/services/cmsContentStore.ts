import { getContent } from '@/api/content'
import type { Content, PublicSiteSlug } from '@/types/api'

const contentCache = new Map<PublicSiteSlug, Content>()
const contentPromises = new Map<PublicSiteSlug, Promise<Content>>()

export function readCmsContentCache(slug: PublicSiteSlug) {
  return contentCache.get(slug) ?? null
}

export function primeCmsContentCache(content: Content) {
  const slug = content.pageSlug as PublicSiteSlug
  contentCache.set(slug, content)
  contentPromises.set(slug, Promise.resolve(content))
  return content
}

export function primeCmsContentEntries(entries: Content[]) {
  entries.forEach(entry => {
    primeCmsContentCache(entry)
  })
  return entries
}

export async function loadCmsContentFromStore(
  slug: PublicSiteSlug,
  loader: (nextSlug: PublicSiteSlug) => Promise<Content> = getContent,
) {
  const cached = contentCache.get(slug)
  if (cached) {
    return cached
  }

  if (!contentPromises.has(slug)) {
    const request = loader(slug)
      .then(entry => {
        primeCmsContentCache(entry)
        contentPromises.delete(slug)
        return entry
      })
      .catch(error => {
        contentPromises.delete(slug)
        throw error
      })
    contentPromises.set(slug, request)
  }

  return contentPromises.get(slug)!
}
