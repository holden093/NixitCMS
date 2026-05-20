import type { ButtonHTMLAttributes } from 'react'
import { AdminIcon, type AdminIconName } from './AdminIcon'

interface AdminIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: AdminIconName
  label: string
}

export function AdminIconButton({
  icon,
  label,
  className = '',
  type = 'button',
  ...props
}: AdminIconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200',
        'bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <AdminIcon name={icon} className="h-4 w-4" />
    </button>
  )
}
