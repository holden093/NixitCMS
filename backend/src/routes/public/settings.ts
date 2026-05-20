import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler, notFound } from '../../lib/http'

const router = Router()

router.get('/settings', asyncHandler(async (_req, res) => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
  if (!settings) {
    notFound('Settings not found')
  }
  res.json(settings)
}))

export default router
