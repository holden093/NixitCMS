import { Router } from 'express'
import type { Response } from 'express'
import { config } from '../../config'
import { prisma } from '../../lib/prisma'
import { isMediaVariantPreset, type MediaVariantPreset } from '../../services/images'
import { fileExists, getMediaVariantKey, getStoredFilePath } from '../../services/storage'
import { asyncHandler, notFound } from '../../lib/http'

const apiRouter = Router()
export const mediaFilesRouter = Router()

function serializeMediaFile<T extends { filename: string }>(file: T) {
  const { filename, ...rest } = file
  return {
    ...rest,
    label: filename,
  }
}

async function findPublicFile(key: string) {
  return prisma.mediaFile.findFirst({
    where: {
      isPublic: true,
      OR: [{ key }, { thumbnailKey: key }],
    },
  })
}

function parseRequestedVariant(value: unknown): MediaVariantPreset | null {
  if (typeof value !== 'string' || !isMediaVariantPreset(value)) {
    return null
  }

  return value
}

async function sendMediaFile(res: Response, key: string, variant: MediaVariantPreset | null) {
  const mediaFile = await findPublicFile(key)
  if (!mediaFile) {
    notFound('File not found')
  }

  const candidates: Array<{ key: string; contentType: string }> = []

  if (variant) {
    const variantKey = getMediaVariantKey(mediaFile.key, variant)
    if (variantKey) {
      candidates.push({ key: variantKey, contentType: 'image/webp' })
    }
  }

  if (mediaFile.thumbnailKey === key) {
    candidates.push({ key, contentType: 'image/webp' })
  }

  candidates.push({ key: mediaFile.key, contentType: mediaFile.mimeType })

  if (mediaFile.thumbnailKey && mediaFile.thumbnailKey !== key) {
    candidates.push({ key: mediaFile.thumbnailKey, contentType: 'image/webp' })
  }

  for (const candidate of candidates) {
    if (!(await fileExists(candidate.key))) {
      continue
    }

    res.setHeader('Content-Type', candidate.contentType)
    res.setHeader('Cache-Control', `public, max-age=${config.mediaCacheMaxAgeSeconds}`)
    res.sendFile(getStoredFilePath(candidate.key))
    return
  }

  notFound('File not found')
}

apiRouter.get('/media', asyncHandler(async (req, res) => {
  const categorySlug = typeof req.query.category === 'string' ? req.query.category : undefined

  const where: Record<string, unknown> = { isPublic: true }
  if (categorySlug) {
    where.categories = { some: { photoCategory: { slug: categorySlug } } }
  }

  const files = await prisma.mediaFile.findMany({
    where,
    orderBy: { uploadedAt: 'desc' },
    include: {
      categories: {
        include: {
          photoCategory: true,
        },
      },
    },
  })
  res.json(files.map(file => serializeMediaFile(file)))
}))

apiRouter.get('/media/file/:key(*)', asyncHandler(async (req, res) => {
  await sendMediaFile(res, req.params.key, parseRequestedVariant(req.query.variant))
}))

mediaFilesRouter.get('/:key(*)', asyncHandler(async (req, res) => {
  await sendMediaFile(res, req.params.key, parseRequestedVariant(req.query.variant))
}))

export default apiRouter
