import { beforeEach, describe, expect, it } from 'vitest'
import { isInMaintenanceMode, setMaintenanceMode } from '../lib/maintenanceMode'

const UUID_PATTERN = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'
const originalKeyPattern = new RegExp(`^originals/(${UUID_PATTERN})\\.[a-z0-9]+$`, 'i')
const thumbnailKeyPattern = new RegExp(`^thumbnails/(${UUID_PATTERN})\\.webp$`, 'i')
const variantKeyPattern = new RegExp(`^variants/(${UUID_PATTERN})/([a-z0-9-]+)\\.webp$`, 'i')

function getMediaStorageIdFromKeyPattern(key: string): string | null {
  const normalizedKey = key.replace(/\\/g, '/')

  const originalMatch = originalKeyPattern.exec(normalizedKey)
  if (originalMatch) return originalMatch[1]

  const thumbnailMatch = thumbnailKeyPattern.exec(normalizedKey)
  if (thumbnailMatch) return thumbnailMatch[1]

  const variantMatch = variantKeyPattern.exec(normalizedKey)
  if (variantMatch) return variantMatch[1]

  return null
}

describe('Media key validation', () => {
  const storageId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567890'

  it('accepts valid original key', () => {
    expect(getMediaStorageIdFromKeyPattern(`originals/${storageId}.jpg`)).toBe(storageId)
  })

  it('accepts valid thumbnail key', () => {
    expect(getMediaStorageIdFromKeyPattern(`thumbnails/${storageId}.webp`)).toBe(storageId)
  })

  it('accepts valid variant key', () => {
    expect(getMediaStorageIdFromKeyPattern(`variants/${storageId}/hero.webp`)).toBe(storageId)
  })

  it('rejects path traversal', () => {
    expect(getMediaStorageIdFromKeyPattern('../../../etc/passwd')).toBeNull()
  })

  it('rejects plain filename without prefix', () => {
    expect(getMediaStorageIdFromKeyPattern('logo.png')).toBeNull()
  })

  it('rejects empty key', () => {
    expect(getMediaStorageIdFromKeyPattern('')).toBeNull()
  })

  it('rejects key with backslash traversal on Windows', () => {
    expect(getMediaStorageIdFromKeyPattern('..\\..\\..\\etc\\passwd')).toBeNull()
  })

  it('rejects non-v4 UUID even when shape is UUID-like', () => {
    expect(getMediaStorageIdFromKeyPattern('originals/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg')).toBeNull()
  })
})

describe('Maintenance mode', () => {
  beforeEach(() => {
    setMaintenanceMode(false)
  })

  it('starts with maintenance mode off after reset', () => {
    expect(isInMaintenanceMode()).toBe(false)
  })

  it('setMaintenanceMode(true) enables it', () => {
    setMaintenanceMode(true)

    expect(isInMaintenanceMode()).toBe(true)
  })

  it('setMaintenanceMode(false) disables it', () => {
    setMaintenanceMode(true)
    setMaintenanceMode(false)

    expect(isInMaintenanceMode()).toBe(false)
  })

  it('toggle works correctly through full cycle', () => {
    expect(isInMaintenanceMode()).toBe(false)
    setMaintenanceMode(true)
    expect(isInMaintenanceMode()).toBe(true)
    setMaintenanceMode(false)
    expect(isInMaintenanceMode()).toBe(false)
    setMaintenanceMode(true)
    expect(isInMaintenanceMode()).toBe(true)
  })
})
