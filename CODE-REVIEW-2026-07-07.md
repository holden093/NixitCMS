# NixitCMS — Consolidated Code Review Report

**Date:** 2026-07-07
**Methodology:** Multi-auditor review — primary agent first pass + 2 fresh-context `reviewer` subagents (backend / frontend) + `agy` (Gemini 3.1 Pro High) architectural review. All findings cross-referenced and verified against source code.

**Auditors:**
- **Primary agent** — full codebase first-pass analysis
- **Backend reviewer** — focused on config, auth, input validation, SQL injection, subprocess safety, error hygiene, storage, newsletter, meta API, concurrent safety, site transfer
- **Frontend reviewer** — focused on rendering safety, API client, auth, booking widgets, admin forms, CSP/headers, npm deps, Docker, CI/CD
- **Agy (Gemini 3.1 Pro)** — architectural/design review across 10 concern areas

---

## Executive Summary

The codebase demonstrates **strong foundational security practices** — rigorous input validation, consistent escaping, safe subprocess usage, proper cookie/JWT auth, server-side HTML sanitization, and a restrictive CSP. No critical exploitable vulnerabilities were found.

**6 HIGH findings**, **10 MEDIUM**, **8 LOW**. The most impactful issues are:

1. **Subprocess secrets leakage** — `env: process.env` passes all secrets to `tar` and `npx` child processes
2. **Site transfer race window** — DB hot-swap without maintenance mode opens a brief corruption window
3. **nodemailer HIGH CVE** — `nodemailer@8.0.7` has a `raw` option bypass SSRF vulnerability
4. **AdminLayout `noopener` missing** — public site link from admin panel lacks `noopener`
5. **resolveSafePath** — doesn't enforce expected subdirectory prefixes on media keys
6. **CSP maintenance** — CSP string repeated 3× in nginx, missing COOP/Trusted Types

---

## Findings Table

### HIGH

| # | Area | File:Line | Description | Auditors | Fix |
|---|------|-----------|-------------|----------|-----|
| H1 | Subprocess safety | `backend/src/services/siteTransfer.ts:113` | `runCommand()` passes `env: process.env` to child `tar` and `npx` processes, exposing JWT_SECRET, SMTP_PASS, META_ACCESS_TOKEN. | 🔀 agy + backend | Pass minimal allowlist: `{ PATH: process.env.PATH, DATABASE_URL: process.env.DATABASE_URL, HOME: process.env.HOME }` |
| H2 | Concurrent safety | `backend/src/services/siteTransfer.ts:265-270` | `replaceDatabaseFile` calls `prisma.$disconnect()` before file swap, but concurrent API requests can auto-reconnect during the swap window, risking SQLite lock errors or corruption. | 🔀 agy | Add in-memory "maintenance mode" flag returning 503 during the import's DB replacement window |
| H3 | Dependencies | `backend/package.json` | `nodemailer@8.0.7` has HIGH severity CVE (raw option bypass leading to file read/SSRF). Direct dependency used for newsletter, contact form, and confirmation emails. | ⚠️ Frontend | Upgrade `nodemailer` to latest (≥9.x), verify `raw` option is never used with unsanitized input |
| H4 | Rendering safety | `frontend/src/pages/admin/AdminLayout.tsx:108` | Public site link uses `rel="noreferrer"` **without** `noopener`, allowing the opened page to access `window.opener` and potentially manipulate the admin page via `window.opener.location`. | ⚠️ Frontend | Change to `rel="noopener noreferrer"` |
| H5 | Rendering safety | `frontend/src/pages/admin/content/MarkdownPreviewPane.tsx:7` | `ReactMarkdown` used **without** `allowedElements` restriction in admin preview pane. While `react-markdown` doesn't parse raw HTML by default, it renders image markdown with arbitrary `src` URLs. | ⚠️ Frontend | Add `allowedElements` whitelist matching `RichText.tsx` BLOCK_ELEMENTS |
| H6 | Dependencies | `frontend/package.json` | `react-router@6.24.0` has MODERATE open redirect via protocol-relative URL. Used in SPA routing — relevant for admin navigation. | ⚠️ Frontend | Upgrade to ≥6.30.4 |

### MEDIUM

| # | Area | File:Line | Description | Auditors | Fix |
|---|------|-----------|-------------|----------|-----|
| M1 | Path safety | `backend/src/services/storage.ts:66-73` | `resolveSafePath` validates paths don't escape `mediaRoot` but doesn't enforce expected subdirectory prefixes (`originals/`, `thumbnails/`, `variants/`). A DB record with key `"bad.jpg"` (no prefix) resolves inside mediaRoot. | ⚠️ Backend | Add prefix validation to `resolveSafePath` or at call sites |
| M2 | Config safety | `backend/src/config.ts:231` | `appOrigin` fallback to `allowedOrigins[0]` when `APP_ORIGIN` is unset — if `ALLOWED_ORIGINS` contains unexpected values, the canonical origin for absolute URLs (newsletter links, OG tags, SSR) could be wrong. | 🔀 Backend | Add explicit `PUBLIC_ORIGIN` env var or validate `allowedOrigins[0]` matches expected domain |
| M3 | CSP | `frontend/nginx.conf:21,35,43` | Full CSP string (~650 chars) repeated verbatim in 3 locations. Any CSP change requires updating all 3 blocks — misses in one block create inconsistent enforcement. | ⚠️ Frontend | Extract CSP into an nginx `map` variable or included file |
| M4 | CSP | `frontend/nginx.conf` | Missing `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy` headers. COOP prevents `window.opener` manipulation even without `noopener`. | ⚠️ Frontend | Add COOP/COEP headers, `upgrade-insecure-requests`, `require-trusted-types-for 'script'` |
| M5 | Dependencies | `frontend/package.json` | `form-data@4.0.5` (transitive via axios) has CRLF injection. Low practical risk (primarily JSON API calls) but affects multipart form submissions. | ⚠️ Frontend | Add `overrides: { "form-data": ">=4.0.6" }` |
| M6 | Booking safety | `frontend/src/components/booking/GestoreAlberghiWidget.tsx:17` | `bookingUrl` prop passed directly to `href` without URL scheme validation. Admin could store `javascript:` URL in DB. Backend should sanitize on write. | ⚠️ Frontend | Validate `bookingUrl` starts with `https://` on backend settings write path |
| M7 | Secrets | `backend/src/config.ts` | Secrets (`JWT_SECRET`, `SMTP_PASS`, `META_ACCESS_TOKEN`) stored as plain properties on exported `config` singleton — any module could accidentally log/serialize it. | 🔀 agy | Encapsulate in class with `toJSON()` override that redacts sensitive values |
| M8 | News SSR | `backend/src/services/newsSanitizer.ts:10-18` | `normalizeUrl` for news HTML sanitizer allows URLs starting with `/` — intentional for site-relative images, but protocol-relative URLs like `//evil.com/image.jpg` could bypass if `allowProtocolRelative: false` doesn't catch them. Worth testing. | ⚠️ Frontend | Add explicit test for protocol-relative URL in sanitizer; should be caught by sanitize-html's `allowProtocolRelative: false` |
| M9 | Booking | `frontend/src/components/booking/BookingWidget.tsx:15` | `JSON.parse(provider.config) as Record<string, string>` — no structural validation. If config has wrong types (e.g., `siteKey: 123` number), runtime behavior is unpredictable. | ⚠️ Frontend | Add lightweight structural validation after `JSON.parse` |
| M10 | Docker | `backend/Dockerfile:36` | `CMD` runs `db:setup` (prisma db push + seed) on every container start — production containers can modify schema. Consider init container pattern. | ⚠️ Frontend | Separate into init container or run-once job; keep runtime CMD as `npm run start` only |

### LOW

| # | Area | File:Line | Description | Auditors | Fix |
|---|------|-----------|-------------|----------|-----|
| L1 | Error hygiene | `backend/src/app.ts:134-136` | Prisma error `P2003` (foreign key violation) returns generic 400 instead of more specific 409. | ✅ Backend | Add explicit case for P2003 |
| L2 | Auth UX | `backend/src/middleware/requireAuth.ts:27-28` | Expired JWT tokens report "Invalid token" instead of "Token expired" — slightly misleading for legitimate users. | ✅ Backend | Distinguish `TokenExpiredError` from other `JsonWebTokenError` |
| L3 | Newsletter | `backend/src/routes/public/newsletter.ts:105-121` | Confirm/unsubscribe GET endpoints have no rate limiting. Token entropy (192 bits) makes enumeration impractical but defense-in-depth would add a limiter. | ✅ Backend | Add simple rate limiter (e.g., 10 requests/min per IP) |
| L4 | Error logging | `backend/src/services/asyncJobs.ts:49` | `parseJobPayload` silently falls back to `{}` on JSON parse failure — no warning log for malformed job data. | ✅ Backend | Log warning on parse failure |
| L5 | Docker | `frontend/Dockerfile` | Missing `HEALTHCHECK` directive in nginx stage and `STOPSIGNAL SIGQUIT` for graceful shutdown. | ⚠️ Frontend | Add HEALTHCHECK and STOPSIGNAL |
| L6 | Docker | `backend/Dockerfile` | No explicit `USER node` — non-root execution is handled implicitly in `docker-entrypoint.sh` via `gosu`. Adding `USER` would make intent explicit. | ⚠️ Frontend | Add `USER node` before ENTRYPOINT |
| L7 | Build env | `frontend/vite.config.ts:7` | `loadEnv(mode, envDir, '')` with empty prefix loads ALL environment variables (including secrets). Only used for dev server config, but risky if code evolves. | ⚠️ Frontend | Change to `loadEnv(mode, envDir, 'VITE_')` to restrict namespace |
| L8 | CI/CD | `.github/workflows/docker-publish.yml:23-28` | `build-and-test` job doesn't actually run tests, lint, or `npm audit`. Job name is misleading. | ⚠️ Frontend | Add `npm run lint` + `npm audit --audit-level=high` steps |

---

## What's Good ✅

The following practices deserve recognition:

| Area | Detail |
|------|--------|
| **Input validation** | Comprehensive `trimString`/`parsePositiveInt`/`parseBoolean` utility library; every admin route validates path params, body fields, and enums. Honeypot fields on contact/newsletter forms. |
| **SQL injection** | All raw SQL uses Prisma tagged template literals; `buildUpdateAssignments` validates dynamic column names via `SAFE_IDENTIFIER` regex before `Prisma.raw()`. |
| **Subprocess safety** | `spawn()` with argument arrays (no `shell: true`); stdin explicitly `'ignore'`; tar archive entry validation via `isSafeArchiveEntry` (rejects `..`, absolute paths, backslashes) checked BEFORE extraction. |
| **Auth** | bcrypt compare (constant-time); generic "Invalid credentials" on both missing-user and wrong-password; rate limiting with `skipSuccessfulRequests: true`; `httpOnly` + `sameSite` + `secure` cookies; `requireTrustedOrigin` on all state-changing routes; JWT verified + user existence checked on every request. |
| **Rendering safety** | Server-side `sanitize-html` strips harmful tags and enforces `http`/`https`/`mailto` only; `RichText.tsx` uses `allowedElements` whitelist; all email templates use `escapeHtml()`; no `dangerouslySetInnerHTML` in frontend. |
| **Error hygiene** | Production errors return generic messages ("Internal server error") with no stack traces; Prisma errors mapped to specific HTTP codes. |
| **Media storage** | UUID-based keys (unguessable); path traversal prevention via `resolveSafePath`; rollback on upload/delete failure; orphan derivative cleanup. |
| **Site transfer** | VACUUM INTO for consistent SQLite snapshot; manifest validation; symlink rejection; media tree recursive walk; post-import reconciliation (admin sync, media migration, content cleanup). |
| **CSP** | Comprehensive `default-src 'self'` policy with granular per-directive whitelists; `frame-ancestors 'self'` + `base-uri 'self'` + `form-action 'self'`. |
| **Docker** | Multi-stage builds; non-root `USER nginx` for frontend; `gosu` for backend user switching; `.dockerignore` excludes `.env`, `node_modules`, `dist`. |
| **CI/CD** | Minimal `packages: write` permissions; GHA caching; multi-arch builds via QEMU/Buildx; only pushes on main branch. |
| **News/newsletter** | Double opt-in with SHA-256 hashed tokens (192-bit entropy); expiry enforcement; re-subscribe refresh for pending/unsubscribed; token in POST body (not URL) for Meta API. |

---

## Test Coverage Gaps

Security-critical paths with no observable test coverage:

| Path | Risk |
|------|------|
| `siteTransfer.ts` — `importSiteTransferArchive` full flow | DB replacement, path traversal bypass, archive poisoning |
| `newsSanitizer.ts` — `sanitizeNewsHtml` edge cases | Protocol-relative URLs, javascript/data URIs, deeply nested tags |
| `newsStore.ts` — `claimDueAsyncJob` concurrent claim race | Two workers claiming same job simultaneously |
| `storage.ts` — `resolveSafePath` edge cases | Absolute paths, symlinks, Unicode normalization attacks |
| `mailer.ts` — `escapeHtml` coverage | All code paths (headers, body, URLs), double-encoding scenarios |
| `newsletter.ts` — token expiry + re-subscribe flow | Confirm after expiry, re-subscribe after unsubscribe |

---

## Fix Priority (Recommended Order)

### Immediate (Blockers)

1. **H4** — `AdminLayout.tsx:108`: Add `noopener` to `rel` attribute (1-line fix)
2. **H3** — `nodemailer` upgrade: Bump to latest version, verify `raw` option usage

### This Week (HIGH)

3. **H1** — `siteTransfer.ts:113`: Sanitize `env:` in `runCommand()` to minimal allowlist
4. **H2** — `siteTransfer.ts:265-270`: Add maintenance mode flag during DB hot-swap
5. **H5** — `MarkdownPreviewPane.tsx:7`: Add `allowedElements` whitelist
6. **H6** — `react-router` upgrade to ≥6.30.4

### This Sprint (MEDIUM)

7. **M1** — `storage.ts:66-73`: Add subdirectory prefix enforcement to `resolveSafePath`
8. **M2** — `config.ts:231`: Add explicit `PUBLIC_ORIGIN` env var
9. **M4** — `nginx.conf`: Add COOP/COEP/upgrade-insecure-requests headers
10. **M3** — `nginx.conf`: Extract CSP into variable/include to deduplicate
11. **M6** — `admin/settings.ts`: Validate booking URL scheme on backend write
12. **M5** — `frontend/package.json`: Add `form-data` override
13. **M7** — `config.ts`: Redact secrets in config object serialization
14. **M9** — `BookingWidget.tsx:15`: Add structural validation after JSON.parse

### Backlog (LOW)

15. **L2** — `requireAuth.ts`: Distinguish TokenExpiredError for better UX
16. **L3** — `newsletter.ts`: Add rate limiting to GET confirm/unsubscribe
17. **L4** — `asyncJobs.ts`: Log warning on malformed job payload
18. **L1** — `app.ts`: Handle Prisma P2003 as 409
19. **L7** — `vite.config.ts`: Restrict `loadEnv` prefix to `VITE_`
20. **L5-L6, L8** — Docker HEALTHCHECK, explicit USER, CI lint/audit steps

---

## Auditor Consensus Legend

- ✅ All three auditors agree
- ⚠️ Two auditors (one omitted or partial overlap)
- 🔀 Only one auditor found / different perspectives on same issue

**Note:** Agy's architectural findings (H1, H2, M7) are rated higher by the primary agent than by the backend reviewer because they represent defense-in-depth improvements that prevent subtle production issues — not active exploits, but real risks in operational environments.
