import { spawn } from 'child_process'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import { config } from '../config'
import { badRequest, conflict } from '../lib/http'
import { setMaintenanceMode } from '../lib/maintenanceMode'
import { prisma } from '../lib/prisma'
import { syncConfiguredAdminUser } from './adminUser'
import { startAsyncJobRunner, stopAsyncJobRunner } from './asyncJobs'
import { reconcileStructuredContent } from './contentSanitizer'
import { ensureMediaStorage, migrateLegacyMediaStorage, reconcileLocalMediaState } from './storage'

const SITE_TRANSFER_FORMAT_VERSION = 2
const SITE_TRANSFER_SOURCE_APP = 'universal-hotel-cms'
const MANIFEST_FILENAME = 'manifest.json'
const DATABASE_FILENAME = 'database.sqlite'
const MEDIA_DIRNAME = 'media'

let siteTransferLocked = false

export interface SiteTransferManifest {
  formatVersion: number
  createdAt: string
  sourceApp: string
  databaseFile: string
  mediaDir: string
}

export interface SiteExportArchive {
  archivePath: string
  filename: string
  cleanup: () => Promise<void>
}

export interface SiteImportResult {
  ok: true
  restoredAt: string
  formatVersion: number
}

function withSiteTransferLock<T>(action: () => Promise<T>) {
  if (siteTransferLocked) {
    conflict('A site transfer is already in progress. Retry when the current export/import finishes.')
  }

  siteTransferLocked = true
  return action().finally(() => {
    siteTransferLocked = false
  })
}

function formatArchiveTimestamp(date = new Date()) {
  const pad = (value: number) => String(value).padStart(2, '0')

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('') + '-' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('')
}

async function createWorkspace(prefix: string) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix))
}

async function exists(targetPath: string) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

function isSafeArchiveEntry(entry: string) {
  if (!entry || entry === '.') {
    return true
  }

  if (entry.includes('\\')) {
    return false
  }

  const normalized = path.posix.normalize(entry.replace(/^\.\/+/, ''))
  if (!normalized || normalized === '.') {
    return true
  }

  if (normalized.startsWith('/') || normalized === '..' || normalized.startsWith('../')) {
    return false
  }

  return !normalized.split('/').includes('..')
}

function resolveInsideRoot(rootPath: string, relativePath: string) {
  const targetPath = path.resolve(rootPath, relativePath)
  const normalizedRoot = `${rootPath}${path.sep}`

  if (targetPath !== rootPath && !targetPath.startsWith(normalizedRoot)) {
    badRequest('Archive contains invalid paths')
  }

  return targetPath
}

async function runCommand(command: string, args: string[], captureStdout = false) {
  return new Promise<string>((resolve, reject) => {
    const safeEnv = {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
    }

    const child = spawn(command, args, {
      env: safeEnv,
      stdio: ['ignore', captureStdout ? 'pipe' : 'ignore', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', chunk => {
      stdout += chunk.toString()
    })

    child.stderr?.on('data', chunk => {
      stderr += chunk.toString()
    })

    child.on('error', error => {
      reject(error)
    })

    child.on('close', code => {
      if (code === 0) {
        resolve(stdout)
        return
      }

      reject(new Error(`${command} failed: ${stderr.trim() || `exit code ${code}`}`))
    })
  })
}

function escapeSqliteStringLiteral(value: string) {
  return `'${value.replace(/'/g, "''")}'`
}

function getSqliteSidecarPaths(databaseFilePath: string) {
  return [
    `${databaseFilePath}-journal`,
    `${databaseFilePath}-shm`,
    `${databaseFilePath}-wal`,
  ]
}

async function clearSqliteSidecars(databaseFilePath: string) {
  await Promise.all(
    getSqliteSidecarPaths(databaseFilePath).map(targetPath =>
      fs.rm(targetPath, { force: true }),
    ),
  )
}

async function writeManifest(workspacePath: string) {
  const manifest: SiteTransferManifest = {
    formatVersion: SITE_TRANSFER_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    sourceApp: SITE_TRANSFER_SOURCE_APP,
    databaseFile: DATABASE_FILENAME,
    mediaDir: MEDIA_DIRNAME,
  }

  await fs.writeFile(
    path.join(workspacePath, MANIFEST_FILENAME),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  )
}

async function listArchiveEntries(archivePath: string) {
  const stdout = await runCommand('tar', ['-tzf', archivePath], true)

  return stdout
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

function parseManifest(value: string) {
  let parsed: unknown

  try {
    parsed = JSON.parse(value)
  } catch {
    badRequest('Invalid site transfer manifest JSON')
  }

  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
    badRequest('Invalid site transfer manifest format')
  }

  const manifest = parsed as Record<string, unknown>
  if (manifest.formatVersion !== SITE_TRANSFER_FORMAT_VERSION) {
    badRequest(`Unsupported site transfer format version: ${String(manifest.formatVersion)}`)
  }

  if (typeof manifest.createdAt !== 'string' || !manifest.createdAt.trim()) {
    badRequest('Site transfer manifest is missing createdAt')
  }

  if (typeof manifest.sourceApp !== 'string' || !manifest.sourceApp.trim()) {
    badRequest('Site transfer manifest is missing sourceApp')
  }

  if (manifest.databaseFile !== DATABASE_FILENAME) {
    badRequest('Site transfer manifest has an unexpected databaseFile')
  }

  if (manifest.mediaDir !== MEDIA_DIRNAME) {
    badRequest('Site transfer manifest has an unexpected mediaDir')
  }

  return {
    formatVersion: manifest.formatVersion,
    createdAt: manifest.createdAt,
    sourceApp: manifest.sourceApp,
    databaseFile: manifest.databaseFile,
    mediaDir: manifest.mediaDir,
  }
}

async function validateExtractedMediaTree(rootPath: string) {
  const entries = await fs.readdir(rootPath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(rootPath, entry.name)

    if (entry.isSymbolicLink()) {
      badRequest('Imported media archive cannot contain symbolic links')
    }

    if (entry.isDirectory()) {
      await validateExtractedMediaTree(entryPath)
      continue
    }

    if (!entry.isFile()) {
      badRequest('Imported media archive contains unsupported filesystem entries')
    }
  }
}

async function copyDirectoryContents(sourcePath: string, destinationPath: string) {
  await fs.mkdir(destinationPath, { recursive: true })

  const entries = await fs.readdir(sourcePath, { withFileTypes: true })
  for (const entry of entries) {
    const sourceEntryPath = path.join(sourcePath, entry.name)
    const destinationEntryPath = path.join(destinationPath, entry.name)

    if (entry.isDirectory()) {
      await fs.cp(sourceEntryPath, destinationEntryPath, { recursive: true, force: true })
      continue
    }

    if (!entry.isFile()) {
      badRequest('Imported media archive contains unsupported filesystem entries')
    }

    await fs.copyFile(sourceEntryPath, destinationEntryPath)
  }
}

async function clearDirectoryContents(rootPath: string) {
  await fs.mkdir(rootPath, { recursive: true })

  const entries = await fs.readdir(rootPath, { withFileTypes: true })
  for (const entry of entries) {
    await fs.rm(path.join(rootPath, entry.name), { recursive: true, force: true })
  }
}

async function replaceMediaTree(sourcePath: string) {
  await ensureMediaStorage()
  await clearDirectoryContents(config.mediaRoot)
  await copyDirectoryContents(sourcePath, config.mediaRoot)
}

async function exportDatabaseSnapshot(destinationPath: string) {
  await fs.rm(destinationPath, { force: true })
  await prisma.$executeRawUnsafe(`VACUUM INTO ${escapeSqliteStringLiteral(destinationPath)}`)
}

async function alignImportedDatabaseSchema() {
  // The imported DB may have been produced by a different schema version
  // (e.g. missing newly added columns or carrying dropped tables). Run
  // `prisma db push` to bring it in sync with the current schema before
  // any Prisma query touches the new file.
  await runCommand(
    'npx',
    ['prisma', 'db', 'push', '--accept-data-loss', '--skip-generate'],
  )
}

async function replaceDatabaseFile(sourcePath: string) {
  const targetPath = config.databaseFilePath
  const targetDir = path.dirname(targetPath)
  const replacementPath = path.join(targetDir, `${path.basename(targetPath)}.importing`)

  await prisma.$disconnect()
  await fs.mkdir(targetDir, { recursive: true })
  await fs.copyFile(sourcePath, replacementPath)
  await clearSqliteSidecars(targetPath)
  await fs.rename(replacementPath, targetPath)
  await clearSqliteSidecars(targetPath)
}

export async function createSiteTransferExport() {
  return withSiteTransferLock(async () => {
    const workspacePath = await createWorkspace('site-export-')
    const payloadPath = path.join(workspacePath, 'payload')
    const archiveFilename = `site-export-${formatArchiveTimestamp()}.tar.gz`
    const archivePath = path.join(workspacePath, archiveFilename)

    try {
      await ensureMediaStorage()
      await fs.mkdir(payloadPath, { recursive: true })
      await exportDatabaseSnapshot(path.join(payloadPath, DATABASE_FILENAME))

      await fs.cp(config.mediaRoot, path.join(payloadPath, MEDIA_DIRNAME), { recursive: true, force: true })
      await writeManifest(payloadPath)
      await runCommand('tar', ['-czf', archivePath, '-C', payloadPath, '.'])

      return {
        archivePath,
        filename: archiveFilename,
        cleanup: async () => {
          await fs.rm(workspacePath, { recursive: true, force: true })
        },
      } satisfies SiteExportArchive
    } catch (error) {
      await fs.rm(workspacePath, { recursive: true, force: true })
      throw error
    }
  })
}

export async function importSiteTransferArchive(archivePath: string) {
  return withSiteTransferLock(async () => {
    const workspacePath = await createWorkspace('site-import-')

    try {
      const entries = await listArchiveEntries(archivePath)
      if (!entries.length) {
        badRequest('The uploaded archive is empty')
      }

      for (const entry of entries) {
        if (!isSafeArchiveEntry(entry)) {
          badRequest('The uploaded archive contains unsafe paths')
        }
      }

      await runCommand('tar', ['-xzf', archivePath, '-C', workspacePath])

      const manifestPath = resolveInsideRoot(workspacePath, MANIFEST_FILENAME)
      if (!(await exists(manifestPath))) {
        badRequest('The uploaded archive does not contain manifest.json')
      }

      const manifest = parseManifest(await fs.readFile(manifestPath, 'utf8'))
      const databasePath = resolveInsideRoot(workspacePath, manifest.databaseFile)
      const mediaPath = resolveInsideRoot(workspacePath, manifest.mediaDir)

      if (!(await exists(databasePath))) {
        badRequest(`The uploaded archive does not contain ${DATABASE_FILENAME}`)
      }

      if (!(await exists(mediaPath))) {
        badRequest('The uploaded archive does not contain the media directory')
      }

      const databaseStat = await fs.stat(databasePath)
      if (!databaseStat.isFile()) {
        badRequest(`${DATABASE_FILENAME} must be a file`)
      }

      const mediaStat = await fs.stat(mediaPath)
      if (!mediaStat.isDirectory()) {
        badRequest('media must be a directory')
      }

      await validateExtractedMediaTree(mediaPath)

      setMaintenanceMode(true)
      stopAsyncJobRunner()

      try {
        await replaceDatabaseFile(databasePath)
        await alignImportedDatabaseSchema()
        await replaceMediaTree(mediaPath)
        await syncConfiguredAdminUser()
        await migrateLegacyMediaStorage()
        await reconcileLocalMediaState()
        await reconcileStructuredContent()
      } finally {
        setMaintenanceMode(false)
        startAsyncJobRunner()
      }

      return {
        ok: true,
        restoredAt: new Date().toISOString(),
        formatVersion: manifest.formatVersion,
      } satisfies SiteImportResult
    } finally {
      await fs.rm(archivePath, { force: true })
      await fs.rm(workspacePath, { recursive: true, force: true })
    }
  })
}
