import type { ReactNode } from 'react'

interface AdminFieldProps {
  label: string
  description?: string
  hint?: string
  action?: ReactNode
  children: ReactNode
}

export function AdminField({ label, description, hint, action, children }: AdminFieldProps) {
  return (
    <label className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <span className="block text-sm font-semibold text-slate-800">
            {label}
          </span>
          {description ? <span className="block text-sm leading-6 text-slate-500">{description}</span> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
      {hint ? <span className="text-sm leading-6 text-slate-500">{hint}</span> : null}
    </label>
  )
}
