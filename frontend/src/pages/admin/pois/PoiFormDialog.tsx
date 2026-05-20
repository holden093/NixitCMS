import type { FormEvent } from 'react'
import {
  AdminButton,
  AdminDialog,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from '@/components/admin/ui'
import { CATEGORIES, CATEGORY_LABELS } from './usePoisPage'
import type { PoiFormState } from './poiForm'

interface PoiFormDialogProps {
  open: boolean
  isEditing: boolean
  form: PoiFormState
  formErrors: Record<string, string>
  saving: boolean
  onOpenChange: (open: boolean) => void
  onChange: (nextForm: PoiFormState) => void
  onValidateCoordinate: (field: 'lat' | 'lng', value: string) => boolean
  onSubmit: () => Promise<void>
  onClose: () => void
}

export function PoiFormDialog({
  open,
  isEditing,
  form,
  formErrors,
  saving,
  onOpenChange,
  onChange,
  onValidateCoordinate,
  onSubmit,
  onClose,
}: PoiFormDialogProps) {
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
      title={isEditing ? 'Modifica punto di interesse' : 'Nuovo punto di interesse'}
      description="Compila nome, categoria e coordinate con un percorso semplice prima di mostrare il marker sulla mappa pubblica."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Nome del luogo in italiano"
            description="E' il nome mostrato nella versione italiana del sito."
          >
            <AdminInput
              value={form.name_it}
              onChange={event => onChange({ ...form, name_it: event.target.value })}
              placeholder="Stazione ferroviaria"
              required
            />
          </AdminField>
          <AdminField
            label="Nome del luogo in inglese"
            description="Versione inglese dello stesso punto di interesse."
          >
            <AdminInput
              value={form.name_en}
              onChange={event => onChange({ ...form, name_en: event.target.value })}
              placeholder="Railway station"
              required
            />
          </AdminField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Latitudine"
            description="Inserisci la coordinata geografica nord-sud del punto."
          >
            <AdminInput
              type="number"
              step="any"
              value={form.lat}
              onChange={event => onChange({ ...form, lat: event.target.value })}
              onBlur={event => onValidateCoordinate('lat', event.target.value)}
              required
              aria-invalid={formErrors.lat ? true : undefined}
              aria-describedby={formErrors.lat ? 'lat-error' : undefined}
            />
            {formErrors.lat ? (
              <p id="lat-error" className="mt-1 text-xs text-red-600" aria-live="polite">
                {formErrors.lat}
              </p>
            ) : null}
          </AdminField>
          <AdminField
            label="Longitudine"
            description="Inserisci la coordinata geografica est-ovest del punto."
          >
            <AdminInput
              type="number"
              step="any"
              value={form.lng}
              onChange={event => onChange({ ...form, lng: event.target.value })}
              onBlur={event => onValidateCoordinate('lng', event.target.value)}
              required
              aria-invalid={formErrors.lng ? true : undefined}
              aria-describedby={formErrors.lng ? 'lng-error' : undefined}
            />
            {formErrors.lng ? (
              <p id="lng-error" className="mt-1 text-xs text-red-600" aria-live="polite">
                {formErrors.lng}
              </p>
            ) : null}
          </AdminField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Descrizione in italiano"
            description="Breve testo che aiuta l'ospite a capire perche' questo luogo e' utile o interessante."
          >
            <AdminTextarea
              value={form.description_it}
              onChange={event => onChange({ ...form, description_it: event.target.value })}
              placeholder="Una descrizione breve del punto di interesse nella versione italiana."
              rows={4}
            />
          </AdminField>
          <AdminField
            label="Descrizione in inglese"
            description="Versione inglese della stessa descrizione mostrata nella guida turistica."
          >
            <AdminTextarea
              value={form.description_en}
              onChange={event => onChange({ ...form, description_en: event.target.value })}
              placeholder="A short description of the point of interest for the English version."
              rows={4}
            />
          </AdminField>
        </div>

        <AdminField
          label="Categoria del punto"
          description="Serve a organizzare i marker e aiutare il visitatore a orientarsi."
        >
          <AdminSelect
            value={form.category}
            onChange={event => onChange({ ...form, category: event.target.value })}
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category] ?? category}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AdminButton kind="secondary" size="lg" onClick={onClose}>
            Annulla
          </AdminButton>
          <AdminButton type="submit" size="lg" loading={saving}>
            {isEditing ? 'Salva modifiche' : 'Crea punto'}
          </AdminButton>
        </div>
      </form>
    </AdminDialog>
  )
}
