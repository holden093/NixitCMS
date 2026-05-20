import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { serializeServiceSummary, serviceSummaryInclude } from '../../lib/servicePayloads'
import { asyncHandler, notFound, parseBoolean, parseInteger, parseOptionalInteger, parsePositiveInt, trimString } from '../../lib/http'

const router = Router()

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getSerializedServiceById(id: number) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: serviceSummaryInclude,
  })

  if (!service) {
    notFound('Service not found')
  }

  return serializeServiceSummary(service as Parameters<typeof serializeServiceSummary>[0])
}

router.get('/services', requireAuth, asyncHandler(async (_req, res) => {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: serviceSummaryInclude,
  })

  res.json(services.map(service => serializeServiceSummary(service as Parameters<typeof serializeServiceSummary>[0])))
}))

router.post('/services', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const name_it = trimString(req.body?.name_it, 'name_it', 120)
  const slug = slugify(name_it)
  const service = await prisma.service.create({
    data: {
      slug,
      name_it,
      name_en: trimString(req.body?.name_en, 'name_en', 120),
      description_it: trimString(req.body?.description_it, 'description_it', 10000, false),
      description_en: trimString(req.body?.description_en, 'description_en', 10000, false),
      isPublic: parseBoolean(req.body?.isPublic, 'isPublic'),
      sortOrder: parseInteger(req.body?.sortOrder, 'sortOrder'),
      photoCategoryId: req.body?.photoCategoryId != null ? parseOptionalInteger(req.body.photoCategoryId, 'photoCategoryId') ?? null : null,
      previewMediaId: req.body?.previewMediaId != null ? parseOptionalInteger(req.body.previewMediaId, 'previewMediaId') ?? null : null,
    } as any,
  })

  res.status(201).json(await getSerializedServiceById(service.id))
}))

router.put('/services/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const data: {
    name_it?: string
    slug?: string
    name_en?: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    previewMediaId?: number | null
  } = {}
  const serviceId = parsePositiveInt(req.params.id, 'id')
  const currentService = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      id: true,
      previewMediaId: true,
    },
  }) as { id: number; previewMediaId: number | null } | null

  if (!currentService) {
    notFound('Service not found')
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
  // If category changes/clears, ensure preview still belongs to it; otherwise reset.
  if (data.photoCategoryId !== undefined) {
    const candidatePreviewId = data.previewMediaId !== undefined
      ? data.previewMediaId
      : currentService.previewMediaId ?? null
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

  const service = await prisma.service.update({
    where: { id: serviceId },
    data: data as any,
  })
  res.json(await getSerializedServiceById(service.id))
}))

router.delete('/services/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  await prisma.service.delete({ where: { id: parsePositiveInt(req.params.id, 'id') } })
  res.json({ ok: true })
}))

export default router
