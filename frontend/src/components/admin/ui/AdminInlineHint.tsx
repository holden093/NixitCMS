import type { ReactNode } from 'react'

export function AdminInlineHint({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-6 text-muted">{children}</p>
}
