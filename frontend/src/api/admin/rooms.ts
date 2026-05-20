import client from '../client'
import type { RoomCategory } from '@/types/api'

export type RoomCategoryInput = Pick<
  RoomCategory,
  | 'name_it'
  | 'name_en'
  | 'description_it'
  | 'description_en'
  | 'occupancy'
  | 'sizeSqm'
  | 'price'
  | 'isPublic'
  | 'sortOrder'
  | 'photoCategoryId'
  | 'previewMediaId'
>

export const getAdminRooms = () => client.get<RoomCategory[]>('/admin/rooms').then(r => r.data)
export const createRoom = (data: RoomCategoryInput) => client.post<RoomCategory>('/admin/rooms', data).then(r => r.data)
export const updateRoom = (id: number, data: Partial<RoomCategoryInput>) =>
  client.put<RoomCategory>(`/admin/rooms/${id}`, data).then(r => r.data)
export const deleteRoom = (id: number) =>
  client.delete(`/admin/rooms/${id}`).then(r => r.data)
