import * as Switch from '@radix-ui/react-switch'

interface AdminSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

export function AdminSwitch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: AdminSwitchProps) {
  return (
    <label className={`inline-flex items-center gap-3.5 text-sm font-semibold ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={[
          'relative h-8 w-14 rounded-full border transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100',
          disabled ? 'cursor-not-allowed opacity-60' : '',
          checked
            ? 'border-blue-600 bg-blue-600'
            : 'border-slate-200 bg-slate-200',
        ].join(' ')}
      >
        <Switch.Thumb
          className={[
            'block h-6 w-6 rounded-full bg-white shadow-sm transition',
            checked ? 'translate-x-7' : 'translate-x-1',
          ].join(' ')}
        />
      </Switch.Root>
      {label}
    </label>
  )
}
