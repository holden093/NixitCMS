import {
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PoiFormDialog } from './PoiFormDialog'
import { PoisList } from './PoisList'
import { PoisStats } from './PoisStats'
import { CATEGORY_LABELS, usePoisPage } from './usePoisPage'

export default function PoisPage() {
  const page = usePoisPage()

  useDocumentTitle('Punti di interesse — Admin')

  return (
    <AdminPage
      title="Punti di interesse"
      description="Gestisci i riferimenti geolocalizzati e le descrizioni bilingue mostrate nella mappa pubblica e nella guida turistica."
      actions={(
        <AdminButton onClick={page.openCreate}>
          Nuovo punto
        </AdminButton>
      )}
    >
      <PoisStats
        total={page.items.length}
        items={page.categorySummary.map(item => ({
          ...item,
          label: CATEGORY_LABELS[item.category] ?? item.category,
        }))}
      />

      <PoisList
        items={page.paginatedItems.items}
        totalItems={page.items.length}
        query={page.query}
        onQueryChange={page.setQuery}
        loading={page.loading}
        error={page.error}
        page={page.paginatedItems.page}
        totalPages={page.paginatedItems.totalPages}
        onPageChange={page.setPage}
        onEdit={page.openEdit}
        onDelete={page.setDeleteTarget}
      />

      <PoiFormDialog
        open={page.isOpen}
        isEditing={page.isEditing}
        form={page.form}
        formErrors={page.formErrors}
        saving={page.saving}
        onOpenChange={page.setIsOpen}
        onChange={page.setForm}
        onValidateCoordinate={page.validateCoordinate}
        onSubmit={page.handleSubmit}
        onClose={page.closeEditor}
      />

      <AdminConfirmDialog
        open={page.deleteTarget !== null}
        onOpenChange={open => {
          if (!open) {
            page.setDeleteTarget(null)
          }
        }}
        title="Eliminare questo punto?"
        description="Il marker verrà rimosso dalla mappa pubblica e dall’archivio del CMS."
        confirmLabel="Elimina punto"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
