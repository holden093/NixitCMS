import type { LocaleCode, MediaFile } from '@/types/api'

export function getMediaCategories(file: MediaFile) {
  return (file.categories ?? []).map(category => category.photoCategory)
}

export function getLocalizedMediaCategoryLabel(file: MediaFile, locale: LocaleCode) {
  const [firstCategory] = getMediaCategories(file)
  if (!firstCategory) {
    return ''
  }

  return locale === 'en' ? firstCategory.name_en : firstCategory.name_it
}

export function getMediaSearchText(file: MediaFile) {
  const categoryText = getMediaCategories(file)
    .flatMap(category => [category.slug, category.name_it, category.name_en])
    .join(' ')

  return `${file.label} ${file.mimeType} ${file.key} ${categoryText}`.trim()
}
