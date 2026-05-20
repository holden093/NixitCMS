import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler, notFound } from '../../lib/http'
import { sanitizeContentRecord } from '../../services/contentSanitizer'

const router = Router()

router.get('/content/:slug', asyncHandler(async (req, res) => {
  const content = await prisma.content.findUnique({
    where: { pageSlug: req.params.slug },
  })
  if (!content) {
    notFound('Content not found')
  }
  res.json(sanitizeContentRecord(content))
}))

export default router
