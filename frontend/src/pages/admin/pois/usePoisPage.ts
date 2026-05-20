import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { createPoi, deletePoi, getPois, updatePoi } from '@/api/admin/pois'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { getCoordinateError } from '@/lib/admin/validation/pois'
import { extractErrorMessage } from '@/utils/errors'
import type { PointOfInterest } from '@/types/api'
import {
  createEmptyPoiForm,
  mapPoiToForm,
  toPoiPayload,
  type PoiFormState,
} from './poiForm'

export const CATEGORIES = ['restaurant', 'transport', 'attraction', 'other']

export const CATEGORY_LABELS: Record<string, string> = {
  restaurant: 'Ristorazione',
  transport: 'Trasporti',
  attraction: 'Attrazioni',
  other: 'Altro',
}

export function usePoisPage() {
  const crud = useAdminCrud<PointOfInterest>({
    load: getPois,
    getSearchText: poi => [
      poi.name_it,
      poi.name_en,
      poi.description_it,
      poi.description_en,
      poi.category,
      poi.lat,
      poi.lng,
    ].join(' '),
    pageSize: 8,
  })
  const editor = useAdminEditorDialog<PointOfInterest, PoiFormState>({
    createEmptyForm: createEmptyPoiForm,
    mapItemToForm: mapPoiToForm,
  })
  const [saving, setSaving] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [deleteTarget, setDeleteTarget] = useState<PointOfInterest | null>(null)

  const validateCoordinate = (field: 'lat' | 'lng', value: string) => {
    const nextError = getCoordinateError(field, value)
    setFormErrors(current => {
      const next = { ...current }
      if (nextError) {
        next[field] = nextError
      } else {
        delete next[field]
      }
      return next
    })

    return !nextError
  }

  const categorySummary = useMemo(
    () => CATEGORIES.map(category => ({
      category,
      count: crud.items.filter(poi => poi.category === category).length,
    })),
    [crud.items],
  )

  const handleSubmit = async () => {
    crud.setError('')

    const latValid = validateCoordinate('lat', editor.form.lat)
    const lngValid = validateCoordinate('lng', editor.form.lng)
    if (!latValid || !lngValid) {
      return
    }

    const payload = toPoiPayload(editor.form)
    if (!payload) {
      crud.setError('Latitudine e longitudine devono essere numeri validi.')
      return
    }

    setSaving(true)
    try {
      if (editor.editingItem) {
        const updated = await updatePoi(editor.editingItem.id, payload)
        crud.upsert(updated)
        toast.success('Salvato')
      } else {
        const created = await createPoi(payload)
        crud.upsert(created)
        toast.success('Creato')
      }

      setFormErrors({})
      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare il punto di interesse.')
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
      await deletePoi(deleteTarget.id)
      crud.remove(deleteTarget.id)
      toast.success('Eliminato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare il punto di interesse.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  const closeEditor = () => {
    setFormErrors({})
    editor.close()
  }

  return {
    ...crud,
    ...editor,
    saving,
    formErrors,
    setFormErrors,
    deleteTarget,
    setDeleteTarget,
    categorySummary,
    validateCoordinate,
    handleSubmit,
    handleDelete,
    closeEditor,
  }
}
