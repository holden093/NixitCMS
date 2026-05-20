import client from '../client'
import type {
  AdminNewsArticle,
  AdminNewsStatusResponse,
  NewsArticleStatus,
  NewsRichTextDocument,
  NewsletterSubscriber,
} from '@/types/api'

export interface AdminNewsArticleInput {
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  bodyJson_it: NewsRichTextDocument
  bodyJson_en: NewsRichTextDocument
  bodyHtml_it: string
  bodyHtml_en: string
  status: NewsArticleStatus
  publishToSite: boolean
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  featuredMediaId: number | null
  scheduledAt: string | null
}

export function getAdminNewsArticles() {
  return client.get<AdminNewsArticle[]>('/admin/news/articles').then(response => response.data)
}

export function createAdminNewsArticle(data: AdminNewsArticleInput) {
  return client.post<AdminNewsArticle>('/admin/news/articles', data).then(response => response.data)
}

export function updateAdminNewsArticle(id: number, data: AdminNewsArticleInput) {
  return client.put<AdminNewsArticle>(`/admin/news/articles/${id}`, data).then(response => response.data)
}

export function deleteAdminNewsArticle(id: number) {
  return client.delete<{ ok: true }>(`/admin/news/articles/${id}`).then(response => response.data)
}

export function getAdminNewsletterSubscribers() {
  return client.get<NewsletterSubscriber[]>('/admin/news/subscribers').then(response => response.data)
}

export function updateAdminNewsletterSubscriberStatus(id: number, status: 'active' | 'unsubscribed') {
  return client.put<NewsletterSubscriber>(`/admin/news/subscribers/${id}/status`, { status }).then(response => response.data)
}

export function getAdminNewsStatus() {
  return client.get<AdminNewsStatusResponse>('/admin/news/status').then(response => response.data)
}
