interface AdminEmptyStateProps {
  title: string
  body: string
}

export function AdminEmptyState({ title, body }: AdminEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-10 py-12 text-center">
      <p className="text-2xl font-semibold tracking-tight text-slate-900">{title}</p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">{body}</p>
    </div>
  )
}
