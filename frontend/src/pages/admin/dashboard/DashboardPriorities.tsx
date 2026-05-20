import { AdminCard, AdminCardHeader } from '@/components/admin/ui'

export function DashboardPriorities() {
  return (
    <AdminCard>
      <AdminCardHeader
        title="Priorita consigliate"
        description="Un percorso semplice per tenere sito, testi e asset sempre coerenti tra loro."
      />
      <div className="space-y-4 px-6 py-6 text-sm leading-7 text-muted">
        <p>1. Parti da “Sito pubblico” per sistemare testi, pulsanti e messaggi visibili.</p>
        <p>2. Passa a Brand & impostazioni per verificare logo, hero, colori e riferimenti aziendali.</p>
        <p>3. Controlla media, servizi e punti di interesse per mantenere tutto coerente con il racconto del sito.</p>
        <p>4. Apri Messaggi con regolarita per non perdere richieste o contatti importanti.</p>
      </div>
    </AdminCard>
  )
}
