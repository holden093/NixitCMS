import type { ReactNode } from 'react'
import { AdminIcon } from './AdminIcon'

type AdminAlertTone = 'error' | 'info' | 'success'

const toneClasses: Record<AdminAlertTone, string> = {
  error: 'border-rose-200 bg-rose-50 text-rose-700',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

interface AdminAlertProps {
  children: ReactNode
  tone?: AdminAlertTone
  className?: string
}

export function AdminAlert({
  children,
  tone = 'error',
  className = '',
}: AdminAlertProps) {
  return (
    <div className={[
      'flex items-start gap-3 rounded-[1.4rem] border px-4 py-4 text-sm leading-6',
      toneClasses[tone],
      className,
    ].filter(Boolean).join(' ')}>
      <div className="mt-0.5 shrink-0">
        <AdminIcon name="alert-triangle" className="h-4 w-4" />
      </div>
      <p>{children}</p>
    </div>
  )
}
