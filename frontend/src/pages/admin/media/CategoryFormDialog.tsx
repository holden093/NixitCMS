import type { FormEvent } from 'react'
import {
  AdminButton,
  AdminDialog,
  AdminField,
  AdminInput,
} from '@/components/admin/ui'
import type { CategoryForm } from './categoryForm'

interface CategoryFormDialogProps {
  open: boolean
  isEditing: boolean
  form: CategoryForm
  saving: boolean
  onOpenChange: (open: boolean) => void
  onChange: (nextForm: CategoryForm) => void
  onSubmit: () => Promise<void>
  onClose: () => void
}

export function CategoryFormDialog({
  open,
  isEditing,
  form,
  saving,
  onOpenChange,
  onChange,
  onSubmit,
  onClose,
}: CategoryFormDialogProps) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <AdminDialog
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) {
          onClose()
        } else {
          onOpenChange(nextOpen)
        }
      }}
      title={isEditing ? 'Modifica categoria' : 'Nuova categoria'}
      description="Definisci i nomi della categoria in entrambe le lingue e il suo ordine nella libreria media."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Nome in italiano"
            description="E il nome principale della categoria e viene usato anche per generare la slug."
          >
            <AdminInput
              value={form.name_it}
              onChange={event => onChange({ ...form, name_it: event.target.value })}
              placeholder="Camere"
              required
            />
          </AdminField>

          <AdminField
            label="Nome in inglese"
            description="Versione inglese dello stesso nome, utile per il back office bilingue."
          >
            <AdminInput
              value={form.name_en}
              onChange={event => onChange({ ...form, name_en: event.target.value })}
              placeholder="Rooms"
              required
            />
          </AdminField>
        </div>

        <AdminField
          label="Ordine"
          description="Le categorie con un numero piu basso compaiono prima nelle liste amministrative."
        >
          <AdminInput
            type="number"
            value={form.sortOrder}
            onChange={event => onChange({ ...form, sortOrder: Number(event.target.value) || 0 })}
          />
        </AdminField>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AdminButton kind="secondary" size="lg" onClick={onClose}>
            Annulla
          </AdminButton>
          <AdminButton type="submit" size="lg" loading={saving}>
            {isEditing ? 'Salva modifiche' : 'Crea categoria'}
          </AdminButton>
        </div>
      </form>
    </AdminDialog>
  )
}
