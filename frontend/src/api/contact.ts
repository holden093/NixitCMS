import client from './client'
import type { ContactFormData } from '@/types/api'

export const sendContact = (data: ContactFormData) =>
  client.post('/contact', data).then(r => r.data)
