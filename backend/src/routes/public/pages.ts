import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler } from '../../lib/http'
import { MANAGED_PUBLIC_PAGE_SLUGS, sortManagedPublicPages } from '../../lib/publicShell'

const router = Router()

router.get('/pages', asyncHandler(async (_req, res) => {
  const pages = await prisma.page.findMany({
    where: {
      slug: { in: [...MANAGED_PUBLIC_PAGE_SLUGS] },
      isVisible: true,
    },
  })
  res.json(sortManagedPublicPages(pages))
}))

export default router
