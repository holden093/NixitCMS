import { Router } from 'express'
import multer from 'multer'
import { config } from '../../config'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { createOptimizedImageAssetSet, detectImageMimeType } from '../../services/images'
import {
  createMediaStorageKeys,
  deleteStoredDirectory,
  deleteStoredFile,
  getMediaVariantDirectoryKey,
  readStoredFileIfExists,
  writeStoredFile,
} from '../../services/storage'
import { prisma } from '../../lib/prisma'
import { asyncHandler, badRequest, notFound, parsePositiveInt, trimString } from '../../lib/http'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.uploadMaxBytes } })
const mediaFileInclude = { categories: { include: { photoCategory: true } } } as const

function createEmptyUsage() {
  return {
    isLogo: false,
    isHeroImage: false,
  }
}

function parseCategoryIds(values: unknown): number[] {
  const normalizedValues = Array.isArray(values)
    ? values
    : values === undefined || values === null || values === ''
      ? []
      : [values]

  if (normalizedValues.length === 1 && typeof normalizedValues[0] === 'string') {
    const trimmed = normalizedValues[0].trim()
    if (!trimmed) {
      return []
    }

    if (trimmed.startsWith('[')) {
      try {
        return parseCategoryIds(JSON.parse(trimmed))
      } catch {
        badRequest('categoryIds must be an array of positive integers')
      }
    }
  }

  return Array.from(new Set(normalizedValues.map(value => {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
      return value
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number.parseInt(value, 10)
      if (Number.isInteger(parsed) && parsed > 0) {
        return parsed
      }
    }

    badRequest('categoryIds must be an array of positive integers')
  })))
}

function parseRequestCategoryIds(body: Record<string, unknown> | undefined) {
  if (!body) {
    return []
  }

  const rawValues: unknown[] = []
  for (const fieldName of ['categoryIds', 'categoryIds[]']) {
    const value = body[fieldName]
    if (value === undefined) {
      continue
    }

    if (Array.isArray(value)) {
      rawValues.push(...value)
      continue
    }

    rawValues.push(value)
  }

  return parseCategoryIds(rawValues)
}

async function buildMediaUsageMap(keys: string[]) {
  const uniqueKeys = Array.from(new Set(keys.filter(Boolean)))
  const usageMap = new Map(uniqueKeys.map(key => [key, createEmptyUsage()]))

  if (!uniqueKeys.length) {
    return usageMap
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { logoKey: true, heroImageKey: true },
  })

  if (settings?.logoKey && usageMap.has(settings.logoKey)) {
    usageMap.get(settings.logoKey)!.isLogo = true
  }

  if (settings?.heroImageKey && usageMap.has(settings.heroImageKey)) {
    usageMap.get(settings.heroImageKey)!.isHeroImage = true
  }

  return usageMap
}

function serializeMediaFile<T extends { filename: string }>(file: T) {
  const { filename, ...rest } = file
  return {
    ...rest,
    label: filename,
  }
}

function attachMediaUsage<T extends { key: string; filename: string }>(
  file: T,
  usageMap: Map<string, ReturnType<typeof createEmptyUsage>>,
) {
  return {
    ...serializeMediaFile(file),
    usage: usageMap.get(file.key) ?? createEmptyUsage(),
  }
}

async function getMediaFileById(id: number) {
  const file = await prisma.mediaFile.findUnique({
    where: { id },
    include: mediaFileInclude,
  })

  if (!file) {
    notFound('File not found')
  }

  return file
}

router.get('/media', requireAuth, asyncHandler(async (_req, res) => {
  const files = await prisma.mediaFile.findMany({
    orderBy: { uploadedAt: 'desc' },
    include: mediaFileInclude,
  })
  const usageMap = await buildMediaUsageMap(files.map(file => file.key))

  res.json(files.map(file => attachMediaUsage(file, usageMap)))
}))

router.post('/media/upload', requireTrustedOrigin, requireAuth, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    badRequest('No file provided')
  }

  const mimeType = await detectImageMimeType(req.file.buffer)
  if (!mimeType) {
    badRequest('File type not allowed')
  }

  const categoryIds = parseRequestCategoryIds(req.body as Record<string, unknown> | undefined)
  const storageKeys = createMediaStorageKeys(mimeType)
  const imageAssets = await createOptimizedImageAssetSet(req.file.buffer, mimeType)

  try {
    await writeStoredFile(storageKeys.key, imageAssets.masterBuffer)
    await writeStoredFile(storageKeys.thumbnailKey, imageAssets.thumbnailBuffer)
    await Promise.all(
      (Object.entries(storageKeys.variantKeys) as Array<[keyof typeof storageKeys.variantKeys, string]>).map(
        ([preset, key]) => writeStoredFile(key, imageAssets.variantBuffers[preset]),
      ),
    )

    const record = await prisma.mediaFile.create({
      data: {
        key: storageKeys.key,
        thumbnailKey: storageKeys.thumbnailKey,
        filename: storageKeys.label,
        mimeType,
        size: imageAssets.masterBuffer.length,
        isPublic: true,
        categories: categoryIds.length > 0
          ? {
              create: categoryIds.map(photoCategoryId => ({ photoCategoryId })),
            }
          : undefined,
      },
      include: mediaFileInclude,
    })

    res.json({
      ...serializeMediaFile(record),
      usage: createEmptyUsage(),
    })
  } catch (error) {
    await deleteStoredFile(storageKeys.key)
    await deleteStoredFile(storageKeys.thumbnailKey)
    await deleteStoredDirectory(storageKeys.variantDirectoryKey)
    throw error
  }
}))

router.put('/media/:id/metadata', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')
  const label = trimString(req.body?.label, 'label', 120, true)
  const categoryIds = parseCategoryIds(req.body?.categoryIds)

  await prisma.$transaction(async tx => {
    await tx.mediaFile.update({
      where: { id },
      data: { filename: label },
    })

    await tx.mediaFileCategory.deleteMany({ where: { mediaFileId: id } })

    for (const photoCategoryId of categoryIds) {
      await tx.mediaFileCategory.create({
        data: { mediaFileId: id, photoCategoryId },
      })
    }
  })

  const file = await getMediaFileById(id)
  const usageMap = await buildMediaUsageMap([file.key])
  res.json(attachMediaUsage(file, usageMap))
}))

router.delete('/media/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')
  const file = await getMediaFileById(id)

  const usageMap = await buildMediaUsageMap([file.key])
  const usage = usageMap.get(file.key) ?? createEmptyUsage()

  if (usage.isLogo || usage.isHeroImage) {
    res.status(409).json({
      error: true,
      message: 'Media file is still referenced and cannot be deleted.',
      usage,
    })
    return
  }

  const originalBuffer = await readStoredFileIfExists(file.key)
  const thumbnailBuffer = file.thumbnailKey ? await readStoredFileIfExists(file.thumbnailKey) : null
  const variantDirectoryKey = getMediaVariantDirectoryKey(file.key)
  let originalDeleted = false
  let thumbnailDeleted = false
  let dbDeleted = false

  try {
    await deleteStoredFile(file.key)
    originalDeleted = true

    if (file.thumbnailKey) {
      await deleteStoredFile(file.thumbnailKey)
      thumbnailDeleted = true
    }

    if (variantDirectoryKey) {
      await deleteStoredDirectory(variantDirectoryKey)
    }

    await prisma.mediaFile.delete({ where: { id } })
    dbDeleted = true
  } catch (error) {
    if (!dbDeleted && (originalDeleted || thumbnailDeleted)) {
      try {
        if (originalDeleted && originalBuffer) {
          await writeStoredFile(file.key, originalBuffer)
        }
        if (thumbnailDeleted && file.thumbnailKey && thumbnailBuffer) {
          await writeStoredFile(file.thumbnailKey, thumbnailBuffer)
        }
      } catch (restoreError) {
        console.error('[media] failed to restore deleted files after database error', restoreError)
      }
    }

    throw error
  }

  res.json({ ok: true })
}))

export default router
