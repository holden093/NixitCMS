export function normalizeBaseUrl(value: string | undefined, fallback: string) {
  if (!value || !value.trim()) {
    return fallback
  }
  return value.replace(/\/+$/, '')
}
