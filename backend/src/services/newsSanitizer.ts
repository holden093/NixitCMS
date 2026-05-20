import sanitizeHtml from 'sanitize-html'
import { badRequest } from '../lib/http'
import { stripHtml } from '../lib/newsPayloads'

const EMPTY_EDITOR_DOC = { type: 'doc', content: [] }

function normalizeUrl(url: string | undefined) {
  const value = url?.trim() ?? ''
  if (!value) {
    return ''
  }

  if (value.startsWith('/')) {
    return value
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return ''
}

export function normalizeNewsBodyJson(value: unknown, fieldName: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    if (value === undefined || value === null || value === '') {
      return JSON.stringify(EMPTY_EDITOR_DOC)
    }

    badRequest(`${fieldName} must be a valid editor document`)
  }

  try {
    return JSON.stringify(value)
  } catch {
    badRequest(`${fieldName} must be serializable`)
  }
}

export function sanitizeNewsHtml(value: string) {
  const cleaned = sanitizeHtml(value, {
    allowedTags: [
      'p',
      'br',
      'hr',
      'h2',
      'h3',
      'h4',
      'blockquote',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'a',
      'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName: string, attribs: Record<string, string | undefined>) => {
        const href = normalizeUrl(attribs.href)
        if (!href) {
          return { tagName: 'span', text: stripHtml(attribs.href ?? '') }
        }

        return {
          tagName: 'a',
          attribs: {
            href,
            target: href.startsWith('http') ? '_blank' : undefined,
            rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
          },
        }
      },
      img: (_tagName: string, attribs: Record<string, string | undefined>) => ({
        tagName: 'img',
        attribs: {
          src: normalizeUrl(attribs.src),
          alt: attribs.alt?.trim() ?? '',
          title: attribs.title?.trim() ?? undefined,
        },
      }),
    },
    exclusiveFilter(frame: { tag: string; attribs: Record<string, string | undefined> }) {
      return frame.tag === 'img' && !frame.attribs.src
    },
  }).trim()

  return cleaned
}
