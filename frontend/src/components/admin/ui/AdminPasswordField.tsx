import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { AdminIconButton } from './AdminIconButton'
import { AdminInput } from './AdminInput'

interface AdminPasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  startIcon?: 'lock-keyhole'
}

export function AdminPasswordField({
  startIcon = 'lock-keyhole',
  ...props
}: AdminPasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <AdminInput
      {...props}
      type={visible ? 'text' : 'password'}
      startIcon={startIcon}
      endAdornment={(
        <AdminIconButton
          icon={visible ? 'eye-off' : 'eye'}
          label={visible ? 'Nascondi password' : 'Mostra password'}
          tabIndex={-1}
          className="h-8 w-8 border-none bg-transparent hover:bg-transparent"
          onClick={() => setVisible(current => !current)}
        />
      )}
    />
  )
}
