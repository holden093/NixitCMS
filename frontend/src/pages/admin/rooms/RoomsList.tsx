import SafeImage from '@/components/SafeImage'
import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminButton,
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeaderCell,
  AdminTableRow,
} from '@/components/admin/ui'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { RoomCategory } from '@/types/api'

function formatRoomPrice(value: number | null) {
  if (value == null) {
    return null
  }

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

interface RoomsListProps {
  items: RoomCategory[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (room: RoomCategory) => void
  onDelete: (room: RoomCategory) => void
}

export function RoomsList({
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
}: RoomsListProps) {
  const getPriceLabel = (value: number | null) => {
    const formatted = formatRoomPrice(value)
    return formatted ? `${formatted} / notte` : 'Prezzo da completare'
  }

  return (
    <AdminCollectionSection
      title="Catalogo camere"
      description="La slug viene derivata automaticamente dal nome italiano e aggiornata quando rinomini la categoria camera."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per nome, descrizione o slug"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessuna camera disponibile"
      emptyBody={totalItems === 0
        ? 'Crea la prima categoria camera per iniziare a popolare il percorso pubblico.'
        : 'Nessuna camera corrisponde alla ricerca attuale.'}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="space-y-4">
        <div className="space-y-3 md:hidden">
          {items.map(room => (
            <div key={room.id} className="admin-card p-5">
              <div className="flex items-start gap-4">
                <div className="h-16 w-20 shrink-0 overflow-hidden border border-line bg-stone-100">
                  {room.galleryPreview ? (
                    <SafeImage
                      src={getAdminMediaUrl(room.galleryPreview.key, 'thumb')}
                      alt={room.name_it}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-end bg-stone-200 p-3">
                      <p className="text-sm font-medium leading-none text-ink">{room.name_it}</p>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{room.name_it}</p>
                    <AdminBadge tone={room.isPublic ? 'success' : 'neutral'}>
                      {room.isPublic ? 'Pubblica' : 'Bozza'}
                    </AdminBadge>
                  </div>
                  <p className="text-sm text-muted">{room.name_en}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>{room.occupancy} ospiti</span>
                    <span>|</span>
                    <span>{room.sizeSqm} m²</span>
                    <span>|</span>
                    <span>{getPriceLabel(room.price)}</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-ink-soft">{room.description_it}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="space-y-1">
                  <p className="eyebrow">{room.slug}</p>
                  <p className="text-sm text-muted">Ordine visuale {room.sortOrder}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <AdminButton kind="secondary" onClick={() => onEdit(room)}>
                    Modifica
                  </AdminButton>
                  <AdminButton kind="danger" onClick={() => onDelete(room)}>
                    Elimina
                  </AdminButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <AdminTable>
            <AdminTableHead>
              <AdminTableRow data-variant="head">
                <AdminTableHeaderCell>Camera</AdminTableHeaderCell>
                <AdminTableHeaderCell>Stato</AdminTableHeaderCell>
                <AdminTableHeaderCell align="right">Ordine</AdminTableHeaderCell>
                <AdminTableHeaderCell>Slug</AdminTableHeaderCell>
                <AdminTableHeaderCell align="right">Azioni</AdminTableHeaderCell>
              </AdminTableRow>
            </AdminTableHead>
            <AdminTableBody>
              {items.map(room => (
                <AdminTableRow key={room.id} data-variant="body">
                  <AdminTableCell className="min-w-[28rem]">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-20 shrink-0 overflow-hidden border border-line bg-stone-100">
                        {room.galleryPreview ? (
                          <SafeImage
                            src={getAdminMediaUrl(room.galleryPreview.key, 'thumb')}
                            alt={room.name_it}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-end bg-stone-200 p-3">
                            <p className="text-sm font-medium leading-none text-ink">{room.name_it}</p>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-ink">{room.name_it}</p>
                          {room.photoCategory ? <AdminBadge tone="accent">{room.photoCategory.name_it}</AdminBadge> : null}
                          <AdminBadge tone="accent">{room.occupancy} ospiti</AdminBadge>
                          <AdminBadge tone="accent">{room.sizeSqm} m²</AdminBadge>
                          <AdminBadge tone="accent">{getPriceLabel(room.price)}</AdminBadge>
                        </div>
                        <p className="text-sm text-muted">{room.name_en}</p>
                        <p className="line-clamp-2 max-w-xl text-sm leading-6 text-ink-soft">{room.description_it}</p>
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="flex flex-col items-start gap-2">
                      <AdminBadge tone={room.isPublic ? 'success' : 'neutral'}>
                        {room.isPublic ? 'Pubblica' : 'Bozza'}
                      </AdminBadge>
                      <span className="text-xs text-muted">
                        {room.isPublic ? 'Visibile nel sito pubblico' : 'Non ancora pubblicata'}
                      </span>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell align="right">
                    <span className="font-medium tabular-nums text-ink">{room.sortOrder}</span>
                  </AdminTableCell>
                  <AdminTableCell>
                    <span className="eyebrow">{room.slug}</span>
                  </AdminTableCell>
                  <AdminTableCell align="right">
                    <div className="flex justify-end gap-2">
                      <AdminButton kind="secondary" onClick={() => onEdit(room)}>
                        Modifica
                      </AdminButton>
                      <AdminButton kind="danger" onClick={() => onDelete(room)}>
                        Elimina
                      </AdminButton>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))}
            </AdminTableBody>
          </AdminTable>
        </div>
      </div>
    </AdminCollectionSection>
  )
}
