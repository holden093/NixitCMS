import type { SelectHTMLAttributes } from 'react'

export function AdminSelect({
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.04)]',
        'outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
        'focus:border-blue-500 focus:ring-4 focus:ring-blue-50',
        'aria-[invalid=true]:border-rose-300 aria-[invalid=true]:focus:border-rose-500 aria-[invalid=true]:focus:ring-rose-100',
        className,
      ].filter(Boolean).join(' ')}
    />
  )
}
