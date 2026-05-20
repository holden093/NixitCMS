import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getNews } from '@/api/news'
import { PublicPageFrame, PublicPageIntro } from '@/components/layout/PublicPageFrame'
import { NewsSummaryCard } from '@/components/news/NewsSummaryCard'
import { NewsletterSignupPopup } from '@/components/news/NewsletterSignupPopup'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePageGuard } from '@/hooks/usePageGuard'
import { getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import type { LocaleCode, NewsArticleSummary } from '@/types/api'
import NotFoundPage from './NotFoundPage'

function resolveNewsletterStatusMessage(status: string | null, t: (key: string) => string) {
  switch (status) {
    case 'confirmed':
      return t('news.confirmed')
    case 'confirm-invalid':
      return t('news.confirmInvalid')
    case 'confirm-expired':
      return t('news.confirmExpired')
    case 'unsubscribed':
      return t('news.unsubscribed')
    case 'unsubscribe-invalid':
      return t('news.unsubscribeInvalid')
    default:
      return ''
  }
}

export default function NewsPage() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const location = useLocation()
  const isPageVisible = usePageGuard('news')
  const [articles, setArticles] = useState<NewsArticleSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  useDocumentTitle(settings?.hotelName ? `${t('news.pageTitle')} | ${settings.hotelName}` : t('news.pageTitle'))

  useEffect(() => {
    let mounted = true

    getNews()
      .then(nextArticles => {
        if (mounted) {
          setArticles(nextArticles)
        }
      })
      .catch(() => {
        if (mounted) {
          setLoadError(true)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const newsletterMessage = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return resolveNewsletterStatusMessage(params.get('newsletter'), t)
  }, [location.search, t])

  if (isPageVisible === false) {
    return <NotFoundPage />
  }

  if (isPageVisible === null || loading) {
    return (
      <div className="page-grid pb-16 pt-28">
        <div className="space-y-6">
          <div className="h-4 w-24 animate-pulse bg-stone-200" />
          <div className="h-12 w-full max-w-xl animate-pulse bg-stone-200" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse bg-stone-100" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('news')}>
      <PublicPageIntro>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="max-w-3xl">
            <p className="eyebrow">{t('news.eyebrow')}</p>
            <h1 className="display-title mt-3">{t('news.pageTitle')}</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink-soft">
              {t('news.pageIntro')}
            </p>
          </div>

          <div className="border-t border-line pt-5 lg:border-t-0 lg:pt-2">
            <NewsletterSignupPopup
              locale={locale}
              initialMessage={newsletterMessage}
              showInlineLauncher
            />
          </div>
        </div>
      </PublicPageIntro>

      <section className="page-grid mt-16">
        {loadError ? (
          <p className="border border-stone-300 bg-stone-100 px-4 py-3 text-small text-ink-soft">
            {t('errors.dynamicContentUnavailable')}
          </p>
        ) : null}

        {articles.length === 0 ? (
          <div className="border border-line bg-stone-50 p-8">
            <h2 className="text-h2 font-semibold text-ink">{t('news.emptyTitle')}</h2>
            <p className="mt-3 max-w-xl text-[14px] leading-6 text-ink-soft">
              {t('news.emptyBody')}
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <NewsSummaryCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </PublicPageFrame>
  )
}
