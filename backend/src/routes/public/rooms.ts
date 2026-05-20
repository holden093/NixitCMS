import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { serializeRoomDetail, serializeRoomSummary, roomDetailInclude, roomSummaryInclude } from '../../lib/roomPayloads'
import { asyncHandler, notFound } from '../../lib/http'

const router = Router()
const roomCategory = (prisma as any).roomCategory

router.get('/rooms', asyncHandler(async (_req, res) => {
  const rooms = await roomCategory.findMany({
    where: { isPublic: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: roomSummaryInclude,
  })

  res.json(rooms.map((room: Parameters<typeof serializeRoomSummary>[0]) => serializeRoomSummary(room)))
}))

router.get('/rooms/:slug', asyncHandler(async (req, res) => {
  const room = await roomCategory.findFirst({
    where: { slug: req.params.slug, isPublic: true },
    include: roomDetailInclude,
  })

  if (!room) {
    notFound('Room not found')
  }

  res.json(serializeRoomDetail(room as Parameters<typeof serializeRoomDetail>[0]))
}))

export default router
