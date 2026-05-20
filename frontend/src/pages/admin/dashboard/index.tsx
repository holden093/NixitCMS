import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminPage,
} from '@/components/admin/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { DashboardPriorities } from './DashboardPriorities'
import { DashboardStats } from './DashboardStats'
import { useDashboardSnapshot } from './useDashboardSnapshot'

export default function DashboardPage() {
  const { snapshot, loading, error, loadSnapshot } = useDashboardSnapshot()

  useDocumentTitle('Panoramica — Admin')

  if (loading) {
    return (
      <AdminPage
        title="Panoramica operativa"
        description="Una sintesi dello stato del sito pubblico, dei contenuti configurabili e delle entita gestite dal CMS."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse bg-stone-100" />
          ))}
        </div>
      </AdminPage>
    )
  }

  if (error && !snapshot) {
    return (
      <AdminPage
        title="Panoramica operativa"
        description="Una sintesi dello stato del sito pubblico, dei contenuti configurabili e delle entita gestite dal CMS."
      >
        <AdminCard className="p-5">
          <p className="text-sm leading-6 text-ink">{error}</p>
          <div className="mt-4">
            <AdminButton kind="secondary" onClick={() => void loadSnapshot()}>
              Riprova
            </AdminButton>
          </div>
        </AdminCard>
      </AdminPage>
    )
  }

  if (!snapshot) {
    return null
  }

  return (
    <AdminPage
      title="Panoramica operativa"
      description="Una sintesi dello stato del sito pubblico, dei contenuti configurabili e delle entita gestite dal CMS."
    >
      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <DashboardStats snapshot={snapshot} />
      <DashboardPriorities />
    </AdminPage>
  )
}
