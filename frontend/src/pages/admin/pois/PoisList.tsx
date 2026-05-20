import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminButton,
} from '@/components/admin/ui'
import type { PointOfInterest } from '@/types/api'
import { CATEGORY_LABELS } from './usePoisPage'

interface PoisListProps {
  items: PointOfInterest[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (poi: PointOfInterest) => void
  onDelete: (poi: PointOfInterest) => void
}

export function PoisList({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: PoisListProps) {
  return (
    <AdminCollectionSection
      title="Mappa e dintorni"
      description="Ogni punto contiene coordinate precise, doppia localizzazione e una descrizione pubblica per la guida turistica."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per nome, descrizione, categoria o coordinate"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessun punto disponibile"
      emptyBody={totalItems === 0
        ? 'Aggiungi i primi riferimenti per la mappa del territorio.'
        : 'La ricerca non ha restituito alcun punto di interesse.'}
      skeletonCount={5}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <>
        {items.map(poi => (
          <div
            key={poi.id}
            className="admin-card flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-ink">{poi.name_it}</p>
                <AdminBadge tone="accent">{CATEGORY_LABELS[poi.category] ?? poi.category}</AdminBadge>
              </div>
              <p className="text-sm text-muted">{poi.name_en}</p>
              {poi.description_it ? (
                <p className="line-clamp-2 max-w-2xl text-sm leading-6 text-ink-soft">
                  {poi.description_it}
                </p>
              ) : null}
              <p className="text-sm text-ink">{poi.lat}, {poi.lng}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <AdminButton kind="secondary" onClick={() => onEdit(poi)}>
                Modifica
              </AdminButton>
              <AdminButton kind="danger" onClick={() => onDelete(poi)}>
                Elimina
              </AdminButton>
            </div>
          </div>
        ))}
      </>
    </AdminCollectionSection>
  )
}
