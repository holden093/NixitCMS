import type { Content, LocaleCode } from '@/types/api'

export interface SectionFieldDefinition<T extends string> {
  key: T
  label: string
  type?: 'text' | 'media'
  group?: string
  uiLabel?: string
  description?: string
  placeholder?: string
  example?: string
  pickerTitle?: string
  previewable?: boolean
  priority?: 'primary' | 'secondary'
  summary?: string
  multiline?: boolean
  rows?: number
  /**
   * When true, the public renderer interprets this field as inline markdown
   * (bold, italic, link). The admin editor surfaces a hint accordingly.
   */
  markdown?: boolean
}

export function parseStructuredSections<T extends string>(
  raw: string | null | undefined,
  fields: readonly SectionFieldDefinition<T>[],
): Partial<Record<T, string>> {
  if (!raw || !raw.trim()) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      return {}
    }

    return fields.reduce<Partial<Record<T, string>>>((accumulator, field) => {
      const value = (parsed as Record<string, unknown>)[field.key]
      if (typeof value === 'string') {
        accumulator[field.key] = value
      }
      return accumulator
    }, {})
  } catch {
    return {}
  }
}

export function resolveStructuredSections<T extends object>(
  content: Content | null,
  locale: LocaleCode,
  fields: readonly SectionFieldDefinition<Extract<keyof T, string>>[],
  fallback: T,
): T {
  const raw = locale === 'en' ? content?.sections_en : content?.sections_it
  return {
    ...fallback,
    ...parseStructuredSections(raw, fields),
  } as T
}

export function updateStructuredSectionValue<T extends string>(
  raw: string | null | undefined,
  fields: readonly SectionFieldDefinition<T>[],
  key: T,
  value: string,
): string {
  const current = parseStructuredSections(raw, fields)
  return JSON.stringify({ ...current, [key]: value }, null, 2)
}
