import type { Prisma as PrismaTypes } from '../../generated/prisma-client-app'
import { prisma } from '../lib/prisma'
import { Prisma } from '../lib/prismaClient'
import {
  newsMediaInclude,
  slugifyNewsTitle,
  type NewsArticleBase,
  type NewsArticleRecord,
  type NewsletterSubscriberRecord,
} from '../lib/newsPayloads'

type DbClient = typeof prisma | PrismaTypes.TransactionClient

type RawRow = Record<string, unknown>

export interface NewsletterSubscriberInternalRecord extends NewsletterSubscriberRecord {
  confirmTokenHash: string
  unsubscribeToken: string
  confirmTokenExpiresAt: Date | null
  unsubscribeTokenHash: string
  consentIp: string
  consentUserAgent: string
}

export interface AsyncJobRecord {
  id: number
  type: string
  status: string
  dedupeKey: string | null
  payload: string
  runAt: Date
  attempts: number
  maxAttempts: number
  lastError: string
  lockedAt: Date | null
  lockToken: string | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface NewsEmailDeliveryRecord {
  id: number
  articleId: number
  subscriberId: number
  status: string
  sentAt: Date | null
  lastError: string
  attempts: number
  createdAt: Date
  updatedAt: Date
}

export interface NewsEmailDeliveryWithSubscriberRecord extends NewsEmailDeliveryRecord {
  subscriber: NewsletterSubscriberInternalRecord
}

export interface NewsArticleMutationInput {
  slug: string
  title_it: string
  title_en: string
  excerpt_it: string
  excerpt_en: string
  bodyJson_it: string
  bodyJson_en: string
  bodyHtml_it: string
  bodyHtml_en: string
  status: string
  publishToSite: boolean
  publishToNewsletter: boolean
  publishToFacebook: boolean
  publishToInstagram: boolean
  featuredMediaId: number | null
  scheduledAt: Date | null
  publishedAt: Date | null
  newsletterDispatchedAt?: Date | null
  newsletterError?: string
  facebookPublishedAt?: Date | null
  facebookError?: string
  instagramPublishedAt?: Date | null
  instagramError?: string
}

export interface NewsletterSubscriberCreateInput {
  email: string
  locale: string
  status: string
  confirmTokenHash: string
  unsubscribeToken: string
  confirmTokenExpiresAt: Date | null
  unsubscribeTokenHash: string
  consentIp: string
  consentUserAgent: string
  requestedAt: Date
  confirmedAt?: Date | null
  unsubscribedAt?: Date | null
  lastConfirmationEmailSentAt?: Date | null
  lastNewsletterSentAt?: Date | null
}

export interface AsyncJobInput {
  type: string
  status?: string
  dedupeKey?: string | null
  payload: string
  runAt: Date
  attempts?: number
  maxAttempts?: number
  lastError?: string
  lockedAt?: Date | null
  lockToken?: string | null
  completedAt?: Date | null
}

const SAFE_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/

function rawIdentifier(identifier: string) {
  if (!SAFE_IDENTIFIER.test(identifier)) {
    throw new Error(`Unsafe SQL identifier: ${identifier}`)
  }

  return Prisma.raw(`"${identifier}"`)
}

function toDbValue(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  return value
}

function asNumber(value: unknown) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'bigint') {
    return Number(value)
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

function asBoolean(value: unknown) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value !== 0
  }

  if (typeof value === 'bigint') {
    return value !== 0n
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    return normalized === '1' || normalized === 'true'
  }

  return false
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function asNullableString(value: unknown) {
  return value == null ? null : asString(value)
}

function asDate(value: unknown) {
  if (value == null || value === '') {
    return null
  }

  if (value instanceof Date) {
    return value
  }

  const parsed = new Date(asString(value))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function mapNewsArticleBase(row: RawRow): NewsArticleBase {
  return {
    id: asNumber(row.id),
    slug: asString(row.slug),
    title_it: asString(row.title_it),
    title_en: asString(row.title_en),
    excerpt_it: asString(row.excerpt_it),
    excerpt_en: asString(row.excerpt_en),
    bodyJson_it: asString(row.bodyJson_it),
    bodyJson_en: asString(row.bodyJson_en),
    bodyHtml_it: asString(row.bodyHtml_it),
    bodyHtml_en: asString(row.bodyHtml_en),
    status: asString(row.status),
    publishToSite: asBoolean(row.publishToSite),
    publishToNewsletter: asBoolean(row.publishToNewsletter),
    publishToFacebook: asBoolean(row.publishToFacebook),
    publishToInstagram: asBoolean(row.publishToInstagram),
    featuredMediaId: row.featuredMediaId == null ? null : asNumber(row.featuredMediaId),
    scheduledAt: asDate(row.scheduledAt),
    publishedAt: asDate(row.publishedAt),
    newsletterDispatchedAt: asDate(row.newsletterDispatchedAt),
    newsletterError: asString(row.newsletterError),
    facebookPublishedAt: asDate(row.facebookPublishedAt),
    facebookError: asString(row.facebookError),
    instagramPublishedAt: asDate(row.instagramPublishedAt),
    instagramError: asString(row.instagramError),
    createdAt: asDate(row.createdAt) ?? new Date(0),
    updatedAt: asDate(row.updatedAt) ?? new Date(0),
  }
}

function mapSubscriberRecord(row: RawRow): NewsletterSubscriberInternalRecord {
  return {
    id: asNumber(row.id),
    email: asString(row.email),
    locale: asString(row.locale),
    status: asString(row.status),
    confirmTokenHash: asString(row.confirmTokenHash),
    unsubscribeToken: asString(row.unsubscribeToken),
    confirmTokenExpiresAt: asDate(row.confirmTokenExpiresAt),
    unsubscribeTokenHash: asString(row.unsubscribeTokenHash),
    consentIp: asString(row.consentIp),
    consentUserAgent: asString(row.consentUserAgent),
    requestedAt: asDate(row.requestedAt) ?? new Date(0),
    confirmedAt: asDate(row.confirmedAt),
    unsubscribedAt: asDate(row.unsubscribedAt),
    lastConfirmationEmailSentAt: asDate(row.lastConfirmationEmailSentAt),
    lastNewsletterSentAt: asDate(row.lastNewsletterSentAt),
    createdAt: asDate(row.createdAt) ?? new Date(0),
    updatedAt: asDate(row.updatedAt) ?? new Date(0),
  }
}

function mapAsyncJobRecord(row: RawRow): AsyncJobRecord {
  return {
    id: asNumber(row.id),
    type: asString(row.type),
    status: asString(row.status),
    dedupeKey: asNullableString(row.dedupeKey),
    payload: asString(row.payload),
    runAt: asDate(row.runAt) ?? new Date(0),
    attempts: asNumber(row.attempts),
    maxAttempts: asNumber(row.maxAttempts),
    lastError: asString(row.lastError),
    lockedAt: asDate(row.lockedAt),
    lockToken: asNullableString(row.lockToken),
    completedAt: asDate(row.completedAt),
    createdAt: asDate(row.createdAt) ?? new Date(0),
    updatedAt: asDate(row.updatedAt) ?? new Date(0),
  }
}

async function loadFeaturedMediaMap(mediaIds: number[], db: DbClient) {
  if (!mediaIds.length) {
    return new Map<number, NonNullable<NewsArticleRecord['featuredMedia']>>()
  }

  const media = await db.mediaFile.findMany({
    where: {
      id: { in: mediaIds },
    },
    include: newsMediaInclude,
  })

  return new Map(media.map(file => [file.id, file]))
}

async function attachFeaturedMedia(rows: NewsArticleBase[], db: DbClient) {
  const mediaIds = Array.from(new Set(rows.map(row => row.featuredMediaId).filter((value): value is number => value != null)))
  const mediaMap = await loadFeaturedMediaMap(mediaIds, db)

  return rows.map((row): NewsArticleRecord => ({
    ...row,
    featuredMedia: row.featuredMediaId == null ? null : mediaMap.get(row.featuredMediaId) ?? null,
  }))
}

function buildUpdateAssignments(values: Record<string, unknown>) {
  const entries = Object.entries(values).filter(([, value]) => value !== undefined)
  return Prisma.join(
    entries.map(([column, value]) => Prisma.sql`${rawIdentifier(column)} = ${toDbValue(value)}`),
    ', ',
  )
}

async function getLastInsertedId(db: PrismaTypes.TransactionClient) {
  const rows = await db.$queryRaw<Array<{ id: unknown }>>(Prisma.sql`SELECT last_insert_rowid() AS id`)
  return asNumber(rows[0]?.id)
}

export async function createUniqueNewsSlug(title: string, excludeId?: number) {
  const baseSlug = slugifyNewsTitle(title)
  const pattern = `${baseSlug}-%`
  const excludeClause = excludeId == null
    ? Prisma.empty
    : Prisma.sql` AND "id" != ${excludeId}`

  const rows = await prisma.$queryRaw<Array<{ slug: unknown }>>(Prisma.sql`
    SELECT "slug" AS slug
    FROM "NewsArticle"
    WHERE ("slug" = ${baseSlug} OR "slug" LIKE ${pattern})
    ${excludeClause}
  `)

  const used = new Set(rows.map(row => asString(row.slug)).filter(Boolean))
  if (!used.has(baseSlug)) {
    return baseSlug
  }

  let index = 2
  while (used.has(`${baseSlug}-${index}`)) {
    index += 1
  }

  return `${baseSlug}-${index}`
}

export async function getNewsArticleById(id: number, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsArticle"
    WHERE "id" = ${id}
    LIMIT 1
  `)

  if (!rows[0]) {
    return null
  }

  const [article] = await attachFeaturedMedia([mapNewsArticleBase(rows[0])], db)
  return article
}

export async function getPublishedNewsArticleBySlug(slug: string, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsArticle"
    WHERE "slug" = ${slug}
      AND "status" = 'published'
    LIMIT 1
  `)

  if (!rows[0]) {
    return null
  }

  const [article] = await attachFeaturedMedia([mapNewsArticleBase(rows[0])], db)
  return article
}

export async function listAdminNewsArticles(db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsArticle"
    ORDER BY "publishedAt" DESC, "updatedAt" DESC
  `)

  return attachFeaturedMedia(rows.map(mapNewsArticleBase), db)
}

export async function listPublicSiteNewsArticles(limit?: number, db: DbClient = prisma) {
  const limitClause = typeof limit === 'number'
    ? Prisma.sql` LIMIT ${limit}`
    : Prisma.empty

  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsArticle"
    WHERE "status" = 'published'
      AND "publishToSite" = 1
    ORDER BY "publishedAt" DESC, "id" DESC
    ${limitClause}
  `)

  return attachFeaturedMedia(rows.map(mapNewsArticleBase), db)
}

export async function createNewsArticle(input: NewsArticleMutationInput) {
  return prisma.$transaction(async tx => {
    const now = new Date()

    await tx.$executeRaw(Prisma.sql`
      INSERT INTO "NewsArticle" (
        "slug",
        "title_it",
        "title_en",
        "excerpt_it",
        "excerpt_en",
        "bodyJson_it",
        "bodyJson_en",
        "bodyHtml_it",
        "bodyHtml_en",
        "status",
        "publishToSite",
        "publishToNewsletter",
        "publishToFacebook",
        "publishToInstagram",
        "featuredMediaId",
        "scheduledAt",
        "publishedAt",
        "newsletterDispatchedAt",
        "newsletterError",
        "facebookPublishedAt",
        "facebookError",
        "instagramPublishedAt",
        "instagramError",
        "createdAt",
        "updatedAt"
      ) VALUES (
        ${input.slug},
        ${input.title_it},
        ${input.title_en},
        ${input.excerpt_it},
        ${input.excerpt_en},
        ${input.bodyJson_it},
        ${input.bodyJson_en},
        ${input.bodyHtml_it},
        ${input.bodyHtml_en},
        ${input.status},
        ${toDbValue(input.publishToSite)},
        ${toDbValue(input.publishToNewsletter)},
        ${toDbValue(input.publishToFacebook)},
        ${toDbValue(input.publishToInstagram)},
        ${input.featuredMediaId},
        ${toDbValue(input.scheduledAt)},
        ${toDbValue(input.publishedAt)},
        ${toDbValue(input.newsletterDispatchedAt ?? null)},
        ${input.newsletterError ?? ''},
        ${toDbValue(input.facebookPublishedAt ?? null)},
        ${input.facebookError ?? ''},
        ${toDbValue(input.instagramPublishedAt ?? null)},
        ${input.instagramError ?? ''},
        ${toDbValue(now)},
        ${toDbValue(now)}
      )
    `)

    const id = await getLastInsertedId(tx)
    const article = await getNewsArticleById(id, tx)
    if (!article) {
      throw new Error('Failed to create news article')
    }

    return article
  })
}

export async function updateNewsArticle(id: number, patch: Partial<NewsArticleMutationInput>) {
  await prisma.$executeRaw(Prisma.sql`
    UPDATE "NewsArticle"
    SET ${buildUpdateAssignments({
      ...patch,
      updatedAt: new Date(),
    })}
    WHERE "id" = ${id}
  `)

  return getNewsArticleById(id)
}

export async function deleteNewsArticle(id: number) {
  await prisma.$executeRaw(Prisma.sql`
    DELETE FROM "NewsArticle"
    WHERE "id" = ${id}
  `)
}

export async function countNewsArticles() {
  const rows = await prisma.$queryRaw<Array<{ count: unknown }>>(Prisma.sql`
    SELECT COUNT(*) AS count
    FROM "NewsArticle"
  `)

  return asNumber(rows[0]?.count)
}

export async function listNewsletterSubscribers() {
  const rows = await prisma.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsletterSubscriber"
    ORDER BY "updatedAt" DESC, "id" DESC
  `)

  return rows.map(mapSubscriberRecord)
}

export async function getNewsletterSubscriberById(id: number, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsletterSubscriber"
    WHERE "id" = ${id}
    LIMIT 1
  `)

  return rows[0] ? mapSubscriberRecord(rows[0]) : null
}

export async function getNewsletterSubscriberByEmail(email: string, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsletterSubscriber"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  return rows[0] ? mapSubscriberRecord(rows[0]) : null
}

export async function getNewsletterSubscriberByConfirmTokenHash(confirmTokenHash: string, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsletterSubscriber"
    WHERE "confirmTokenHash" = ${confirmTokenHash}
    LIMIT 1
  `)

  return rows[0] ? mapSubscriberRecord(rows[0]) : null
}

export async function getNewsletterSubscriberByUnsubscribeTokenHash(unsubscribeTokenHash: string, db: DbClient = prisma) {
  const rows = await db.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT *
    FROM "NewsletterSubscriber"
    WHERE "unsubscribeTokenHash" = ${unsubscribeTokenHash}
    LIMIT 1
  `)

  return rows[0] ? mapSubscriberRecord(rows[0]) : null
}

export async function createNewsletterSubscriber(input: NewsletterSubscriberCreateInput) {
  return prisma.$transaction(async tx => {
    const now = new Date()

    await tx.$executeRaw(Prisma.sql`
      INSERT INTO "NewsletterSubscriber" (
        "email",
        "locale",
        "status",
        "confirmTokenHash",
        "unsubscribeToken",
        "confirmTokenExpiresAt",
        "unsubscribeTokenHash",
        "consentIp",
        "consentUserAgent",
        "requestedAt",
        "confirmedAt",
        "unsubscribedAt",
        "lastConfirmationEmailSentAt",
        "lastNewsletterSentAt",
        "createdAt",
        "updatedAt"
      ) VALUES (
        ${input.email},
        ${input.locale},
        ${input.status},
        ${input.confirmTokenHash},
        ${input.unsubscribeToken},
        ${toDbValue(input.confirmTokenExpiresAt)},
        ${input.unsubscribeTokenHash},
        ${input.consentIp},
        ${input.consentUserAgent},
        ${toDbValue(input.requestedAt)},
        ${toDbValue(input.confirmedAt ?? null)},
        ${toDbValue(input.unsubscribedAt ?? null)},
        ${toDbValue(input.lastConfirmationEmailSentAt ?? null)},
        ${toDbValue(input.lastNewsletterSentAt ?? null)},
        ${toDbValue(now)},
        ${toDbValue(now)}
      )
    `)

    const id = await getLastInsertedId(tx)
    const subscriber = await getNewsletterSubscriberById(id, tx)
    if (!subscriber) {
      throw new Error('Failed to create newsletter subscriber')
    }

    return subscriber
  })
}

export async function updateNewsletterSubscriber(id: number, patch: Partial<NewsletterSubscriberCreateInput & {
  status: string
}>) {
  await prisma.$executeRaw(Prisma.sql`
    UPDATE "NewsletterSubscriber"
    SET ${buildUpdateAssignments({
      ...patch,
      updatedAt: new Date(),
    })}
    WHERE "id" = ${id}
  `)

  return getNewsletterSubscriberById(id)
}

export async function countNewsletterSubscribersByStatus(status: string) {
  const rows = await prisma.$queryRaw<Array<{ count: unknown }>>(Prisma.sql`
    SELECT COUNT(*) AS count
    FROM "NewsletterSubscriber"
    WHERE "status" = ${status}
  `)

  return asNumber(rows[0]?.count)
}

export async function listActiveNewsletterSubscriberIds() {
  const rows = await prisma.$queryRaw<Array<{ id: unknown }>>(Prisma.sql`
    SELECT "id" AS id
    FROM "NewsletterSubscriber"
    WHERE "status" = 'active'
    ORDER BY "id" ASC
  `)

  return rows.map(row => asNumber(row.id)).filter(id => id > 0)
}

export async function createAsyncJob(input: AsyncJobInput) {
  const now = new Date()

  await prisma.$executeRaw(Prisma.sql`
    INSERT INTO "AsyncJob" (
      "type",
      "status",
      "dedupeKey",
      "payload",
      "runAt",
      "attempts",
      "maxAttempts",
      "lastError",
      "lockedAt",
      "lockToken",
      "completedAt",
      "createdAt",
      "updatedAt"
    ) VALUES (
      ${input.type},
      ${input.status ?? 'pending'},
      ${input.dedupeKey ?? null},
      ${input.payload},
      ${toDbValue(input.runAt)},
      ${input.attempts ?? 0},
      ${input.maxAttempts ?? 5},
      ${input.lastError ?? ''},
      ${toDbValue(input.lockedAt ?? null)},
      ${input.lockToken ?? null},
      ${toDbValue(input.completedAt ?? null)},
      ${toDbValue(now)},
      ${toDbValue(now)}
    )
  `)
}

export async function upsertAsyncJobByDedupeKey(input: AsyncJobInput & { dedupeKey: string }) {
  const now = new Date()

  await prisma.$executeRaw(Prisma.sql`
    INSERT INTO "AsyncJob" (
      "type",
      "status",
      "dedupeKey",
      "payload",
      "runAt",
      "attempts",
      "maxAttempts",
      "lastError",
      "lockedAt",
      "lockToken",
      "completedAt",
      "createdAt",
      "updatedAt"
    ) VALUES (
      ${input.type},
      ${input.status ?? 'pending'},
      ${input.dedupeKey},
      ${input.payload},
      ${toDbValue(input.runAt)},
      ${input.attempts ?? 0},
      ${input.maxAttempts ?? 5},
      ${input.lastError ?? ''},
      NULL,
      NULL,
      NULL,
      ${toDbValue(now)},
      ${toDbValue(now)}
    )
    ON CONFLICT("dedupeKey") DO UPDATE SET
      "type" = excluded."type",
      "status" = 'pending',
      "payload" = excluded."payload",
      "runAt" = excluded."runAt",
      "attempts" = 0,
      "maxAttempts" = excluded."maxAttempts",
      "lastError" = '',
      "lockedAt" = NULL,
      "lockToken" = NULL,
      "completedAt" = NULL,
      "updatedAt" = excluded."updatedAt"
  `)
}

export async function deleteAsyncJobsByDedupeKey(dedupeKey: string) {
  await prisma.$executeRaw(Prisma.sql`
    DELETE FROM "AsyncJob"
    WHERE "dedupeKey" = ${dedupeKey}
  `)
}

export async function claimDueAsyncJob(lockExpiry: Date, lockToken: string) {
  return prisma.$transaction(async tx => {
    const rows = await tx.$queryRaw<RawRow[]>(Prisma.sql`
      SELECT *
      FROM "AsyncJob"
      WHERE "status" = 'pending'
        AND "runAt" <= ${toDbValue(new Date())}
        AND ("lockedAt" IS NULL OR "lockedAt" <= ${toDbValue(lockExpiry)})
      ORDER BY "runAt" ASC, "id" ASC
      LIMIT 1
    `)

    if (!rows[0]) {
      return null
    }

    const claimedAt = new Date()
    const updated = await tx.$executeRaw(Prisma.sql`
      UPDATE "AsyncJob"
      SET
        "status" = 'running',
        "lockedAt" = ${toDbValue(claimedAt)},
        "lockToken" = ${lockToken},
        "updatedAt" = ${toDbValue(claimedAt)}
      WHERE "id" = ${asNumber(rows[0].id)}
        AND "status" = 'pending'
    `)

    if (asNumber(updated) === 0) {
      return null
    }

    return mapAsyncJobRecord({
      ...rows[0],
      status: 'running',
      lockedAt: claimedAt,
      lockToken,
      updatedAt: claimedAt,
    })
  })
}

export async function updateAsyncJob(id: number, patch: Partial<Omit<AsyncJobRecord, 'id' | 'createdAt'>>) {
  await prisma.$executeRaw(Prisma.sql`
    UPDATE "AsyncJob"
    SET ${buildUpdateAssignments({
      ...patch,
      updatedAt: new Date(),
    })}
    WHERE "id" = ${id}
  `)
}

export async function countNewsEmailDeliveriesByArticle(articleId: number) {
  const rows = await prisma.$queryRaw<Array<{ count: unknown }>>(Prisma.sql`
    SELECT COUNT(*) AS count
    FROM "NewsEmailDelivery"
    WHERE "articleId" = ${articleId}
  `)

  return asNumber(rows[0]?.count)
}

export async function createNewsEmailDeliveries(articleId: number, subscriberIds: number[]) {
  if (!subscriberIds.length) {
    return 0
  }

  const now = new Date()
  const values = subscriberIds.map(subscriberId => Prisma.sql`(
    ${articleId},
    ${subscriberId},
    'pending',
    NULL,
    '',
    0,
    ${toDbValue(now)},
    ${toDbValue(now)}
  )`)

  const inserted = await prisma.$executeRaw(Prisma.sql`
    INSERT OR IGNORE INTO "NewsEmailDelivery" (
      "articleId",
      "subscriberId",
      "status",
      "sentAt",
      "lastError",
      "attempts",
      "createdAt",
      "updatedAt"
    )
    VALUES ${Prisma.join(values, ', ')}
  `)

  return asNumber(inserted)
}

export async function listNewsletterDispatchDeliveries(articleId: number, take: number) {
  const rows = await prisma.$queryRaw<RawRow[]>(Prisma.sql`
    SELECT
      d."id" AS "delivery_id",
      d."articleId" AS "delivery_articleId",
      d."subscriberId" AS "delivery_subscriberId",
      d."status" AS "delivery_status",
      d."sentAt" AS "delivery_sentAt",
      d."lastError" AS "delivery_lastError",
      d."attempts" AS "delivery_attempts",
      d."createdAt" AS "delivery_createdAt",
      d."updatedAt" AS "delivery_updatedAt",
      s."id" AS "subscriber_id",
      s."email" AS "subscriber_email",
      s."locale" AS "subscriber_locale",
      s."status" AS "subscriber_status",
      s."confirmTokenHash" AS "subscriber_confirmTokenHash",
      s."unsubscribeToken" AS "subscriber_unsubscribeToken",
      s."confirmTokenExpiresAt" AS "subscriber_confirmTokenExpiresAt",
      s."unsubscribeTokenHash" AS "subscriber_unsubscribeTokenHash",
      s."consentIp" AS "subscriber_consentIp",
      s."consentUserAgent" AS "subscriber_consentUserAgent",
      s."requestedAt" AS "subscriber_requestedAt",
      s."confirmedAt" AS "subscriber_confirmedAt",
      s."unsubscribedAt" AS "subscriber_unsubscribedAt",
      s."lastConfirmationEmailSentAt" AS "subscriber_lastConfirmationEmailSentAt",
      s."lastNewsletterSentAt" AS "subscriber_lastNewsletterSentAt",
      s."createdAt" AS "subscriber_createdAt",
      s."updatedAt" AS "subscriber_updatedAt"
    FROM "NewsEmailDelivery" d
    INNER JOIN "NewsletterSubscriber" s
      ON s."id" = d."subscriberId"
    WHERE d."articleId" = ${articleId}
      AND (
        d."status" = 'pending'
        OR (d."status" = 'failed' AND d."attempts" < 5)
      )
    ORDER BY d."id" ASC
    LIMIT ${take}
  `)

  return rows.map((row): NewsEmailDeliveryWithSubscriberRecord => ({
    id: asNumber(row.delivery_id),
    articleId: asNumber(row.delivery_articleId),
    subscriberId: asNumber(row.delivery_subscriberId),
    status: asString(row.delivery_status),
    sentAt: asDate(row.delivery_sentAt),
    lastError: asString(row.delivery_lastError),
    attempts: asNumber(row.delivery_attempts),
    createdAt: asDate(row.delivery_createdAt) ?? new Date(0),
    updatedAt: asDate(row.delivery_updatedAt) ?? new Date(0),
    subscriber: mapSubscriberRecord({
      id: row.subscriber_id,
      email: row.subscriber_email,
      locale: row.subscriber_locale,
      status: row.subscriber_status,
      confirmTokenHash: row.subscriber_confirmTokenHash,
      unsubscribeToken: row.subscriber_unsubscribeToken,
      confirmTokenExpiresAt: row.subscriber_confirmTokenExpiresAt,
      unsubscribeTokenHash: row.subscriber_unsubscribeTokenHash,
      consentIp: row.subscriber_consentIp,
      consentUserAgent: row.subscriber_consentUserAgent,
      requestedAt: row.subscriber_requestedAt,
      confirmedAt: row.subscriber_confirmedAt,
      unsubscribedAt: row.subscriber_unsubscribedAt,
      lastConfirmationEmailSentAt: row.subscriber_lastConfirmationEmailSentAt,
      lastNewsletterSentAt: row.subscriber_lastNewsletterSentAt,
      createdAt: row.subscriber_createdAt,
      updatedAt: row.subscriber_updatedAt,
    }),
  }))
}

export async function updateNewsEmailDelivery(id: number, patch: Partial<Omit<NewsEmailDeliveryRecord, 'id' | 'articleId' | 'subscriberId' | 'createdAt'>>) {
  await prisma.$executeRaw(Prisma.sql`
    UPDATE "NewsEmailDelivery"
    SET ${buildUpdateAssignments({
      ...patch,
      updatedAt: new Date(),
    })}
    WHERE "id" = ${id}
  `)
}

export async function countRemainingNewsletterDeliveries(articleId: number) {
  const rows = await prisma.$queryRaw<Array<{ count: unknown }>>(Prisma.sql`
    SELECT COUNT(*) AS count
    FROM "NewsEmailDelivery"
    WHERE "articleId" = ${articleId}
      AND (
        "status" = 'pending'
        OR ("status" = 'failed' AND "attempts" < 5)
      )
  `)

  return asNumber(rows[0]?.count)
}

export async function countPermanentFailedNewsletterDeliveries(articleId: number) {
  const rows = await prisma.$queryRaw<Array<{ count: unknown }>>(Prisma.sql`
    SELECT COUNT(*) AS count
    FROM "NewsEmailDelivery"
    WHERE "articleId" = ${articleId}
      AND "status" = 'failed'
      AND "attempts" >= 5
  `)

  return asNumber(rows[0]?.count)
}
