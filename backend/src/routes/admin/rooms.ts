import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { serializeRoomSummary, roomSummaryInclude } from '../../lib/roomPayloads'
import { asyncHandler, badRequest, notFound, parseBoolean, parseInteger, parseOptionalInteger, parsePositiveInt, trimString } from '../../lib/http'

const router = Router()
const roomCategory = (prisma as any).roomCategory

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parsePositiveInteger(value: unknown, fieldName: string): number {
  const parsed = parseInteger(value, fieldName)

  if (parsed < 1) {
    badRequest(`${fieldName} must be greater than 0`)
  }

  return parsed
}

function parseOptionalPositiveInteger(value: unknown, fieldName: string): number | null {
  if (value == null) {
    return null
  }

  return parsePositiveInteger(value, fieldName)
}

async function getSerializedRoomById(id: number) {
  const room = await roomCategory.findUnique({
    where: { id },
    include: roomSummaryInclude,
  })

  if (!room) {
    notFound('Room not found')
  }

  return serializeRoomSummary(room as Parameters<typeof serializeRoomSummary>[0])
}

router.get('/rooms', requireAuth, asyncHandler(async (_req, res) => {
  const rooms = await roomCategory.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: roomSummaryInclude,
  })

  res.json(rooms.map((room: Parameters<typeof serializeRoomSummary>[0]) => serializeRoomSummary(room)))
}))

router.post('/rooms', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const name_it = trimString(req.body?.name_it, 'name_it', 120)
  const slug = slugify(name_it)
  const room = await roomCategory.create({
    data: {
      slug,
      name_it,
      name_en: trimString(req.body?.name_en, 'name_en', 120),
      description_it: trimString(req.body?.description_it, 'description_it', 10000, false),
      description_en: trimString(req.body?.description_en, 'description_en', 10000, false),
      occupancy: parsePositiveInteger(req.body?.occupancy, 'occupancy'),
      sizeSqm: parsePositiveInteger(req.body?.sizeSqm, 'sizeSqm'),
      price: parseOptionalPositiveInteger(req.body?.price, 'price'),
      isPublic: parseBoolean(req.body?.isPublic, 'isPublic'),
      sortOrder: parseInteger(req.body?.sortOrder, 'sortOrder'),
      photoCategoryId: req.body?.photoCategoryId != null ? parseOptionalInteger(req.body.photoCategoryId, 'photoCategoryId') ?? null : null,
      previewMediaId: req.body?.previewMediaId != null ? parseOptionalInteger(req.body.previewMediaId, 'previewMediaId') ?? null : null,
    },
  })

  res.status(201).json(await getSerializedRoomById(room.id))
}))

router.put('/rooms/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const data: {
    name_it?: string
    slug?: string
    name_en?: string
    description_it?: string
    description_en?: string
    occupancy?: number
    sizeSqm?: number
    price?: number | null
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    previewMediaId?: number | null
  } = {}
  const roomId = parsePositiveInt(req.params.id, 'id')
  const currentRoom = await roomCategory.findUnique({
    where: { id: roomId },
    select: {
      id: true,
      previewMediaId: true,
    },
  }) as { id: number; previewMediaId: number | null } | null

  if (!currentRoom) {
    notFound('Room not found')
  }

  if (req.body?.name_it !== undefined) {
    const nameIt = trimString(req.body?.name_it, 'name_it', 120)
    data.name_it = nameIt
    data.slug = slugify(nameIt)
  }
  if (req.body?.name_en !== undefined) {
    data.name_en = trimString(req.body?.name_en, 'name_en', 120)
  }
  if (req.body?.description_it !== undefined) {
    data.description_it = trimString(req.body?.description_it, 'description_it', 10000, false)
  }
  if (req.body?.description_en !== undefined) {
    data.description_en = trimString(req.body?.description_en, 'description_en', 10000, false)
  }
  if (req.body?.occupancy !== undefined) {
    data.occupancy = parsePositiveInteger(req.body.occupancy, 'occupancy')
  }
  if (req.body?.sizeSqm !== undefined) {
    data.sizeSqm = parsePositiveInteger(req.body.sizeSqm, 'sizeSqm')
  }
  if (req.body?.price !== undefined) {
    data.price = parseOptionalPositiveInteger(req.body.price, 'price')
  }
  if (req.body?.isPublic !== undefined) {
    data.isPublic = parseBoolean(req.body?.isPublic, 'isPublic')
  }
  if (req.body?.sortOrder !== undefined) {
    data.sortOrder = parseInteger(req.body?.sortOrder, 'sortOrder')
  }
  if (req.body?.photoCategoryId !== undefined) {
    data.photoCategoryId = req.body.photoCategoryId != null ? parseOptionalInteger(req.body.photoCategoryId, 'photoCategoryId') ?? null : null
  }
  if (req.body?.previewMediaId !== undefined) {
    data.previewMediaId = req.body.previewMediaId != null ? parseOptionalInteger(req.body.previewMediaId, 'previewMediaId') ?? null : null
  }

  if (data.photoCategoryId !== undefined) {
    const candidatePreviewId = data.previewMediaId !== undefined
      ? data.previewMediaId
      : currentRoom.previewMediaId ?? null

    if (candidatePreviewId == null || data.photoCategoryId == null) {
      data.previewMediaId = data.photoCategoryId == null ? null : candidatePreviewId
    } else {
      const stillInCategory = await prisma.mediaFileCategory.findFirst({
        where: { mediaFileId: candidatePreviewId, photoCategoryId: data.photoCategoryId },
        select: { id: true },
      })
      data.previewMediaId = stillInCategory ? candidatePreviewId : null
    }
  }

  const room = await roomCategory.update({
    where: { id: roomId },
    data,
  })

  res.json(await getSerializedRoomById(room.id))
}))

router.delete('/rooms/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  await roomCategory.delete({ where: { id: parsePositiveInt(req.params.id, 'id') } })
  res.json({ ok: true })
}))

export default router
