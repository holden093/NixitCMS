import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getAdminContents, updateContent } from '@/api/admin/content'
import { getAdminMedia } from '@/api/admin/media'
import { parseStructuredSections, updateStructuredSectionValue } from '@/lib/content/structuredSections'
import { getMediaSearchText } from '@/lib/media'
import { extractErrorMessage } from '@/utils/errors'
import type { Content, LocaleCode, MediaFile } from '@/types/api'
import {
  CONTENT_WORKSPACE_CONFIG,
  type ContentWorkspaceSlug,
  getSectionFallback,
} from './contentWorkspace.config'

type LocalizedContentKey =
  | 'title_it'
  | 'title_en'
  | 'subtitle_it'
  | 'subtitle_en'
  | 'body_it'
  | 'body_en'

function createMissingEntry(slug: ContentWorkspaceSlug): Content {
  return {
    id: 0,
    pageSlug: slug,
    title_it: '',
    title_en: '',
    subtitle_it: '',
    subtitle_en: '',
    body_it: '',
    body_en: '',
    sections_it: '{}',
    sections_en: '{}',
    updatedAt: '',
  }
}

function serializeEntry(entry: Content) {
  return JSON.stringify({
    pageSlug: entry.pageSlug,
    title_it: entry.title_it,
    title_en: entry.title_en,
    subtitle_it: entry.subtitle_it,
    subtitle_en: entry.subtitle_en,
    body_it: entry.body_it,
    body_en: entry.body_en,
    sections_it: entry.sections_it,
    sections_en: entry.sections_en,
  })
}

function sanitizeEntryForSave(entry: Content) {
  if (entry.pageSlug !== 'contacts') {
    return entry
  }

  return {
    ...entry,
    subtitle_it: '',
    subtitle_en: '',
    body_it: '',
    body_en: '',
  }
}

export function useContentWorkspace() {
  const { i18n } = useTranslation()
  const [entries, setEntries] = useState<Content[]>([])
  const [savedEntries, setSavedEntries] = useState<Content[]>([])
  const [activeSlug, setActiveSlug] = useState<ContentWorkspaceSlug>('home')
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('it')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [previewFields, setPreviewFields] = useState<Record<string, boolean>>({})
  const [mediaPickerFieldKey, setMediaPickerFieldKey] = useState<string | null>(null)
  const [pickerSearch, setPickerSearch] = useState('')

  const loadEntries = async () => {
    setLoading(true)
    setError('')

    try {
      const nextEntries = await getAdminContents()
      setEntries(nextEntries)
      setSavedEntries(nextEntries)
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare il contenuto del sito pubblico.')
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadEntries()
  }, [])

  useEffect(() => {
    getAdminMedia()
      .then(files => {
        setMediaFiles(files.filter(file => file.mimeType.startsWith('image/')))
      })
      .catch(error => {
        const message = extractErrorMessage(error, 'Impossibile caricare la libreria media dei contenuti.')
        toast.error(message)
      })
  }, [])

  const localizedTranslator = useMemo(
    () => i18n.getFixedT(activeLocale),
    [activeLocale, i18n],
  )
  const activeConfig = CONTENT_WORKSPACE_CONFIG[activeSlug]
  const activeEntry = entries.find(entry => entry.pageSlug === activeSlug) ?? createMissingEntry(activeSlug)
  const savedActiveEntry = savedEntries.find(entry => entry.pageSlug === activeSlug) ?? createMissingEntry(activeSlug)
  const sectionKey = `sections_${activeLocale}` as 'sections_it' | 'sections_en'
  const fallbackSections = getSectionFallback(activeSlug, localizedTranslator) as unknown as Record<string, string>
  const currentSections = useMemo<Record<string, string>>(
    () => ({
      ...fallbackSections,
      ...parseStructuredSections(activeEntry[sectionKey], activeConfig.fields) as Record<string, string>,
    }),
    [activeConfig.fields, activeEntry, fallbackSections, sectionKey],
  )
  const pickerField = mediaPickerFieldKey
    ? activeConfig.fields.find(field => field.key === mediaPickerFieldKey) ?? null
    : null
  const filteredPickerFiles = useMemo(() => {
    const search = pickerSearch.trim().toLowerCase()

    if (!search) {
      return mediaFiles
    }

    return mediaFiles.filter(file => getMediaSearchText(file).toLowerCase().includes(search))
  }, [mediaFiles, pickerSearch])

  const getLocalizedValue = (field: 'title' | 'subtitle' | 'body') =>
    activeEntry[`${field}_${activeLocale}` as LocalizedContentKey]

  const isDirty = serializeEntry(activeEntry) !== serializeEntry(savedActiveEntry)
  const totalFieldCount = activeConfig.fields.length
    + (activeConfig.showTitle ? 1 : 0)
    + (activeConfig.showSubtitle ? 1 : 0)
    + (activeConfig.showBody ? 1 : 0)
  const completedFieldCount = [
    activeConfig.showTitle ? getLocalizedValue('title') : '',
    activeConfig.showSubtitle ? getLocalizedValue('subtitle') : '',
    activeConfig.showBody ? getLocalizedValue('body') : '',
    ...activeConfig.fields.map(field => currentSections[field.key] ?? ''),
  ].filter(value => value.trim()).length

  const updateLocalizedValue = (field: 'title' | 'subtitle' | 'body', value: string) => {
    const key = `${field}_${activeLocale}` as LocalizedContentKey
    setEntries(current => {
      const exists = current.some(entry => entry.pageSlug === activeSlug)
      if (!exists) {
        return [...current, { ...activeEntry, [key]: value }]
      }

      return current.map(entry => (
        entry.pageSlug === activeSlug ? { ...entry, [key]: value } : entry
      ))
    })
  }

  const updateSectionValue = (fieldKey: string, value: string) => {
    setEntries(current => {
      const exists = current.some(entry => entry.pageSlug === activeSlug)
      const nextEntry = exists ? activeEntry : createMissingEntry(activeSlug)
      const updatedEntry = {
        ...nextEntry,
        [sectionKey]: updateStructuredSectionValue(nextEntry[sectionKey], activeConfig.fields, fieldKey, value),
      }

      if (!exists) {
        return [...current, updatedEntry]
      }

      return current.map(entry => (
        entry.pageSlug === activeSlug ? updatedEntry : entry
      ))
    })
  }

  const togglePreview = (fieldKey: string) => {
    setPreviewFields(current => ({ ...current, [fieldKey]: !current[fieldKey] }))
  }

  const openMediaPicker = (fieldKey: string) => {
    setMediaPickerFieldKey(fieldKey)
    setPickerSearch('')
  }

  const closeMediaPicker = () => {
    setMediaPickerFieldKey(null)
    setPickerSearch('')
  }

  const handleSave = async () => {
    setError('')
    setSaving(true)

    try {
      const updated = await updateContent(activeSlug, sanitizeEntryForSave(activeEntry))
      setEntries(current => (
        current.some(entry => entry.pageSlug === activeSlug)
          ? current.map(entry => (entry.pageSlug === activeSlug ? updated : entry))
          : [...current, updated]
      ))
      setSavedEntries(current => (
        current.some(entry => entry.pageSlug === activeSlug)
          ? current.map(entry => (entry.pageSlug === activeSlug ? updated : entry))
          : [...current, updated]
      ))
      toast.success('Salvato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare il contenuto del sito pubblico.')
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return {
    entries,
    activeSlug,
    setActiveSlug,
    activeLocale,
    setActiveLocale,
    saving,
    error,
    loading,
    mediaFiles,
    previewFields,
    mediaPickerFieldKey,
    pickerTitle: pickerField?.pickerTitle ?? pickerField?.uiLabel ?? pickerField?.label ?? 'Seleziona un\'immagine',
    pickerSearch,
    filteredPickerFiles,
    activeConfig,
    activeEntry,
    savedActiveEntry,
    currentSections,
    isDirty,
    totalFieldCount,
    completedFieldCount,
    getLocalizedValue,
    updateLocalizedValue,
    updateSectionValue,
    togglePreview,
    openMediaPicker,
    closeMediaPicker,
    setPickerSearch,
    loadEntries,
    handleSave,
  }
}
