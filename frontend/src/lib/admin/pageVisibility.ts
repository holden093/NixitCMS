import {
  MANAGED_PUBLIC_PAGE_ROUTE_MAP,
  MANAGED_PUBLIC_PAGE_SLUGS,
} from '@/lib/public/pageRoutes'

export const ADMIN_PAGE_VISIBILITY_SLUGS = MANAGED_PUBLIC_PAGE_SLUGS

export const ADMIN_PAGE_LABELS: Record<string, string> = Object.fromEntries(
  MANAGED_PUBLIC_PAGE_SLUGS.map(slug => [slug, MANAGED_PUBLIC_PAGE_ROUTE_MAP[slug].adminLabel]),
)
