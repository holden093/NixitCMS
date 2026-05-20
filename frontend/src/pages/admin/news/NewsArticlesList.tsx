import SafeImage from '@/components/SafeImage'
import { getAdminMediaUrl } from '@/api/admin/media'
import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import { AdminBadge, AdminButton } from '@/components/admin/ui'
import type { AdminNewsArticle } from '@/types/api'

interface NewsArticlesListProps {
  items: AdminNewsArticle[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onCreate: () => void
  onEdit: (article: AdminNewsArticle) => void
  onDelete: (article: AdminNewsArticle) => void
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Non pubblicata'
  }

  return new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function getStatusLabel(status: AdminNewsArticle['status']) {
  switch (status) {
    case 'draft':
      return 'Bozza'
    case 'scheduled':
      return 'Programmato'
    case 'published':
      return 'Pubblicato'
    default:
      return status
  }
}

export function NewsArticlesList({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onCreate,
  onEdit,
  onDelete,
}: NewsArticlesListProps) {
  return (
    <AdminCollectionSection
      title="Articoli"
      description={`Gestisci ${totalItems} news tra bozze, programmate e pubblicate.`}
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca per titolo, slug o stato"
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessuna news disponibile"
      emptyBody="Crea il primo articolo per alimentare archivio, homepage e distribuzione."
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      action={<AdminButton onClick={onCreate}>Nuova news</AdminButton>}
    >
      <div className="space-y-4">
        {items.map(article => (
          <article key={article.id} className="grid gap-4 border border-line bg-stone-50 p-5 xl:grid-cols-[11rem_1fr_auto]">
            <div className="overflow-hidden bg-white">
              {article.featuredMedia ? (
                <SafeImage
                  src={getAdminMediaUrl(article.featuredMedia.key, 'card')}
                  alt={article.featuredMedia.label}
                  className="h-32 w-full object-cover"
                />
              ) : (
                <div className="flex h-32 items-center justify-center px-4 text-center text-xs text-ink-soft">
                  Nessuna cover
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <AdminBadge tone="accent">{getStatusLabel(article.status)}</AdminBadge>
                {article.publishToSite ? <AdminBadge>Sito</AdminBadge> : null}
                {article.publishToNewsletter ? <AdminBadge>Newsletter</AdminBadge> : null}
                {article.publishToFacebook ? <AdminBadge>Facebook</AdminBadge> : null}
                {article.publishToInstagram ? <AdminBadge>Instagram</AdminBadge> : null}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">{article.title_it}</h3>
                <p className="mt-1 text-sm text-muted">{article.slug}</p>
              </div>

              <p className="max-w-3xl text-sm leading-6 text-ink-soft">{article.excerpt_it}</p>

              <div className="flex flex-wrap gap-4 text-xs text-muted">
                <span>Pubblicazione: {formatDate(article.publishedAt)}</span>
                {article.scheduledAt ? <span>Programmata: {formatDate(article.scheduledAt)}</span> : null}
              </div>

              {(article.newsletterError || article.facebookError || article.instagramError) ? (
                <div className="space-y-1 text-xs leading-5 text-rose-700">
                  {article.newsletterError ? <p>Newsletter: {article.newsletterError}</p> : null}
                  {article.facebookError ? <p>Facebook: {article.facebookError}</p> : null}
                  {article.instagramError ? <p>Instagram: {article.instagramError}</p> : null}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <AdminButton kind="secondary" onClick={() => onEdit(article)}>
                Modifica
              </AdminButton>
              <AdminButton kind="danger" onClick={() => onDelete(article)}>
                Elimina
              </AdminButton>
            </div>
          </article>
        ))}
      </div>
    </AdminCollectionSection>
  )
}
