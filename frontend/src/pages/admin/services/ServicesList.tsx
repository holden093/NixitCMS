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
import type { Service } from '@/types/api'

interface ServicesListProps {
  items: Service[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (service: Service) => void
  onDelete: (service: Service) => void
}

export function ServicesList({
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
}: ServicesListProps) {
  return (
    <AdminCollectionSection
      title="Catalogo servizi"
      description="La slug viene derivata automaticamente dal nome italiano e aggiornata quando rinomini il servizio."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per nome, descrizione o slug"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessun servizio disponibile"
      emptyBody={totalItems === 0
        ? 'Crea il primo servizio per iniziare a popolare l’offerta pubblica.'
        : 'Nessun servizio corrisponde alla ricerca attuale.'}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="space-y-4">
        <div className="space-y-3 md:hidden">
          {items.map(service => (
            <div
              key={service.id}
              className="admin-card p-5"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-20 shrink-0 overflow-hidden border border-line bg-stone-100">
                  {service.galleryPreview ? (
                    <SafeImage
                      src={getAdminMediaUrl(service.galleryPreview.key, 'thumb')}
                      alt={service.name_it}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-end bg-stone-200 p-3">
                      <p className="text-sm font-medium leading-none text-ink">{service.name_it}</p>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{service.name_it}</p>
                    <AdminBadge tone={service.isPublic ? 'success' : 'neutral'}>
                      {service.isPublic ? 'Pubblico' : 'Bozza'}
                    </AdminBadge>
                  </div>
                  <p className="text-sm text-muted">{service.name_en}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    {service.photoCategory ? (
                      <>
                        <span>{service.photoCategory.name_it}</span>
                        <span>|</span>
                        <span>{service.galleryCount} foto</span>
                      </>
                    ) : (
                      <span>Senza galleria</span>
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-ink-soft">{service.description_it}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="space-y-1">
                  <p className="eyebrow">{service.slug}</p>
                  <p className="text-sm text-muted">Ordine visuale {service.sortOrder}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <AdminButton kind="secondary" onClick={() => onEdit(service)}>
                    Modifica
                  </AdminButton>
                  <AdminButton kind="danger" onClick={() => onDelete(service)}>
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
                <AdminTableHeaderCell>Servizio</AdminTableHeaderCell>
                <AdminTableHeaderCell>Stato</AdminTableHeaderCell>
                <AdminTableHeaderCell align="right">Ordine</AdminTableHeaderCell>
                <AdminTableHeaderCell>Slug</AdminTableHeaderCell>
                <AdminTableHeaderCell align="right">Azioni</AdminTableHeaderCell>
              </AdminTableRow>
            </AdminTableHead>
            <AdminTableBody>
              {items.map(service => (
                <AdminTableRow key={service.id} data-variant="body">
                  <AdminTableCell className="min-w-[26rem]">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-20 shrink-0 overflow-hidden border border-line bg-stone-100">
                        {service.galleryPreview ? (
                          <SafeImage
                            src={getAdminMediaUrl(service.galleryPreview.key, 'thumb')}
                            alt={service.name_it}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-end bg-stone-200 p-3">
                            <p className="text-sm font-medium leading-none text-ink">{service.name_it}</p>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-ink">{service.name_it}</p>
                          {service.photoCategory ? <AdminBadge tone="accent">{service.photoCategory.name_it}</AdminBadge> : null}
                          <AdminBadge tone={service.galleryCount > 0 ? 'accent' : 'neutral'}>
                            {service.galleryCount > 0 ? `${service.galleryCount} foto` : 'Senza foto'}
                          </AdminBadge>
                        </div>
                        <p className="text-sm text-muted">{service.name_en}</p>
                        <p className="line-clamp-2 max-w-xl text-sm leading-6 text-ink-soft">{service.description_it}</p>
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="flex flex-col items-start gap-2">
                      <AdminBadge tone={service.isPublic ? 'success' : 'neutral'}>
                        {service.isPublic ? 'Pubblico' : 'Bozza'}
                      </AdminBadge>
                      <span className="text-xs text-muted">
                        {service.isPublic ? 'Visibile nel sito pubblico' : 'Non ancora pubblicato'}
                      </span>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell align="right">
                    <span className="font-medium tabular-nums text-ink">{service.sortOrder}</span>
                  </AdminTableCell>
                  <AdminTableCell>
                    <span className="eyebrow">{service.slug}</span>
                  </AdminTableCell>
                  <AdminTableCell align="right">
                    <div className="flex justify-end gap-2">
                      <AdminButton kind="secondary" onClick={() => onEdit(service)}>
                        Modifica
                      </AdminButton>
                      <AdminButton kind="danger" onClick={() => onDelete(service)}>
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
