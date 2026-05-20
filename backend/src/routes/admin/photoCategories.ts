import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { asyncHandler, badRequest, parseInteger, parsePositiveInt, trimString } from '../../lib/http'

const router = Router()
const photoCategoryWithCountInclude = { _count: { select: { media: true } } } as const

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

router.get('/photo-categories', requireAuth, asyncHandler(async (_req, res) => {
  const categories = await prisma.photoCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: photoCategoryWithCountInclude,
  })
  res.json(categories)
}))

router.post('/photo-categories', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const name_it = trimString(req.body?.name_it, 'name_it', 120)
  const slug = slugify(name_it)
  if (!slug) {
    badRequest('name_it must produce a valid slug')
  }
  const category = await prisma.photoCategory.create({
    data: {
      slug,
      name_it,
      name_en: trimString(req.body?.name_en, 'name_en', 120),
      sortOrder: parseInteger(req.body?.sortOrder ?? 0, 'sortOrder'),
    },
    include: photoCategoryWithCountInclude,
  })
  res.status(201).json(category)
}))

router.put('/photo-categories/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const id = parsePositiveInt(req.params.id, 'id')
  const data: { name_it?: string; slug?: string; name_en?: string; sortOrder?: number } = {}

  if (req.body?.name_it !== undefined) {
    const nameIt = trimString(req.body.name_it, 'name_it', 120)
    data.name_it = nameIt
    data.slug = slugify(nameIt)
  }
  if (req.body?.name_en !== undefined) {
    data.name_en = trimString(req.body.name_en, 'name_en', 120)
  }
  if (req.body?.sortOrder !== undefined) {
    data.sortOrder = parseInteger(req.body.sortOrder, 'sortOrder')
  }

  const category = await prisma.photoCategory.update({
    where: { id },
    data,
    include: photoCategoryWithCountInclude,
  })
  res.json(category)
}))

router.delete('/photo-categories/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  await prisma.photoCategory.delete({ where: { id: parsePositiveInt(req.params.id, 'id') } })
  res.json({ ok: true })
}))

export default router
