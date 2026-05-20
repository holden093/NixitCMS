import type { ReactNode } from 'react'

interface AdminBadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'danger'
}

export function AdminBadge({
  children,
  tone = 'neutral',
}: AdminBadgeProps) {
  const tones = {
    neutral: 'border-line bg-stone-100 text-ink-soft',
    accent: 'border-line bg-stone-100 text-ink',
    success: 'border-line bg-stone-100 text-ink',
    danger: 'border-line bg-stone-100 text-ink',
  }

  return (
    <span className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-medium text-ink ${tones[tone]}`}>
      {children}
    </span>
  )
}
