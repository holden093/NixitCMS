import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import {
  asyncHandler,
  badRequest,
  parseNumber,
  parsePositiveInt,
  trimString,
} from '../../lib/http'

const router = Router()

function parseCoordinate(value: unknown, fieldName: 'lat' | 'lng') {
  const parsed = parseNumber(value, fieldName)
  const inRange = fieldName === 'lat'
    ? parsed >= -90 && parsed <= 90
    : parsed >= -180 && parsed <= 180

  if (!inRange) {
    badRequest(`Invalid ${fieldName}`)
  }

  return parsed
}

router.get('/pois', requireAuth, asyncHandler(async (_req, res) => {
  res.json(await prisma.pointOfInterest.findMany({ orderBy: { createdAt: 'asc' } }))
}))

router.post('/pois', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const poi = await prisma.pointOfInterest.create({
    data: {
      name_it: trimString(req.body?.name_it, 'name_it', 120),
      name_en: trimString(req.body?.name_en, 'name_en', 120),
      description_it: trimString(req.body?.description_it, 'description_it', 4000, false),
      description_en: trimString(req.body?.description_en, 'description_en', 4000, false),
      lat: parseCoordinate(req.body?.lat, 'lat'),
      lng: parseCoordinate(req.body?.lng, 'lng'),
      category: trimString(req.body?.category, 'category', 40),
    },
  })
  res.status(201).json(poi)
}))

router.put('/pois/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const poi = await prisma.pointOfInterest.update({
    where: { id: parsePositiveInt(req.params.id, 'id') },
    data: {
      name_it: trimString(req.body?.name_it, 'name_it', 120),
      name_en: trimString(req.body?.name_en, 'name_en', 120),
      description_it: trimString(req.body?.description_it, 'description_it', 4000, false),
      description_en: trimString(req.body?.description_en, 'description_en', 4000, false),
      lat: parseCoordinate(req.body?.lat, 'lat'),
      lng: parseCoordinate(req.body?.lng, 'lng'),
      category: trimString(req.body?.category, 'category', 40),
    },
  })
  res.json(poi)
}))

router.delete('/pois/:id', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  await prisma.pointOfInterest.delete({ where: { id: parsePositiveInt(req.params.id, 'id') } })
  res.json({ ok: true })
}))

export default router
