import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { serializeServiceDetail, serializeServiceSummary, serviceDetailInclude, serviceSummaryInclude } from '../../lib/servicePayloads'
import { asyncHandler, notFound } from '../../lib/http'

const router = Router()

router.get('/services', asyncHandler(async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { isPublic: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: serviceSummaryInclude,
  })

  res.json(services.map(service => serializeServiceSummary(service as Parameters<typeof serializeServiceSummary>[0])))
}))

router.get('/services/:slug', asyncHandler(async (req, res) => {
  const service = await prisma.service.findFirst({
    where: { slug: req.params.slug, isPublic: true },
    include: serviceDetailInclude,
  })
  if (!service) {
    notFound('Service not found')
  }

  res.json(serializeServiceDetail(service as Parameters<typeof serializeServiceDetail>[0]))
}))

export default router
