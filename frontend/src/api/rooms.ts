import client from './client'
import type { RoomCategory } from '@/types/api'

export const getRooms = () => client.get<RoomCategory[]>('/rooms').then(r => r.data)
export const getRoom = (slug: string) => client.get<RoomCategory>(`/rooms/${slug}`).then(r => r.data)
