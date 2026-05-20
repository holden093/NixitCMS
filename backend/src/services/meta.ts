import { config } from '../config'
import { buildAbsoluteMediaUrl, buildNewsArticleUrl, getLocalizedNewsValue } from '../lib/newsPayloads'
import { serviceUnavailable } from '../lib/http'

const META_GRAPH_BASE = 'https://graph.facebook.com/v20.0'
const EXPIRY_WARNING_MS = 7 * 24 * 60 * 60 * 1000

interface MetaApiPayload {
  error?: {
    message?: string
  }
  id?: string | number
}

type LocalizedArticle = {
  slug: string
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  bodyHtml_it: string
  bodyHtml_en: string
  featuredMedia: { key: string } | null
}

export function getNewsDeliveryCapabilities(now = new Date()) {
  const hasToken = Boolean(config.metaAccessToken)
  const expiresAt = config.metaAccessTokenExpiresAt
  const expired = Boolean(expiresAt && expiresAt.getTime() <= now.getTime())
  const expiresSoon = Boolean(
    expiresAt
    && expiresAt.getTime() > now.getTime()
    && expiresAt.getTime() - now.getTime() <= EXPIRY_WARNING_MS,
  )

  const newsletterConfigured = Boolean(config.smtpHost && config.smtpFrom)

  const facebookConfigured = Boolean(hasToken && config.metaFacebookPageId)
  const instagramConfigured = Boolean(hasToken && config.metaInstagramBusinessAccountId)

  return {
    newsletter: {
      configured: newsletterConfigured,
      available: newsletterConfigured,
    },
    facebook: {
      configured: facebookConfigured,
      available: facebookConfigured && !expired,
      expiresAt,
      expiresSoon,
      expired,
    },
    instagram: {
      configured: instagramConfigured,
      available: instagramConfigured && !expired,
      expiresAt,
      expiresSoon,
      expired,
    },
  }
}

async function postMetaForm(endpoint: string, body: URLSearchParams): Promise<MetaApiPayload> {
  const response = await fetch(`${META_GRAPH_BASE}${endpoint}`, {
    method: 'POST',
    body,
  })

  const payload = await response.json().catch(() => null) as MetaApiPayload | null

  if (!response.ok || payload?.error) {
    throw new Error(payload?.error?.message || `Meta API request failed with status ${response.status}`)
  }

  return payload ?? {}
}

export async function publishArticleToFacebook(article: LocalizedArticle, locale: 'it' | 'en') {
  const capabilities = getNewsDeliveryCapabilities()
  if (!capabilities.facebook.available) {
    serviceUnavailable('Facebook publishing is not available')
  }

  const localized = getLocalizedNewsValue(article, locale)
  const articleUrl = buildNewsArticleUrl(article.slug, locale)
  const message = [localized.title.trim(), localized.excerpt.trim()].filter(Boolean).join('\n\n')

  const body = new URLSearchParams({
    access_token: config.metaAccessToken,
    link: articleUrl,
    message,
  })

  await postMetaForm(`/${config.metaFacebookPageId}/feed`, body)
}

export async function publishArticleToInstagram(article: LocalizedArticle, locale: 'it' | 'en') {
  const capabilities = getNewsDeliveryCapabilities()
  if (!capabilities.instagram.available) {
    serviceUnavailable('Instagram publishing is not available')
  }

  if (!article.featuredMedia?.key) {
    throw new Error('Instagram publishing requires a featured image')
  }

  const localized = getLocalizedNewsValue(article, locale)
  const articleUrl = buildNewsArticleUrl(article.slug, locale)
  const caption = [localized.title.trim(), localized.excerpt.trim(), articleUrl]
    .filter(Boolean)
    .join('\n\n')

  const creation = await postMetaForm(`/${config.metaInstagramBusinessAccountId}/media`, new URLSearchParams({
    access_token: config.metaAccessToken,
    image_url: buildAbsoluteMediaUrl(article.featuredMedia.key, 'hero'),
    caption,
  }))

  if (!creation.id) {
    throw new Error('Instagram media creation did not return an id')
  }

  await postMetaForm(`/${config.metaInstagramBusinessAccountId}/media_publish`, new URLSearchParams({
    access_token: config.metaAccessToken,
    creation_id: String(creation.id),
  }))
}
