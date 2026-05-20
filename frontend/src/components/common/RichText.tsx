import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

interface RichTextProps {
  children: string
  className?: string
  /**
   * When true, restricts markdown to inline grammar only (bold, italic, link,
   * code, line break). The output is wrapped in a `<span>`; useful inside
   * elements like `<p>` or `<Dialog.Description>` where nested block elements
   * would produce invalid HTML.
   */
  inline?: boolean
}

const linkComponent: Components['a'] = ({ href, children }) => (
  <a
    href={href}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="underline underline-offset-2 hover:text-accent"
  >
    {children}
  </a>
)

const INLINE_ELEMENTS = ['strong', 'em', 'a', 'code', 'br'] as const
const BLOCK_ELEMENTS = ['p', 'strong', 'em', 'a', 'code', 'br', 'ul', 'ol', 'li'] as const

export default function RichText({ children, className, inline = false }: RichTextProps) {
  if (!children?.trim()) return null

  if (inline) {
    return (
      <span className={className}>
        <ReactMarkdown
          allowedElements={[...INLINE_ELEMENTS]}
          unwrapDisallowed
          components={{ a: linkComponent }}
        >
          {children}
        </ReactMarkdown>
      </span>
    )
  }

  return (
    <div className={className}>
      <ReactMarkdown
        allowedElements={[...BLOCK_ELEMENTS]}
        unwrapDisallowed
        components={{ a: linkComponent }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
