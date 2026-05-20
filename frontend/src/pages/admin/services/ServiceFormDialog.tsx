import { useMemo, type FormEvent } from 'react'
import SafeImage from '@/components/SafeImage'
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminDialog,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminSwitch,
  AdminTextarea,
} from '@/components/admin/ui'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { MediaFile, PhotoCategoryWithCount } from '@/types/api'
import type { ServiceForm } from './serviceForm'

interface ServiceFormDialogProps {
  open: boolean
  isEditing: boolean
  form: ServiceForm
  photoCategories: PhotoCategoryWithCount[]
  mediaFiles: MediaFile[]
  saving: boolean
  onOpenChange: (open: boolean) => void
  onChange: (nextForm: ServiceForm) => void
  onSubmit: () => Promise<void>
  onClose: () => void
}

export function ServiceFormDialog({
  open,
  isEditing,
  form,
  photoCategories,
  mediaFiles,
  saving,
  onOpenChange,
  onChange,
  onSubmit,
  onClose,
}: ServiceFormDialogProps) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit()
  }

  const selectedCategory = photoCategories.find(category => String(category.id) === form.photoCategoryId) ?? null

  const categoryMedia = useMemo(() => {
    if (!selectedCategory) return []
    return mediaFiles.filter(file =>
      file.categories?.some(c => c.photoCategory.id === selectedCategory.id),
    )
  }, [mediaFiles, selectedCategory])

  const selectedPreview = useMemo(
    () => categoryMedia.find(file => String(file.id) === form.previewMediaId) ?? null,
    [categoryMedia, form.previewMediaId],
  )

  const handleCategoryChange = (nextValue: string) => {
    // Reset preview if it doesn't belong to the new category
    const stillValid = nextValue
      ? mediaFiles.some(
          f =>
            String(f.id) === form.previewMediaId &&
            f.categories?.some(c => String(c.photoCategory.id) === nextValue),
        )
      : false
    onChange({
      ...form,
      photoCategoryId: nextValue,
      previewMediaId: stillValid ? form.previewMediaId : '',
    })
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
      title={isEditing ? 'Modifica servizio' : 'Nuovo servizio'}
      description="Compila nome, descrizione e galleria del servizio con un percorso semplice e guidato."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
            <div className="border-b border-slate-200/80 px-6 py-5">
              <h3 className="text-base font-semibold text-slate-900">Testi del servizio</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Scrivi come vuoi presentare questo servizio in italiano e in inglese.
              </p>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="grid gap-6 md:grid-cols-2">
                <AdminField
                  label="Nome del servizio in italiano"
                  description="Il titolo che vedranno i visitatori nella versione italiana del sito."
                >
                  <AdminInput
                    value={form.name_it}
                    onChange={event => onChange({ ...form, name_it: event.target.value })}
                    placeholder="Colazione lenta"
                    required
                  />
                </AdminField>
                <AdminField
                  label="Nome del servizio in inglese"
                  description="Lo stesso titolo, adattato per la versione inglese del sito."
                >
                  <AdminInput
                    value={form.name_en}
                    onChange={event => onChange({ ...form, name_en: event.target.value })}
                    placeholder="Slow breakfast"
                    required
                  />
                </AdminField>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <AdminField
                  label="Descrizione in italiano"
                  description="Spiega in modo semplice cosa offre questo servizio e perche e utile."
                >
                  <AdminTextarea
                    rows={7}
                    value={form.description_it}
                    onChange={event => onChange({ ...form, description_it: event.target.value })}
                    placeholder="Racconta benefici, atmosfera e dettagli concreti del servizio."
                  />
                </AdminField>
                <AdminField
                  label="Descrizione in inglese"
                  description="Versione inglese dello stesso testo, con tono coerente e chiaro."
                >
                  <AdminTextarea
                    rows={7}
                    value={form.description_en}
                    onChange={event => onChange({ ...form, description_en: event.target.value })}
                    placeholder="Explain the same service clearly for English-speaking guests."
                  />
                </AdminField>
              </div>
            </div>
          </AdminCard>

          <div className="space-y-6">
            <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
              <div className="border-b border-slate-200/80 px-6 py-5">
                <h3 className="text-base font-semibold text-slate-900">Galleria e pubblicazione</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Collega una categoria fotografica, decidi l'ordine e pubblica il servizio quando e pronto.
                </p>
              </div>

              <div className="space-y-6 px-6 py-6">
                <AdminField
                  label="Categoria fotografica"
                  description="Associa una galleria fotografica a questo servizio. La prima foto della categoria verra usata come anteprima nelle card pubbliche."
                  hint="Le categorie si gestiscono dalla libreria media del CMS."
                >
                  <AdminSelect
                    value={form.photoCategoryId}
                    onChange={event => handleCategoryChange(event.target.value)}
                  >
                    <option value="">Nessuna categoria</option>
                    {photoCategories.map(cat => (
                      <option key={cat.id} value={String(cat.id)}>
                        {cat.name_it} ({cat._count.media} foto)
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>

                <AdminField
                  label="Posizione nell'elenco"
                  description="I numeri piu bassi fanno comparire il servizio prima degli altri."
                >
                  <AdminInput
                    type="number"
                    value={form.sortOrder}
                    onChange={event => onChange({ ...form, sortOrder: Number(event.target.value) || 0 })}
                  />
                </AdminField>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <AdminSwitch
                    checked={form.isPublic}
                    onCheckedChange={checked => onChange({ ...form, isPublic: checked })}
                    label="Mostra questo servizio nel sito pubblico"
                  />
                </div>
              </div>
            </AdminCard>

            <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
              <div className="border-b border-slate-200/80 px-6 py-5">
                <h3 className="text-base font-semibold text-slate-900">Anteprima nella homepage</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Scegli quale foto della categoria deve apparire nella card di questo servizio.
                </p>
              </div>

              <div className="space-y-4 px-6 py-6">
                {!selectedCategory ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500">
                    Seleziona prima una categoria fotografica per scegliere l'anteprima.
                  </div>
                ) : categoryMedia.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500">
                    Questa categoria non contiene ancora foto. Aggiungile dalla libreria media.
                  </div>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      {selectedPreview ? (
                        <SafeImage
                          src={getAdminMediaUrl(selectedPreview.key, 'card')}
                          alt={selectedPreview.label}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                          {form.previewMediaId
                            ? 'Anteprima non disponibile in questa categoria'
                            : 'Verra usata automaticamente la prima foto della categoria'}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      <button
                        type="button"
                        onClick={() => onChange({ ...form, previewMediaId: '' })}
                        className={`flex h-20 items-center justify-center border text-xs leading-tight ${
                          form.previewMediaId === ''
                            ? 'border-ink bg-stone-100 text-ink'
                            : 'border-line bg-white text-muted hover:border-ink'
                        }`}
                      >
                        Auto<br />(prima foto)
                      </button>
                      {categoryMedia.map(file => {
                        const isSelected = String(file.id) === form.previewMediaId
                        return (
                          <button
                            key={file.id}
                            type="button"
                            onClick={() => onChange({ ...form, previewMediaId: String(file.id) })}
                            className={`relative h-20 overflow-hidden border ${
                              isSelected ? 'border-ink ring-2 ring-ink' : 'border-line hover:border-ink'
                            }`}
                            title={file.label}
                          >
                            <SafeImage
                              src={getAdminMediaUrl(file.key, 'thumb')}
                              alt={file.label}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <AdminBadge tone="accent">{categoryMedia.length} foto</AdminBadge>
                      <AdminBadge tone="neutral">{selectedCategory.slug}</AdminBadge>
                    </div>
                  </>
                )}
              </div>
            </AdminCard>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <AdminButton kind="secondary" size="lg" onClick={onClose}>
            Annulla
          </AdminButton>
          <AdminButton type="submit" size="lg" loading={saving}>
            {saving ? 'Salvataggio...' : isEditing ? 'Salva modifiche' : 'Crea servizio'}
          </AdminButton>
        </div>
      </form>
    </AdminDialog>
  )
}
