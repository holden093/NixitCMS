import {
  AdminAlert,
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminCardHeader,
  AdminMediaPickerDialog,
  AdminPage,
  AdminTabs,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { LocaleCode } from '@/types/api'
import {
  CONTENT_PAGE_VISIBILITY_SLUGS,
  CONTENT_WORKSPACE_CONFIG,
  CONTENT_WORKSPACE_SLUGS,
  type ContentWorkspaceSlug,
} from './contentWorkspace.config'
import { StructuredSectionFields } from './StructuredSectionFields'
import { useContentWorkspace } from './useContentWorkspace'

function formatDateTime(value: string) {
  if (!value) {
    return 'Non ancora salvato in questa sessione.'
  }

  return new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function ContentPage() {
  const page = useContentWorkspace()

  useDocumentTitle('Sito pubblico — Admin')

  if (page.loading) {
    return (
      <AdminPage
        title="Sito pubblico"
        description="Workspace editoriale unico per tutti i testi visibili nel frontend pubblico, organizzati per area e lingua."
      >
        <div className="space-y-6">
          <div className="h-56 animate-pulse bg-stone-100" />
          <div className="h-[32rem] animate-pulse bg-stone-100" />
          <div className="h-[30rem] animate-pulse bg-stone-100" />
        </div>
      </AdminPage>
    )
  }

  if (page.error && page.entries.length === 0) {
    return (
      <AdminPage
        title="Sito pubblico"
        description="Workspace editoriale unico per tutti i testi visibili nel frontend pubblico, organizzati per area e lingua."
      >
        <AdminCard className="p-6 md:p-8">
          <AdminAlert>{page.error}</AdminAlert>
          <div className="mt-5">
            <AdminButton kind="secondary" onClick={() => void page.loadEntries()}>
              Riprova
            </AdminButton>
          </div>
        </AdminCard>
      </AdminPage>
    )
  }

  const localeLabel = page.activeLocale === 'it' ? 'Italiano' : 'English'
  const saveTone = page.error ? 'danger' : page.isDirty ? 'accent' : 'success'
  const saveLabel = page.saving
    ? 'Salvataggio in corso'
    : page.error
      ? 'Serve un controllo'
      : page.isDirty
        ? 'Modifiche da salvare'
        : 'Tutto salvato'

  return (
    <AdminPage
      title="Sito pubblico"
      description="Scrivi e aggiorna tutti i testi del sito pubblico in un unico workspace guidato, diviso per pagina e per lingua."
    >
      <AdminCard>
        <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="eyebrow">
                  1. Scegli la pagina da modificare
                </p>
                <AdminTabs
                  value={page.activeSlug}
                  onValueChange={value => page.setActiveSlug(value as ContentWorkspaceSlug)}
                  tabs={CONTENT_WORKSPACE_SLUGS.map(slug => ({
                    value: slug,
                    label: CONTENT_WORKSPACE_CONFIG[slug].label,
                  }))}
                />
              </div>

              <div className="space-y-3">
                <p className="eyebrow">
                  2. Scegli la lingua
                </p>
                <AdminTabs
                  compact
                  value={page.activeLocale}
                  onValueChange={value => page.setActiveLocale(value as LocaleCode)}
                  tabs={[
                    { value: 'it', label: 'Italiano' },
                    { value: 'en', label: 'English' },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="border border-line bg-stone-50 p-4">
                <p className="eyebrow">
                  Pagina attiva
                </p>
                <p className="mt-2 text-h3 font-semibold text-ink">{page.activeConfig.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{page.activeConfig.description}</p>
              </div>

              <div className="border border-line bg-stone-50 p-4">
                <p className="eyebrow">
                  Lingua attiva
                </p>
                <p className="mt-2 text-h3 font-semibold text-ink">{localeLabel}</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Stai modificando i contenuti pubblici visibili in questa lingua.
                </p>
              </div>

              <div className="border border-line bg-stone-50 p-4">
                <p className="eyebrow">
                  Avanzamento
                </p>
                <p className="mt-2 text-h3 font-semibold text-ink">
                  {page.completedFieldCount}/{page.totalFieldCount} campi pronti
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  I campi gia valorizzati restano sempre modificabili quando vuoi.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-line bg-stone-50 px-5 py-5">
            <div className="flex flex-wrap items-center gap-3">
              <AdminBadge tone="accent">{page.activeConfig.label}</AdminBadge>
              <AdminBadge tone={saveTone}>{saveLabel}</AdminBadge>
              <AdminBadge tone="neutral">Ultimo salvataggio: {formatDateTime(page.savedActiveEntry.updatedAt)}</AdminBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{page.activeConfig.summary}</p>
          </div>
        </div>
      </AdminCard>

      {page.error ? <AdminAlert>{page.error}</AdminAlert> : null}

      <AdminCard>
        <AdminCardHeader
          title="Blocchi guidati della pagina"
          description="Anche i testi principali ora sono integrati nei blocchi logici della pagina, cosi modifichi tutto seguendo un unico flusso."
          action={<AdminBadge tone="accent">{page.completedFieldCount}/{page.totalFieldCount} compilati</AdminBadge>}
        />
        <StructuredSectionFields
          config={page.activeConfig}
          activeSlug={page.activeSlug}
          activeLocale={page.activeLocale}
          currentSections={page.currentSections}
          mediaFiles={page.mediaFiles}
          getLocalizedValue={page.getLocalizedValue}
          previewFields={page.previewFields}
          onTogglePreview={page.togglePreview}
          onLocalizedChange={page.updateLocalizedValue}
          onChange={page.updateSectionValue}
          onOpenMediaPicker={page.openMediaPicker}
        />
      </AdminCard>

      <AdminCard className="p-6 md:p-8">
        <p className="text-sm leading-6 text-ink-soft">
          Qui modifichi i contenuti del sito pubblico e, dove previsto, colleghi anche gli asset editoriali
          della pagina. Upload, organizzazione della libreria media, servizi, punti di interesse,
          provider booking e impostazioni aziendali restano nei moduli dedicati del CMS.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Le pagine con visibilita separata continuano a essere: {CONTENT_PAGE_VISIBILITY_SLUGS.join(', ')}.
        </p>
      </AdminCard>

      <AdminMediaPickerDialog
        open={page.mediaPickerFieldKey !== null}
        title={page.pickerTitle}
        description="Scegli un'immagine gia presente nella libreria media per il contenuto pubblico che stai modificando."
        selectedKey={page.mediaPickerFieldKey ? page.currentSections[page.mediaPickerFieldKey] ?? '' : ''}
        files={page.filteredPickerFiles}
        search={page.pickerSearch}
        onSearchChange={page.setPickerSearch}
        onSelect={file => {
          if (!page.mediaPickerFieldKey) {
            return
          }

          page.updateSectionValue(page.mediaPickerFieldKey, file.key)
          page.closeMediaPicker()
        }}
        onOpenChange={open => {
          if (!open) {
            page.closeMediaPicker()
          }
        }}
      />

      <div className="sticky bottom-4 z-20 pt-2">
        <AdminCard>
          <div className="flex flex-col gap-5 px-6 py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-h3 font-semibold text-ink">Salvataggio contenuto</p>
                <AdminBadge tone={saveTone}>{saveLabel}</AdminBadge>
              </div>
              <p className="text-sm leading-6 text-ink-soft">
                {page.saving
                  ? 'Sto salvando le modifiche di questa pagina.'
                  : page.isDirty
                    ? 'Hai modifiche non ancora salvate. Salva adesso per pubblicarle nel CMS.'
                    : 'Non ci sono modifiche in sospeso. Puoi continuare a lavorare oppure cambiare pagina.'}
              </p>
              <p className="text-xs leading-5 text-muted">
                Ultimo salvataggio confermato: {formatDateTime(page.savedActiveEntry.updatedAt)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton
                kind="secondary"
                size="lg"
                onClick={() => void page.loadEntries()}
              >
                Aggiorna dati
              </AdminButton>
              <AdminButton
                type="button"
                size="lg"
                startIcon="save"
                onClick={() => void page.handleSave()}
                loading={page.saving}
                className="min-w-[15rem]"
              >
                {page.saving ? 'Salvataggio...' : 'Salva contenuto'}
              </AdminButton>
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  )
}
