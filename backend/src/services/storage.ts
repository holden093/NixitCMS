import fs from 'fs/promises'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { createImageThumbnail, createImageVariant, MEDIA_VARIANT_PRESETS, type MediaVariantPreset } from './images'
import { config } from '../config'
import { badRequest } from '../lib/http'
import { prisma } from '../lib/prisma'

const originalsDir = path.join(config.mediaRoot, 'originals')
const thumbnailsDir = path.join(config.mediaRoot, 'thumbnails')
const variantsDir = path.join(config.mediaRoot, 'variants')

const MIME_EXTENSION_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
}

const UUID_PATTERN = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'
const normalizedOriginalKeyPattern = new RegExp(`^originals/(${UUID_PATTERN})\\.[a-z0-9]+$`, 'i')
const normalizedThumbnailKeyPattern = new RegExp(`^thumbnails/(${UUID_PATTERN})\\.webp$`, 'i')
const normalizedVariantDirectoryNamePattern = new RegExp(`^${UUID_PATTERN}$`, 'i')
const normalizedVariantKeyPattern = new RegExp(`^variants/(${UUID_PATTERN})/([a-z0-9-]+)\\.webp$`, 'i')

type StoredMediaVariantPreset = Exclude<MediaVariantPreset, 'thumb'>

const storedMediaVariantPresets = (Object.keys(MEDIA_VARIANT_PRESETS) as MediaVariantPreset[])
  .filter((preset): preset is StoredMediaVariantPreset => preset !== 'thumb')

interface ContentClient {
  content: Pick<typeof prisma.content, 'findMany' | 'update'>
}

interface MediaStorageKeys {
  storageId: string
  key: string
  thumbnailKey: string
  variantDirectoryKey: string
  variantKeys: Record<StoredMediaVariantPreset, string>
  label: string
}

function resolveSafePath(key: string) {
  const candidate = path.resolve(config.mediaRoot, key)
  const rootWithSeparator = `${config.mediaRoot}${path.sep}`
  if (candidate !== config.mediaRoot && !candidate.startsWith(rootWithSeparator)) {
    badRequest('Invalid media key')
  }
  return candidate
}

function getMediaFileExtension(mimeType: string) {
  const extension = MIME_EXTENSION_MAP[mimeType]
  if (!extension) {
    badRequest('File type not allowed')
  }
  return extension
}

function createThumbnailKeyForStorageId(storageId: string) {
  return path.posix.join('thumbnails', `${storageId}.webp`)
}

function createVariantDirectoryKeyForStorageId(storageId: string) {
  return path.posix.join('variants', storageId)
}

function createVariantKeysForStorageId(storageId: string) {
  return Object.fromEntries(
    storedMediaVariantPresets.map(preset => [
      preset,
      path.posix.join('variants', storageId, `${preset}.webp`),
    ]),
  ) as Record<StoredMediaVariantPreset, string>
}

async function readDirectoryEntriesIfExists(targetPath: string) {
  try {
    return await fs.readdir(targetPath, { withFileTypes: true })
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function cleanupOrphanImageDerivatives(activeStorageIds: Set<string>) {
  let removedThumbnailCount = 0
  let removedVariantDirectoryCount = 0

  const thumbnailEntries = await readDirectoryEntriesIfExists(thumbnailsDir)
  for (const entry of thumbnailEntries) {
    if (!entry.isFile()) {
      continue
    }

    const storageId = getMediaStorageIdFromKey(path.posix.join('thumbnails', entry.name))
    if (storageId && !activeStorageIds.has(storageId)) {
      await deleteStoredFile(path.posix.join('thumbnails', entry.name))
      removedThumbnailCount += 1
    }
  }

  const variantEntries = await readDirectoryEntriesIfExists(variantsDir)
  for (const entry of variantEntries) {
    if (!entry.isDirectory() || !normalizedVariantDirectoryNamePattern.test(entry.name)) {
      continue
    }

    if (!activeStorageIds.has(entry.name)) {
      await deleteStoredDirectory(path.posix.join('variants', entry.name))
      removedVariantDirectoryCount += 1
    }
  }

  return {
    removedThumbnailCount,
    removedVariantDirectoryCount,
  }
}

async function syncImageDerivatives(mediaFile: { id: number; key: string; thumbnailKey: string | null }) {
  const expectedThumbnailKey = getExpectedThumbnailKey(mediaFile.key)
  const variantKeys = createMediaVariantKeys(mediaFile.key)

  if (!expectedThumbnailKey || !variantKeys) {
    return {
      generatedThumbnailCount: 0,
      generatedVariantCount: 0,
    }
  }

  let sourceBuffer: Buffer | null = null
  const loadSourceBuffer = async () => {
    if (sourceBuffer === null) {
      sourceBuffer = await readStoredFileIfExists(mediaFile.key)
    }
    return sourceBuffer
  }

  if (
    mediaFile.thumbnailKey
    && mediaFile.thumbnailKey !== expectedThumbnailKey
    && await fileExists(mediaFile.thumbnailKey)
    && !(await fileExists(expectedThumbnailKey))
  ) {
    await moveStoredFile(mediaFile.thumbnailKey, expectedThumbnailKey)
  }

  let generatedThumbnailCount = 0
  if (!(await fileExists(expectedThumbnailKey))) {
    const originalBuffer = await loadSourceBuffer()
    if (!originalBuffer) {
      throw new Error(`Stored original file missing while rebuilding thumbnail for media ${mediaFile.id}`)
    }

    const thumbnailBuffer = await createImageThumbnail(originalBuffer)
    await writeStoredFile(expectedThumbnailKey, thumbnailBuffer)
    generatedThumbnailCount = 1
  }

  let generatedVariantCount = 0
  for (const preset of storedMediaVariantPresets) {
    const variantKey = variantKeys[preset]
    if (await fileExists(variantKey)) {
      continue
    }

    const originalBuffer = await loadSourceBuffer()
    if (!originalBuffer) {
      throw new Error(`Stored original file missing while rebuilding variants for media ${mediaFile.id}`)
    }

    const variantBuffer = await createImageVariant(originalBuffer, preset)
    await writeStoredFile(variantKey, variantBuffer)
    generatedVariantCount += 1
  }

  return {
    generatedThumbnailCount,
    generatedVariantCount,
  }
}

export function createDefaultMediaLabel(storageId: string) {
  return `media-${storageId.slice(0, 8)}`
}

export function getMediaStorageIdFromKey(key: string) {
  const normalizedKey = key.replace(/\\/g, '/')

  const originalMatch = normalizedOriginalKeyPattern.exec(normalizedKey)
  if (originalMatch) {
    return originalMatch[1]
  }

  const thumbnailMatch = normalizedThumbnailKeyPattern.exec(normalizedKey)
  if (thumbnailMatch) {
    return thumbnailMatch[1]
  }

  const variantMatch = normalizedVariantKeyPattern.exec(normalizedKey)
  if (variantMatch) {
    return variantMatch[1]
  }

  return null
}

export function createMediaStorageKeys(mimeType: string): MediaStorageKeys {
  const storageId = uuid()
  const extension = getMediaFileExtension(mimeType)

  return {
    storageId,
    key: path.posix.join('originals', `${storageId}.${extension}`),
    thumbnailKey: createThumbnailKeyForStorageId(storageId),
    variantDirectoryKey: createVariantDirectoryKeyForStorageId(storageId),
    variantKeys: createVariantKeysForStorageId(storageId),
    label: createDefaultMediaLabel(storageId),
  }
}

function isNormalizedOriginalKey(key: string) {
  return normalizedOriginalKeyPattern.test(key)
}

function isNormalizedThumbnailKey(key: string) {
  return normalizedThumbnailKeyPattern.test(key)
}

export function getExpectedThumbnailKey(key: string) {
  const storageId = getMediaStorageIdFromKey(key)
  return storageId ? createThumbnailKeyForStorageId(storageId) : null
}

export function createMediaVariantKeys(key: string) {
  const storageId = getMediaStorageIdFromKey(key)
  return storageId ? createVariantKeysForStorageId(storageId) : null
}

export function getMediaVariantDirectoryKey(key: string) {
  const storageId = getMediaStorageIdFromKey(key)
  return storageId ? createVariantDirectoryKeyForStorageId(storageId) : null
}

export function getMediaVariantKey(key: string, preset: MediaVariantPreset) {
  if (preset === 'thumb') {
    return getExpectedThumbnailKey(key)
  }

  const variantKeys = createMediaVariantKeys(key)
  return variantKeys ? variantKeys[preset] : null
}

function replaceMediaKeysInValue(value: unknown, keyMap: Map<string, string>): unknown {
  if (typeof value === 'string') {
    return keyMap.get(value) ?? value
  }

  if (Array.isArray(value)) {
    return value.map(entry => replaceMediaKeysInValue(entry, keyMap))
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [entryKey, replaceMediaKeysInValue(entryValue, keyMap)]),
  )
}

function replaceMediaKeysInStructuredContent(raw: string, keyMap: Map<string, string>) {
  if (!raw.trim()) {
    return raw
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return raw
    }

    const next = replaceMediaKeysInValue(parsed, keyMap)
    const currentSerialized = JSON.stringify(parsed)
    const nextSerialized = JSON.stringify(next)
    if (currentSerialized === nextSerialized) {
      return raw
    }

    return `${JSON.stringify(next, null, 2)}`
  } catch {
    return raw
  }
}

async function updateContentMediaReferences(
  tx: ContentClient,
  keyMap: Map<string, string>,
) {
  const contents = await tx.content.findMany({
    select: {
      id: true,
      sections_it: true,
      sections_en: true,
    },
  })

  for (const content of contents) {
    const nextSectionsIt = replaceMediaKeysInStructuredContent(content.sections_it, keyMap)
    const nextSectionsEn = replaceMediaKeysInStructuredContent(content.sections_en, keyMap)

    if (nextSectionsIt === content.sections_it && nextSectionsEn === content.sections_en) {
      continue
    }

    await tx.content.update({
      where: { id: content.id },
      data: {
        sections_it: nextSectionsIt,
        sections_en: nextSectionsEn,
      },
    })
  }
}

async function moveStoredFile(sourceKey: string, destinationKey: string) {
  const sourcePath = resolveSafePath(sourceKey)
  const destinationPath = resolveSafePath(destinationKey)

  await fs.mkdir(path.dirname(destinationPath), { recursive: true })
  await fs.rename(sourcePath, destinationPath)
}

export async function ensureMediaStorage() {
  await fs.mkdir(originalsDir, { recursive: true })
  await fs.mkdir(thumbnailsDir, { recursive: true })
  await fs.mkdir(variantsDir, { recursive: true })
}

export async function writeStoredFile(key: string, buffer: Buffer) {
  const target = resolveSafePath(key)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, buffer)
}

export async function readStoredFileIfExists(key: string) {
  try {
    return await fs.readFile(resolveSafePath(key))
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

export async function deleteStoredFile(key: string) {
  try {
    await fs.unlink(resolveSafePath(key))
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') {
      throw error
    }
  }
}

export async function deleteStoredDirectory(key: string) {
  await fs.rm(resolveSafePath(key), { recursive: true, force: true })
}

export async function fileExists(key: string) {
  try {
    await fs.access(resolveSafePath(key))
    return true
  } catch {
    return false
  }
}

export function getStoredFilePath(key: string) {
  return resolveSafePath(key)
}

export async function migrateLegacyMediaStorage() {
  const mediaFiles = await prisma.mediaFile.findMany({
    select: {
      id: true,
      key: true,
      thumbnailKey: true,
      filename: true,
      mimeType: true,
    },
    orderBy: { id: 'asc' },
  })

  let migratedCount = 0

  for (const mediaFile of mediaFiles) {
    const needsOriginalMigration = !isNormalizedOriginalKey(mediaFile.key)
    const needsThumbnailMigration = mediaFile.thumbnailKey
      ? !isNormalizedThumbnailKey(mediaFile.thumbnailKey)
      : false

    if (!needsOriginalMigration && !needsThumbnailMigration) {
      continue
    }

    if (!(await fileExists(mediaFile.key))) {
      continue
    }

    const nextKeys = createMediaStorageKeys(mediaFile.mimeType)
    let originalMoved = false
    let thumbnailMoved = false
    let thumbnailCreated = false

    try {
      await moveStoredFile(mediaFile.key, nextKeys.key)
      originalMoved = true

      const legacyThumbnailExists = mediaFile.thumbnailKey ? await fileExists(mediaFile.thumbnailKey) : false
      if (mediaFile.thumbnailKey && legacyThumbnailExists) {
        await moveStoredFile(mediaFile.thumbnailKey, nextKeys.thumbnailKey)
        thumbnailMoved = true
      } else {
        const originalBuffer = await readStoredFileIfExists(nextKeys.key)
        if (!originalBuffer) {
          throw new Error(`Migrated original file missing for media ${mediaFile.id}`)
        }

        const thumbnailBuffer = await createImageThumbnail(originalBuffer)
        await writeStoredFile(nextKeys.thumbnailKey, thumbnailBuffer)
        thumbnailCreated = true
      }

      const keyMap = new Map<string, string>([[mediaFile.key, nextKeys.key]])
      if (mediaFile.thumbnailKey) {
        keyMap.set(mediaFile.thumbnailKey, nextKeys.thumbnailKey)
      }

      await prisma.$transaction(async tx => {
        await tx.mediaFile.update({
          where: { id: mediaFile.id },
          data: {
            key: nextKeys.key,
            thumbnailKey: nextKeys.thumbnailKey,
            filename: nextKeys.label,
          },
        })

        const settings = await tx.siteSettings.findUnique({
          where: { id: 1 },
          select: { logoKey: true, heroImageKey: true },
        })

        if (settings) {
          const data: { logoKey?: string; heroImageKey?: string } = {}

          if (settings.logoKey === mediaFile.key) {
            data.logoKey = nextKeys.key
          }

          if (settings.heroImageKey === mediaFile.key) {
            data.heroImageKey = nextKeys.key
          }

          if (Object.keys(data).length > 0) {
            await tx.siteSettings.update({
              where: { id: 1 },
              data,
            })
          }
        }

        await updateContentMediaReferences(tx, keyMap)
      })

      migratedCount += 1
    } catch (error) {
      if (thumbnailMoved && mediaFile.thumbnailKey) {
        try {
          await moveStoredFile(nextKeys.thumbnailKey, mediaFile.thumbnailKey)
        } catch (restoreError) {
          console.error('[storage] failed to restore legacy thumbnail after migration error', restoreError)
        }
      } else if (thumbnailCreated) {
        try {
          await deleteStoredFile(nextKeys.thumbnailKey)
        } catch (restoreError) {
          console.error('[storage] failed to delete generated thumbnail after migration error', restoreError)
        }
      }

      if (originalMoved) {
        try {
          await moveStoredFile(nextKeys.key, mediaFile.key)
        } catch (restoreError) {
          console.error('[storage] failed to restore legacy original after migration error', restoreError)
        }
      }

      throw error
    }
  }

  if (migratedCount > 0) {
    console.info(`[storage] migrated ${migratedCount} legacy media records to opaque UUID keys`)
  }
}

export async function reconcileLocalMediaState() {
  const mediaFiles = await prisma.mediaFile.findMany({
    select: {
      id: true,
      key: true,
      thumbnailKey: true,
    },
  })

  const missingMediaIds: number[] = []
  const missingMediaKeys = new Set<string>()
  const activeStorageIds = new Set<string>()
  const thumbnailKeyUpdates: Array<{ id: number; thumbnailKey: string }> = []
  let generatedThumbnailCount = 0
  let generatedVariantCount = 0

  for (const mediaFile of mediaFiles) {
    const originalExists = await fileExists(mediaFile.key)
    if (!originalExists) {
      missingMediaIds.push(mediaFile.id)
      missingMediaKeys.add(mediaFile.key)
      continue
    }

    const storageId = getMediaStorageIdFromKey(mediaFile.key)
    if (storageId) {
      activeStorageIds.add(storageId)
    }

    const expectedThumbnailKey = getExpectedThumbnailKey(mediaFile.key)
    if (expectedThumbnailKey && mediaFile.thumbnailKey !== expectedThumbnailKey) {
      thumbnailKeyUpdates.push({ id: mediaFile.id, thumbnailKey: expectedThumbnailKey })
    }

    const derivativeResult = await syncImageDerivatives(mediaFile)
    generatedThumbnailCount += derivativeResult.generatedThumbnailCount
    generatedVariantCount += derivativeResult.generatedVariantCount
  }

  if (thumbnailKeyUpdates.length > 0) {
    await Promise.all(
      thumbnailKeyUpdates.map(({ id, thumbnailKey }) =>
        prisma.mediaFile.update({
          where: { id },
          data: { thumbnailKey },
        })),
    )
  }

  if (missingMediaIds.length > 0) {
    await prisma.mediaFile.deleteMany({
      where: { id: { in: missingMediaIds } },
    })
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { logoKey: true, heroImageKey: true },
  })

  if (settings) {
    const data: { logoKey?: string; heroImageKey?: string } = {}

    if (settings.logoKey && !(await fileExists(settings.logoKey))) {
      data.logoKey = ''
    } else if (settings.logoKey && missingMediaKeys.has(settings.logoKey)) {
      data.logoKey = ''
    }

    if (settings.heroImageKey && !(await fileExists(settings.heroImageKey))) {
      data.heroImageKey = ''
    } else if (settings.heroImageKey && missingMediaKeys.has(settings.heroImageKey)) {
      data.heroImageKey = ''
    }

    if (Object.keys(data).length > 0) {
      await prisma.siteSettings.update({
        where: { id: 1 },
        data,
      })
    }
  }

  const orphanCleanup = await cleanupOrphanImageDerivatives(activeStorageIds)

  if (
    missingMediaIds.length > 0
    || generatedThumbnailCount > 0
    || generatedVariantCount > 0
    || thumbnailKeyUpdates.length > 0
    || orphanCleanup.removedThumbnailCount > 0
    || orphanCleanup.removedVariantDirectoryCount > 0
  ) {
    console.info(
      `[storage] reconciled media state: removed ${missingMediaIds.length} orphan records, generated ${generatedThumbnailCount} thumbnails, generated ${generatedVariantCount} variants, realigned ${thumbnailKeyUpdates.length} thumbnail keys, removed ${orphanCleanup.removedThumbnailCount} orphan thumbnails and ${orphanCleanup.removedVariantDirectoryCount} orphan variant directories`,
    )
  }
}
