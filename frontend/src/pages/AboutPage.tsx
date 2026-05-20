import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { PublicPageFrame, PublicPageSection } from '@/components/layout/PublicPageFrame'
import RichText from '@/components/common/RichText'
import SafeImage from '@/components/SafeImage'
import { getMedia, getMediaUrl } from '@/api/media'
import { useCmsContent } from '@/hooks/useCmsContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePageGuard } from '@/hooks/usePageGuard'
import { getPublicPageFrameVariant } from '@/lib/public/shell'
import { useSettings } from '@/hooks/useSettings'
import {
  ABOUT_SECTION_FIELDS,
  getDefaultAboutSections,
  resolveStructuredSections,
} from '@/utils/publicSiteContent'
import type { LocaleCode, MediaFile } from '@/types/api'
import NotFoundPage from './NotFoundPage'

export default function AboutPage() {
  const { i18n, t } = useTranslation()
  const content = useCmsContent('about')
  const settings = useSettings()
  const [media, setMedia] = useState<MediaFile[]>([])

  const isPageVisible = usePageGuard('about')
  useDocumentTitle(settings?.hotelName ? `${t('nav.about')} | ${settings.hotelName}` : t('nav.about'))

  useEffect(() => {
    let mounted = true

    getMedia().then(files => {
      if (mounted) {
        setMedia(files)
      }
    }).catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

  const locale: LocaleCode = i18n.language === 'en' ? 'en' : 'it'
  const imageFiles = useMemo(() => media.filter(file => file.mimeType.startsWith('image/')), [media])
  const aboutSections = useMemo(
    () => resolveStructuredSections(content, locale, ABOUT_SECTION_FIELDS, getDefaultAboutSections(t)),
    [content, locale, t],
  )
  const defaultHeroImage = imageFiles[1] ?? imageFiles[0] ?? null
  const heroImage = useMemo(() => {
    if (aboutSections.imageKey) {
      return imageFiles.find(file => file.key === aboutSections.imageKey) ?? defaultHeroImage
    }

    return defaultHeroImage
  }, [aboutSections.imageKey, defaultHeroImage, imageFiles])

  if (isPageVisible === false) {
    return <NotFoundPage />
  }

  if (isPageVisible === null || !content) {
    return (
      <div className="page-grid pb-16 pt-28">
        <div className="animate-pulse">
          <div className="h-3 w-24 bg-stone-200" />
          <div className="mt-6 h-10 w-3/4 bg-stone-200" />
          <div className="mt-8 h-32 bg-stone-100" />
        </div>
      </div>
    )
  }

  const title = locale === 'en' ? content.title_en : content.title_it
  const subtitle = locale === 'en' ? content.subtitle_en : content.subtitle_it
  const body = locale === 'en' ? content.body_en : content.body_it
  const hasLabel = aboutSections.label.trim().length > 0
  const hasQuoteLabel = aboutSections.quoteLabel.trim().length > 0
  const hasQuoteBody = aboutSections.quoteBody.trim().length > 0
  const hasSubtitle = subtitle.trim().length > 0
  const hasBody = body.trim().length > 0
  const hasEditorialContent = hasQuoteLabel || hasQuoteBody || hasBody

  return (
    <PublicPageFrame variant={getPublicPageFrameVariant('about')}>
      <section className="relative isolate overflow-hidden bg-ink">
        {heroImage ? (
          <SafeImage
            src={getMediaUrl(heroImage.key, 'hero')}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,14,0.35)_0%,rgba(20,16,14,0.55)_60%,rgba(20,16,14,0.75)_100%)]" />

        <div className="page-grid relative flex min-h-[36rem] flex-col justify-end gap-5 pb-20 pt-28 md:min-h-[42rem] md:pt-32">
          {hasLabel ? <p className="eyebrow text-paper/75">{aboutSections.label}</p> : null}
          <h1 className="display-title max-w-3xl text-paper">{title}</h1>
          {hasSubtitle ? (
            <p className="max-w-xl text-[15px] leading-7 text-paper/85">{subtitle}</p>
          ) : null}
        </div>
      </section>

      {hasEditorialContent ? (
        <PublicPageSection divider>
            <div className="mx-auto max-w-2xl space-y-8">
              {hasQuoteLabel || hasQuoteBody ? (
                <div className="space-y-3">
                  {hasQuoteLabel ? <p className="eyebrow">{aboutSections.quoteLabel}</p> : null}
                  {hasQuoteBody ? (
                    <RichText
                      inline
                      className="block text-h2 font-semibold leading-snug text-ink md:text-[26px]"
                    >
                      {aboutSections.quoteBody}
                    </RichText>
                  ) : null}
                </div>
              ) : null}

              {hasBody ? (
                <article className="editorial-prose">
                  <ReactMarkdown>{body}</ReactMarkdown>
                </article>
              ) : null}
            </div>
        </PublicPageSection>
      ) : null}
    </PublicPageFrame>
  )
}
