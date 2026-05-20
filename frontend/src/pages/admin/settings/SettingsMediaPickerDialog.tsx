import {
  AdminMediaPickerDialog,
} from '@/components/admin/ui'
import type { MediaFile } from '@/types/api'

interface SettingsMediaPickerDialogProps {
  open: boolean
  title: string
  selectedKey: string
  files: MediaFile[]
  search: string
  onSearchChange: (value: string) => void
  onSelect: (file: MediaFile) => void
  onOpenChange: (open: boolean) => void
}

export function SettingsMediaPickerDialog({
  open,
  title,
  selectedKey,
  files,
  search,
  onSearchChange,
  onSelect,
  onOpenChange,
}: SettingsMediaPickerDialogProps) {
  return (
    <AdminMediaPickerDialog
      open={open}
      title={title}
      description="Scegli un'immagine gia presente nella libreria media per il branding pubblico."
      selectedKey={selectedKey}
      files={files}
      search={search}
      onSearchChange={onSearchChange}
      onSelect={onSelect}
      onOpenChange={onOpenChange}
    />
  )
}
