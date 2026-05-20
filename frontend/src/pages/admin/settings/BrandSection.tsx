import { useRef } from 'react'
import SafeImage from '@/components/SafeImage'
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminCardHeader,
  AdminField,
  AdminSwitch,
  AdminSelect,
  AdminInput,
} from '@/components/admin/ui'
import { getAdminMediaUrl } from '@/api/admin/media'
import type { MediaFile, SiteSettings } from '@/types/api'
import type { SettingsFieldUpdater } from './settingsFields'

interface BrandSectionProps {
  form: SiteSettings
  selectedLogo: MediaFile | null
  selectedHeroImage: MediaFile | null
  uploadingLogo: boolean
  uploadingHero: boolean
  onFieldChange: SettingsFieldUpdater
  onOpenPicker: (target: 'logoKey' | 'heroImageKey') => void
  onRemoveMedia: (key: 'logoKey' | 'heroImageKey') => void
  onUpload: (key: 'logoKey' | 'heroImageKey', file: File | null) => void
}

export function BrandSection({
  form,
  selectedLogo,
  selectedHeroImage,
  uploadingLogo,
  uploadingHero,
  onFieldChange,
  onOpenPicker,
  onRemoveMedia,
  onUpload,
}: BrandSectionProps) {
  const logoInputRef = useRef<HTMLInputElement>(null)
  const heroInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard>
          <AdminCardHeader
            title="Identità del sito"
            description="Nome hotel, asset principali e default locale che guidano il rendering pubblico."
          />
          <div className="space-y-5 px-6 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField
                label="Nome visibile dell'hotel"
                description="E' il nome principale mostrato in homepage, navbar e footer."
              >
                <AdminInput
                  value={form.hotelName}
                  onChange={event => onFieldChange('hotelName', event.target.value)}
                />
              </AdminField>

              <AdminField
                label="Lingua predefinita del sito"
                description="Decide quale lingua mostrare per prima ai visitatori."
              >
                <AdminSelect
                  value={form.defaultLocale}
                  onChange={event => onFieldChange('defaultLocale', event.target.value)}
                >
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                </AdminSelect>
              </AdminField>
            </div>

            <AdminField
              label="Ragione sociale"
              description="Compare nei riferimenti aziendali e nelle aree piu formali del sito."
            >
              <AdminInput
                value={form.legalName}
                onChange={event => onFieldChange('legalName', event.target.value)}
              />
            </AdminField>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard>
            <AdminCardHeader
              title="Logo"
              description="Viene usato nella navbar e nel footer del sito pubblico."
              action={<AdminBadge tone={selectedLogo ? 'success' : 'neutral'}>{selectedLogo ? 'Configurato' : 'Da assegnare'}</AdminBadge>}
            />
            <div className="space-y-4 px-6 py-5">
              <div className="flex h-40 items-center justify-center border border-dashed border-line bg-stone-50 p-6">
                {selectedLogo ? (
                  <SafeImage src={getAdminMediaUrl(selectedLogo.key, 'logo')} alt="Logo hotel" className="max-h-24 max-w-full object-contain" />
                ) : (
                  <p className="text-sm text-muted">Nessun logo selezionato</p>
                )}
              </div>
              {selectedLogo ? <p className="truncate text-sm text-muted">{selectedLogo.label}</p> : null}
              <div className="flex flex-wrap gap-2">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={event => {
                    onUpload('logoKey', event.target.files?.[0] ?? null)
                    event.currentTarget.value = ''
                  }}
                  className="hidden"
                />
                <AdminButton onClick={() => logoInputRef.current?.click()} loading={uploadingLogo} startIcon="image-plus">
                  {uploadingLogo ? 'Caricamento...' : 'Carica logo'}
                </AdminButton>
                <AdminButton kind="secondary" onClick={() => onOpenPicker('logoKey')}>
                  Scegli dalla libreria
                </AdminButton>
                <AdminButton kind="ghost" size="sm" onClick={() => onRemoveMedia('logoKey')}>
                  Rimuovi
                </AdminButton>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <AdminCardHeader
              title="Hero image"
              description="Visual principale della homepage, separata dal logo per evitare conflitti."
              action={<AdminBadge tone={selectedHeroImage ? 'success' : 'neutral'}>{selectedHeroImage ? 'Configurata' : 'Da assegnare'}</AdminBadge>}
            />
            <div className="space-y-4 px-6 py-5">
              <div className="overflow-hidden border border-dashed border-line bg-stone-50">
                {selectedHeroImage ? (
                  <SafeImage src={getAdminMediaUrl(selectedHeroImage.key, 'hero')} alt="Hero image" className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center">
                    <p className="text-sm text-muted">Nessuna hero image selezionata</p>
                  </div>
                )}
              </div>
              {selectedHeroImage ? <p className="truncate text-sm text-muted">{selectedHeroImage.label}</p> : null}
              <div className="flex flex-wrap gap-2">
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*"
                  onChange={event => {
                    onUpload('heroImageKey', event.target.files?.[0] ?? null)
                    event.currentTarget.value = ''
                  }}
                  className="hidden"
                />
                <AdminButton onClick={() => heroInputRef.current?.click()} loading={uploadingHero} startIcon="image-plus">
                  {uploadingHero ? 'Caricamento...' : 'Carica hero'}
                </AdminButton>
                <AdminButton kind="secondary" onClick={() => onOpenPicker('heroImageKey')}>
                  Scegli dalla libreria
                </AdminButton>
                <AdminButton kind="ghost" size="sm" onClick={() => onRemoveMedia('heroImageKey')}>
                  Rimuovi
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <h3 className="text-h3 font-semibold text-ink">Promo banner</h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            Messaggio globale sopra la navbar per promozioni dirette e campagne di disintermediazione.
          </p>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="border border-line bg-stone-50 px-4 py-4">
            <AdminSwitch
              checked={form.promoIsActive}
              onCheckedChange={checked => onFieldChange('promoIsActive', checked)}
              label="Mostra il promo banner nel sito pubblico"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AdminField
              label="Testo promo in italiano"
              description="Messaggio mostrato ai visitatori nella versione italiana del sito."
            >
              <textarea
                rows={3}
                value={form.promoText_it ?? ''}
                onChange={event => onFieldChange('promoText_it', event.target.value.trim() ? event.target.value : null)}
                placeholder="Prenota dal sito ufficiale e ricevi la migliore tariffa disponibile."
                className="field-shell min-h-[5rem] resize-y"
              />
            </AdminField>

            <AdminField
              label="Testo promo in inglese"
              description="Versione inglese dello stesso messaggio promozionale."
            >
              <textarea
                rows={3}
                value={form.promoText_en ?? ''}
                onChange={event => onFieldChange('promoText_en', event.target.value.trim() ? event.target.value : null)}
                placeholder="Book on the official website to access the best available rate."
                className="field-shell min-h-[5rem] resize-y"
              />
            </AdminField>
          </div>

          <AdminField
            label="Link promo"
            description="Facoltativo. Se presente, rende cliccabile tutta la barra promo."
          >
            <input
              type="text"
              value={form.promoLink ?? ''}
              onChange={event => onFieldChange('promoLink', event.target.value.trim() ? event.target.value : null)}
              placeholder="/contatti oppure https://..."
              className="field-shell"
            />
          </AdminField>
        </div>
      </div>
    </div>
  )
}
