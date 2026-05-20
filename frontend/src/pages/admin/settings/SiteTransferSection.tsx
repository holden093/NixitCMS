import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminCardHeader,
} from '@/components/admin/ui'

interface SiteTransferSectionProps {
  exporting: boolean
  importing: boolean
  onExport: () => void
  onImportRequest: () => void
}

export function SiteTransferSection({
  exporting,
  importing,
  onExport,
  onImportRequest,
}: SiteTransferSectionProps) {
  return (
    <AdminCard>
      <AdminCardHeader
        title="Migrazione sito"
        description="Esporta un pacchetto completo del sito o importa un archivio creato dal CMS per spostare dev, staging e produzione."
      />

      <div className="grid gap-6 px-6 py-6 md:px-8 md:py-7 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] xl:items-start">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-slate-600">
            L&apos;export include il dump completo del database e tutti i media presenti nel volume locale del backend.
            L&apos;import ripristina quel pacchetto in blocco sul server di destinazione.
          </p>

          <AdminAlert tone="info">
            L&apos;import sostituisce completamente database e media del server corrente. Al termine la sessione admin viene chiusa e serve un nuovo login.
          </AdminAlert>
        </div>

        <div className="flex flex-col gap-3">
          <AdminButton
            kind="secondary"
            size="lg"
            startIcon="save"
            onClick={onExport}
            loading={exporting}
          >
            Esporta sito
          </AdminButton>
          <AdminButton
            kind="danger"
            size="lg"
            onClick={onImportRequest}
            loading={importing}
          >
            Importa pacchetto
          </AdminButton>
          <p className="text-xs leading-6 text-slate-500">
            Usa solo archivi `.tar.gz` creati da questa area admin.
          </p>
        </div>
      </div>
    </AdminCard>
  )
}
