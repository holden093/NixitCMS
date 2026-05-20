import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { deleteMedia, getAdminMedia, updateMediaMetadata, uploadMedia } from '@/api/admin/media'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { getMediaSearchText } from '@/lib/media'
import { extractErrorMessage } from '@/utils/errors'
import type { MediaFile } from '@/types/api'
import { getMediaUsageMessage, hasMediaUsage } from './mediaUsage'

export function useMediaPage() {
  const crud = useAdminCrud<MediaFile>({
    load: getAdminMedia,
    getSearchText: file => getMediaSearchText(file),
    pageSize: 12,
  })
  const [categoryFilter, setCategoryFilterState] = useState<'all' | 'none' | number>('all')
  const [uploading, setUploading] = useState(false)
  const [savingMetadata, setSavingMetadata] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null)

  const imageFilesCount = useMemo(
    () => crud.items.filter(file => file.mimeType.startsWith('image/')).length,
    [crud.items],
  )

  const totalSizeMb = useMemo(
    () => `${(crud.items.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(1)} MB`,
    [crud.items],
  )

  const uncategorizedCount = useMemo(
    () => crud.items.filter(file => !file.categories || file.categories.length === 0).length,
    [crud.items],
  )

  const categoryFilteredItems = useMemo(() => {
    if (categoryFilter === 'all') return crud.filteredItems
    if (categoryFilter === 'none') {
      return crud.filteredItems.filter(file => !file.categories || file.categories.length === 0)
    }
    return crud.filteredItems.filter(file =>
      file.categories?.some(c => c.photoCategory.id === categoryFilter),
    )
  }, [crud.filteredItems, categoryFilter])

  const pageSize = 12
  const totalPages = Math.max(1, Math.ceil(categoryFilteredItems.length / pageSize))
  const safePage = Math.min(Math.max(crud.page, 1), totalPages)
  const filteredPaginatedItems = useMemo(() => ({
    page: safePage,
    totalPages,
    items: categoryFilteredItems.slice((safePage - 1) * pageSize, safePage * pageSize),
  }), [categoryFilteredItems, safePage, totalPages])

  useEffect(() => {
    if (crud.page !== safePage) {
      crud.setPage(safePage)
    }
  }, [crud, safePage])

  const setCategoryFilter = (next: 'all' | 'none' | number) => {
    setCategoryFilterState(next)
    crud.setPage(1)
  }

  const formatBytes = (value: number) => {
    if (value < 1024) return `${value} B`
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
    return `${(value / (1024 * 1024)).toFixed(1)} MB`
  }

  const syncSelectedFile = (nextFile: MediaFile) => {
    crud.upsert(nextFile)
    if (selectedFile?.id === nextFile.id) {
      setSelectedFile(nextFile)
    }
  }

  const handleUpload = async (files: File[], categoryIds: number[]) => {
    if (!files.length) {
      return false
    }

    setUploading(true)
    crud.setError('')

    try {
      const uploadedFiles: MediaFile[] = []
      for (const file of files) {
        uploadedFiles.push(await uploadMedia(file, categoryIds))
      }

      crud.replaceAll([
        ...uploadedFiles,
        ...crud.items.filter(existing => !uploadedFiles.some(item => item.id === existing.id)),
      ])
      toast.success(uploadedFiles.length > 1 ? 'Media caricati' : 'Media caricato')
      return true
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare il file.')
      crud.setError(message)
      toast.error(message)
      return false
    } finally {
      setUploading(false)
    }
  }

  const handleMetadataSave = async (fileId: number, label: string, categoryIds: number[]) => {
    setSavingMetadata(true)
    crud.setError('')

    try {
      const updated = await updateMediaMetadata(fileId, { label, categoryIds })
      syncSelectedFile(updated)
      toast.success('Metadati aggiornati')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile aggiornare i metadati del media.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setSavingMetadata(false)
    }
  }

  const requestDelete = (file: MediaFile) => {
    if (hasMediaUsage(file.usage)) {
      const message = getMediaUsageMessage(file.usage)
      crud.setError(message)
      toast.error(message)
      setSelectedFile(file)
      return
    }

    setDeleteTarget(file)
  }

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    crud.setError('')

    try {
      await deleteMedia(deleteTarget.id)
      crud.remove(deleteTarget.id)
      if (selectedFile?.id === deleteTarget.id) {
        setSelectedFile(null)
      }
      toast.success('Eliminato')
    } catch (error) {
      const usage = axios.isAxiosError(error) ? error.response?.data?.usage : undefined
      const usageMessage = getMediaUsageMessage(usage)
      const message = usageMessage || extractErrorMessage(error, 'Impossibile eliminare il file.')
      crud.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    ...crud,
    uploading,
    savingMetadata,
    selectedFile,
    setSelectedFile,
    deleteTarget,
    setDeleteTarget,
    requestDelete,
    imageFilesCount,
    uncategorizedCount,
    totalSizeMb,
    formatBytes,
    handleUpload,
    handleMetadataSave,
    handleDelete,
    paginatedItems: filteredPaginatedItems,
    categoryFilter,
    setCategoryFilter,
    filteredCount: categoryFilteredItems.length,
  }
}
