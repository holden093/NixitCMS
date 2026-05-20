import { Router } from 'express'
import { asyncHandler, parsePositiveInt } from '../../lib/http'
import { serializePublicNewsArticleDetail, serializePublicNewsArticleSummary } from '../../lib/newsPayloads'
import { getPublishedNewsArticleBySlug, listPublicSiteNewsArticles } from '../../services/newsStore'

const router = Router()

router.get('/news', asyncHandler(async (req, res) => {
  const limit = typeof req.query.limit === 'string' ? parsePositiveInt(req.query.limit, 'limit') : undefined

  const articles = await listPublicSiteNewsArticles(limit)

  res.json(articles.map(serializePublicNewsArticleSummary))
}))

router.get('/news/:slug', asyncHandler(async (req, res) => {
  const article = await getPublishedNewsArticleBySlug(req.params.slug)

  if (!article) {
    res.status(404).json({ error: true, message: 'News article not found' })
    return
  }

  res.json(serializePublicNewsArticleDetail(article))
}))

export default router
