import { prisma } from '../lib/prisma'

const DEPRECATED_SECTION_KEYS_BY_SLUG = {
  about: ['cta'],
  home: ['galleryLabel', 'galleryTitle', 'galleryIntro'],
  contacts: ['label', 'replyTitle', 'replyBody', 'bookingCta', 'formIntro'],
  site: ['footerGalleryLink'],
} as const satisfies Record<string, readonly string[]>

type SanitizableContentRecord = {
  pageSlug: string
  title_it?: string
  title_en?: string
  sections_it: string
  sections_en: string
}

type SanitizableContentInput = {
  title_it: string
  title_en: string
  subtitle_it: string
  subtitle_en: string
  body_it: string
  body_en: string
  sections_it: string
  sections_en: string
}

const CONTACTS_DEFAULT_TITLES = {
  it: 'Contattaci',
  en: 'Contact us',
} as const

const CONTACTS_LEGACY_TITLES = {
  it: 'Titolo contacts',
  en: 'Contacts title',
} as const

function getDeprecatedSectionKeys(pageSlug: string) {
  return DEPRECATED_SECTION_KEYS_BY_SLUG[pageSlug as keyof typeof DEPRECATED_SECTION_KEYS_BY_SLUG] ?? []
}

function sanitizeStructuredSections(pageSlug: string, sections: string) {
  const deprecatedKeys = getDeprecatedSectionKeys(pageSlug)

  if (!deprecatedKeys.length || !sections.trim()) {
    return sections
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(sections)
  } catch {
    return sections
  }

  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
    return sections
  }

  const nextSections = { ...(parsed as Record<string, unknown>) }
  let changed = false

  for (const key of deprecatedKeys) {
    if (key in nextSections) {
      delete nextSections[key]
      changed = true
    }
  }

  return changed ? JSON.stringify(nextSections) : sections
}

function normalizeContactsTitle(locale: keyof typeof CONTACTS_DEFAULT_TITLES, value: string | undefined) {
  const trimmed = value?.trim() ?? ''

  if (!trimmed || trimmed === CONTACTS_LEGACY_TITLES[locale]) {
    return CONTACTS_DEFAULT_TITLES[locale]
  }

  return value ?? ''
}

export function sanitizeContentRecord<T extends SanitizableContentRecord>(content: T) {
  const nextSectionsIt = sanitizeStructuredSections(content.pageSlug, content.sections_it)
  const nextSectionsEn = sanitizeStructuredSections(content.pageSlug, content.sections_en)
  const nextTitleIt = content.pageSlug === 'contacts'
    ? normalizeContactsTitle('it', content.title_it)
    : content.title_it
  const nextTitleEn = content.pageSlug === 'contacts'
    ? normalizeContactsTitle('en', content.title_en)
    : content.title_en

  if (
    nextSectionsIt === content.sections_it
    && nextSectionsEn === content.sections_en
    && nextTitleIt === content.title_it
    && nextTitleEn === content.title_en
  ) {
    return content
  }

  return {
    ...content,
    title_it: nextTitleIt,
    title_en: nextTitleEn,
    sections_it: nextSectionsIt,
    sections_en: nextSectionsEn,
  }
}

export function sanitizeContentSectionsInput(pageSlug: string, sections: string) {
  return sanitizeStructuredSections(pageSlug, sections)
}

export function sanitizeContentUpdateInput(pageSlug: string, input: SanitizableContentInput) {
  const sanitized = {
    ...input,
    sections_it: sanitizeStructuredSections(pageSlug, input.sections_it),
    sections_en: sanitizeStructuredSections(pageSlug, input.sections_en),
  }

  if (pageSlug !== 'contacts') {
    return sanitized
  }

  return {
    ...sanitized,
    title_it: normalizeContactsTitle('it', sanitized.title_it),
    title_en: normalizeContactsTitle('en', sanitized.title_en),
    subtitle_it: '',
    subtitle_en: '',
    body_it: '',
    body_en: '',
  }
}

export async function reconcileStructuredContent() {
  const slugs = Object.keys(DEPRECATED_SECTION_KEYS_BY_SLUG)
  const contents = await prisma.content.findMany({
    where: {
      pageSlug: { in: slugs },
    },
    select: {
      id: true,
      pageSlug: true,
      title_it: true,
      title_en: true,
      sections_it: true,
      sections_en: true,
    },
  })

  for (const content of contents) {
    const sanitized = sanitizeContentRecord(content)

    if (
      sanitized.title_it === content.title_it
      && sanitized.title_en === content.title_en
      && sanitized.sections_it === content.sections_it
      && sanitized.sections_en === content.sections_en
    ) {
      continue
    }

    await prisma.content.update({
      where: { id: content.id },
      data: {
        title_it: sanitized.title_it,
        title_en: sanitized.title_en,
        sections_it: sanitized.sections_it,
        sections_en: sanitized.sections_en,
      },
    })
  }
}
