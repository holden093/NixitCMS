import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { asyncHandler, badRequest, notFound, parsePositiveInt, serviceUnavailable } from '../../lib/http'

const router = Router()

router.get('/availability', asyncHandler(async (req, _res) => {
  if (typeof req.query.providerId !== 'string') {
    badRequest('providerId is required')
  }
  if (typeof req.query.checkIn !== 'string') {
    badRequest('checkIn is required')
  }
  if (typeof req.query.checkOut !== 'string') {
    badRequest('checkOut is required')
  }

  const guestsRaw = Array.isArray(req.query.guests) ? req.query.guests[0] : req.query.guests
  if (typeof guestsRaw !== 'string') {
    badRequest('guests is required')
  }

  const provider = await prisma.bookingProvider.findFirst({
    where: {
      id: parsePositiveInt(req.query.providerId, 'providerId'),
      isEnabled: true,
      type: 'gestore-alberghi',
    },
  })

  if (!provider) {
    notFound('Booking provider not found')
  }

  parsePositiveInt(guestsRaw, 'guests')

  serviceUnavailable(
    'Real-time availability is not configured for this booking provider. Please continue on the booking portal or contact the property directly.',
  )
}))

export default router
