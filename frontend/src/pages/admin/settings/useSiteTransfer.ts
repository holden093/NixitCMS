import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { exportSitePackage, importSitePackage } from '@/api/admin/siteTransfer'
import { extractErrorMessage } from '@/utils/errors'

function triggerFileDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = objectUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl)
  }, 0)
}

export function useSiteTransfer() {
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [confirmImportOpen, setConfirmImportOpen] = useState(false)
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null)

  const handleExport = async () => {
    setExporting(true)

    try {
      const { blob, filename } = await exportSitePackage()
      triggerFileDownload(blob, filename)
      toast.success('Pacchetto di esportazione creato.')
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Impossibile esportare il sito.'))
    } finally {
      setExporting(false)
    }
  }

  const queueImport = (files: FileList | null) => {
    const file = files?.[0] ?? null
    if (!file) {
      return
    }

    setPendingImportFile(file)
    setConfirmImportOpen(true)
  }

  const handleImportDialogChange = (open: boolean) => {
    if (importing) {
      return
    }

    setConfirmImportOpen(open)
    if (!open) {
      setPendingImportFile(null)
    }
  }

  const confirmImport = async () => {
    if (!pendingImportFile) {
      return
    }

    setImporting(true)

    try {
      await importSitePackage(pendingImportFile)
      setConfirmImportOpen(false)
      setPendingImportFile(null)
      toast.success('Import completato. Esegui di nuovo il login.')
      window.setTimeout(() => {
        window.location.assign('/admin/login')
      }, 600)
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Impossibile importare il pacchetto selezionato.'))
    } finally {
      setImporting(false)
    }
  }

  return {
    exporting,
    importing,
    confirmImportOpen,
    pendingImportFile,
    handleExport,
    queueImport,
    handleImportDialogChange,
    confirmImport,
  }
}
