import { useState } from 'react'
import {
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
  AdminTabs,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { CategoriesTab } from './CategoriesTab'
import { MediaGrid } from './MediaGrid'
import { MediaPreviewDialog } from './MediaPreviewDialog'
import { MediaStats } from './MediaStats'
import { MediaUploadDialog } from './MediaUploadDialog'
import { useCategoriesTab } from './useCategoriesTab'
import { useMediaPage } from './useMediaPage'

export default function MediaPage() {
  const page = useMediaPage()
  const categories = useCategoriesTab()
  const [activeTab, setActiveTab] = useState('images')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  useDocumentTitle('Media — Admin')

  return (
    <AdminPage
      title="Libreria media"
      description="Gestisci immagini, asset visivi e categorie fotografiche del sito."
      actions={(
        <>
          {activeTab === 'images' ? (
            <AdminButton
              startIcon="image-plus"
              onClick={() => setUploadDialogOpen(true)}
              loading={page.uploading}
            >
              {page.uploading ? 'Caricamento...' : 'Carica media'}
            </AdminButton>
          ) : (
            <AdminButton onClick={categories.openCreate}>
              Nuova categoria
            </AdminButton>
          )}
        </>
      )}
    >
      <MediaStats
        total={page.items.length}
        images={page.imageFilesCount}
        totalSize={page.totalSizeMb}
        categoriesCount={categories.items.length}
        uncategorizedCount={page.uncategorizedCount}
      />

      <AdminTabs
        value={activeTab}
        onValueChange={setActiveTab}
        tabs={[
          { value: 'images', label: 'Immagini' },
          { value: 'categories', label: 'Categorie' },
        ]}
      />

      {activeTab === 'images' ? (
        <MediaGrid
          items={page.paginatedItems.items}
          totalItems={page.items.length}
          query={page.query}
          onQueryChange={page.setQuery}
          loading={page.loading}
          error={page.error}
          page={page.paginatedItems.page}
          totalPages={page.paginatedItems.totalPages}
          onPageChange={page.setPage}
          onOpen={page.setSelectedFile}
          onDelete={page.requestDelete}
          formatBytes={page.formatBytes}
          categories={categories.items}
          categoryFilter={page.categoryFilter}
          onCategoryFilterChange={page.setCategoryFilter}
        />
      ) : (
        <CategoriesTab {...categories} />
      )}

      <MediaPreviewDialog
        file={page.selectedFile}
        open={page.selectedFile !== null}
        savingMetadata={page.savingMetadata}
        onOpenChange={open => {
          if (!open) {
            page.setSelectedFile(null)
          }
        }}
        onDelete={() => {
          if (page.selectedFile) {
            page.requestDelete(page.selectedFile)
          }
        }}
        formatBytes={page.formatBytes}
        allCategories={categories.items}
        onMetadataSave={page.handleMetadataSave}
      />

      <MediaUploadDialog
        open={uploadDialogOpen}
        uploading={page.uploading}
        categories={categories.items}
        onOpenChange={setUploadDialogOpen}
        onSubmit={page.handleUpload}
      />

      <AdminConfirmDialog
        open={page.deleteTarget !== null}
        onOpenChange={open => {
          if (!open) {
            page.setDeleteTarget(null)
          }
        }}
        title="Eliminare questo media?"
        description="L'asset verra rimosso dal volume locale e dalla libreria media. La cancellazione e consentita solo se non esistono riferimenti attivi."
        confirmLabel="Elimina definitivamente"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
