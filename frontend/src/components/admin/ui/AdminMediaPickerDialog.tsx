import SafeImage from '@/components/SafeImage'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { MediaFile } from '@/types/api'
import { AdminBadge } from './AdminBadge'
import { AdminDialog } from './AdminDialog'
import { AdminSearchInput } from './AdminSearchInput'

interface AdminMediaPickerDialogProps {
  open: boolean
  title: string
  description?: string
  selectedKey: string
  files: MediaFile[]
  search: string
  onSearchChange: (value: string) => void
  onSelect: (file: MediaFile) => void
  onOpenChange: (open: boolean) => void
}

export function AdminMediaPickerDialog({
  open,
  title,
  description = 'Scegli un\'immagine gia presente nella libreria media.',
  selectedKey,
  files,
  search,
  onSearchChange,
  onSelect,
  onOpenChange,
}: AdminMediaPickerDialogProps) {
  return (
    <AdminDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
    >
      <div className="space-y-5">
        <AdminSearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Cerca per etichetta, categoria o key"
        />

        {files.length === 0 ? (
          <div className="border border-dashed border-line bg-stone-50 px-4 py-8 text-center text-sm text-muted">
            Nessuna immagine disponibile nella libreria media.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {files.map(file => {
              const isSelected = selectedKey === file.key

              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => onSelect(file)}
                  className={`overflow-hidden border text-left transition ${
                    isSelected
                      ? 'border-ink'
                      : 'border-line bg-paper hover:border-ink'
                  }`}
                >
                  <SafeImage
                    src={getAdminMediaUrl(file.key, 'thumb')}
                    alt={file.label}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-2 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-medium text-ink">{file.label}</p>
                      {isSelected ? <AdminBadge tone="success">Selezionato</AdminBadge> : null}
                    </div>
                    <p className="truncate text-xs text-muted">{file.key}</p>
                    {(file.categories ?? []).length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {(file.categories ?? []).map(category => (
                          <AdminBadge key={category.photoCategory.id} tone="neutral">
                            {category.photoCategory.name_it}
                          </AdminBadge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </AdminDialog>
  )
}
