import { AdminCard, AdminCardHeader, AdminField, AdminInput } from '@/components/admin/ui'
import type { SiteSettings } from '@/types/api'
import type { SettingsFieldUpdater } from './settingsFields'

interface LocationSectionProps {
  form: SiteSettings
  onFieldChange: SettingsFieldUpdater
}

export function LocationSection({ form, onFieldChange }: LocationSectionProps) {
  return (
    <AdminCard>
      <AdminCardHeader
        title="Mappa"
        description="Coordinate usate per centrare la mappa pubblica."
      />
      <div className="grid gap-4 px-6 py-5 md:grid-cols-3">
        <AdminField label="Latitudine" description="Coordinata nord-sud.">
          <AdminInput type="number" value={form.mapLat} onChange={event => onFieldChange('mapLat', Number(event.target.value))} />
        </AdminField>
        <AdminField label="Longitudine" description="Coordinata est-ovest.">
          <AdminInput type="number" value={form.mapLng} onChange={event => onFieldChange('mapLng', Number(event.target.value))} />
        </AdminField>
        <AdminField label="Zoom iniziale" description="Quanto deve essere ravvicinata la vista iniziale.">
          <AdminInput type="number" value={form.mapZoom} onChange={event => onFieldChange('mapZoom', Number(event.target.value))} />
        </AdminField>
      </div>
    </AdminCard>
  )
}
