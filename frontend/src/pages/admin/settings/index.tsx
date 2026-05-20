import { useRef } from 'react'
import {
  AdminAlert,
  AdminButton,
  AdminConfirmDialog,
  AdminPage,
  AdminStatCard,
  AdminTabs,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { BrandSection } from './BrandSection'
import { BookingSection } from './BookingSection'
import { CompanySection } from './CompanySection'
import { LocationSection } from './LocationSection'
import { SiteTransferSection } from './SiteTransferSection'
import { SettingsMediaPickerDialog } from './SettingsMediaPickerDialog'
import { useSiteTransfer } from './useSiteTransfer'
import { useSettingsPage } from './useSettingsPage'

const settingsTabs = [
  { value: 'brand', label: 'Brand' },
  { value: 'company', label: 'Dati aziendali' },
  { value: 'visual', label: 'Visual & mappa' },
]

export default function SettingsPage() {
  const page = useSettingsPage()
  const siteTransfer = useSiteTransfer()
  const importInputRef = useRef<HTMLInputElement>(null)

  useDocumentTitle('Brand & impostazioni — Admin')

  if (page.loading) {
    return (
      <AdminPage
        title="Brand & impostazioni"
        description="Caricamento delle impostazioni globali, dei colori e dei riferimenti aziendali."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse bg-stone-100" />
          ))}
        </div>
      </AdminPage>
    )
  }

  if (!page.form) {
    return (
      <AdminPage
        title="Brand & impostazioni"
        description="Caricamento delle impostazioni globali, dei colori e dei riferimenti aziendali."
      >
        <div className="border border-line bg-stone-100 p-5">
          <p className="text-sm leading-6 text-ink">
            {page.error || 'Impossibile caricare le impostazioni del sito.'}
          </p>
          <div className="mt-4">
            <AdminButton kind="secondary" onClick={() => void page.load()}>
              Riprova
            </AdminButton>
          </div>
        </div>
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title="Brand & impostazioni"
      description="Centro di controllo per identità visiva, dati aziendali, contatti e coordinate globali del sito."
      actions={(
        <AdminButton size="lg" onClick={() => void page.handleSave()} loading={page.saving} startIcon="save">
          Salva impostazioni
        </AdminButton>
      )}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <AdminStatCard label="Asset brand" value={`${[page.form.logoKey, page.form.heroImageKey].filter(Boolean).length}/2`} helper="Logo e hero image assegnati dalle impostazioni globali." />
        <AdminStatCard label="Profilo aziendale" value={`${page.companyCompletion}/7`} helper="Campi chiave valorizzati per footer e contatti." />
        <AdminStatCard label="Libreria immagini" value={page.mediaFiles.length} helper="File visivi disponibili per logo, hero e selezioni future." />
      </div>

      {page.error ? <AdminAlert>{page.error}</AdminAlert> : null}

      <input
        ref={importInputRef}
        type="file"
        accept=".tar.gz,application/gzip,application/x-gzip,application/octet-stream"
        className="hidden"
        onChange={event => {
          siteTransfer.queueImport(event.target.files)
          event.currentTarget.value = ''
        }}
      />

      <SiteTransferSection
        exporting={siteTransfer.exporting}
        importing={siteTransfer.importing}
        onExport={() => void siteTransfer.handleExport()}
        onImportRequest={() => importInputRef.current?.click()}
      />

      <AdminTabs value={page.activeTab} onValueChange={page.setActiveTab} tabs={settingsTabs} />

      {page.activeTab === 'brand' ? (
        <BrandSection
          form={page.form}
          selectedLogo={page.selectedLogo}
          selectedHeroImage={page.selectedHeroImage}
          uploadingLogo={page.uploadingLogo}
          uploadingHero={page.uploadingHero}
          onFieldChange={page.updateField}
          onOpenPicker={page.setMediaPickerTarget}
          onRemoveMedia={key => page.setMediaKey(key, '')}
          onUpload={page.handleImageUpload}
        />
      ) : null}

      {page.activeTab === 'company' ? (
        <CompanySection form={page.form} onFieldChange={page.updateField} />
      ) : null}

      {page.activeTab === 'visual' ? (
        <>
          <LocationSection
            form={page.form}
            onFieldChange={page.updateField}
          />
          <BookingSection form={page.form} onFieldChange={page.updateField} />
        </>
      ) : null}

      <SettingsMediaPickerDialog
        open={page.mediaPickerTarget !== null}
        title={page.pickerTitle}
        selectedKey={page.mediaPickerTarget === 'logoKey' ? page.form.logoKey : page.form.heroImageKey}
        files={page.filteredPickerFiles}
        search={page.pickerSearch}
        onSearchChange={page.setPickerSearch}
        onSelect={file => {
          if (!page.mediaPickerTarget) {
            return
          }

          page.setMediaKey(page.mediaPickerTarget, file.key)
          page.closePicker()
        }}
        onOpenChange={open => {
          if (!open) {
            page.closePicker()
          }
        }}
      />

      <AdminConfirmDialog
        open={siteTransfer.confirmImportOpen}
        onOpenChange={siteTransfer.handleImportDialogChange}
        title="Importare questo pacchetto?"
        description={siteTransfer.pendingImportFile
          ? `Il pacchetto ${siteTransfer.pendingImportFile.name} sostituira completamente database e media del server corrente. Al termine dovrai effettuare di nuovo il login.`
          : "L'archivio selezionato sostituira completamente database e media del server corrente."}
        confirmLabel="Importa e sostituisci tutto"
        onConfirm={() => void siteTransfer.confirmImport()}
        loading={siteTransfer.importing}
      />
    </AdminPage>
  )
}
