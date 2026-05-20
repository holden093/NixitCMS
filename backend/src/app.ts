import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { config } from './config'
import { ApiError } from './lib/http'
import { Prisma } from './lib/prismaClient'

import authRouter from './routes/auth'
import settingsRouter from './routes/public/settings'
import pagesRouter from './routes/public/pages'
import contentRouter from './routes/public/content'
import poisRouter from './routes/public/pois'
import mediaRouter, { mediaFilesRouter } from './routes/public/media'
import contactRouter from './routes/public/contact'
import roomsRouter from './routes/public/rooms'
import servicesRouter from './routes/public/services'
import bookingRouter from './routes/public/booking'
import availabilityRouter from './routes/public/availability'
import newsRouter from './routes/public/news'
import newsletterRouter from './routes/public/newsletter'
import newsHtmlRouter from './routes/public/newsHtml'
import adminSettingsRouter from './routes/admin/settings'
import adminPagesRouter from './routes/admin/pages'
import adminContentRouter from './routes/admin/content'
import adminMediaRouter from './routes/admin/media'
import adminPoisRouter from './routes/admin/pois'
import adminRoomsRouter from './routes/admin/rooms'
import adminServicesRouter from './routes/admin/services'
import adminBookingRouter from './routes/admin/booking'
import adminPhotoCategoriesRouter from './routes/admin/photoCategories'
import adminSiteTransferRouter from './routes/admin/siteTransfer'
import adminNewsRouter from './routes/admin/news'
import photoCategoriesRouter from './routes/public/photoCategories'

const app = express()

app.disable('etag')
app.set('trust proxy', config.trustProxy)

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      callback(null, false)
      return
    }

    try {
      callback(null, config.allowedOrigins.includes(new URL(origin).origin))
    } catch {
      callback(null, false)
    }
  },
  credentials: true,
}))
app.use(express.json({ limit: config.jsonBodyLimit }))
app.use(express.urlencoded({ extended: false, limit: config.jsonBodyLimit }))
app.use(cookieParser())
app.use(config.mediaPublicBasePath, mediaFilesRouter)

app.use('/api/auth', authRouter)

app.use('/api', settingsRouter)
app.use('/api', pagesRouter)
app.use('/api', contentRouter)
app.use('/api', poisRouter)
app.use('/api', mediaRouter)
app.use('/api', contactRouter)
app.use('/api', roomsRouter)
app.use('/api', servicesRouter)
app.use('/api', bookingRouter)
app.use('/api', availabilityRouter)
app.use('/api', photoCategoriesRouter)
app.use('/api', newsRouter)
app.use('/api', newsletterRouter)

const adminRouter = express.Router()
;[
  adminSettingsRouter,
  adminPagesRouter,
  adminContentRouter,
  adminMediaRouter,
  adminPoisRouter,
  adminRoomsRouter,
  adminServicesRouter,
  adminBookingRouter,
  adminPhotoCategoriesRouter,
  adminSiteTransferRouter,
  adminNewsRouter,
].forEach((r) => adminRouter.use(r))
app.use('/api/admin', adminRouter)
app.use(newsHtmlRouter)

app.use((_req, res) => {
  res.status(404).json({ error: true, message: 'Not found' })
})

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ApiError) {
    if (config.nodeEnv !== 'production' && err.statusCode >= 500) {
      console.error(err)
    }
    res.status(err.statusCode).json({ error: true, message: err.message })
    return
  }

  if (err instanceof multer.MulterError) {
    const sizeLimit = err.field === 'archive' ? config.siteTransferMaxBytes : config.uploadMaxBytes
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? `File too large. Maximum size is ${Math.round(sizeLimit / (1024 * 1024))}MB.`
      : 'Invalid upload payload'
    res.status(400).json({ error: true, message })
    return
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const status = err.code === 'P2025' ? 404 : err.code === 'P2002' ? 409 : 400
    const message = err.code === 'P2025'
      ? 'Resource not found'
      : err.code === 'P2002'
        ? 'Resource already exists'
        : 'Database request failed'
    if (config.nodeEnv !== 'production' && status >= 500) {
      console.error(err)
    }
    res.status(status).json({ error: true, message })
    return
  }

  if (config.nodeEnv !== 'production') {
    console.error(err)
  }

  res.status(500).json({ error: true, message: 'Internal server error' })
})

export default app
