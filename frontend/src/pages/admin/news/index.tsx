import { useState } from 'react'
import {
  AdminAlert,
  AdminConfirmDialog,
  AdminPage,
  AdminStatCard,
  AdminTabs,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { NewsArticleDialog } from './NewsArticleDialog'
import { NewsArticlesList } from './NewsArticlesList'
import { NewsletterSubscribersList } from './NewsletterSubscribersList'
import { useNewsPage } from './useNewsPage'

export default function AdminNewsPage() {
  const page = useNewsPage()
  const [activeTab, setActiveTab] = useState('articles')

  useDocumentTitle('News — Admin')

  return (
    <AdminPage
      title="News"
      description="Modulo editoriale completo per articoli, scheduling, newsletter e distribuzione social."
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <AdminStatCard label="Articoli" value={page.counts.articles} helper="Totale news create nel dominio dedicato." />
        <AdminStatCard label="Iscritti attivi" value={page.counts.activeSubscribers} helper="Riceveranno le newsletter al momento della pubblicazione." />
        <AdminStatCard label="Double opt-in" value={page.counts.pendingSubscribers} helper="Richieste in attesa di conferma email." />
        <AdminStatCard label="Opt-out" value={page.counts.unsubscribedSubscribers} helper="Contatti disattivati o disiscritti." />
      </div>

      {page.auxiliaryError ? <AdminAlert>{page.auxiliaryError}</AdminAlert> : null}

      {page.statusSummary?.capabilities.facebook.expiresSoon || page.statusSummary?.capabilities.instagram.expiresSoon ? (
        <AdminAlert>
          Il token Meta e configurato ma vicino alla scadenza. Controlla le credenziali prima delle prossime pubblicazioni social.
        </AdminAlert>
      ) : null}

      {page.statusSummary?.capabilities.facebook.expired || page.statusSummary?.capabilities.instagram.expired ? (
        <AdminAlert>
          Il token Meta risulta scaduto: Facebook e Instagram restano disabilitati finche non viene aggiornato.
        </AdminAlert>
      ) : null}

      <AdminTabs
        value={activeTab}
        onValueChange={setActiveTab}
        tabs={[
          { value: 'articles', label: 'Articoli' },
          { value: 'subscribers', label: 'Iscritti' },
        ]}
      />

      {activeTab === 'articles' ? (
        <NewsArticlesList
          items={page.articles.paginatedItems.items}
          totalItems={page.articles.items.length}
          query={page.articles.query}
          onQueryChange={page.articles.setQuery}
          loading={page.articles.loading || page.loadingAuxiliary}
          error={page.articles.error}
          page={page.articles.paginatedItems.page}
          totalPages={page.articles.paginatedItems.totalPages}
          onPageChange={page.articles.setPage}
          onCreate={page.editor.openCreate}
          onEdit={page.editor.openEdit}
          onDelete={page.setDeleteTarget}
        />
      ) : (
        <NewsletterSubscribersList
          items={page.subscribers.paginatedItems.items}
          totalItems={page.subscribers.items.length}
          query={page.subscribers.query}
          onQueryChange={page.subscribers.setQuery}
          loading={page.subscribers.loading}
          error={page.subscribers.error}
          page={page.subscribers.paginatedItems.page}
          totalPages={page.subscribers.paginatedItems.totalPages}
          onPageChange={page.subscribers.setPage}
          onToggleStatus={page.handleSubscriberStatusChange}
        />
      )}

      <NewsArticleDialog
        open={page.editor.isOpen}
        isEditing={page.editor.isEditing}
        isPublished={page.editor.editingItem?.status === 'published'}
        form={page.editor.form}
        mediaFiles={page.mediaFiles}
        capabilities={page.statusSummary?.capabilities ?? null}
        saving={page.saving}
        onOpenChange={page.editor.setIsOpen}
        onChange={page.editor.setForm}
        onSubmit={page.handleSubmit}
        onClose={page.editor.close}
        onUploadInlineImage={page.handleInlineImageUpload}
      />

      <AdminConfirmDialog
        open={page.deleteTarget !== null}
        onOpenChange={open => {
          if (!open) {
            page.setDeleteTarget(null)
          }
        }}
        title="Eliminare questa news?"
        description="L'articolo, le delivery newsletter collegate e gli eventuali job pendenti verranno rimossi definitivamente."
        confirmLabel="Elimina news"
        onConfirm={() => void page.handleDelete()}
      />
    </AdminPage>
  )
}
