import {
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ServiceFormDialog } from './ServiceFormDialog'
import { ServicesList } from './ServicesList'
import { ServicesStats } from './ServicesStats'
import { useServicesPage } from './useServicesPage'

export default function ServicesPage() {
  const page = useServicesPage()

  useDocumentTitle('Servizi — Admin')

  return (
    <AdminPage
      title="Servizi"
      description="Gestisci l’offerta editoriale del sito con ordinamento, visibilità e gallerie fotografiche collegate."
      actions={(
        <AdminButton onClick={page.openCreate}>
          Nuovo servizio
        </AdminButton>
      )}
    >
      <ServicesStats
        total={page.items.length}
        published={page.publicServicesCount}
        withGallery={page.servicesWithGalleryCount}
      />

      <ServicesList
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

      <ServiceFormDialog
        open={page.isOpen}
        isEditing={page.isEditing}
        form={page.form}
        photoCategories={page.photoCategories}
        mediaFiles={page.mediaFiles}
        saving={page.saving}
        onOpenChange={page.setIsOpen}
        onChange={page.setForm}
        onSubmit={page.handleSubmit}
        onClose={page.close}
      />

      <AdminConfirmDialog
        open={page.deleteTarget !== null}
        onOpenChange={open => {
          if (!open) {
            page.setDeleteTarget(null)
          }
        }}
        title="Eliminare il servizio?"
        description="La scheda verrà rimossa dal CMS e non sarà più disponibile nel sito pubblico."
        confirmLabel="Elimina servizio"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
