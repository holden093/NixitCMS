import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { AdminIcon, type AdminIconName } from './AdminIcon'

type AdminButtonKind = 'primary' | 'secondary' | 'danger' | 'ghost'
type AdminButtonSize = 'sm' | 'md' | 'lg'

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  kind?: AdminButtonKind
  size?: AdminButtonSize
  loading?: boolean
  startIcon?: AdminIconName
  endIcon?: AdminIconName
}

export function AdminButton({
  children,
  type = 'button',
  kind = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  startIcon,
  endIcon,
  ...props
}: AdminButtonProps) {
  const styles: Record<AdminButtonKind, string> = {
    primary: 'border border-blue-600 bg-blue-600 text-white shadow-[0_18px_35px_rgba(37,99,235,0.22)] hover:border-blue-500 hover:bg-blue-500 hover:shadow-[0_22px_42px_rgba(37,99,235,0.24)]',
    secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950',
    danger: 'border border-rose-600 bg-rose-600 text-white shadow-[0_16px_34px_rgba(225,29,72,0.18)] hover:border-rose-500 hover:bg-rose-500 hover:shadow-[0_18px_38px_rgba(225,29,72,0.22)]',
    ghost: 'border border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950',
  }
  const sizes: Record<AdminButtonSize, string> = {
    sm: 'h-10 rounded-xl px-4 text-sm',
    md: 'h-11 rounded-2xl px-5 text-sm',
    lg: 'h-14 rounded-[1.25rem] px-6 text-base font-semibold',
  }
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2.5 font-medium transition',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'disabled:pointer-events-none disabled:shadow-none disabled:opacity-50',
        sizes[size],
        styles[kind],
        loading ? 'cursor-wait opacity-70' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {!loading && startIcon ? <AdminIcon name={startIcon} className="h-4 w-4" /> : null}
      {children}
      {!loading && endIcon ? <AdminIcon name={endIcon} className="h-4 w-4" /> : null}
    </button>
  )
}
