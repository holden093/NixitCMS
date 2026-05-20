import { useEffect, useMemo, useState } from 'react'
import SafeImage from '@/components/SafeImage'
import {
  AdminBadge,
  AdminButton,
  AdminDialog,
  AdminField,
  AdminIcon,
  AdminInput,
} from '@/components/admin/ui'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { MediaFile, PhotoCategoryWithCount } from '@/types/api'
import { getMediaUsageLines, hasMediaUsage } from './mediaUsage'

interface MediaPreviewDialogProps {
  file: MediaFile | null
  open: boolean
  savingMetadata: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  formatBytes: (value: number) => string
  allCategories: PhotoCategoryWithCount[]
  onMetadataSave: (fileId: number, label: string, categoryIds: number[]) => Promise<void>
}

export function MediaPreviewDialog({
  file,
  open,
  savingMetadata,
  onOpenChange,
  onDelete,
  formatBytes,
  allCategories,
  onMetadataSave,
}: MediaPreviewDialogProps) {
  const [label, setLabel] = useState('')
  const [pendingCategoryIds, setPendingCategoryIds] = useState<number[]>([])
  const usageLines = useMemo(
    () => getMediaUsageLines(file?.usage),
    [file?.usage],
  )

  useEffect(() => {
    setLabel(file?.label ?? '')
    setPendingCategoryIds((file?.categories ?? []).map(category => category.photoCategory.id))
  }, [file])

  const toggleCategory = (categoryId: number) => {
    setPendingCategoryIds(current => (
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    ))
  }

  const hasChanges = file
    ? label.trim() !== file.label
      || pendingCategoryIds.length !== (file.categories ?? []).length
      || pendingCategoryIds.some(categoryId => !(file.categories ?? []).some(category => category.photoCategory.id === categoryId))
    : false

  return (
    <AdminDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Dettaglio media"
      description="Preview del file e metadati utili per ricerca, riuso e collegamenti editoriali."
    >
      {file ? (
        <div className="space-y-6">
          <div className="overflow-hidden border border-line bg-paper">
            {file.mimeType.startsWith('image/') ? (
              <SafeImage
                src={getAdminMediaUrl(file.key, 'content')}
                alt={file.label}
                className="max-h-[28rem] w-full object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center text-ink">
                <AdminIcon name="image" className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-line bg-paper px-5 py-4">
              <p className="eyebrow">Key tecnica</p>
              <p className="mt-2 break-all text-xs text-muted">{file.key}</p>
            </div>
            <div className="border border-line bg-paper px-5 py-4">
              <p className="eyebrow">Metadati</p>
              <p className="mt-2 text-sm text-ink">{file.mimeType}</p>
              <p className="mt-1 text-sm text-muted">{formatBytes(file.size)}</p>
            </div>
          </div>

          <AdminField
            label="Etichetta"
            description="E' il nome umano mostrato nel CMS. Non coincide con il nome fisico del file."
          >
            <AdminInput
              value={label}
              onChange={event => setLabel(event.target.value)}
              placeholder="media-xxxxxxxx"
            />
          </AdminField>

          {hasMediaUsage(file.usage) ? (
            <div className="border border-line bg-stone-100 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow">Utilizzi attivi</p>
                <AdminBadge tone="danger">Delete bloccata</AdminBadge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {usageLines.map(line => (
                  <AdminBadge key={line} tone="danger">{line}</AdminBadge>
                ))}
              </div>
            </div>
          ) : null}

          {allCategories.length > 0 && (
            <div className="border border-line bg-paper px-5 py-4">
              <p className="eyebrow">Categorie</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {allCategories.map(cat => {
                  const isChecked = pendingCategoryIds.includes(cat.id)
                  return (
                    <label
                      key={cat.id}
                      className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                        isChecked
                          ? 'border-ink bg-stone-100 text-ink'
                          : 'border-line bg-paper text-ink-soft hover:border-ink'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat.id)}
                        className="accent-ink"
                      />
                      {cat.name_it}
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <AdminButton kind="secondary" onClick={() => onOpenChange(false)}>
              Chiudi
            </AdminButton>
            <AdminButton
              kind="secondary"
              onClick={() => file && void onMetadataSave(file.id, label.trim(), pendingCategoryIds)}
              loading={savingMetadata}
              disabled={!hasChanges || !label.trim()}
            >
              Salva metadati
            </AdminButton>
            <AdminButton kind="danger" onClick={onDelete} disabled={hasMediaUsage(file.usage)}>
              Elimina file
            </AdminButton>
          </div>
        </div>
      ) : null}
    </AdminDialog>
  )
}
