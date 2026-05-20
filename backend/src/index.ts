import app from './app'
import { config } from './config'
import { prisma } from './lib/prisma'
import { reconcileStructuredContent } from './services/contentSanitizer'
import { ensureMediaStorage, migrateLegacyMediaStorage, reconcileLocalMediaState } from './services/storage'
import { startAsyncJobRunner, stopAsyncJobRunner } from './services/asyncJobs'

async function main() {
  await ensureMediaStorage()
  await migrateLegacyMediaStorage()
  await reconcileLocalMediaState()
  await reconcileStructuredContent()

  const server = app.listen(config.port, config.host, () => {
    console.log(`Backend running on ${config.host}:${config.port}`)
  })
  startAsyncJobRunner()

  let shuttingDown = false

  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) {
      return
    }
    shuttingDown = true
    console.log(`${signal} received, shutting down backend...`)

    const forceExitTimer = setTimeout(() => {
      console.error('Graceful shutdown timed out, forcing exit.')
      process.exit(1)
    }, 10_000)

    server.close(() => {
      stopAsyncJobRunner()
      void prisma.$disconnect()
        .then(() => {
          clearTimeout(forceExitTimer)
          process.exit(0)
        })
        .catch(error => {
          clearTimeout(forceExitTimer)
          console.error(error)
          process.exit(1)
        })
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
