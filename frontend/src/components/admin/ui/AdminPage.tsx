import type { ReactNode } from 'react'

interface AdminPageProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export function AdminPage({ title, description, actions, children }: AdminPageProps) {
  return (
    <section className="space-y-8">
      <div className="border-b border-line pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Admin CMS</p>
            <h1 className="text-h2 font-semibold text-ink">{title}</h1>
            {description ? (
              <p className="max-w-3xl text-sm leading-6 text-muted">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3 lg:justify-end">{actions}</div> : null}
        </div>
      </div>

      <div className="space-y-8">{children}</div>
    </section>
  )
}
