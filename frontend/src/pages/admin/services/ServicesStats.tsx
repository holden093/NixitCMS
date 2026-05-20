import { AdminStatCard } from '@/components/admin/ui'

interface ServicesStatsProps {
  total: number
  published: number
  withGallery: number
}

export function ServicesStats({
  total,
  published,
  withGallery,
}: ServicesStatsProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <AdminStatCard label="Servizi totali" value={total} helper="Tutte le schede attualmente presenti in catalogo." />
      <AdminStatCard label="Pubblicati" value={published} helper="Servizi visibili sul sito pubblico." />
      <AdminStatCard label="Con galleria" value={withGallery} helper="Servizi che hanno una categoria fotografica collegata." />
    </div>
  )
}
