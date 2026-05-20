import type { ReactNode } from 'react'
import { type PublicPageFrameVariant } from '@/lib/public/shell'

interface PublicPageFrameProps {
  variant: PublicPageFrameVariant
  children: ReactNode
  className?: string
}

interface PublicPageSectionProps {
  children: ReactNode
  id?: string
  divider?: boolean
  density?: 'normal' | 'compact'
  className?: string
  innerClassName?: string
}

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

const frameClassMap: Record<PublicPageFrameVariant, string> = {
  hero: 'pb-16',
  standard: 'pb-16 pt-[var(--public-fixed-offset)]',
  detail: 'pb-16 pt-[var(--public-fixed-offset)]',
  form: 'pb-16 pt-[var(--public-fixed-offset)]',
  notFound: 'pb-16 pt-[var(--public-fixed-offset-notfound)]',
}

export function PublicPageFrame({ variant, children, className }: PublicPageFrameProps) {
  return <div className={joinClasses(frameClassMap[variant], className)}>{children}</div>
}

export function PublicPageIntro({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={joinClasses('page-grid', className)}>{children}</section>
}

export function PublicPageSection({
  children,
  id,
  divider = false,
  density = 'normal',
  className,
  innerClassName,
}: PublicPageSectionProps) {
  return (
    <section id={id} className={joinClasses(divider && 'section-divider', className)}>
      <div
        className={joinClasses(
          'page-grid',
          density === 'compact' ? 'py-12 md:py-16' : 'py-16 md:py-20',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
