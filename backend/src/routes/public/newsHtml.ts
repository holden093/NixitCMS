import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { resolveNewsLocale } from '../../lib/newsPayloads'
import { asyncHandler } from '../../lib/http'
import { MANAGED_PUBLIC_PAGE_SLUGS } from '../../lib/publicShell'
import { renderNewsArticleHtml } from '../../services/newsHtml'
import { getPublishedNewsArticleBySlug } from '../../services/newsStore'
import { buildServerPublicShellModel } from '../../services/publicShell'

const router = Router()

router.get('/news/:slug', asyncHandler(async (req, res) => {
  const [article, settings, siteContent, pages] = await Promise.all([
    getPublishedNewsArticleBySlug(req.params.slug),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.content.findUnique({ where: { pageSlug: 'site' } }),
    prisma.page.findMany({
      where: {
        slug: { in: [...MANAGED_PUBLIC_PAGE_SLUGS] },
        isVisible: true,
      },
    }),
  ])

  if (!article) {
    res.status(404).type('html').send('<!DOCTYPE html><html><body><h1>News article not found</h1></body></html>')
    return
  }

  const locale = resolveNewsLocale(req.query.lang, req.get('accept-language'), settings?.defaultLocale ?? 'it')
  const shell = buildServerPublicShellModel({
    locale,
    settings,
    siteContent,
    pages,
    activeNavItemId: 'news',
  })

  res
    .type('html')
    .send(renderNewsArticleHtml({
      article,
      locale,
      shell,
    }))
}))

export default router
