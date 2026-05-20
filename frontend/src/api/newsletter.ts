import client from './client'
import type { NewsletterSubscribeInput } from '@/types/api'

export function subscribeNewsletter(data: NewsletterSubscribeInput) {
  return client.post<{ ok: true; status: 'pending' | 'active' }>('/newsletter/subscribe', data)
    .then(response => response.data)
}
