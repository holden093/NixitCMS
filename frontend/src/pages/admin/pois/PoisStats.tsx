import { AdminStatCard } from '@/components/admin/ui'

interface PoisStatsProps {
  items: Array<{ category: string, count: number, label: string }>
  total: number
}

export function PoisStats({ items, total }: PoisStatsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      <AdminStatCard label="POI totali" value={total} helper="Tutti i punti configurati per la mappa." />
      {items.slice(0, 3).map(item => (
        <AdminStatCard
          key={item.category}
          label={item.label}
          value={item.count}
          helper="Conteggio per categoria"
        />
      ))}
    </div>
  )
}
