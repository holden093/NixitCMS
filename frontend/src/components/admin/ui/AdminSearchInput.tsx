import { AdminInput } from './AdminInput'

interface AdminSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder,
}: AdminSearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <AdminInput
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        startIcon="search"
        className="bg-white/90"
      />
    </div>
  )
}
