import { AdminPage } from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PagesList } from './PagesList'
import { usePagesPage } from './usePagesPage'

export default function PagesPage() {
  const page = usePagesPage()

  useDocumentTitle('Visibilita pagine — Admin')

  return (
    <AdminPage
      title="Visibilita pagine"
      description="Attiva o nascondi le sole pagine pubbliche routabili senza toccare il resto del workspace editoriale."
    >
      <PagesList
        items={page.paginatedItems.items}
        totalItems={page.items.length}
        query={page.query}
        onQueryChange={page.setQuery}
        loading={page.loading}
        error={page.error}
        page={page.paginatedItems.page}
        totalPages={page.paginatedItems.totalPages}
        onPageChange={page.setPage}
        onToggle={page.toggleVisibility}
      />
    </AdminPage>
  )
}
