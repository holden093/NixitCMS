import type { RoomCategory } from '@/types/api'
import type { RoomCategoryInput } from '@/api/admin/rooms'

export type RoomForm = Omit<RoomCategoryInput, 'photoCategoryId' | 'previewMediaId' | 'occupancy' | 'sizeSqm' | 'price'> & {
  occupancy: string
  sizeSqm: string
  price: string
  photoCategoryId: string
  previewMediaId: string
}

export function createEmptyRoomForm(): RoomForm {
  return {
    name_it: '',
    name_en: '',
    description_it: '',
    description_en: '',
    occupancy: '',
    sizeSqm: '',
    price: '',
    isPublic: true,
    sortOrder: 0,
    photoCategoryId: '',
    previewMediaId: '',
  }
}

export function mapRoomToForm(room: RoomCategory): RoomForm {
  return {
    name_it: room.name_it,
    name_en: room.name_en,
    description_it: room.description_it,
    description_en: room.description_en,
    occupancy: String(room.occupancy),
    sizeSqm: String(room.sizeSqm),
    price: room.price != null ? String(room.price) : '',
    isPublic: room.isPublic,
    sortOrder: room.sortOrder,
    photoCategoryId: room.photoCategoryId != null ? String(room.photoCategoryId) : '',
    previewMediaId: room.previewMediaId != null ? String(room.previewMediaId) : '',
  }
}

export function toRoomPayload(form: RoomForm): RoomCategoryInput {
  return {
    ...form,
    occupancy: Number(form.occupancy),
    sizeSqm: Number(form.sizeSqm),
    price: form.price ? Number(form.price) : null,
    photoCategoryId: form.photoCategoryId ? Number(form.photoCategoryId) : null,
    previewMediaId: form.previewMediaId ? Number(form.previewMediaId) : null,
  }
}
