import {
  AdminButton,
  AdminField,
  AdminInlineHint,
  AdminInput,
  AdminTextarea,
} from '@/components/admin/ui'
import { AdminIcon } from '@/components/admin/ui/AdminIcon'
import type { WorkspaceConfig, WorkspaceTextFieldConfig } from './contentWorkspace.config'
import { MarkdownPreviewPane } from './MarkdownPreviewPane'

interface LocalizedFieldsProps {
  config: WorkspaceConfig
  activeSlug: string
  activeLocale: string
  getValue: (field: 'title' | 'subtitle' | 'body') => string
  onChange: (field: 'title' | 'subtitle' | 'body', value: string) => void
  previewFields: Record<string, boolean>
  onTogglePreview: (fieldKey: string) => void
}

export interface EditableFieldCardProps {
  fieldKey: string
  field: WorkspaceTextFieldConfig
  value: string
  onChange: (value: string) => void
  previewFields: Record<string, boolean>
  onTogglePreview: (fieldKey: string) => void
  multiline?: boolean
}

export function EditableFieldCard({
  fieldKey,
  field,
  value,
  onChange,
  previewFields,
  onTogglePreview,
  multiline = false,
}: EditableFieldCardProps) {
  const previewEnabled = field.previewable ? Boolean(previewFields[fieldKey]) : false

  return (
    <div className="border border-line bg-stone-50 p-5 md:p-6">
      <AdminField
        label={field.label}
        description={field.description}
        hint={field.summary ? `Dove lo vedrai: ${field.summary}` : undefined}
        action={field.previewable ? (
          <AdminButton kind="ghost" size="sm" onClick={() => onTogglePreview(fieldKey)}>
            <AdminIcon name={previewEnabled ? 'eye-off' : 'eye'} className="h-4 w-4" />
            {previewEnabled ? 'Nascondi anteprima' : 'Mostra anteprima'}
          </AdminButton>
        ) : undefined}
      >
        {multiline ? (
          <AdminTextarea
            rows={field.rows ?? 4}
            value={value}
            placeholder={field.placeholder}
            onChange={event => onChange(event.target.value)}
          />
        ) : (
          <AdminInput
            value={value}
            placeholder={field.placeholder}
            onChange={event => onChange(event.target.value)}
          />
        )}
      </AdminField>

      {field.previewable && previewEnabled ? (
        <div className="mt-4">
          <MarkdownPreviewPane value={value} />
        </div>
      ) : null}

      <div className="mt-3 flex flex-col gap-2 text-xs leading-5 text-muted md:flex-row md:items-center md:justify-between">
        <span>{field.example ? `Esempio: ${field.example}` : 'Scrivi con parole semplici e concrete.'}</span>
        <span>{value.length} caratteri</span>
      </div>
    </div>
  )
}

export function LocalizedFields({
  config,
  activeSlug,
  activeLocale,
  getValue,
  onChange,
  previewFields,
  onTogglePreview,
}: LocalizedFieldsProps) {
  return (
    <div className="space-y-4 px-6 py-6 md:px-8 md:py-8">
      {config.showTitle && config.titleField ? (
        <EditableFieldCard
          fieldKey={`title-${activeSlug}-${activeLocale}`}
          field={config.titleField}
          value={getValue('title')}
          onChange={value => onChange('title', value)}
          previewFields={previewFields}
          onTogglePreview={onTogglePreview}
        />
      ) : null}

      {config.showSubtitle && config.subtitleField ? (
        <EditableFieldCard
          fieldKey={`subtitle-${activeSlug}-${activeLocale}`}
          field={config.subtitleField}
          value={getValue('subtitle')}
          onChange={value => onChange('subtitle', value)}
          previewFields={previewFields}
          onTogglePreview={onTogglePreview}
          multiline
        />
      ) : null}

      {config.showBody && config.bodyField ? (
        <EditableFieldCard
          fieldKey={`body-${activeSlug}-${activeLocale}`}
          field={config.bodyField}
          value={getValue('body')}
          onChange={value => onChange('body', value)}
          previewFields={previewFields}
          onTogglePreview={onTogglePreview}
          multiline
        />
      ) : null}

      {!config.showTitle && !config.showSubtitle && !config.showBody ? (
        <AdminInlineHint>
          Per questa area non ci sono testi principali liberi: trovi tutto nei blocchi guidati qui sotto.
        </AdminInlineHint>
      ) : null}
    </div>
  )
}
