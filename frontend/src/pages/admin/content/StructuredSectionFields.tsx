import { useEffect, useMemo, useState } from 'react'
import SafeImage from '@/components/SafeImage'
import { getAdminMediaUrl } from '@/api/admin/media'
import {
  AdminBadge,
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
} from '@/components/admin/ui'
import { AdminIcon } from '@/components/admin/ui/AdminIcon'
import type { MediaFile } from '@/types/api'
import type { WorkspaceConfig } from './contentWorkspace.config'
import { EditableFieldCard } from './LocalizedFields'
import { MarkdownPreviewPane } from './MarkdownPreviewPane'

interface StructuredSectionFieldsProps {
  config: WorkspaceConfig
  activeSlug: string
  activeLocale: string
  currentSections: Record<string, string>
  mediaFiles: MediaFile[]
  getLocalizedValue: (field: 'title' | 'subtitle' | 'body') => string
  previewFields: Record<string, boolean>
  onTogglePreview: (fieldKey: string) => void
  onLocalizedChange: (field: 'title' | 'subtitle' | 'body', value: string) => void
  onChange: (fieldKey: string, value: string) => void
  onOpenMediaPicker: (fieldKey: string) => void
}

interface LocalizedGroupField {
  id: 'title' | 'subtitle' | 'body'
  fieldKey: string
  field: NonNullable<WorkspaceConfig['titleField']>
  value: string
  multiline: boolean
}

interface EditableMediaFieldCardProps {
  field: WorkspaceConfig['fields'][number]
  value: string
  mediaFiles: MediaFile[]
  onOpenPicker: () => void
  onRemove: () => void
}

function EditableMediaFieldCard({
  field,
  value,
  mediaFiles,
  onOpenPicker,
  onRemove,
}: EditableMediaFieldCardProps) {
  const selectedFile = mediaFiles.find(file => file.key === value) ?? null
  const hasValue = value.trim().length > 0

  return (
    <div className="border border-line bg-stone-50 p-5">
      <AdminField
        label={field.uiLabel || field.label}
        description={field.description}
        hint={field.summary ? `Dove lo vedrai: ${field.summary}` : undefined}
      >
        {selectedFile ? (
          <div className="overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white">
            <SafeImage
              src={getAdminMediaUrl(selectedFile.key, 'content')}
              alt={selectedFile.label}
              className="h-52 w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex min-h-[13rem] items-center justify-center rounded-[1.3rem] border border-dashed border-slate-300 bg-white px-6 py-8">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <AdminIcon name="image" className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">
                  {hasValue ? 'Il file selezionato non e disponibile' : 'Nessuna immagine selezionata'}
                </p>
                <p className="text-sm leading-6 text-slate-500">
                  {hasValue
                    ? 'Apri la libreria media per scegliere un altro asset valido.'
                    : 'Collega qui la foto predefinita mostrata nella pagina.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminField>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <AdminButton kind="secondary" onClick={onOpenPicker} startIcon="image-plus">
          Scegli dalla libreria
        </AdminButton>
        <AdminButton kind="ghost" onClick={onRemove} disabled={!hasValue}>
          Rimuovi immagine
        </AdminButton>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-xs leading-5 text-slate-500 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {field.priority === 'primary' ? <AdminBadge tone="accent">Essenziale</AdminBadge> : null}
          <span>
            {selectedFile
              ? `File selezionato: ${selectedFile.label}`
              : hasValue
                ? `Chiave collegata: ${value}`
                : field.example
                  ? `Suggerimento: ${field.example}`
                  : 'Scegli una foto orizzontale dalla libreria media.'}
          </span>
        </div>
        <span>{hasValue ? '1 immagine collegata' : 'Nessuna immagine collegata'}</span>
      </div>
    </div>
  )
}

export function StructuredSectionFields({
  config,
  activeSlug,
  activeLocale,
  currentSections,
  mediaFiles,
  getLocalizedValue,
  previewFields,
  onTogglePreview,
  onLocalizedChange,
  onChange,
  onOpenMediaPicker,
}: StructuredSectionFieldsProps) {
  const groupedFields = useMemo(
    () => config.groups.map(group => ({
      group,
      fields: config.fields.filter(field => field.group === group.id),
    })),
    [config.fields, config.groups],
  )
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const [firstGroup] = config.groups
    setExpandedGroups(firstGroup ? { [firstGroup.id]: true } : {})
  }, [activeLocale, activeSlug, config.groups])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(current => ({ ...current, [groupId]: !current[groupId] }))
  }

  return (
    <div className="space-y-4 px-6 py-6 md:px-8 md:py-8">
      {groupedFields.map(({ group, fields }) => {
        const beforeLocalizedFields: LocalizedGroupField[] = []
        const afterLocalizedFields: LocalizedGroupField[] = []

        if (config.showTitle && config.titleField?.group === group.id) {
          beforeLocalizedFields.push({
            id: 'title',
            fieldKey: `title-${activeSlug}-${activeLocale}`,
            field: config.titleField,
            value: getLocalizedValue('title'),
            multiline: false,
          })
        }

        if (config.showSubtitle && config.subtitleField?.group === group.id) {
          beforeLocalizedFields.push({
            id: 'subtitle',
            fieldKey: `subtitle-${activeSlug}-${activeLocale}`,
            field: config.subtitleField,
            value: getLocalizedValue('subtitle'),
            multiline: true,
          })
        }

        if (config.showBody && config.bodyField?.group === group.id) {
          afterLocalizedFields.push({
            id: 'body',
            fieldKey: `body-${activeSlug}-${activeLocale}`,
            field: config.bodyField,
            value: getLocalizedValue('body'),
            multiline: true,
          })
        }
        const totalFields = fields.length + beforeLocalizedFields.length + afterLocalizedFields.length
        const completedCount = fields.filter(field => (currentSections[field.key] ?? '').trim()).length
          + beforeLocalizedFields.filter(field => field.value.trim()).length
          + afterLocalizedFields.filter(field => field.value.trim()).length
        const expanded = Boolean(expandedGroups[group.id])

        return (
          <section
            key={group.id}
            className="overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-slate-50/80"
          >
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/40 md:px-6"
              aria-expanded={expanded}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold tracking-tight text-slate-950">{group.label}</p>
                  <AdminBadge tone={completedCount === totalFields ? 'success' : 'neutral'}>
                    {completedCount}/{totalFields} compilati
                  </AdminBadge>
                </div>
                <p className="text-sm leading-6 text-slate-500">{group.description}</p>
                {group.summary ? <p className="text-sm leading-6 text-slate-600">{group.summary}</p> : null}
              </div>
              <AdminIcon
                name="chevron-right"
                className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition ${expanded ? 'rotate-90' : ''}`}
              />
            </button>

            {expanded ? (
              <div className="border-t border-slate-200/80 bg-white px-5 py-5 md:px-6 md:py-6">
                <div className="space-y-4">
                  {beforeLocalizedFields.map(field => (
                    <EditableFieldCard
                      key={field.id}
                      fieldKey={field.fieldKey}
                      field={field.field}
                      value={field.value}
                      onChange={value => onLocalizedChange(field.id, value)}
                      previewFields={previewFields}
                      onTogglePreview={onTogglePreview}
                      multiline={field.multiline}
                    />
                  ))}

                  {fields.map(field => {
                    const fieldKey = `section-${activeSlug}-${activeLocale}-${field.key}`
                    const value = currentSections[field.key] ?? ''
                    const previewEnabled = field.previewable ? Boolean(previewFields[fieldKey]) : false

                    if (field.type === 'media') {
                      return (
                        <EditableMediaFieldCard
                          key={field.key}
                          field={field}
                          value={value}
                          mediaFiles={mediaFiles}
                          onOpenPicker={() => onOpenMediaPicker(field.key)}
                          onRemove={() => onChange(field.key, '')}
                        />
                      )
                    }

                    const summaryHint = field.summary ? `Dove lo vedrai: ${field.summary}` : undefined
                    const markdownHint = field.markdown
                      ? 'Markdown supportato: **grassetto**, *corsivo*, [link](https://...).'
                      : undefined
                    const composedHint = [summaryHint, markdownHint].filter(Boolean).join(' ') || undefined

                    return (
                      <div
                        key={field.key}
                        className="border border-line bg-stone-50 p-5"
                      >
                        <AdminField
                          label={field.uiLabel || field.label}
                          description={field.description}
                          hint={composedHint}
                          action={field.previewable ? (
                            <AdminButton kind="ghost" size="sm" onClick={() => onTogglePreview(fieldKey)}>
                              <AdminIcon name={previewEnabled ? 'eye-off' : 'eye'} className="h-4 w-4" />
                              {previewEnabled ? 'Nascondi anteprima' : 'Mostra anteprima'}
                            </AdminButton>
                          ) : undefined}
                        >
                          {!field.multiline ? (
                            <AdminInput
                              value={value}
                              placeholder={field.placeholder}
                              onChange={event => onChange(field.key, event.target.value)}
                            />
                          ) : (
                            <AdminTextarea
                              rows={field.rows ?? 3}
                              value={value}
                              placeholder={field.placeholder}
                              onChange={event => onChange(field.key, event.target.value)}
                            />
                          )}
                        </AdminField>

                        {field.previewable && previewEnabled ? (
                          <div className="mt-4">
                            <MarkdownPreviewPane value={value} />
                          </div>
                        ) : null}

                        <div className="mt-3 flex flex-col gap-2 text-xs leading-5 text-slate-500 md:flex-row md:items-center md:justify-between">
                          <div className="flex flex-wrap gap-2">
                            {field.priority === 'primary' ? <AdminBadge tone="accent">Essenziale</AdminBadge> : null}
                            {field.example ? <span>Esempio: {field.example}</span> : <span>Testo breve, chiaro e orientato all'azione.</span>}
                          </div>
                          <span>{value.length} caratteri</span>
                        </div>
                      </div>
                    )
                  })}

                  {afterLocalizedFields.map(field => (
                    <EditableFieldCard
                      key={field.id}
                      fieldKey={field.fieldKey}
                      field={field.field}
                      value={field.value}
                      onChange={value => onLocalizedChange(field.id, value)}
                      previewFields={previewFields}
                      onTogglePreview={onTogglePreview}
                      multiline={field.multiline}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
