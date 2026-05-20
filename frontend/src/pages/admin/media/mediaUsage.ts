import type { MediaFileUsage } from '@/types/api'

export function hasMediaUsage(usage: MediaFileUsage | null | undefined) {
  return Boolean(usage && (usage.isLogo || usage.isHeroImage))
}

export function getMediaUsageLines(usage: MediaFileUsage | null | undefined) {
  if (!usage) {
    return []
  }

  const lines: string[] = []

  if (usage.isLogo) {
    lines.push('logo del sito')
  }

  if (usage.isHeroImage) {
    lines.push('hero image')
  }

  return lines
}

export function getMediaUsageMessage(usage: MediaFileUsage | null | undefined) {
  const lines = getMediaUsageLines(usage)
  if (!lines.length) {
    return ''
  }

  return `Questo media e ancora in uso da ${lines.join(', ')}. Rimuovi prima i riferimenti attivi.`
}
