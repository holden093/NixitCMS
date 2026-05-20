import { AdminStatCard } from '@/components/admin/ui'

interface RoomsStatsProps {
  total: number
  published: number
  withGallery: number
}

export function RoomsStats({
  total,
  published,
  withGallery,
}: RoomsStatsProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <AdminStatCard label="Camere totali" value={total} helper="Tutte le categorie camera attualmente presenti nel catalogo." />
      <AdminStatCard label="Pubblicate" value={published} helper="Categorie camera visibili sul sito pubblico." />
      <AdminStatCard label="Con galleria" value={withGallery} helper="Categorie camera che hanno una categoria fotografica collegata." />
    </div>
  )
}
