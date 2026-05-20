import SafeImage from '@/components/SafeImage'
import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminButton,
  AdminIcon,
} from '@/components/admin/ui'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { MediaFile, PhotoCategoryWithCount } from '@/types/api'
import { hasMediaUsage } from './mediaUsage'

export type MediaCategoryFilter = 'all' | 'none' | number

interface MediaGridProps {
  items: MediaFile[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onOpen: (file: MediaFile) => void
  onDelete: (file: MediaFile) => void
  formatBytes: (value: number) => string
  categories: PhotoCategoryWithCount[]
  categoryFilter: MediaCategoryFilter
  onCategoryFilterChange: (value: MediaCategoryFilter) => void
}

export function MediaGrid({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onOpen,
  onDelete,
  formatBytes,
  categories,
  categoryFilter,
  onCategoryFilterChange,
}: MediaGridProps) {
  const filterButton = (value: MediaCategoryFilter, label: string) => {
    const isActive = categoryFilter === value
    return (
      <button
        key={String(value)}
        type="button"
        onClick={() => onCategoryFilterChange(value)}
        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
          isActive
            ? 'border-ink bg-ink text-white'
            : 'border-line bg-white text-muted hover:border-ink hover:text-ink'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <AdminCollectionSection
      title="Archivio visuale"
      description="Trova, riapri e riusa immagini e asset del sito con una griglia piu pulita e piu facile da leggere."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per etichetta, categoria, MIME type o key"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessun media disponibile"
      emptyBody={totalItems === 0
        ? 'Carica il primo asset visivo per iniziare a costruire il sito pubblico.'
        : 'La ricerca non ha prodotto risultati. Prova con un termine diverso.'}
      skeletonCount={6}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filterButton('all', 'Tutte')}
        {filterButton('none', 'Senza categoria')}
        {categories.map(cat => filterButton(cat.id, cat.name_it))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(file => (
          <div
            key={file.id}
            className="admin-card overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onOpen(file)}
              className="block w-full text-left"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                {file.mimeType.startsWith('image/') ? (
                  <SafeImage
                    src={getAdminMediaUrl(file.key, 'thumb')}
                    alt={file.label}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink">
                    <AdminIcon name="image" className="h-10 w-10" />
                  </div>
                )}
              </div>
            </button>

            <div className="space-y-4 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <AdminBadge tone="accent">{file.mimeType.startsWith('image/') ? 'Immagine' : 'Asset'}</AdminBadge>
                {file.thumbnailKey ? <AdminBadge tone="success">Thumbnail</AdminBadge> : null}
                {hasMediaUsage(file.usage) ? <AdminBadge tone="danger">In uso</AdminBadge> : null}
              </div>

              <div className="space-y-1">
                <p className="truncate font-semibold text-ink">{file.label}</p>
                <p className="truncate text-xs text-muted">{file.key}</p>
                <p className="text-xs text-muted">{file.mimeType} · {formatBytes(file.size)}</p>
                {(file.categories ?? []).length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(file.categories ?? []).map(category => (
                      <AdminBadge key={category.photoCategory.id} tone="neutral">
                        {category.photoCategory.name_it}
                      </AdminBadge>
                    ))}
                  </div>
                ) : (
                  <p className="pt-2 text-xs text-muted">Nessuna categoria</p>
                )}
              </div>

              <div className="flex gap-2">
                <AdminButton kind="secondary" size="sm" onClick={() => onOpen(file)}>
                  Apri
                </AdminButton>
                <AdminButton kind="danger" size="sm" startIcon="trash-2" onClick={() => onDelete(file)}>
                  Elimina
                </AdminButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminCollectionSection>
  )
}
