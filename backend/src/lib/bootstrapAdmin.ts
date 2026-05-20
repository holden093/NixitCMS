const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/

function requireString(env: NodeJS.ProcessEnv, name: string) {
  const rawValue = env[name]?.trim()
  const value = rawValue && (
    (rawValue.startsWith("'") && rawValue.endsWith("'")) ||
    (rawValue.startsWith('"') && rawValue.endsWith('"'))
  )
    ? rawValue.slice(1, -1)
    : rawValue

  if (!value) {
    throw new Error(`[bootstrap-admin] Missing required env var ${name}`)
  }

  return value
}

export interface BootstrapAdminCredentials {
  email: string
  passwordHash: string
}

export function readBootstrapAdminCredentials(env: NodeJS.ProcessEnv = process.env): BootstrapAdminCredentials {
  const email = requireString(env, 'ADMIN_EMAIL').toLowerCase()
  const passwordHash = requireString(env, 'ADMIN_PASSWORD_HASH')

  if (!BCRYPT_HASH_REGEX.test(passwordHash)) {
    throw new Error('[bootstrap-admin] ADMIN_PASSWORD_HASH must be a valid bcrypt hash')
  }

  return { email, passwordHash }
}
