import type { ReactNode } from 'react'
import {
  AdminAlert,
  AdminCard,
  AdminCardHeader,
  AdminEmptyState,
  AdminPagination,
  AdminSearchInput,
} from '@/components/admin/ui'

interface AdminCollectionSectionProps {
  title: string
  description: string
  query: string
  onQueryChange: (value: string) => void
  searchPlaceholder: string
  error?: string
  loading: boolean
  isEmpty: boolean
  emptyTitle: string
  emptyBody: string
  skeletonCount?: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  action?: ReactNode
  children: ReactNode
}

export function AdminCollectionSection({
  title,
  description,
  query,
  onQueryChange,
  searchPlaceholder,
  error,
  loading,
  isEmpty,
  emptyTitle,
  emptyBody,
  skeletonCount = 4,
  page,
  totalPages,
  onPageChange,
  action,
  children,
}: AdminCollectionSectionProps) {
  return (
    <AdminCard>
      <AdminCardHeader
        title={title}
        description={description}
        action={action ?? (
          <AdminSearchInput
            value={query}
            onChange={onQueryChange}
            placeholder={searchPlaceholder}
          />
        )}
      />

      <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">
        {error ? <AdminAlert>{error}</AdminAlert> : null}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-[1.4rem] bg-slate-100" />
            ))}
          </div>
        ) : isEmpty ? (
          <AdminEmptyState title={emptyTitle} body={emptyBody} />
        ) : (
          children
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </AdminCard>
  )
}
