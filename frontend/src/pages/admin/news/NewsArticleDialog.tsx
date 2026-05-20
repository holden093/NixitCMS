import { useMemo, useState, type FormEvent } from 'react'
import SafeImage from '@/components/SafeImage'
import { getAdminMediaUrl } from '@/api/admin/media'
import { NewsRichTextEditor } from '@/components/admin/news/NewsRichTextEditor'
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminDialog,
  AdminField,
  AdminInput,
  AdminMediaPickerDialog,
  AdminSelect,
  AdminSwitch,
  AdminTextarea,
} from '@/components/admin/ui'
import type { MediaFile, NewsDeliveryCapabilities } from '@/types/api'
import type { NewsForm } from './newsForm'

interface NewsArticleDialogProps {
  open: boolean
  isEditing: boolean
  isPublished: boolean
  form: NewsForm
  mediaFiles: MediaFile[]
  capabilities: NewsDeliveryCapabilities | null
  saving: boolean
  onOpenChange: (open: boolean) => void
  onChange: (nextForm: NewsForm) => void
  onSubmit: () => Promise<void>
  onClose: () => void
  onUploadInlineImage: (file: File) => Promise<{ src: string; alt: string }>
}

type PickerMode = 'featured' | 'body_it' | 'body_en' | null

export function NewsArticleDialog({
  open,
  isEditing,
  isPublished,
  form,
  mediaFiles,
  capabilities,
  saving,
  onOpenChange,
  onChange,
  onSubmit,
  onClose,
  onUploadInlineImage,
}: NewsArticleDialogProps) {
  const [pickerMode, setPickerMode] = useState<PickerMode>(null)
  const [pickerSearch, setPickerSearch] = useState('')
  const [libraryImageIt, setLibraryImageIt] = useState<{ src: string; alt: string; token: string } | null>(null)
  const [libraryImageEn, setLibraryImageEn] = useState<{ src: string; alt: string; token: string } | null>(null)

  const featuredMedia = useMemo(
    () => mediaFiles.find(file => String(file.id) === form.featuredMediaId) ?? null,
    [form.featuredMediaId, mediaFiles],
  )
  const filteredFiles = useMemo(() => {
    const query = pickerSearch.trim().toLowerCase()
    if (!query) {
      return mediaFiles
    }

    return mediaFiles.filter(file => {
      const haystack = [
        file.label,
        file.key,
        ...(file.categories ?? []).map(category => category.photoCategory.name_it),
      ].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [mediaFiles, pickerSearch])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit()
  }

  const showFacebook = capabilities?.facebook.configured
  const showInstagram = capabilities?.instagram.configured
  const socialWarning = capabilities && (capabilities.facebook.expiresSoon || capabilities.instagram.expiresSoon)
  const socialExpired = capabilities && (capabilities.facebook.expired || capabilities.instagram.expired)

  return (
    <>
      <AdminDialog
        open={open}
        onOpenChange={nextOpen => {
          if (!nextOpen) {
            setLibraryImageIt(null)
            setLibraryImageEn(null)
            setPickerMode(null)
            setPickerSearch('')
            onClose()
          } else {
            onOpenChange(nextOpen)
          }
        }}
        title={isEditing ? 'Modifica news' : 'Nuova news'}
        description="Scrivi l'articolo, pianifica la pubblicazione e scegli i canali di distribuzione in modo granulare."
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
            <div className="space-y-6">
              <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
                <div className="border-b border-slate-200/80 px-6 py-5">
                  <h3 className="text-base font-semibold text-slate-900">Metadati editoriali</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Titoli ed estratti in entrambe le lingue alimentano archivio, anteprime social e newsletter.
                  </p>
                </div>

                <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                  <AdminField label="Titolo IT" description="Titolo principale mostrato per gli utenti italiani.">
                    <AdminInput
                      value={form.title_it}
                      onChange={event => onChange({ ...form, title_it: event.target.value })}
                      placeholder="Nuova apertura stagionale"
                      required
                    />
                  </AdminField>
                  <AdminField label="Titolo EN" description="Versione inglese completa del titolo.">
                    <AdminInput
                      value={form.title_en}
                      onChange={event => onChange({ ...form, title_en: event.target.value })}
                      placeholder="Seasonal reopening update"
                      required
                    />
                  </AdminField>
                  <AdminField label="Estratto IT" description="Snippet usato per liste, Open Graph e teaser newsletter.">
                    <AdminTextarea
                      rows={4}
                      value={form.excerpt_it}
                      onChange={event => onChange({ ...form, excerpt_it: event.target.value })}
                    />
                  </AdminField>
                  <AdminField label="Estratto EN" description="Versione inglese dell'estratto.">
                    <AdminTextarea
                      rows={4}
                      value={form.excerpt_en}
                      onChange={event => onChange({ ...form, excerpt_en: event.target.value })}
                    />
                  </AdminField>
                </div>
              </AdminCard>

              <NewsRichTextEditor
                label="Corpo articolo IT"
                description="Editor rich text per il contenuto italiano. Puoi usare heading, liste, quote, link e immagini."
                value={form.body_it}
                onChange={nextValue => onChange({ ...form, body_it: nextValue })}
                onRequestLibrary={() => setPickerMode('body_it')}
                onUploadImage={onUploadInlineImage}
                libraryImage={libraryImageIt}
              />

              <NewsRichTextEditor
                label="Corpo articolo EN"
                description="Versione inglese completa del contenuto, con la stessa qualità editoriale."
                value={form.body_en}
                onChange={nextValue => onChange({ ...form, body_en: nextValue })}
                onRequestLibrary={() => setPickerMode('body_en')}
                onUploadImage={onUploadInlineImage}
                libraryImage={libraryImageEn}
              />
            </div>

            <div className="space-y-6">
              <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
                <div className="border-b border-slate-200/80 px-6 py-5">
                  <h3 className="text-base font-semibold text-slate-900">Stato e scheduling</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Le news pubblicate restano modificabili ma non possono tornare in bozza.
                  </p>
                </div>

                <div className="space-y-6 px-6 py-6">
                  <AdminField label="Stato articolo" description="Bozza, pubblicazione programmata o pubblicazione immediata.">
                    <AdminSelect
                      value={form.status}
                      onChange={event => onChange({ ...form, status: event.target.value as NewsForm['status'] })}
                      disabled={isPublished}
                    >
                      <option value="draft">Bozza</option>
                      {!isPublished ? <option value="scheduled">Programmato</option> : null}
                      <option value="published">Pubblicato</option>
                    </AdminSelect>
                  </AdminField>

                  {form.status === 'scheduled' ? (
                    <AdminField label="Pubblica il" description="Usa l'orario locale del browser; il backend salva il timestamp in UTC.">
                      <AdminInput
                        type="datetime-local"
                        value={form.scheduledAt}
                        onChange={event => onChange({ ...form, scheduledAt: event.target.value })}
                        required
                      />
                    </AdminField>
                  ) : null}

                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                    <AdminSwitch
                      checked={form.publishToSite}
                      onCheckedChange={checked => onChange({ ...form, publishToSite: checked })}
                      label="Mostra anche su sito e homepage"
                    />
                  </div>
                </div>
              </AdminCard>

              <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
                <div className="border-b border-slate-200/80 px-6 py-5">
                  <h3 className="text-base font-semibold text-slate-900">Immagine in evidenza</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Serve per card, newsletter e anteprime social.
                  </p>
                </div>

                <div className="space-y-4 px-6 py-6">
                  <div className="overflow-hidden border border-line bg-white">
                    {featuredMedia ? (
                      <SafeImage
                        src={getAdminMediaUrl(featuredMedia.key, 'card')}
                        alt={featuredMedia.label}
                        className="h-52 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-52 items-center justify-center px-6 text-center text-sm text-ink-soft">
                        Nessuna immagine in evidenza selezionata.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <AdminButton kind="secondary" onClick={() => setPickerMode('featured')}>
                      Scegli dalla libreria
                    </AdminButton>
                    <AdminButton
                      kind="ghost"
                      onClick={() => onChange({ ...form, featuredMediaId: '' })}
                      disabled={!form.featuredMediaId}
                    >
                      Rimuovi
                    </AdminButton>
                  </div>

                  {featuredMedia ? (
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <AdminBadge tone="accent">{featuredMedia.label}</AdminBadge>
                    </div>
                  ) : null}
                </div>
              </AdminCard>

              <AdminCard className="border-slate-200 bg-slate-50/40 shadow-none">
                <div className="border-b border-slate-200/80 px-6 py-5">
                  <h3 className="text-base font-semibold text-slate-900">Distribuzione</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Seleziona dove distribuire la news quando diventa pubblicata.
                  </p>
                </div>

                <div className="space-y-4 px-6 py-6">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                    <AdminSwitch
                      checked={form.publishToNewsletter}
                      onCheckedChange={checked => onChange({ ...form, publishToNewsletter: checked })}
                      label="Newsletter SMTP"
                      disabled={!capabilities?.newsletter.available}
                    />
                    {!capabilities?.newsletter.available ? (
                      <p className="mt-2 text-xs leading-5 text-rose-600">
                        SMTP non configurato: la newsletter non puo essere attivata.
                      </p>
                    ) : null}
                  </div>

                  {showFacebook ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                      <AdminSwitch
                        checked={form.publishToFacebook}
                        onCheckedChange={checked => onChange({ ...form, publishToFacebook: checked })}
                        label="Facebook"
                        disabled={!capabilities?.facebook.available}
                      />
                    </div>
                  ) : null}

                  {showInstagram ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                      <AdminSwitch
                        checked={form.publishToInstagram}
                        onCheckedChange={checked => onChange({ ...form, publishToInstagram: checked })}
                        label="Instagram"
                        disabled={!capabilities?.instagram.available}
                      />
                    </div>
                  ) : null}

                  {socialWarning ? (
                    <p className="text-xs leading-5 text-amber-700">
                      Il token Meta e configurato ma vicino alla scadenza. Verifica l&apos;accesso prima della pubblicazione.
                    </p>
                  ) : null}
                  {socialExpired ? (
                    <p className="text-xs leading-5 text-rose-600">
                      Il token Meta risulta scaduto: i canali social resteranno disabilitati finche non viene aggiornato.
                    </p>
                  ) : null}
                </div>
              </AdminCard>
            </div>
          </div>

          <div className="flex justify-end">
            <AdminButton type="submit" size="lg" loading={saving} startIcon="save">
              {saving ? 'Salvataggio...' : 'Salva news'}
            </AdminButton>
          </div>
        </form>
      </AdminDialog>

      <AdminMediaPickerDialog
        open={pickerMode !== null}
        title={pickerMode === 'featured' ? 'Scegli immagine in evidenza' : 'Scegli immagine per il contenuto'}
        description="Usa la libreria media esistente per riusare asset ottimizzati e coerenti con il sito."
        selectedKey={pickerMode === 'featured' ? (featuredMedia?.key ?? '') : ''}
        files={filteredFiles}
        search={pickerSearch}
        onSearchChange={setPickerSearch}
        onSelect={file => {
          if (pickerMode === 'featured') {
            onChange({ ...form, featuredMediaId: String(file.id) })
          }

          if (pickerMode === 'body_it') {
            setLibraryImageIt({
              src: getAdminMediaUrl(file.key, 'content'),
              alt: file.label,
              token: `${file.id}-${Date.now()}`,
            })
          }

          if (pickerMode === 'body_en') {
            setLibraryImageEn({
              src: getAdminMediaUrl(file.key, 'content'),
              alt: file.label,
              token: `${file.id}-${Date.now()}`,
            })
          }

          setPickerMode(null)
          setPickerSearch('')
        }}
        onOpenChange={nextOpen => {
          if (!nextOpen) {
            setPickerMode(null)
            setPickerSearch('')
          }
        }}
      />
    </>
  )
}
