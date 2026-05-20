import { AdminBadge, AdminCard, AdminCardHeader, AdminField, AdminInput } from '@/components/admin/ui'
import type { SiteSettings } from '@/types/api'
import type { SettingsFieldUpdater } from './settingsFields'

interface CompanySectionProps {
  form: SiteSettings
  onFieldChange: SettingsFieldUpdater
}

export function CompanySection({
  form,
  onFieldChange,
}: CompanySectionProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <AdminCard>
        <AdminCardHeader
          title="Dati aziendali e footer"
          description="Questi campi alimentano il footer pubblico e i riferimenti di contatto dell’hotel."
        />
        <div className="grid gap-5 px-6 py-5 md:grid-cols-2">
          <AdminField label="Indirizzo sede" description="Via e numero civico della sede o della struttura.">
            <AdminInput value={form.registeredAddress} onChange={event => onFieldChange('registeredAddress', event.target.value)} />
          </AdminField>
          <AdminField label="Citta" description="Comune mostrato nei riferimenti aziendali e nel footer.">
            <AdminInput value={form.city} onChange={event => onFieldChange('city', event.target.value)} />
          </AdminField>
          <AdminField label="Provincia / regione" description="Aiuta a completare i riferimenti geografici della struttura.">
            <AdminInput value={form.region} onChange={event => onFieldChange('region', event.target.value)} />
          </AdminField>
          <AdminField label="CAP" description="Codice postale della sede.">
            <AdminInput value={form.postalCode} onChange={event => onFieldChange('postalCode', event.target.value)} />
          </AdminField>
          <AdminField label="Paese" description="Paese mostrato nelle informazioni societarie pubbliche.">
            <AdminInput value={form.country} onChange={event => onFieldChange('country', event.target.value)} />
          </AdminField>
          <AdminField label="Partita IVA" description="Dato fiscale mostrato nel footer, se presente.">
            <AdminInput value={form.vatNumber} onChange={event => onFieldChange('vatNumber', event.target.value)} />
          </AdminField>
          <AdminField label="Codice fiscale" description="Secondo riferimento fiscale, se necessario.">
            <AdminInput value={form.taxCode} onChange={event => onFieldChange('taxCode', event.target.value)} />
          </AdminField>
          <AdminField label="Telefono" description="Numero principale per contatti rapidi e richieste.">
            <AdminInput type="tel" value={form.phone} onChange={event => onFieldChange('phone', event.target.value)} />
          </AdminField>
          <AdminField label="Email" description="Indirizzo email principale visibile nel sito pubblico.">
            <AdminInput type="email" value={form.email} onChange={event => onFieldChange('email', event.target.value)} />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader
          title="Stato profilo"
          description="Indicatore rapido di completezza per i dati societari mostrati sul sito."
        />
        <div className="space-y-4 px-6 py-5">
          {[
            ['Ragione sociale', form.legalName],
            ['Indirizzo sede', form.registeredAddress],
            ['Citta', form.city],
            ['Paese', form.country],
            ['Partita IVA', form.vatNumber],
            ['Telefono', form.phone],
            ['Email', form.email],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-[1.2rem] border border-[rgba(131,98,84,0.12)] bg-white px-4 py-3">
              <span className="text-sm text-ink">{label}</span>
              <AdminBadge tone={value ? 'success' : 'neutral'}>
                {value ? 'Completo' : 'Mancante'}
              </AdminBadge>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}
