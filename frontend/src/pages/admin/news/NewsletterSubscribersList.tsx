import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import { AdminBadge, AdminButton } from '@/components/admin/ui'
import type { NewsletterSubscriber } from '@/types/api'

interface NewsletterSubscribersListProps {
  items: NewsletterSubscriber[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onToggleStatus: (subscriber: NewsletterSubscriber, status: 'active' | 'unsubscribed') => void
}

function formatDate(value: string | null) {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function NewsletterSubscribersList({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onToggleStatus,
}: NewsletterSubscribersListProps) {
  return (
    <AdminCollectionSection
      title="Iscritti newsletter"
      description={`Archivio iscritti e consensi registrati: ${totalItems} contatti.`}
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per email o stato"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessun iscritto presente"
      emptyBody="Le nuove iscrizioni double opt-in appariranno qui appena confermate o richieste."
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="space-y-4">
        {items.map(subscriber => (
          <article key={subscriber.id} className="flex flex-col gap-4 border border-line bg-stone-50 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold text-ink">{subscriber.email}</p>
                <AdminBadge tone={subscriber.status === 'active' ? 'success' : subscriber.status === 'pending' ? 'accent' : 'danger'}>
                  {subscriber.status}
                </AdminBadge>
                <AdminBadge>{subscriber.locale.toUpperCase()}</AdminBadge>
              </div>
              <div className="flex flex-wrap gap-4 text-xs leading-5 text-muted">
                <span>Richiesta: {formatDate(subscriber.requestedAt)}</span>
                <span>Conferma: {formatDate(subscriber.confirmedAt)}</span>
                <span>Ultima newsletter: {formatDate(subscriber.lastNewsletterSentAt)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {subscriber.status !== 'active' ? (
                <AdminButton kind="secondary" onClick={() => onToggleStatus(subscriber, 'active')}>
                  Attiva
                </AdminButton>
              ) : null}
              {subscriber.status !== 'unsubscribed' ? (
                <AdminButton kind="danger" onClick={() => onToggleStatus(subscriber, 'unsubscribed')}>
                  Disattiva
                </AdminButton>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </AdminCollectionSection>
  )
}
