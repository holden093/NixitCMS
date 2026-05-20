import { AdminCard, AdminCardHeader, AdminStatCard } from '@/components/admin/ui'
import type { DashboardSnapshot } from './useDashboardSnapshot'

export function DashboardStats({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Hotel" value={snapshot.hotelName || '...'} helper="Nome attivo mostrato nel sito pubblico." />
        <AdminStatCard label="Blocchi CMS" value={snapshot.contents} helper="Entry contenuto disponibili nel workspace editoriale." />
        <AdminStatCard label="Pagine visibili" value={snapshot.pagesVisible} helper="Pagine pubbliche attualmente abilitate." />
        <AdminStatCard label="Servizi" value={snapshot.services} helper="Servizi pubblici e bozze." />
      </div>

      <AdminCard>
        <AdminCardHeader
          title="Stato contenuti e catalogo"
          description="Controllo rapido delle aree piu dinamiche del sito pubblico."
        />
        <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
          <AdminStatCard label="Media" value={snapshot.media} helper="File disponibili in libreria." />
          <AdminStatCard label="Provider booking" value={snapshot.bookingProviders} helper="Fonti prenotazione configurate." />
        </div>
      </AdminCard>
    </>
  )
}
