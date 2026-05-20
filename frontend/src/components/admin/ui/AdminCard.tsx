import type { ReactNode } from 'react'

export function AdminCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={[
      'overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.9))]',
      'shadow-[0_1px_2px_rgba(15,23,42,0.03),0_22px_50px_rgba(15,23,42,0.06)]',
      className,
    ].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function AdminCardHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100/90 px-6 py-6 md:px-8 md:py-7 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950 md:text-[1.45rem]">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-7 text-slate-500">{description}</p> : null}
      </div>
      {action ? <div className="w-full lg:w-auto">{action}</div> : null}
    </div>
  )
}
