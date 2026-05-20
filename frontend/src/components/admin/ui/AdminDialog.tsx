import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AdminIconButton } from './AdminIconButton'

interface AdminDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export function AdminDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: AdminDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] flex max-h-[90vh] w-[min(96vw,76rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-line bg-paper outline-none">
          <div className="flex items-start justify-between border-b border-line px-6 py-5 md:px-8">
            <div className="space-y-1.5">
              <Dialog.Title className="text-h2 font-semibold text-ink">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="max-w-2xl text-sm leading-6 text-muted">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>

            <Dialog.Close asChild>
              <AdminIconButton icon="x" label="Close dialog" />
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
