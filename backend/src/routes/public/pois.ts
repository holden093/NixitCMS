import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler } from '../../lib/http'

const router = Router()

router.get('/pois', asyncHandler(async (_req, res) => {
  const pois = await prisma.pointOfInterest.findMany({ orderBy: { createdAt: 'asc' } })
  res.json(pois)
}))

export default router
