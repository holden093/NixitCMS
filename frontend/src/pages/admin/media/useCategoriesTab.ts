import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  createPhotoCategory,
  deletePhotoCategory,
  getAdminPhotoCategories,
  updatePhotoCategory,
} from '@/api/admin/photoCategories'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { extractErrorMessage } from '@/utils/errors'
import type { PhotoCategoryWithCount } from '@/types/api'
import {
  createEmptyCategoryForm,
  mapCategoryToForm,
  toCategoryPayload,
  type CategoryForm,
} from './categoryForm'

export function useCategoriesTab() {
  const crud = useAdminCrud<PhotoCategoryWithCount>({
    load: getAdminPhotoCategories,
    getSearchText: category => `${category.name_it} ${category.name_en} ${category.slug}`,
    pageSize: 20,
    sort: items => [...items].sort((left, right) => left.sortOrder - right.sortOrder),
  })
  const editor = useAdminEditorDialog<PhotoCategoryWithCount, CategoryForm>({
    createEmptyForm: createEmptyCategoryForm,
    mapItemToForm: mapCategoryToForm,
  })
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<PhotoCategoryWithCount | null>(null)

  const handleSubmit = async () => {
    crud.setError('')

    const payload = toCategoryPayload(editor.form)
    if (!payload.name_it) {
      const message = 'Il nome in italiano e obbligatorio.'
      crud.setError(message)
      toast.error(message)
      return
    }

    setSaving(true)

    try {
      if (editor.editingItem) {
        const updated = await updatePhotoCategory(editor.editingItem.id, payload)
        crud.upsert(updated)
        toast.success('Salvato')
      } else {
        const created = await createPhotoCategory(payload)
        crud.upsert(created)
        toast.success('Creato')
      }

      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare la categoria fotografica.')
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
      await deletePhotoCategory(deleteTarget.id)
      crud.remove(deleteTarget.id)
      toast.success('Eliminato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare la categoria fotografica.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    ...crud,
    ...editor,
    saving,
    deleteTarget,
    setDeleteTarget,
    handleSubmit,
    handleDelete,
  }
}

export type UseCategoriesTabResult = ReturnType<typeof useCategoriesTab>
