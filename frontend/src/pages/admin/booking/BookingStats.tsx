import { AdminStatCard } from '@/components/admin/ui'

interface BookingStatsProps {
  total: number
  enabled: number
  types: number
}

export function BookingStats({ total, enabled, types }: BookingStatsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <AdminStatCard label="Provider totali" value={total} helper="Tutte le fonti di prenotazione configurate nel CMS." />
      <AdminStatCard label="Provider attivo" value={enabled} helper="Il sistema consente un solo provider abilitato per volta." />
      <AdminStatCard label="Tipologie presenti" value={types} helper="Numero di integrazioni diverse al momento registrate." />
    </div>
  )
}
