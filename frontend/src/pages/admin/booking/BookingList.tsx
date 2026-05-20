import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminButton,
} from '@/components/admin/ui'
import type { BookingProvider } from '@/types/api'

interface BookingListProps {
  items: BookingProvider[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onToggleEnabled: (provider: BookingProvider) => void
  onEdit: (provider: BookingProvider) => void
  onDelete: (provider: BookingProvider) => void
}

export function BookingList({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onToggleEnabled,
  onEdit,
  onDelete,
}: BookingListProps) {
  return (
    <AdminCollectionSection
      title="Provider di prenotazione"
      description="Qui vedi a colpo d'occhio quale provider e attivo, in che ordine compare e come intervenire."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per nome provider o tipologia"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessun provider configurato"
      emptyBody={totalItems === 0
        ? 'Aggiungi il primo provider per abilitare la prenotazione dal sito pubblico.'
        : 'Nessun provider corrisponde ai filtri di ricerca attuali.'}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <>
        {items.map(provider => (
          <div
            key={provider.id}
            className="admin-card flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-start lg:justify-between"
          >
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-ink">{provider.label}</p>
                <AdminBadge tone="accent">{provider.type}</AdminBadge>
                <AdminBadge tone={provider.isEnabled ? 'success' : 'neutral'}>
                  {provider.isEnabled ? 'Attivo' : 'Disabilitato'}
                </AdminBadge>
              </div>
              <p className="text-sm text-muted">Posizione nella lista: {provider.order}</p>
              <p className="bg-stone-50 px-4 py-3 text-sm leading-6 text-ink-soft">
                {provider.type === 'octorate'
                  ? 'Configurazione Octorate pronta per il widget di prenotazione.'
                  : 'Configurazione personalizzata per integrazione Gestore Alberghi.'}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <AdminButton kind="secondary" size="sm" onClick={() => onToggleEnabled(provider)}>
                {provider.isEnabled ? 'Disabilita' : 'Abilita'}
              </AdminButton>
              <AdminButton kind="secondary" size="sm" onClick={() => onEdit(provider)}>
                Modifica
              </AdminButton>
              <AdminButton kind="danger" size="sm" onClick={() => onDelete(provider)}>
                Elimina
              </AdminButton>
            </div>
          </div>
        ))}
      </>
    </AdminCollectionSection>
  )
}
