import { config } from '../config'
import type { MediaVariantPreset } from '../services/images'

export const newsMediaInclude = {
  categories: {
    include: {
      photoCategory: true,
    },
  },
} as const

export const newsArticleInclude = {
  featuredMedia: {
    include: newsMediaInclude,
  },
} as const

type SerializableMediaFile = {
  id: number
  key: string
  thumbnailKey: string | null
  filename: string
  mimeType: string
  size: number
  isPublic: boolean
  uploadedAt: Date
  categories?: Array<{
    photoCategory: {
      id: number
      slug: string
      name_it: string
      name_en: string
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }
  }>
}

export type NewsArticleBase = {
  id: number
  slug: string
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  bodyJson_it: string
  bodyJson_en: string
  bodyHtml_it: string
  bodyHtml_en: string
  status: string
  publishToSite: boolean
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  featuredMediaId: number | null
  scheduledAt: Date | null
  publishedAt: Date | null
  newsletterDispatchedAt: Date | null
  newsletterError: string
  facebookPublishedAt: Date | null
  facebookError: string
  instagramPublishedAt: Date | null
  instagramError: string
  createdAt: Date
  updatedAt: Date
}

export type NewsArticleRecord = NewsArticleBase & {
  featuredMedia: SerializableMediaFile | null
}

export type NewsletterSubscriberRecord = {
  id: number
  email: string
  locale: string
  status: string
  requestedAt: Date
  confirmedAt: Date | null
  unsubscribedAt: Date | null
  lastConfirmationEmailSentAt: Date | null
  lastNewsletterSentAt: Date | null
  createdAt: Date
  updatedAt: Date
}

function serializeMediaFile<T extends SerializableMediaFile>(file: T) {
  const { filename, ...rest } = file
  return {
    ...rest,
    label: filename,
  }
}

function parseStoredJson(value: string) {
  if (!value.trim()) {
    return { type: 'doc', content: [] }
  }

  try {
    const parsed = JSON.parse(value)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed
    }
  } catch {
    // fall through to default
  }

  return { type: 'doc', content: [] }
}

export function slugifyNewsTitle(text: string) {
  return (
    text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  ) || 'news'
}

export function stripHtml(value: string) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export function normalizeNewsExcerpt(value: string, fallbackHtml: string) {
  const trimmed = value.trim()
  if (trimmed) {
    return trimmed
  }

  return stripHtml(fallbackHtml).slice(0, 220).trim()
}

export function normalizeNewsLocale(value: unknown): 'it' | 'en' | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.trim().toLowerCase()
  if (normalized === 'it' || normalized === 'en') {
    return normalized
  }

  return null
}

export function resolveNewsLocale(
  queryLocale: unknown,
  acceptLanguage: string | undefined,
  defaultLocale: string,
): 'it' | 'en' {
  const explicitLocale = normalizeNewsLocale(queryLocale)
  if (explicitLocale) {
    return explicitLocale
  }

  const normalizedDefault = normalizeNewsLocale(defaultLocale)
  const languageHeader = acceptLanguage?.toLowerCase() ?? ''
  if (languageHeader.includes('en') && normalizedDefault !== 'it') {
    return 'en'
  }

  if (languageHeader.includes('en') && !normalizedDefault) {
    return 'en'
  }

  return normalizedDefault ?? 'it'
}

export function buildAbsoluteMediaUrl(key: string, preset: MediaVariantPreset = 'hero') {
  return `${config.appOrigin}${config.mediaPublicBasePath}/${key}?variant=${preset}`
}

export function buildNewsArticleUrl(slug: string, locale: 'it' | 'en' = 'it') {
  return `${config.appOrigin}/news/${slug}${locale === 'en' ? '?lang=en' : ''}`
}

export function getLocalizedNewsValue<T extends Pick<NewsArticleBase, 'title_it' | 'title_en' | 'excerpt_it' | 'excerpt_en' | 'bodyHtml_it' | 'bodyHtml_en'>>(
  article: T,
  locale: 'it' | 'en',
) {
  return {
    title: locale === 'en' ? article.title_en : article.title_it,
    excerpt: locale === 'en' ? article.excerpt_en : article.excerpt_it,
    bodyHtml: locale === 'en' ? article.bodyHtml_en : article.bodyHtml_it,
  }
}

export function serializeAdminNewsArticle(article: NewsArticleRecord) {
  return {
    ...article,
    bodyJson_it: parseStoredJson(article.bodyJson_it),
    bodyJson_en: parseStoredJson(article.bodyJson_en),
    featuredMedia: article.featuredMedia ? serializeMediaFile(article.featuredMedia) : null,
  }
}

export function serializePublicNewsArticleSummary(article: NewsArticleRecord) {
  return {
    id: article.id,
    slug: article.slug,
    title_it: article.title_it,
    title_en: article.title_en,
    excerpt_it: article.excerpt_it,
    excerpt_en: article.excerpt_en,
    featuredMedia: article.featuredMedia ? serializeMediaFile(article.featuredMedia) : null,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  }
}

export function serializePublicNewsArticleDetail(article: NewsArticleRecord) {
  return {
    ...serializePublicNewsArticleSummary(article),
    bodyHtml_it: article.bodyHtml_it,
    bodyHtml_en: article.bodyHtml_en,
  }
}

export function serializeNewsletterSubscriber(subscriber: NewsletterSubscriberRecord) {
  return subscriber
}
