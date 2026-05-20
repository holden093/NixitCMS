import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  createService,
  deleteService,
  getAdminServices,
  updateService,
} from '@/api/admin/services'
import { getAdminMedia } from '@/api/admin/media'
import { getAdminPhotoCategories } from '@/api/admin/photoCategories'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { extractErrorMessage } from '@/utils/errors'
import type { MediaFile, PhotoCategoryWithCount, Service } from '@/types/api'
import {
  createEmptyServiceForm,
  mapServiceToForm,
  toServicePayload,
  type ServiceForm,
} from './serviceForm'

export function useServicesPage() {
  const crud = useAdminCrud<Service>({
    load: getAdminServices,
    getSearchText: service => `${service.name_it} ${service.name_en} ${service.description_it} ${service.slug} ${service.photoCategory?.name_it ?? ''} ${service.photoCategory?.name_en ?? ''}`,
    pageSize: 6,
    sort: items => [...items].sort((left, right) => left.sortOrder - right.sortOrder),
  })
  const editor = useAdminEditorDialog<Service, ServiceForm>({
    createEmptyForm: createEmptyServiceForm,
    mapItemToForm: mapServiceToForm,
  })
  const [photoCategories, setPhotoCategories] = useState<PhotoCategoryWithCount[]>([])
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)

  useEffect(() => {
    getAdminPhotoCategories()
      .then(setPhotoCategories)
      .catch(() => { /* non-blocking */ })
    getAdminMedia()
      .then(files => setMediaFiles(files.filter(f => f.mimeType.startsWith('image/'))))
      .catch(() => { /* non-blocking */ })
  }, [])

  const publicServicesCount = useMemo(
    () => crud.items.filter(service => service.isPublic).length,
    [crud.items],
  )

  const servicesWithGalleryCount = useMemo(
    () => crud.items.filter(service => service.photoCategoryId != null).length,
    [crud.items],
  )

  const handleSubmit = async () => {
    crud.setError('')
    setSaving(true)

    try {
      const payload = toServicePayload(editor.form)

      if (editor.editingItem) {
        const updated = await updateService(editor.editingItem.id, payload)
        crud.upsert(updated)
        toast.success('Salvato')
      } else {
        const created = await createService(payload)
        crud.upsert(created)
        toast.success('Creato')
      }

      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare il servizio.')
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
      await deleteService(deleteTarget.id)
      crud.remove(deleteTarget.id)
      toast.success('Eliminato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare il servizio.')
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
    publicServicesCount,
    servicesWithGalleryCount,
    handleSubmit,
    handleDelete,
  }
}
