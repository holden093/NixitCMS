import client from './client'
import type { NewsArticleDetail, NewsArticleSummary } from '@/types/api'

export function getNews(limit?: number) {
  return client.get<NewsArticleSummary[]>('/news', {
    params: limit ? { limit } : undefined,
  }).then(response => response.data)
}

export function getNewsArticle(slug: string) {
  return client.get<NewsArticleDetail>(`/news/${slug}`).then(response => response.data)
}
