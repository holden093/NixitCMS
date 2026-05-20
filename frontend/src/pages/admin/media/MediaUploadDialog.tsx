import { useEffect, useRef, useState } from 'react'
import {
  AdminBadge,
  AdminButton,
  AdminDialog,
  AdminField,
} from '@/components/admin/ui'
import type { PhotoCategoryWithCount } from '@/types/api'

interface MediaUploadDialogProps {
  open: boolean
  uploading: boolean
  categories: PhotoCategoryWithCount[]
  onOpenChange: (open: boolean) => void
  onSubmit: (files: File[], categoryIds: number[]) => Promise<boolean>
}

export function MediaUploadDialog({
  open,
  uploading,
  categories,
  onOpenChange,
  onSubmit,
}: MediaUploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])

  useEffect(() => {
    if (!open) {
      setSelectedFiles([])
      setSelectedCategoryIds([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds(current => (
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    ))
  }

  const handleSubmit = async () => {
    const ok = await onSubmit(selectedFiles, selectedCategoryIds)
    if (ok) {
      onOpenChange(false)
    }
  }

  return (
    <AdminDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Carica media"
      description="I file vengono salvati con key UUID opache. Le categorie restano opzionali ma aiutano ricerca e riuso."
    >
      <div className="space-y-6">
        <AdminField
          label="File da caricare"
          description="Puoi selezionare una o piu immagini in un solo passaggio."
        >
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={event => {
                setSelectedFiles(Array.from(event.target.files ?? []))
              }}
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-3">
              <AdminButton kind="secondary" onClick={() => fileInputRef.current?.click()} startIcon="image-plus">
                Scegli file
              </AdminButton>
              <AdminBadge tone={selectedFiles.length > 0 ? 'success' : 'neutral'}>
                {selectedFiles.length > 0 ? `${selectedFiles.length} selezionati` : 'Nessun file'}
              </AdminBadge>
            </div>

            {selectedFiles.length > 0 ? (
              <div className="max-h-44 space-y-2 overflow-y-auto rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3">
                {selectedFiles.map(file => (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm"
                  >
                    <span className="truncate font-medium text-slate-900">{file.name}</span>
                    <span className="shrink-0 text-xs text-slate-500">{Math.round(file.size / 1024)} KB</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.2rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                Nessun file selezionato.
              </div>
            )}
          </div>
        </AdminField>

        {categories.length > 0 ? (
          <AdminField
            label="Categorie opzionali"
            description="Le categorie selezionate verranno assegnate a tutti i file di questo upload."
          >
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const checked = selectedCategoryIds.includes(category.id)

                return (
                  <label
                    key={category.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      checked
                        ? 'border-blue-300 bg-blue-50 text-blue-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(category.id)}
                      className="accent-blue-600"
                    />
                    <span>{category.name_it}</span>
                  </label>
                )
              })}
            </div>
          </AdminField>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AdminButton kind="secondary" onClick={() => onOpenChange(false)}>
            Annulla
          </AdminButton>
          <AdminButton
            onClick={() => void handleSubmit()}
            loading={uploading}
            disabled={selectedFiles.length === 0}
          >
            {uploading ? 'Caricamento...' : 'Carica media'}
          </AdminButton>
        </div>
      </div>
    </AdminDialog>
  )
}
