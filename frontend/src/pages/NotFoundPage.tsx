import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PublicPageFrame } from '@/components/layout/PublicPageFrame'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePublicPages } from '@/hooks/usePublicPages'
import { getLocalizedPublicPagePath, getPublicPageFrameVariant } from '@/lib/public/shell'
import {
  getDefaultNotFoundSections,
  NOT_FOUND_SECTION_FIELDS,
  resolveStructuredSections,
} from '@/utils/publicSiteContent'
import type { LocaleCode } from '@/types/api'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const content = useCmsContent('not-found')
  const publicPages = usePublicPages()
  useDocumentTitle('404')
  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const title = content ? (locale === 'en' ? content.title_en : content.title_it) : t('notFoundPage.title')
  const body = content ? (locale === 'en' ? content.subtitle_en : content.subtitle_it) : t('notFoundPage.body')
  const notFoundCopy = resolveStructuredSections(
    content,
    locale,
    NOT_FOUND_SECTION_FIELDS,
    getDefaultNotFoundSections(t),
  )
  const visibleSlugs = publicPages ? new Set(publicPages.map(page => page.slug)) : null
  const actions = [
    { slug: 'home', to: getLocalizedPublicPagePath('home', locale), label: notFoundCopy.home, kind: 'primary' as const },
    { slug: 'contacts', to: getLocalizedPublicPagePath('contacts', locale), label: notFoundCopy.contacts, kind: 'secondary' as const },
  ].filter(action => !visibleSlugs || visibleSlugs.has(action.slug))

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('notFound')}>
      <div className="page-grid">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{notFoundCopy.label}</p>
        <h1 className="display-title mt-4">404</h1>
        <p className="mt-5 text-h2 font-semibold text-ink">
          {title}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-6 text-ink-soft">
          {body}
        </p>

        {actions.length > 0 ? (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {actions.map(action => (
              <Link key={action.slug} to={action.to} className={action.kind === 'primary' ? 'btn-primary' : 'btn-secondary'}>
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      </div>
    </PublicPageFrame>
  )
}
