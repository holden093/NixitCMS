import fs from 'fs'
import multer from 'multer'
import os from 'os'
import { pipeline } from 'stream/promises'
import { Router } from 'express'
import { clearAuthCookie } from '../../lib/authCookies'
import { asyncHandler, badRequest } from '../../lib/http'
import { requireAuth } from '../../middleware/requireAuth'
import { requireTrustedOrigin } from '../../middleware/requireTrustedOrigin'
import { config } from '../../config'
import {
  createSiteTransferExport,
  importSiteTransferArchive,
} from '../../services/siteTransfer'

const router = Router()
const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: config.siteTransferMaxBytes },
})

router.post('/site-transfer/export', requireTrustedOrigin, requireAuth, asyncHandler(async (_req, res) => {
  const exported = await createSiteTransferExport()

  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/gzip')
  res.setHeader('Content-Disposition', `attachment; filename="${exported.filename}"`)

  try {
    await pipeline(fs.createReadStream(exported.archivePath), res)
  } catch (error) {
    if (!res.destroyed) {
      throw error
    }
  } finally {
    await exported.cleanup()
  }
}))

router.post('/site-transfer/import', requireTrustedOrigin, requireAuth, upload.single('archive'), asyncHandler(async (req, res) => {
  if (!req.file?.path) {
    badRequest('No archive provided')
  }

  const result = await importSiteTransferArchive(req.file.path)
  clearAuthCookie(res)
  res.json(result)
}))

export default router
