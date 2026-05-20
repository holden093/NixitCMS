import client from '../client'
import type { Service } from '@/types/api'

export type ServiceInput = Pick<
  Service,
  | 'name_it'
  | 'name_en'
  | 'description_it'
  | 'description_en'
  | 'isPublic'
  | 'sortOrder'
  | 'photoCategoryId'
  | 'previewMediaId'
>

export const getAdminServices = () => client.get<Service[]>('/admin/services').then(r => r.data)
export const createService = (data: ServiceInput) => client.post<Service>('/admin/services', data).then(r => r.data)
export const updateService = (id: number, data: Partial<ServiceInput>) =>
  client.put<Service>(`/admin/services/${id}`, data).then(r => r.data)
export const deleteService = (id: number) =>
  client.delete(`/admin/services/${id}`).then(r => r.data)
