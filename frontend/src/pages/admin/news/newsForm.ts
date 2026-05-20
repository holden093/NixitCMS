import type { AdminNewsArticle, LocaleCode, NewsArticleStatus, NewsRichTextDocument } from '@/types/api'
import type { AdminNewsArticleInput } from '@/api/admin/news'

export interface NewsEditorValue {
  json: NewsRichTextDocument
  html: string
}

export interface NewsForm {
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  body_it: NewsEditorValue
  body_en: NewsEditorValue
  status: NewsArticleStatus
  scheduledAt: string
  publishToSite: boolean
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  featuredMediaId: string
}

export const EMPTY_EDITOR_DOCUMENT: NewsRichTextDocument = {
  type: 'doc',
  content: [],
}

function createEmptyEditorValue(): NewsEditorValue {
  return {
    json: EMPTY_EDITOR_DOCUMENT,
    html: '',
  }
}

export function createEmptyNewsForm(): NewsForm {
  return {
    title_it: '',
    title_en: '',
    excerpt_it: '',
    excerpt_en: '',
    body_it: createEmptyEditorValue(),
    body_en: createEmptyEditorValue(),
    status: 'draft',
    scheduledAt: '',
    publishToSite: true,
    publishToNewsletter: false,
    publishToFacebook: false,
    publishToInstagram: false,
    featuredMediaId: '',
  }
}

function toLocalDateTimeValue(value: string | null) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (input: number) => String(input).padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function mapAdminNewsArticleToForm(article: AdminNewsArticle): NewsForm {
  return {
    title_it: article.title_it,
    title_en: article.title_en,
    excerpt_it: article.excerpt_it,
    excerpt_en: article.excerpt_en,
    body_it: {
      json: article.bodyJson_it,
      html: article.bodyHtml_it,
    },
    body_en: {
      json: article.bodyJson_en,
      html: article.bodyHtml_en,
    },
    status: article.status,
    scheduledAt: toLocalDateTimeValue(article.scheduledAt),
    publishToSite: article.publishToSite,
    publishToNewsletter: article.publishToNewsletter,
    publishToFacebook: article.publishToFacebook,
    publishToInstagram: article.publishToInstagram,
    featuredMediaId: article.featuredMediaId != null ? String(article.featuredMediaId) : '',
  }
}

export function getNewsEditorValue(form: NewsForm, locale: LocaleCode): NewsEditorValue {
  return locale === 'en' ? form.body_en : form.body_it
}

export function toAdminNewsArticlePayload(form: NewsForm): AdminNewsArticleInput {
  return {
    title_it: form.title_it.trim(),
    title_en: form.title_en.trim(),
    excerpt_it: form.excerpt_it.trim(),
    excerpt_en: form.excerpt_en.trim(),
    bodyJson_it: form.body_it.json,
    bodyJson_en: form.body_en.json,
    bodyHtml_it: form.body_it.html,
    bodyHtml_en: form.body_en.html,
    status: form.status,
    scheduledAt: form.status === 'scheduled' && form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
    publishToSite: form.publishToSite,
    publishToNewsletter: form.publishToNewsletter,
    publishToFacebook: form.publishToFacebook,
    publishToInstagram: form.publishToInstagram,
    featuredMediaId: form.featuredMediaId ? Number(form.featuredMediaId) : null,
  }
}
