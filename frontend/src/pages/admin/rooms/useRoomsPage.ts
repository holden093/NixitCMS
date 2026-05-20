import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  createRoom,
  deleteRoom,
  getAdminRooms,
  updateRoom,
} from '@/api/admin/rooms'
import { getAdminMedia } from '@/api/admin/media'
import { getAdminPhotoCategories } from '@/api/admin/photoCategories'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { extractErrorMessage } from '@/utils/errors'
import type { MediaFile, PhotoCategoryWithCount, RoomCategory } from '@/types/api'
import {
  createEmptyRoomForm,
  mapRoomToForm,
  toRoomPayload,
  type RoomForm,
} from './roomForm'

export function useRoomsPage() {
  const crud = useAdminCrud<RoomCategory>({
    load: getAdminRooms,
    getSearchText: room => `${room.name_it} ${room.name_en} ${room.description_it} ${room.slug} ${room.photoCategory?.name_it ?? ''} ${room.photoCategory?.name_en ?? ''}`,
    pageSize: 6,
    sort: items => [...items].sort((left, right) => left.sortOrder - right.sortOrder),
  })
  const editor = useAdminEditorDialog<RoomCategory, RoomForm>({
    createEmptyForm: createEmptyRoomForm,
    mapItemToForm: mapRoomToForm,
  })
  const [photoCategories, setPhotoCategories] = useState<PhotoCategoryWithCount[]>([])
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<RoomCategory | null>(null)

  useEffect(() => {
    getAdminPhotoCategories()
      .then(setPhotoCategories)
      .catch(() => { /* non-blocking */ })
    getAdminMedia()
      .then(files => setMediaFiles(files.filter(file => file.mimeType.startsWith('image/'))))
      .catch(() => { /* non-blocking */ })
  }, [])

  const publicRoomsCount = useMemo(
    () => crud.items.filter(room => room.isPublic).length,
    [crud.items],
  )

  const roomsWithGalleryCount = useMemo(
    () => crud.items.filter(room => room.photoCategoryId != null).length,
    [crud.items],
  )

  const handleSubmit = async () => {
    crud.setError('')
    setSaving(true)

    try {
      const payload = toRoomPayload(editor.form)

      if (editor.editingItem) {
        const updated = await updateRoom(editor.editingItem.id, payload)
        crud.upsert(updated)
        toast.success('Salvato')
      } else {
        const created = await createRoom(payload)
        crud.upsert(created)
        toast.success('Creato')
      }

      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare la camera.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    crud.setError('')

    try {
      await deleteRoom(deleteTarget.id)
      crud.remove(deleteTarget.id)
      toast.success('Eliminato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare la camera.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    ...crud,
    ...editor,
    photoCategories,
    mediaFiles,
    saving,
    deleteTarget,
    setDeleteTarget,
    publicRoomsCount,
    roomsWithGalleryCount,
    handleSubmit,
    handleDelete,
  }
}
