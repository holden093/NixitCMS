import client from './client'
import type { Service } from '@/types/api'

export const getServices = () => client.get<Service[]>('/services').then(r => r.data)
export const getService = (slug: string) => client.get<Service>(`/services/${slug}`).then(r => r.data)
