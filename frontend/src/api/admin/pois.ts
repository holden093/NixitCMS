import client from '../client'
import type { PointOfInterest } from '@/types/api'

export type PoiInput = Pick<
  PointOfInterest,
  'name_it' | 'name_en' | 'description_it' | 'description_en' | 'lat' | 'lng' | 'category'
>

export const getPois = () => client.get<PointOfInterest[]>('/admin/pois').then(r => r.data)
export const createPoi = (data: PoiInput) => client.post<PointOfInterest>('/admin/pois', data).then(r => r.data)
export const updatePoi = (id: number, data: PoiInput) =>
  client.put<PointOfInterest>(`/admin/pois/${id}`, data).then(r => r.data)
export const deletePoi = (id: number) =>
  client.delete(`/admin/pois/${id}`).then(r => r.data)
