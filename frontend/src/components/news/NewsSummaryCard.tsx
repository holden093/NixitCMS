import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SafeImage from '@/components/SafeImage'
import { getMediaUrl } from '@/api/media'
import type { LocaleCode, NewsArticleSummary } from '@/types/api'

interface NewsSummaryCardProps {
  article: NewsArticleSummary
  locale: LocaleCode
}

function formatDate(value: string | null, locale: LocaleCode) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
    dateStyle: 'medium',
    timeZone: 'Europe/Rome',
  }).format(new Date(value))
}

export function NewsSummaryCard({ article, locale }: NewsSummaryCardProps) {
  const { t } = useTranslation()
  const title = locale === 'en' ? article.title_en : article.title_it
  const excerpt = locale === 'en' ? article.excerpt_en : article.excerpt_it
  const href = locale === 'en' ? `/news/${article.slug}?lang=en` : `/news/${article.slug}`

  return (
    <article className="group flex h-full flex-col border-t border-line pt-5">
      <a href={href} className="flex h-full flex-col">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          {article.featuredMedia ? (
            <SafeImage
              src={getMediaUrl(article.featuredMedia.key, 'card')}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <span className="eyebrow">{title}</span>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          {article.publishedAt ? (
            <p className="eyebrow">{formatDate(article.publishedAt, locale)}</p>
          ) : null}
          <h3 className="mt-2 text-h3 font-semibold text-ink">{title}</h3>
          <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-soft line-clamp-4">
            {excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
            {t('news.readArticle')}
            <ArrowRight size={14} strokeWidth={1.75} />
          </span>
        </div>
      </a>
    </article>
  )
}
