import type { InputHTMLAttributes, ReactNode } from 'react'
import { AdminIcon, type AdminIconName } from './AdminIcon'

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: AdminIconName
  endAdornment?: ReactNode
}

export function AdminInput({
  className = '',
  startIcon,
  endAdornment,
  ...props
}: AdminInputProps) {
  if (!startIcon && !endAdornment) {
    return (
      <input
        {...props}
        className={[
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.04)]',
          'outline-none transition placeholder:text-slate-400',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
          'focus:border-blue-500 focus:ring-4 focus:ring-blue-50',
          'aria-[invalid=true]:border-rose-300 aria-[invalid=true]:focus:border-rose-500 aria-[invalid=true]:focus:ring-rose-100',
          className,
        ].filter(Boolean).join(' ')}
      />
    )
  }

  return (
    <div className="relative">
      {startIcon ? (
        <AdminIcon
          name={startIcon}
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
      ) : null}
      <input
        {...props}
        className={[
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.04)]',
          'outline-none transition placeholder:text-slate-400',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
          'focus:border-blue-500 focus:ring-4 focus:ring-blue-50',
          'aria-[invalid=true]:border-rose-300 aria-[invalid=true]:focus:border-rose-500 aria-[invalid=true]:focus:ring-rose-100',
          startIcon ? 'pl-10' : '',
          endAdornment ? 'pr-12' : '',
          className,
        ].filter(Boolean).join(' ')}
      />
      {endAdornment ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {endAdornment}
        </div>
      ) : null}
    </div>
  )
}
