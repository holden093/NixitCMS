import { AdminCard, AdminCardHeader, AdminField, AdminIcon, AdminInput } from '@/components/admin/ui'
import type { SiteSettings } from '@/types/api'
import type { SettingsFieldUpdater } from './settingsFields'

interface BookingSectionProps {
  form: SiteSettings
  onFieldChange: SettingsFieldUpdater
}

export function BookingSection({
  form,
  onFieldChange,
}: BookingSectionProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <AdminCard>
        <AdminCardHeader
          title="Compatibilita booking"
          description="Questa chiave legacy resta disponibile solo come fallback operativo."
        />
        <div className="px-6 py-5">
          <AdminField
            label="Chiave legacy Octorate"
            description="Usala solo se ti serve mantenere compatibilita con integrazioni pregresse."
          >
            <AdminInput
              value={form.octorateKey}
              onChange={event => onFieldChange('octorateKey', event.target.value)}
            />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader title="Snapshot configurazione" description="Verifica rapida dei blocchi principali gia configurati." />
        <div className="space-y-3 px-6 py-5">
          {[
            ['building-2', 'Brand hotel', 'Nome, logo e hero centrale del sito pubblico.'],
            ['palette', 'Tema visivo', 'Palette principale propagata via CSS variables.'],
            ['map-pinned', 'Coordinate mappa', 'Usate dalla sezione location e dalla direzione Google Maps.'],
            ['wand-sparkles', 'Compatibilita booking', 'La chiave legacy resta disponibile come fallback operativo.'],
          ].map(([icon, title, body]) => (
            <div key={title} className="flex items-center gap-3 rounded-[1.3rem] border border-[rgba(131,98,84,0.12)] bg-white px-4 py-3">
              <AdminIcon name={icon as 'building-2' | 'palette' | 'map-pinned' | 'wand-sparkles'} className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">{title}</p>
                <p className="text-xs text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}
