declare module 'sanitize-html' {
  interface SanitizeHtmlFrame {
    tag: string
    attribs: Record<string, string | undefined>
  }

  interface SanitizeHtmlTransformResult {
    tagName: string
    attribs?: Record<string, string | undefined>
    text?: string
  }

  interface SanitizeHtmlOptions {
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
    allowedSchemes?: string[]
    allowProtocolRelative?: boolean
    transformTags?: Record<string, (tagName: string, attribs: Record<string, string | undefined>) => SanitizeHtmlTransformResult>
    exclusiveFilter?: (frame: SanitizeHtmlFrame) => boolean
  }

  export default function sanitizeHtml(dirty: string, options?: SanitizeHtmlOptions): string
}
