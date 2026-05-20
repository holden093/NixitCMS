import { AdminStatCard } from '@/components/admin/ui'

interface MediaStatsProps {
  total: number
  images: number
  totalSize: string
  categoriesCount: number
  uncategorizedCount: number
}

export function MediaStats({ total, images, totalSize, categoriesCount, uncategorizedCount }: MediaStatsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <AdminStatCard label="File totali" value={total} helper="Asset attualmente disponibili nel volume media." />
      <AdminStatCard label="Immagini" value={images} helper="File immagine con preview e thumbnail." />
      <AdminStatCard label="Peso complessivo" value={totalSize} helper="Dimensioni archiviate localmente." />
      <AdminStatCard label="Categorie" value={categoriesCount} helper="Categorie fotografiche create." />
      <AdminStatCard label="Senza categoria" value={uncategorizedCount} helper="File non assegnati a nessuna categoria." />
    </div>
  )
}
