import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  createBookingProvider,
  deleteBookingProvider,
  getBookingProviders,
  updateBookingProvider,
} from '@/api/admin/booking'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { getBookingConfigError } from '@/lib/admin/validation/booking'
import { extractErrorMessage } from '@/utils/errors'
import type { BookingProvider, BookingProviderInput } from '@/types/api'
import {
  createEmptyBookingForm,
  mapBookingProviderToForm,
} from './bookingForm'

function sortProviders(items: BookingProvider[]) {
  return [...items].sort((left, right) => {
    if (left.order !== right.order) {
      return left.order - right.order
    }

    return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
  })
}

function mergeProviderState(current: BookingProvider[], nextProvider: BookingProvider, isNew: boolean) {
  const baseItems = nextProvider.isEnabled
    ? current.map(provider => (provider.id === nextProvider.id ? provider : { ...provider, isEnabled: false }))
    : current

  const merged = isNew
    ? [nextProvider, ...baseItems.filter(provider => provider.id !== nextProvider.id)]
    : baseItems.map(provider => (provider.id === nextProvider.id ? nextProvider : provider))

  return sortProviders(merged)
}

export function useBookingPage() {
  const crud = useAdminCrud<BookingProvider>({
    load: getBookingProviders,
    getSearchText: provider => `${provider.label} ${provider.type} ${provider.config}`,
    pageSize: 6,
    sort: sortProviders,
  })
  const editor = useAdminEditorDialog<BookingProvider, BookingProviderInput>({
    createEmptyForm: createEmptyBookingForm,
    mapItemToForm: mapBookingProviderToForm,
  })
  const [saving, setSaving] = useState(false)
  const [configError, setConfigError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<BookingProvider | null>(null)

  const enabledProviders = useMemo(
    () => crud.items.filter(provider => provider.isEnabled),
    [crud.items],
  )

  const validateConfig = (value: string) => {
    const nextError = getBookingConfigError(value)
    setConfigError(nextError)
    return !nextError
  }

  const handleSubmit = async () => {
    crud.setError('')

    if (!validateConfig(editor.form.config)) {
      return
    }

    setSaving(true)
    try {
      if (editor.editingItem) {
        const updated = await updateBookingProvider(editor.editingItem.id, editor.form)
        crud.replaceAll(mergeProviderState(crud.items, updated, false))
        toast.success('Salvato')
      } else {
        const created = await createBookingProvider(editor.form)
        crud.replaceAll(mergeProviderState(crud.items, created, true))
        toast.success('Creato')
      }

      setConfigError('')
      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare il provider.')
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
      await deleteBookingProvider(deleteTarget.id)
      crud.remove(deleteTarget.id)
      toast.success('Eliminato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare il provider.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  const toggleEnabled = async (provider: BookingProvider) => {
    crud.setError('')

    try {
      const updated = await updateBookingProvider(provider.id, { isEnabled: !provider.isEnabled })
      crud.replaceAll(mergeProviderState(crud.items, updated, false))
      toast.success('Salvato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile aggiornare lo stato del provider.')
      crud.setError(message)
      toast.error(message)
    }
  }

  const closeEditor = () => {
    setConfigError('')
    editor.close()
  }

  return {
    ...crud,
    ...editor,
    saving,
    configError,
    deleteTarget,
    setDeleteTarget,
    enabledProviders,
    validateConfig,
    handleSubmit,
    handleDelete,
    toggleEnabled,
    closeEditor,
  }
}
