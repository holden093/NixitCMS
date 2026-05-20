import { AdminCollectionSection } from '@/components/admin/crud/AdminCollectionSection'
import {
  AdminBadge,
  AdminButton,
  AdminConfirmDialog,
  AdminSearchInput,
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeaderCell,
  AdminTableRow,
} from '@/components/admin/ui'
import { CategoryFormDialog } from './CategoryFormDialog'
import type { UseCategoriesTabResult } from './useCategoriesTab'

export type CategoriesTabProps = UseCategoriesTabResult

export function CategoriesTab({
  items,
  loading,
  error,
  query,
  setQuery,
  setPage,
  paginatedItems,
  isOpen,
  setIsOpen,
  isEditing,
  form,
  setForm,
  openCreate,
  openEdit,
  close,
  saving,
  deleteTarget,
  setDeleteTarget,
  handleSubmit,
  handleDelete,
}: CategoriesTabProps) {
  return (
    <>
      <AdminCollectionSection
        title="Categorie fotografiche"
        description="Organizza le foto della libreria media in raccolte ordinate e facili da riutilizzare."
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Cerca per nome o slug"
        error={error}
        loading={loading}
        isEmpty={paginatedItems.items.length === 0}
        emptyTitle="Nessuna categoria disponibile"
        emptyBody={items.length === 0
          ? 'Crea la prima categoria per organizzare meglio le foto della libreria media.'
          : 'Nessuna categoria corrisponde alla ricerca attuale.'}
        skeletonCount={5}
        page={paginatedItems.page}
        totalPages={paginatedItems.totalPages}
        onPageChange={setPage}
        action={(
          <div className="flex flex-col gap-3 lg:flex-row">
            <AdminSearchInput
              value={query}
              onChange={setQuery}
              placeholder="Cerca per nome o slug"
            />
            <AdminButton onClick={openCreate}>
              Nuova categoria
            </AdminButton>
          </div>
        )}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableRow data-variant="head">
              <AdminTableHeaderCell align="right">Ordine</AdminTableHeaderCell>
              <AdminTableHeaderCell>Nome IT</AdminTableHeaderCell>
              <AdminTableHeaderCell>Nome EN</AdminTableHeaderCell>
              <AdminTableHeaderCell>Slug</AdminTableHeaderCell>
              <AdminTableHeaderCell align="right">Foto</AdminTableHeaderCell>
              <AdminTableHeaderCell align="right">Azioni</AdminTableHeaderCell>
            </AdminTableRow>
          </AdminTableHead>
          <AdminTableBody>
            {paginatedItems.items.map(category => (
              <AdminTableRow key={category.id} data-variant="body">
                <AdminTableCell align="right">
                  <span className="font-medium tabular-nums text-slate-900">{category.sortOrder}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <span className="font-semibold text-slate-900">{category.name_it}</span>
                </AdminTableCell>
                <AdminTableCell>{category.name_en}</AdminTableCell>
                <AdminTableCell>
                  <span className="font-mono text-xs text-muted">{category.slug}</span>
                </AdminTableCell>
                <AdminTableCell align="right">
                  <AdminBadge tone="accent">{category._count.media}</AdminBadge>
                </AdminTableCell>
                <AdminTableCell align="right">
                  <div className="flex justify-end gap-2">
                    <AdminButton kind="secondary" size="sm" onClick={() => openEdit(category)}>
                      Modifica
                    </AdminButton>
                    <AdminButton kind="danger" size="sm" onClick={() => setDeleteTarget(category)}>
                      Elimina
                    </AdminButton>
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      </AdminCollectionSection>

      <CategoryFormDialog
        open={isOpen}
        isEditing={isEditing}
        form={form}
        saving={saving}
        onOpenChange={setIsOpen}
        onChange={setForm}
        onSubmit={handleSubmit}
        onClose={close}
      />

      <AdminConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) {
            setDeleteTarget(null)
          }
        }}
        title="Eliminare la categoria?"
        description="La categoria verra rimossa dal CMS. Se e ancora associata a delle foto, potrebbe essere necessario riassegnarle prima di confermare."
        confirmLabel="Elimina categoria"
        onConfirm={() => void handleDelete()}
      />
    </>
  )
}
