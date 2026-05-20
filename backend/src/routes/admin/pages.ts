import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { asyncHandler, parseBoolean } from '../../lib/http'

const router = Router()

router.get('/pages', requireAuth, asyncHandler(async (_req, res) => {
  const pages = await prisma.page.findMany({
    orderBy: { slug: 'asc' },
  })
  res.json(pages)
}))

router.put('/pages/:slug', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const page = await prisma.page.update({
    where: { slug: req.params.slug },
    data: { isVisible: parseBoolean(req.body?.isVisible, 'isVisible') },
  })
  res.json(page)
}))

export default router
