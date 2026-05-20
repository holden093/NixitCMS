import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Phone } from 'lucide-react'

interface PhoneActionsProps {
  phone: string
  trigger: (opts: { open: boolean; toggle: () => void }) => ReactNode
  className?: string
  menuClassName?: string
  menuPosition?: 'bottom-right' | 'top-right' | 'top-left'
}

function buildWhatsAppUrl(phone: string) {
  const digits = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}`
}

export default function PhoneActions({
  phone,
  trigger,
  className = '',
  menuClassName = '',
  menuPosition = 'bottom-right',
}: PhoneActionsProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const positionClass =
    menuPosition === 'top-right'
      ? 'bottom-full right-0 mb-2'
      : menuPosition === 'top-left'
        ? 'bottom-full left-0 mb-2'
        : 'top-full right-0 mt-2'

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {trigger({ open, toggle: () => setOpen(value => !value) })}
      {open ? (
        <div
          className={`absolute z-50 flex min-w-[12rem] flex-col border border-line bg-paper ${positionClass} ${menuClassName}`}
          role="menu"
        >
          <a
            href={`tel:${phone}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-b border-line px-4 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-stone-100"
            role="menuitem"
          >
            <Phone size={14} strokeWidth={2} />
            <span>{t('floatingActions.callNow')}</span>
          </a>
          <a
            href={buildWhatsAppUrl(phone)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-stone-100"
            role="menuitem"
          >
            <MessageCircle size={14} strokeWidth={2} />
            <span>{t('floatingActions.whatsapp')}</span>
          </a>
        </div>
      ) : null}
    </div>
  )
}
