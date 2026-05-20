# Project Map: Universal Hotel CMS (UHC)

## System Topology
- **Edge/Frontend**: [Nginx] (serves React SPA) -> Proxy-pass `/api`, `/media`, `GET /news/:slug` to [Backend]
- **Backend**: [Express/Node.js] -> [Prisma/SQLite]
- **Data Persistence**:
  - `app_data` (Volume) -> `/app/backend/prisma/data/app.db` (SQLite)
  - `media_data` (Volume) -> `/app/media-storage` (Originals, Thumbnails, Variants)
- **Deployment**: `podman-compose` (Containerized stack)

## Core Data Flows

### 1. News Lifecycle (Asynchronous Pipeline)
- **Creation (Admin)**: `POST /api/admin/news/articles` -> Sanitize HTML -> Prisma Store.
- **Scheduling**: If `status: scheduled`, create `AsyncJob(type: publish-article)`.
- **Publishing**: `AsyncJobsRunner` (polling every 5s) -> Marks job `running` -> Calls `publishNewsArticleNow`.
- **Distribution**: Creates jobs for `newsletter-dispatch`, `facebook-publish`, `instagram-publish`.
- **SSR (Public)**: `GET /news/:slug` (Backend) -> Renders SEO-friendly HTML using `shared/publicShell.ts`.

### 2. Site Transfer (Migration)
- **Export**: `POST /api/admin/site-transfer/export` -> `VACUUM INTO` SQLite -> Zip with `/media-storage` -> Download `.tar.gz`.
- **Import**: `POST /api/admin/site-transfer/import` -> Stop runtime (conceptually) -> Replace `app.db` -> `prisma db push --accept-data-loss` (Schema alignment) -> Replace media.

## Local Conventions & Dialects
- **Bilingualism**: All user-facing strings are `_it` / `_en`. `SharedLocaleCode` governs detection.
- **Security Gates**:
  - `requireAuth`: JWT in `httpOnly` cookie.
  - `requireTrustedOrigin`: Hardening against CSRF/Cross-domain mutations.
- **Error Handling**: `ApiError` class + `asyncHandler` wrapper. Global error handler converts Prisma/Multer errors to JSON responses.
- **Design Language**: "Contemporary Calm" -> Neutral palette, radius 2px, typography `Inter` / `Cormorant Garamond`.

## Strategic Notes
- **Prisma Client**: Generated in `backend/generated` and copied to `dist` for runtime consistency.
- **Async Runner**: In-process runner (no Redis needed), suitable for single-instance SQLite workloads.
- **Media Variants**: On-the-fly or background generation of WebP variants via Sharp using `?variant=` query param.
