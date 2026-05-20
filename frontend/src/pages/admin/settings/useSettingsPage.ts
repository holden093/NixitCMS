import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getAdminMedia, uploadMedia } from '@/api/admin/media'
import { getAdminSettings, updateSettings } from '@/api/admin/settings'
import { getMediaSearchText } from '@/lib/media'
import { extractErrorMessage } from '@/utils/errors'
import type { MediaFile, SiteSettings } from '@/types/api'
import type { SettingsFieldKey } from './settingsFields'

export type MediaPickerTarget = 'logoKey' | 'heroImageKey' | null

export function useSettingsPage() {
  const [form, setForm] = useState<SiteSettings | null>(null)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('brand')
  const [mediaPickerTarget, setMediaPickerTarget] = useState<MediaPickerTarget>(null)
  const [pickerSearch, setPickerSearch] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')

    try {
      const [settingsResponse, mediaResponse] = await Promise.all([
        getAdminSettings(),
        getAdminMedia(),
      ])

      setForm(settingsResponse)
      setMediaFiles(mediaResponse.filter(file => file.mimeType.startsWith('image/')))
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare le impostazioni del sito.')
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const handleSave = async () => {
    if (!form) {
      return
    }

    setError('')
    setSaving(true)
    try {
      const updated = await updateSettings(form)
      setForm(updated)
      toast.success('Salvato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile salvare le impostazioni.')
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const updateField = <K extends SettingsFieldKey>(key: K, value: SiteSettings[K]) => {
    setForm(current => (current ? { ...current, [key]: value } : current))
  }

  const setMediaKey = (key: 'logoKey' | 'heroImageKey', value: string) => {
    setForm(current => (current ? { ...current, [key]: value } : current))
  }

  const handleImageUpload = async (key: 'logoKey' | 'heroImageKey', file: File | null) => {
    if (!file) {
      return
    }

    const setUploading = key === 'logoKey' ? setUploadingLogo : setUploadingHero
    setUploading(true)
    setError('')

    try {
      const uploaded = await uploadMedia(file)
      setMediaFiles(current => [uploaded, ...current.filter(item => item.id !== uploaded.id)])
      setMediaKey(key, uploaded.key)
      toast.success('Creato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile caricare l’immagine selezionata.')
      setError(message)
      toast.error(message)
    } finally {
      setUploading(false)
    }
  }

  const filteredPickerFiles = useMemo(() => {
    const normalizedSearch = pickerSearch.trim().toLowerCase()
    if (!normalizedSearch) {
      return mediaFiles
    }

    return mediaFiles.filter(file => getMediaSearchText(file).toLowerCase().includes(normalizedSearch))
  }, [mediaFiles, pickerSearch])

  const selectedLogo = useMemo(
    () => mediaFiles.find(file => file.key === form?.logoKey) ?? null,
    [form?.logoKey, mediaFiles],
  )
  const selectedHeroImage = useMemo(
    () => mediaFiles.find(file => file.key === form?.heroImageKey) ?? null,
    [form?.heroImageKey, mediaFiles],
  )

  const companyCompletion = useMemo(() => {
    if (!form) {
      return 0
    }

    return [
      form.legalName,
      form.registeredAddress,
      form.city,
      form.country,
      form.vatNumber,
      form.email,
      form.phone,
    ].filter(Boolean).length
  }, [form])

  const pickerTitle = mediaPickerTarget === 'logoKey'
    ? 'Seleziona il logo'
    : 'Seleziona la hero image'

  const closePicker = () => {
    setMediaPickerTarget(null)
    setPickerSearch('')
  }

  return {
    form,
    mediaFiles,
    loading,
    saving,
    uploadingLogo,
    uploadingHero,
    error,
    activeTab,
    setActiveTab,
    mediaPickerTarget,
    setMediaPickerTarget,
    pickerSearch,
    setPickerSearch,
    filteredPickerFiles,
    pickerTitle,
    selectedLogo,
    selectedHeroImage,
    companyCompletion,
    load,
    handleSave,
    updateField,
    setMediaKey,
    handleImageUpload,
    closePicker,
  }
}
