import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler } from '../../lib/http'

const router = Router()

router.get('/photo-categories', asyncHandler(async (_req, res) => {
  const categories = await prisma.photoCategory.findMany({
    orderBy: { sortOrder: 'asc' },
  })
  res.json(categories)
}))

export default router
