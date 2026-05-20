import type { Prisma as PrismaTypes } from '../../../generated/prisma-client-app'
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { prisma } from '../../lib/prisma'
import {
  asyncHandler,
  optionalTrimmedString,
  parseOptionalBoolean,
  parseOptionalInteger,
  parseOptionalNumber,
  trimString,
} from '../../lib/http'

const router = Router()

function parseOptionalNullableString(value: unknown, fieldName: string, maxLength: number) {
  if (value === undefined) {
    return undefined
  }

  if (value === null) {
    return null
  }

  const trimmed = trimString(value, fieldName, maxLength, false)
  return trimmed || null
}

router.put('/settings', requireTrustedOrigin, requireAuth, asyncHandler(async (req, res) => {
  const data = {
    hotelName: optionalTrimmedString(req.body?.hotelName, 'hotelName', 120),
    logoKey: optionalTrimmedString(req.body?.logoKey, 'logoKey', 255),
    heroImageKey: optionalTrimmedString(req.body?.heroImageKey, 'heroImageKey', 255),
    legalName: optionalTrimmedString(req.body?.legalName, 'legalName', 160),
    registeredAddress: optionalTrimmedString(req.body?.registeredAddress, 'registeredAddress', 200),
    city: optionalTrimmedString(req.body?.city, 'city', 120),
    region: optionalTrimmedString(req.body?.region, 'region', 120),
    postalCode: optionalTrimmedString(req.body?.postalCode, 'postalCode', 30),
    country: optionalTrimmedString(req.body?.country, 'country', 120),
    vatNumber: optionalTrimmedString(req.body?.vatNumber, 'vatNumber', 40),
    taxCode: optionalTrimmedString(req.body?.taxCode, 'taxCode', 40),
    phone: optionalTrimmedString(req.body?.phone, 'phone', 60),
    email: optionalTrimmedString(req.body?.email, 'email', 160),
    defaultLocale: optionalTrimmedString(req.body?.defaultLocale, 'defaultLocale', 10),
    octorateKey: optionalTrimmedString(req.body?.octorateKey, 'octorateKey', 120),
    mapLat: parseOptionalNumber(req.body?.mapLat, 'mapLat'),
    mapLng: parseOptionalNumber(req.body?.mapLng, 'mapLng'),
    mapZoom: parseOptionalInteger(req.body?.mapZoom, 'mapZoom'),
    promoIsActive: parseOptionalBoolean(req.body?.promoIsActive, 'promoIsActive'),
    promoText_it: parseOptionalNullableString(req.body?.promoText_it, 'promoText_it', 240),
    promoText_en: parseOptionalNullableString(req.body?.promoText_en, 'promoText_en', 240),
    promoLink: parseOptionalNullableString(req.body?.promoLink, 'promoLink', 500),
  } as unknown as PrismaTypes.SiteSettingsUpdateInput

  const settings = await prisma.siteSettings.update({
    where: { id: 1 },
    data,
  })
  res.json(settings)
}))

export default router
