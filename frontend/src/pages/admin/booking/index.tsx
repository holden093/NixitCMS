import {
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { BookingFormDialog } from './BookingFormDialog'
import { BookingList } from './BookingList'
import { BookingStats } from './BookingStats'
import { useBookingPage } from './useBookingPage'

export default function BookingPage() {
  const page = useBookingPage()

  useDocumentTitle('Booking — Admin')

  return (
    <AdminPage
      title="Booking"
      description="Configura i provider di prenotazione. Il backend garantisce che ne resti attivo al massimo uno alla volta."
      actions={(
        <AdminButton onClick={page.openCreate}>
          Nuovo provider
        </AdminButton>
      )}
    >
      <BookingStats
        total={page.items.length}
        enabled={page.enabledProviders.length}
        types={new Set(page.items.map(provider => provider.type)).size}
      />

      <BookingList
        items={page.paginatedItems.items}
        totalItems={page.items.length}
        query={page.query}
        onQueryChange={page.setQuery}
        loading={page.loading}
        error={page.error}
        page={page.paginatedItems.page}
        totalPages={page.paginatedItems.totalPages}
        onPageChange={page.setPage}
        onToggleEnabled={page.toggleEnabled}
        onEdit={page.openEdit}
        onDelete={page.setDeleteTarget}
      />

      <BookingFormDialog
        open={page.isOpen}
        isEditing={page.isEditing}
        form={page.form}
        saving={page.saving}
        configError={page.configError}
        onOpenChange={page.setIsOpen}
        onChange={page.setForm}
        onValidateConfig={page.validateConfig}
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
        title="Eliminare questo provider?"
        description="La configurazione sarà rimossa dal CMS. Se era attiva, il sito pubblico non mostrerà più il relativo widget."
        confirmLabel="Elimina provider"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
