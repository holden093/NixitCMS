import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler } from '../../lib/http'

const router = Router()

router.get('/booking', asyncHandler(async (_req, res) => {
  const provider = await prisma.bookingProvider.findFirst({
    where: { isEnabled: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  })

  res.json(provider)
}))

export default router
