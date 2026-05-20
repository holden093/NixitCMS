import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminSwitch,
} from '@/components/admin/ui'
import { ADMIN_PAGE_LABELS } from '@/lib/admin/pageVisibility'
import { getPublicPagePath } from '@/lib/public/pageRoutes'
import type { Page } from '@/types/api'

interface PagesListProps {
  items: Page[]
  totalItems: number
  query: string
  onQueryChange: (value: string) => void
  loading: boolean
  error?: string
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onToggle: (page: Page) => void
}

export function PagesList({
  items,
  totalItems,
  query,
  onQueryChange,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onToggle,
}: PagesListProps) {
  return (
    <AdminCollectionSection
      title="Pagine pubbliche"
      description="Da qui puoi decidere in un attimo quali pagine pubbliche devono restare online e quali nascondere."
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Cerca una pagina..."
      error={error}
      loading={loading}
      isEmpty={items.length === 0}
      emptyTitle="Nessuna pagina trovata"
      emptyBody={totalItems === 0
        ? 'Non risultano pagine pubbliche gestibili nel workspace.'
        : 'Prova a cambiare il termine di ricerca.'}
      skeletonCount={3}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="divide-y divide-[rgba(131,98,84,0.12)]">
        {items.map(pageItem => (
          <div key={pageItem.slug} className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xl font-semibold text-slate-950 md:text-2xl">
                  {ADMIN_PAGE_LABELS[pageItem.slug] || pageItem.slug}
                </p>
                <AdminBadge tone={pageItem.isVisible ? 'success' : 'danger'}>
                  {pageItem.isVisible ? 'Visibile' : 'Nascosta'}
                </AdminBadge>
              </div>
              <p className="text-sm text-muted">
                Indirizzo pubblico: {getPublicPagePath(pageItem.slug)}
              </p>
            </div>

            <AdminSwitch
              checked={pageItem.isVisible}
              onCheckedChange={() => onToggle(pageItem)}
              label={pageItem.isVisible ? 'Pagina visibile ai visitatori' : 'Pagina nascosta ai visitatori'}
            />
          </div>
        ))}
      </div>
    </AdminCollectionSection>
  )
}
