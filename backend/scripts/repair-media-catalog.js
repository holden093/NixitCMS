const fs = require('fs/promises')
const path = require('path')

const { PrismaClient } = require('../generated/prisma-client-app')

const prisma = new PrismaClient()

const mediaRoot = process.env.MEDIA_STORAGE_ROOT || '/app/media-storage'
const originalsDir = path.join(mediaRoot, 'originals')
const thumbnailsDir = path.join(mediaRoot, 'thumbnails')

const MIME_BY_EXTENSION = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

function toMediaKey(directory, filename) {
  return path.posix.join(directory, filename)
}

function extractMediaKeys(value) {
  if (!value || typeof value !== 'string') {
    return []
  }

  const matches = value.match(new RegExp(`/media/([^?"'\\s>]+)`, 'g')) ?? []
  return matches
    .map(match => match.replace(/^\/media\//, '').trim())
    .filter(Boolean)
}

function parseStructuredImageKeys(value) {
  if (!value || typeof value !== 'string') {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    const keys = []

    const visit = current => {
      if (!current || typeof current !== 'object') {
        return
      }

      if (typeof current.imageKey === 'string' && current.imageKey.trim()) {
        keys.push(current.imageKey.trim())
      }

      for (const child of Object.values(current)) {
        if (Array.isArray(child)) {
          child.forEach(visit)
        } else {
          visit(child)
        }
      }
    }

    visit(parsed)
    return keys
  } catch {
    return []
  }
}

function buildUploadBatches(files, gapMs = 10_000) {
  const batches = []

  for (const file of files) {
    const batch = batches[batches.length - 1]
    if (!batch || file.uploadedAt.getTime() - batch.endAt.getTime() > gapMs) {
      batches.push({
        startAt: file.uploadedAt,
        endAt: file.uploadedAt,
        files: [file],
      })
      continue
    }

    batch.files.push(file)
    batch.endAt = file.uploadedAt
  }

  return batches
}

function uniq(values) {
  return Array.from(new Set(values.filter(Boolean)))
}

async function collectOriginalFiles() {
  const entries = await fs.readdir(originalsDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue
    }

    const absolutePath = path.join(originalsDir, entry.name)
    const extension = path.extname(entry.name).toLowerCase()
    const mimeType = MIME_BY_EXTENSION[extension] ?? 'application/octet-stream'
    const thumbnailFilename = `${path.parse(entry.name).name}.webp`
    const thumbnailAbsolutePath = path.join(thumbnailsDir, thumbnailFilename)
    const stats = await fs.stat(absolutePath)

    let thumbnailKey = null
    try {
      const thumbnailStats = await fs.stat(thumbnailAbsolutePath)
      if (thumbnailStats.isFile()) {
        thumbnailKey = toMediaKey('thumbnails', thumbnailFilename)
      }
    } catch {
      thumbnailKey = null
    }

    files.push({
      key: toMediaKey('originals', entry.name),
      thumbnailKey,
      filename: entry.name,
      mimeType,
      size: stats.size,
      isPublic: true,
      uploadedAt: stats.mtime,
    })
  }

  return files.sort((left, right) => left.uploadedAt.getTime() - right.uploadedAt.getTime())
}

async function ensureMediaFiles(inventory) {
  const existing = await prisma.mediaFile.findMany({
    select: { id: true, key: true },
  })
  const existingKeys = new Set(existing.map(file => file.key))

  let createdCount = 0
  for (const file of inventory) {
    if (existingKeys.has(file.key)) {
      continue
    }

    await prisma.mediaFile.create({
      data: file,
    })
    createdCount += 1
  }

  const allMediaFiles = await prisma.mediaFile.findMany({
    orderBy: { uploadedAt: 'asc' },
    select: {
      id: true,
      key: true,
      filename: true,
      thumbnailKey: true,
      uploadedAt: true,
    },
  })

  return {
    createdCount,
    mediaByKey: new Map(allMediaFiles.map(file => [file.key, file])),
  }
}

async function readContentRows() {
  return prisma.content.findMany({
    select: {
      pageSlug: true,
      sections_it: true,
      sections_en: true,
    },
  })
}

async function readNewsRows() {
  return prisma.newsArticle.findMany({
    orderBy: [{ publishedAt: 'asc' }, { id: 'asc' }],
    select: {
      id: true,
      slug: true,
      bodyHtml_it: true,
      bodyHtml_en: true,
      bodyJson_it: true,
      bodyJson_en: true,
      featuredMediaId: true,
    },
  })
}

function getUsedKeysFromContent(rows) {
  return uniq(rows.flatMap(row => [
    ...parseStructuredImageKeys(row.sections_it),
    ...parseStructuredImageKeys(row.sections_en),
  ]))
}

function getUsedKeysFromNews(rows) {
  return uniq(rows.flatMap(row => [
    ...extractMediaKeys(row.bodyHtml_it),
    ...extractMediaKeys(row.bodyHtml_en),
    ...extractMediaKeys(row.bodyJson_it),
    ...extractMediaKeys(row.bodyJson_en),
  ]))
}

function pickLogoCandidate(inventory) {
  const pngFiles = inventory.filter(file => file.mimeType === 'image/png')
  return pngFiles.length === 1 ? pngFiles[0].key : pngFiles[0]?.key ?? null
}

function pickHeroCandidate(inventory, reservedKeys) {
  const candidates = inventory
    .filter(file => file.mimeType.startsWith('image/') && file.mimeType !== 'image/png')
    .filter(file => !reservedKeys.has(file.key))

  if (candidates.length === 0) {
    return null
  }

  return candidates
    .slice()
    .sort((left, right) => right.size - left.size)[0]
    .key
}

async function restoreSettings(settings, inventory, reservedKeys) {
  const update = {}
  const logoCandidate = pickLogoCandidate(inventory)
  const heroCandidate = pickHeroCandidate(inventory, reservedKeys)

  if (!settings.logoKey && logoCandidate) {
    update.logoKey = logoCandidate
  }

  if (!settings.heroImageKey && heroCandidate) {
    update.heroImageKey = heroCandidate
  }

  if (Object.keys(update).length === 0) {
    return { logoKey: settings.logoKey, heroImageKey: settings.heroImageKey, updated: false }
  }

  const next = await prisma.siteSettings.update({
    where: { id: settings.id },
    data: update,
    select: {
      id: true,
      logoKey: true,
      heroImageKey: true,
    },
  })

  return { ...next, updated: true }
}

async function restoreNewsFeaturedMedia(newsRows, mediaByKey) {
  let updatedCount = 0

  for (const article of newsRows) {
    if (article.featuredMediaId != null) {
      continue
    }

    const orderedKeys = uniq([
      ...extractMediaKeys(article.bodyHtml_it),
      ...extractMediaKeys(article.bodyHtml_en),
      ...extractMediaKeys(article.bodyJson_it),
      ...extractMediaKeys(article.bodyJson_en),
    ])

    const featuredMedia = orderedKeys
      .map(key => mediaByKey.get(key))
      .find(Boolean)

    if (!featuredMedia) {
      continue
    }

    await prisma.newsArticle.update({
      where: { id: article.id },
      data: { featuredMediaId: featuredMedia.id },
    })
    updatedCount += 1
  }

  return updatedCount
}

async function restoreCategoryAssignments(inventory, mediaByKey, reservedKeys, heroKey) {
  const photoCategories = await prisma.photoCategory.findMany({
    orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    select: {
      id: true,
      slug: true,
      createdAt: true,
    },
  })

  const batches = buildUploadBatches(
    inventory.filter(file => !reservedKeys.has(file.key)),
  )

  const assignments = new Map()
  const usedBatchIndexes = new Set()

  for (const category of photoCategories) {
    let bestIndex = -1
    let bestDelta = Number.POSITIVE_INFINITY

    batches.forEach((batch, index) => {
      if (usedBatchIndexes.has(index)) {
        return
      }

      const delta = batch.startAt.getTime() - new Date(category.createdAt).getTime()
      if (delta < 0 || delta > 15 * 60 * 1000 || delta >= bestDelta) {
        return
      }

      bestIndex = index
      bestDelta = delta
    })

    if (bestIndex >= 0) {
      assignments.set(category.id, batches[bestIndex].files.map(file => file.key))
      usedBatchIndexes.add(bestIndex)
    }
  }

  const remainingCategories = photoCategories.filter(category => !assignments.has(category.id))
  const remainingBatches = batches
    .map((batch, index) => ({ batch, index }))
    .filter(({ index }) => !usedBatchIndexes.has(index))
    .sort((left, right) => right.batch.files.length - left.batch.files.length)

  for (const category of remainingCategories) {
    const nextBatch = remainingBatches.shift()
    if (!nextBatch) {
      continue
    }
    assignments.set(category.id, nextBatch.batch.files.map(file => file.key))
  }

  const roomCategory = photoCategories.find(category => category.slug === 'camere')
  if (roomCategory && heroKey) {
    const roomKeys = assignments.get(roomCategory.id) ?? []
    if (!roomKeys.includes(heroKey)) {
      assignments.set(roomCategory.id, [heroKey, ...roomKeys])
    }
  }

  let createdCount = 0
  for (const category of photoCategories) {
    const keys = uniq(assignments.get(category.id) ?? [])
    if (keys.length === 0) {
      continue
    }

    const existingLinks = await prisma.mediaFileCategory.findMany({
      where: { photoCategoryId: category.id },
      select: { mediaFileId: true },
    })
    const existingIds = new Set(existingLinks.map(link => link.mediaFileId))
    const data = keys
      .map(key => mediaByKey.get(key)?.id ?? null)
      .filter(id => id != null)
      .filter(id => !existingIds.has(id))
      .map(mediaFileId => ({ mediaFileId, photoCategoryId: category.id }))

    if (data.length === 0) {
      continue
    }

    for (const row of data) {
      await prisma.mediaFileCategory.create({
        data: row,
      })
      createdCount += 1
    }
  }

  return { createdCount, assignments }
}

async function restoreServicePreviews(mediaByKey, heroKey) {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    select: {
      id: true,
      slug: true,
      photoCategoryId: true,
      previewMediaId: true,
    },
  })

  let updatedCount = 0
  for (const service of services) {
    if (service.previewMediaId != null) {
      continue
    }

    let previewMediaId = null
    if (service.slug === 'le-nostre-camere' && heroKey && mediaByKey.has(heroKey)) {
      previewMediaId = mediaByKey.get(heroKey).id
    } else if (service.photoCategoryId != null) {
      const firstCategoryMedia = await prisma.mediaFileCategory.findFirst({
        where: { photoCategoryId: service.photoCategoryId },
        orderBy: { mediaFileId: 'asc' },
        select: { mediaFileId: true },
      })
      previewMediaId = firstCategoryMedia?.mediaFileId ?? null
    }

    if (previewMediaId == null) {
      continue
    }

    await prisma.service.update({
      where: { id: service.id },
      data: { previewMediaId },
    })
    updatedCount += 1
  }

  return updatedCount
}

async function main() {
  const inventory = await collectOriginalFiles()
  if (inventory.length === 0) {
    throw new Error(`No original files found in ${originalsDir}`)
  }

  const { createdCount, mediaByKey } = await ensureMediaFiles(inventory)
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: {
      id: true,
      logoKey: true,
      heroImageKey: true,
    },
  })

  if (!settings) {
    throw new Error('SiteSettings row not found')
  }

  const contentRows = await readContentRows()
  const newsRows = await readNewsRows()
  const contentKeys = getUsedKeysFromContent(contentRows)
  const newsKeys = getUsedKeysFromNews(newsRows)
  const logoKey = pickLogoCandidate(inventory)
  const reservedKeys = new Set(uniq([
    ...contentKeys,
    ...newsKeys,
    logoKey,
  ]))

  const restoredSettings = await restoreSettings(settings, inventory, reservedKeys)
  const heroKey = restoredSettings.heroImageKey || settings.heroImageKey || null
  const categoryResult = await restoreCategoryAssignments(inventory, mediaByKey, reservedKeys, heroKey)
  const previewCount = await restoreServicePreviews(mediaByKey, heroKey)
  const featuredCount = await restoreNewsFeaturedMedia(newsRows, mediaByKey)

  console.info(JSON.stringify({
    mediaRoot,
    originals: inventory.length,
    createdMediaFiles: createdCount,
    createdCategoryLinks: categoryResult.createdCount,
    updatedServicePreviews: previewCount,
    updatedNewsFeaturedMedia: featuredCount,
    logoKey: restoredSettings.logoKey || settings.logoKey,
    heroImageKey: heroKey,
  }, null, 2))
}

main()
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
