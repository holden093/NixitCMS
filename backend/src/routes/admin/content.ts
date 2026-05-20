import type { Prisma as PrismaTypes } from '../../../generated/prisma-client-app'
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import { asyncHandler, trimString } from '../../lib/http'
import { sanitizeContentRecord, sanitizeContentUpdateInput } from '../../services/contentSanitizer'

const router = Router()

router.get('/content', requireAuth, asyncHandler(async (_req, res) => {
  const content = await prisma.content.findMany({
    orderBy: { pageSlug: 'asc' },
  })
  res.json(content.map(sanitizeContentRecord))
}))

router.put('/content/:slug', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const data = sanitizeContentUpdateInput(req.params.slug, {
    title_it: trimString(req.body?.title_it, 'title_it', 200, false),
    title_en: trimString(req.body?.title_en, 'title_en', 200, false),
    subtitle_it: trimString(req.body?.subtitle_it, 'subtitle_it', 300, false),
    subtitle_en: trimString(req.body?.subtitle_en, 'subtitle_en', 300, false),
    body_it: trimString(req.body?.body_it, 'body_it', 20000, false),
    body_en: trimString(req.body?.body_en, 'body_en', 20000, false),
    sections_it: trimString(req.body?.sections_it, 'sections_it', 20000, false),
    sections_en: trimString(req.body?.sections_en, 'sections_en', 20000, false),
  }) as unknown as PrismaTypes.ContentUpdateInput

  const content = await prisma.content.update({
    where: { pageSlug: req.params.slug },
    data,
  })
  res.json(sanitizeContentRecord(content))
}))

export default router
