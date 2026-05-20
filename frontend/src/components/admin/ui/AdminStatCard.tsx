import { AdminCard } from './AdminCard'

interface AdminStatCardProps {
  label: string
  value: string | number
  helper?: string
}

export function AdminStatCard({ label, value, helper }: AdminStatCardProps) {
  return (
    <AdminCard className="p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-h2 font-semibold text-ink">{value}</p>
      {helper ? <p className="mt-2 text-sm leading-6 text-muted">{helper}</p> : null}
    </AdminCard>
  )
}
