import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AdminBadge } from './AdminBadge'
import { AdminButton } from './AdminButton'
import { AdminIcon } from './AdminIcon'

interface AdminConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  loading?: boolean
}

export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  loading = false,
}: AdminConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[90] bg-ink/40" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 border border-line bg-paper p-6 md:p-7">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-12 w-12 items-center justify-center bg-stone-100 text-ink">
              <AdminIcon name="alert-triangle" className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertDialog.Title className="text-h2 font-semibold text-ink">
                  {title}
                </AlertDialog.Title>
                <AdminBadge tone="danger">Azione critica</AdminBadge>
              </div>
              <AlertDialog.Description className="text-sm leading-6 text-muted">
                {description}
              </AlertDialog.Description>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <AdminButton kind="secondary" size="lg" disabled={loading}>Annulla</AdminButton>
            </AlertDialog.Cancel>
            <AdminButton kind="danger" size="lg" onClick={onConfirm} loading={loading}>{confirmLabel}</AdminButton>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
