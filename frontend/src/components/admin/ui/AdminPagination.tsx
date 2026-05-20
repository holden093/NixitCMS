import { AdminButton } from './AdminButton'

interface AdminPaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function AdminPagination({
  page,
  totalPages,
  onChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
      <p className="text-sm text-slate-500">
        Pagina {page} di {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <AdminButton
          kind="secondary"
          size="sm"
          startIcon="chevron-left"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
        >
          Prec.
        </AdminButton>
        <AdminButton
          kind="secondary"
          size="sm"
          endIcon="chevron-right"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
        >
          Succ.
        </AdminButton>
      </div>
    </div>
  )
}
