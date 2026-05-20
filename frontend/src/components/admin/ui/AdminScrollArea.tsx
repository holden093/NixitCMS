import type { ReactNode } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface AdminScrollAreaProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
  orientation?: 'vertical' | 'horizontal' | 'both'
}

export function AdminScrollArea({
  children,
  className = '',
  viewportClassName = '',
  orientation = 'vertical',
}: AdminScrollAreaProps) {
  const showVertical = orientation === 'vertical' || orientation === 'both'
  const showHorizontal = orientation === 'horizontal' || orientation === 'both'

  return (
    <ScrollArea.Root className={`relative overflow-hidden ${className}`}>
      <ScrollArea.Viewport className={`h-full w-full ${viewportClassName}`}>
        {children}
      </ScrollArea.Viewport>
      {showVertical ? (
        <ScrollArea.Scrollbar orientation="vertical" className="absolute right-0 top-0 flex h-full w-2.5 touch-none select-none p-0.5">
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-stone-300" />
        </ScrollArea.Scrollbar>
      ) : null}
      {showHorizontal ? (
        <ScrollArea.Scrollbar orientation="horizontal" className="absolute bottom-0 left-0 flex h-2.5 w-full touch-none select-none p-0.5" style={{ flexDirection: 'column' }}>
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-stone-300" />
        </ScrollArea.Scrollbar>
      ) : null}
    </ScrollArea.Root>
  )
}
