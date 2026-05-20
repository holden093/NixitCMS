import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  createAdminNewsArticle,
  deleteAdminNewsArticle,
  getAdminNewsArticles,
  getAdminNewsletterSubscribers,
  getAdminNewsStatus,
  updateAdminNewsArticle,
  updateAdminNewsletterSubscriberStatus,
} from '@/api/admin/news'
import { getAdminMedia, getAdminMediaUrl, uploadMedia } from '@/api/admin/media'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import { useAdminEditorDialog } from '@/hooks/admin/useAdminEditorDialog'
import { extractErrorMessage } from '@/utils/errors'
import type {
  AdminNewsArticle,
  AdminNewsStatusResponse,
  MediaFile,
  NewsletterSubscriber,
} from '@/types/api'
import {
  createEmptyNewsForm,
  mapAdminNewsArticleToForm,
  toAdminNewsArticlePayload,
  type NewsForm,
} from './newsForm'

export function useNewsPage() {
  const articles = useAdminCrud<AdminNewsArticle>({
    load: getAdminNewsArticles,
    getSearchText: article => [
      article.title_it,
      article.title_en,
      article.slug,
      article.excerpt_it,
      article.excerpt_en,
      article.status,
    ].join(' '),
    pageSize: 6,
    sort: items => [...items].sort((left, right) => {
      const leftDate = left.publishedAt ? new Date(left.publishedAt).getTime() : 0
      const rightDate = right.publishedAt ? new Date(right.publishedAt).getTime() : 0
      return rightDate - leftDate || new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    }),
  })
  const subscribers = useAdminCrud<NewsletterSubscriber>({
    load: getAdminNewsletterSubscribers,
    getSearchText: subscriber => `${subscriber.email} ${subscriber.status} ${subscriber.locale}`,
    pageSize: 8,
  })
  const editor = useAdminEditorDialog<AdminNewsArticle, NewsForm>({
    createEmptyForm: createEmptyNewsForm,
    mapItemToForm: mapAdminNewsArticleToForm,
  })
  const [statusSummary, setStatusSummary] = useState<AdminNewsStatusResponse | null>(null)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loadingAuxiliary, setLoadingAuxiliary] = useState(true)
  const [auxiliaryError, setAuxiliaryError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AdminNewsArticle | null>(null)

  const loadAuxiliary = async () => {
    setLoadingAuxiliary(true)
    setAuxiliaryError('')

    try {
      const [status, media] = await Promise.all([
        getAdminNewsStatus(),
        getAdminMedia(),
      ])

      setStatusSummary(status)
      setMediaFiles(media.filter(file => file.mimeType.startsWith('image/')))
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare stato e libreria media delle news.')
      setAuxiliaryError(message)
      toast.error(message)
    } finally {
      setLoadingAuxiliary(false)
    }
  }

  useEffect(() => {
    void loadAuxiliary()
  }, [])

  const handleSubmit = async () => {
    setSaving(true)
    articles.setError('')

    try {
      const payload = toAdminNewsArticlePayload(editor.form)
      const saved = editor.editingItem
        ? await updateAdminNewsArticle(editor.editingItem.id, payload)
        : await createAdminNewsArticle(payload)

      articles.upsert(saved)
      await loadAuxiliary()
      toast.success(editor.editingItem ? 'News aggiornata' : 'News creata')
      editor.close()
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare la news.')
      articles.setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    try {
      await deleteAdminNewsArticle(deleteTarget.id)
      articles.remove(deleteTarget.id)
      await loadAuxiliary()
      toast.success('News eliminata')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile eliminare la news.')
      articles.setError(message)
      toast.error(message)
    } finally {
      setDeleteTarget(null)
    }
  }

  const handleInlineImageUpload = async (file: File) => {
    const uploaded = await uploadMedia(file)
    setMediaFiles(current => [uploaded, ...current.filter(item => item.id !== uploaded.id)])
    return {
      src: getAdminMediaUrl(uploaded.key, 'content'),
      alt: uploaded.label,
    }
  }

  const handleSubscriberStatusChange = async (subscriber: NewsletterSubscriber, status: 'active' | 'unsubscribed') => {
    try {
      const updated = await updateAdminNewsletterSubscriberStatus(subscriber.id, status)
      subscribers.upsert(updated)
      await loadAuxiliary()
      toast.success('Stato iscritto aggiornato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile aggiornare lo stato dell’iscritto.')
      subscribers.setError(message)
      toast.error(message)
    }
  }

  const counts = useMemo(() => ({
    articles: statusSummary?.articles ?? articles.items.length,
    pendingSubscribers: statusSummary?.subscribers.pending ?? 0,
    activeSubscribers: statusSummary?.subscribers.active ?? 0,
    unsubscribedSubscribers: statusSummary?.subscribers.unsubscribed ?? 0,
  }), [articles.items.length, statusSummary])

  return {
    articles,
    subscribers,
    editor,
    statusSummary,
    mediaFiles,
    loadingAuxiliary,
    auxiliaryError,
    saving,
    deleteTarget,
    setDeleteTarget,
    counts,
    loadAuxiliary,
    handleSubmit,
    handleDelete,
    handleInlineImageUpload,
    handleSubscriberStatusChange,
  }
}
