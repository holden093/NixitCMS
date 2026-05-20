import { useState } from 'react'

interface UseAdminEditorDialogOptions<TItem, TForm> {
  createEmptyForm: () => TForm
  mapItemToForm: (item: TItem) => TForm
}

export function useAdminEditorDialog<TItem, TForm>({
  createEmptyForm,
  mapItemToForm,
}: UseAdminEditorDialogOptions<TItem, TForm>) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TItem | null>(null)
  const [form, setForm] = useState<TForm>(createEmptyForm())

  const reset = () => {
    setEditingItem(null)
    setForm(createEmptyForm())
  }

  const close = () => {
    setIsOpen(false)
    reset()
  }

  const openCreate = () => {
    reset()
    setIsOpen(true)
  }

  const openEdit = (item: TItem) => {
    setEditingItem(item)
    setForm(mapItemToForm(item))
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    editingItem,
    form,
    setForm,
    isEditing: editingItem !== null,
    openCreate,
    openEdit,
    close,
    reset,
  }
}
