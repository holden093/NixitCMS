import { useEffect, useState, type FormEvent } from 'react'
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInlineHint,
  AdminInput,
  AdminSelect,
  AdminSwitch,
  AdminTextarea,
  AdminDialog,
} from '@/components/admin/ui'
import type { BookingProviderInput, BookingProviderType } from '@/types/api'
import {
  getBookingConfigField,
  KNOWN_TYPES,
  normalizeBookingConfig,
  updateBookingConfigField,
} from './bookingForm'

interface BookingFormDialogProps {
  open: boolean
  isEditing: boolean
  form: BookingProviderInput
  saving: boolean
  configError: string
  onOpenChange: (open: boolean) => void
  onChange: (nextForm: BookingProviderInput) => void
  onValidateConfig: (value: string) => boolean
  onSubmit: () => Promise<void>
  onClose: () => void
}

export function BookingFormDialog({
  open,
  isEditing,
  form,
  saving,
  configError,
  onOpenChange,
  onChange,
  onValidateConfig,
  onSubmit,
  onClose,
}: BookingFormDialogProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      setAdvancedOpen(false)
    }
  }, [open])

  useEffect(() => {
    if (configError) {
      setAdvancedOpen(true)
    }
  }, [configError])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit()
  }

  const updateConfigField = (field: 'siteKey' | 'bookingUrl', value: string) => {
    onChange({
      ...form,
      config: updateBookingConfigField(form.config, form.type, field, value),
    })
  }

  const handleTypeChange = (type: BookingProviderType) => {
    onChange({
      ...form,
      type,
      config: normalizeBookingConfig(type, form.config),
    })
  }

  const advancedConfigExample = form.type === 'octorate'
    ? '{"siteKey":"octosite123456"}'
    : '{"bookingUrl":"https://hotel.example.com/prenota"}'

  return (
    <AdminDialog
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) {
          onClose()
        } else {
          onOpenChange(nextOpen)
        }
      }}
      title={isEditing ? 'Modifica provider' : 'Nuovo provider'}
      description="Configura il provider con campi guidati. La configurazione JSON avanzata resta disponibile solo se ti serve davvero."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <AdminCard className="border-line bg-stone-50">
            <div className="border-b border-line px-6 py-5">
              <h3 className="text-h3 font-semibold text-ink">Dati principali</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Scegli il tipo di integrazione e compila i campi indispensabili per far funzionare il widget pubblico.
              </p>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField
                  label="Tipologia provider"
                  description="Seleziona la piattaforma da collegare. I campi guidati cambiano automaticamente."
                >
                  <AdminSelect
                    value={form.type}
                    onChange={event => handleTypeChange(event.target.value as BookingProviderType)}
                  >
                    {KNOWN_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </AdminSelect>
                </AdminField>

                <AdminField
                  label="Testo visibile del pulsante"
                  description="E' la scritta che il visitatore legge quando vede il provider attivo."
                >
                  <AdminInput
                    value={form.label}
                    onChange={event => onChange({ ...form, label: event.target.value })}
                    placeholder="Prenota ora"
                    required
                  />
                </AdminField>
              </div>

              <div className="border border-line bg-paper p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">Configurazione guidata</p>
                  <AdminBadge tone="accent">Consigliata</AdminBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Compila solo i campi qui sotto. Il CMS costruira da solo la configurazione tecnica necessaria.
                </p>

                {form.type === 'octorate' ? (
                  <div className="mt-5">
                    <AdminField
                      label="Site key Octorate"
                      description="La chiave che collega il widget pubblico al tuo account Octorate."
                    >
                      <AdminInput
                        value={getBookingConfigField(form.config, 'siteKey')}
                        placeholder="octosite123456"
                        onChange={event => updateConfigField('siteKey', event.target.value)}
                      />
                    </AdminField>
                  </div>
                ) : (
                  <div className="mt-5">
                    <AdminField
                      label="Booking URL"
                      description="Link completo verso la pagina di prenotazione esterna. Il sito pubblico mostrera un bottone che apre questo URL in una nuova scheda."
                    >
                      <AdminInput
                        value={getBookingConfigField(form.config, 'bookingUrl')}
                        placeholder="https://hotel.example.com/prenota"
                        onChange={event => updateConfigField('bookingUrl', event.target.value)}
                      />
                    </AdminField>
                  </div>
                )}
              </div>

              <div className="border border-line bg-paper p-5">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(current => !current)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={advancedOpen}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink">Configurazione avanzata</p>
                      <AdminBadge tone="neutral">JSON</AdminBadge>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Apri questa area solo se devi controllare o ritoccare il payload tecnico.
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted">
                    {advancedOpen ? 'Nascondi' : 'Apri'}
                  </span>
                </button>

                {advancedOpen ? (
                  <div className="mt-5 space-y-3">
                    <AdminField
                      label="Configurazione JSON"
                      description="Il contenuto qui sotto viene inviato al backend cosi com'e."
                    >
                      <AdminTextarea
                        rows={8}
                        value={form.config}
                        onChange={event => onChange({ ...form, config: event.target.value })}
                        onBlur={event => onValidateConfig(event.target.value)}
                        className={`font-mono ${configError ? 'border-red-500' : ''}`}
                        required
                        placeholder={advancedConfigExample}
                        aria-invalid={configError ? true : undefined}
                        aria-describedby={configError ? 'booking-config-error' : undefined}
                      />
                    </AdminField>

                    {configError ? (
                      <p id="booking-config-error" className="text-xs text-rose-600">
                        {configError}
                      </p>
                    ) : null}

                    <AdminInlineHint>Esempio: {advancedConfigExample}</AdminInlineHint>
                  </div>
                ) : null}
              </div>
            </div>
          </AdminCard>

          <div className="space-y-6">
            <AdminCard className="border-line bg-stone-50">
              <div className="border-b border-line px-6 py-5">
                <h3 className="text-h3 font-semibold text-ink">Pubblicazione e priorita</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Decidi se attivare subito questo provider e in che ordine deve comparire nel CMS.
                </p>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="border border-line bg-paper px-4 py-4">
                  <AdminSwitch
                    checked={form.isEnabled}
                    onCheckedChange={checked => onChange({ ...form, isEnabled: checked })}
                    label="Rendi questo provider attivo"
                  />
                </div>

                <AdminField
                  label="Ordine visuale"
                  description="I numeri piu bassi compaiono prima nelle liste del CMS."
                >
                  <AdminInput
                    type="number"
                    value={form.order}
                    onChange={event => onChange({ ...form, order: Number(event.target.value) || 0 })}
                  />
                </AdminField>
              </div>
            </AdminCard>

            <AdminCard className="border-line bg-stone-50">
              <div className="border-b border-line px-6 py-5">
                <h3 className="text-h3 font-semibold text-ink">Come verra usato</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Un riepilogo rapido per evitare dubbi prima del salvataggio.
                </p>
              </div>

              <div className="space-y-3 px-6 py-6 text-sm leading-6 text-ink-soft">
                <p>Il testo visibile finira nei pulsanti e nei richiami del booking sul sito pubblico.</p>
                <p>Se questo provider e attivo, il CMS disattivera automaticamente gli altri provider attivi.</p>
                <p>La configurazione guidata aggiorna il JSON tecnico, ma puoi sempre verificarlo nella sezione avanzata.</p>
              </div>
            </AdminCard>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <AdminButton kind="secondary" size="lg" onClick={onClose}>
            Annulla
          </AdminButton>
          <AdminButton type="submit" size="lg" loading={saving}>
            {saving ? 'Salvataggio...' : isEditing ? 'Salva modifiche' : 'Crea provider'}
          </AdminButton>
        </div>
      </form>
    </AdminDialog>
  )
}
