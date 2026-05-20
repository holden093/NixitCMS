import {
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { RoomFormDialog } from './RoomFormDialog'
import { RoomsList } from './RoomsList'
import { RoomsStats } from './RoomsStats'
import { useRoomsPage } from './useRoomsPage'

export default function RoomsPage() {
  const page = useRoomsPage()

  useDocumentTitle('Camere — Admin')

  return (
    <AdminPage
      title="Camere"
      description="Gestisci le categorie camera del sito con ordinamento, visibilita, metadati e gallerie fotografiche collegate."
      actions={(
        <AdminButton onClick={page.openCreate}>
          Nuova camera
        </AdminButton>
      )}
    >
      <RoomsStats
        total={page.items.length}
        published={page.publicRoomsCount}
        withGallery={page.roomsWithGalleryCount}
      />

      <RoomsList
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

      <RoomFormDialog
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
        title="Eliminare la camera?"
        description="La categoria camera verra rimossa dal CMS e non sara piu disponibile nel sito pubblico."
        confirmLabel="Elimina camera"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
