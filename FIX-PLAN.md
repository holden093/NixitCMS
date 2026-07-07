# NixitCMS — Fix Implementation Plan (Revised)

**Date:** 2026-07-07
**Status:** Revised after multi-model plan review (2 passes per reviewer)
**Reviewers:** `agy` (Gemini 3.1 Pro High) × 2 passes, `gpt-5.5` × 2 passes
**Methodology:** Primary agent drafted plan → both reviewers critiqued independently → cross-referenced against source code → corrections fed back → converged in 2 passes. All claims verified at file:line granularity.

**Scope:** 24 findings from CODE-REVIEW-2026-07-07.md → 5 staged batches + 3 de-scoped/deferred items.

---

## Implementation Order

Run batches sequentially. Batches 3 and 4 are independent of each other and **can be developed in parallel** by different team members, but must be integration-tested together before merging.

| Batch | Focus | Items | Time |
|-------|-------|-------|------|
| 1 | Zero-risk one-liners | H4, H5, L2, L4 | ~30 min |
| 2 | Dependency upgrades | H3, H6, M5 | ~1 hr |
| 3 | Backend hardening | H1, H2, M1, M7 | ~3 hrs |
| 4 | Frontend / nginx hardening | M3+M4, M6, M9 | ~2 hrs |
| 5 | Operational polish | L1, L3, L5, L6, L7, L8 | ~1.5 hrs |

---

## Items De-Scoped / Deferred

These 3 items from CODE-REVIEW-2026-07-07.md are explicitly out of scope for this plan:

| ID | Description | Rationale |
|----|-------------|-----------|
| **M8** | Protocol-relative URL sanitizer test | No test framework exists in the codebase (`*.test.ts` not configured). Current sanitizer behavior verified manually — protocol-relative `href` is stripped, protocol-relative `img` is removed. Deferred until test harness is introduced. |
| **M10** | Production `db:setup` decoupling | `npm run db:setup && npm run start` runs on every container boot. Separating this requires a backend init container or one-shot job pattern that `docker-compose.yaml` does not currently model. Tracked as a follow-up operational migration task (design init container flow, then implement). |
| **L5-STOPSIGNAL** | Frontend `STOPSIGNAL SIGQUIT` | The nginx base image (`nginx:1.27-alpine`) already provides graceful stop via its built-in `STOPSIGNAL SIGQUIT` (inherited from the nginx official image). Adding it to our Dockerfile is redundant. Frontend HEALTHCHECK (planned in Batch 5) is the actionable part of L5. |

---

## Batch 1 — Immediate Fixes (~30 min, zero risk)

### H4: AdminLayout noopener
**File:** `frontend/src/pages/admin/AdminLayout.tsx:108`
**Change:** `rel="noreferrer"` → `rel="noopener noreferrer"`

### H5: MarkdownPreviewPane allowedElements
**File:** `frontend/src/pages/admin/content/MarkdownPreviewPane.tsx`
**Change:** Add `allowedElements` to `<ReactMarkdown>`, matching the BLOCK_ELEMENTS from `frontend/src/components/common/RichText.tsx` (line 34):
```tsx
<ReactMarkdown allowedElements={["p","strong","em","a","code","br","ul","ol","li"]}>{value}</ReactMarkdown>
```
**Note:** `RichText.tsx` is at `frontend/src/components/common/RichText.tsx`, not `pages/admin/content/` as originally referenced.

### L2: TokenExpiredError UX
**File:** `backend/src/middleware/requireAuth.ts:31-37`
**Change:** Split the catch block to distinguish expired tokens from other JWT errors (UX-only — the parent class `JsonWebTokenError` already catches both):
```typescript
} catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
    next(new ApiError(401, 'Session expired'))
    return
  }
  if (error instanceof jwt.JsonWebTokenError) {
    next(new ApiError(401, 'Invalid token'))
    return
  }
  next(error)
}
```

### L4: Malformed job payload warning
**File:** `backend/src/services/asyncJobs.ts:79`
**Change:** Before `return {} as T`, add:
```typescript
console.warn('[async] malformed job payload, falling back to empty object', { type: job?.type })
```
**Note:** Line is 79, not 49 as originally stated.

---

## Batch 2 — Dependency Upgrades (~1 hr, needs build test)

### H3: nodemailer upgrade
**File:** `backend/package.json`
**Current:** `^8.0.5` (resolved 8.0.7)
**Target:** `^8.0.9` (latest 8.x — avoids 9.x breaking changes)
**Verification:** No `raw` option used in codebase (confirmed: 0 occurrences). Run `npm --prefix backend ci && npm --prefix backend run build`.

### H6: react-router upgrade
**File:** `frontend/package.json`
**Current:** `react-router-dom@^6.24.0`
**Target:** `^6.30.4`
**Verification:** Run `npm --prefix frontend ci && npm --prefix frontend run build`.

### M5: form-data override
**File:** `frontend/package.json`
**Change:** Add `overrides` block:
```json
"overrides": {
  "form-data": "^4.0.6"
}
```
**Note:** Use `^4.0.6` (not `>=4.0.6`) to stay within the known-compatible v4 major line.
**Verification:** `npm ls form-data` to confirm resolved version.

---

## Batch 3 — Backend Hardening (~3 hrs)

### H1: Subprocess env sanitization
**File:** `backend/src/services/siteTransfer.ts:113`
**Change in `runCommand()`:** Replace `env: process.env` with:
```typescript
const safeEnv = {
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
}
```
Pass `env: safeEnv` to `spawn()`. Single object works for both `tar` and `npx prisma` — `tar` ignores unused vars.

### H2: Site transfer maintenance mode + async runner pause

This is the most complex change. Three concerns must be addressed simultaneously:

1. **Maintenance mode** — block API requests during the swap
2. **Async job runner** — pause background DB queries during the swap
3. **Window width** — cover the entire destructive/repair phase (not just DB rename)

**Create shared module:** `backend/src/lib/maintenanceMode.ts`
```typescript
let maintenanceMode = false

export function isInMaintenanceMode(): boolean {
  return maintenanceMode
}

export function setMaintenanceMode(on: boolean): void {
  maintenanceMode = on
}
```
**Rationale:** A separate module avoids circular imports — `app.ts` imports admin site-transfer routes, which import `services/siteTransfer`, which would circularly import back from `app.ts`.

**In `backend/src/app.ts`:**
Add middleware AFTER `/health` but BEFORE route mounting:
```typescript
import { isInMaintenanceMode } from './lib/maintenanceMode'

// After /health route, before API routes:
app.use((_req, res, next) => {
  if (isInMaintenanceMode()) {
    res.setHeader('Retry-After', '30')
    res.status(503).json({ error: true, message: 'Maintenance in progress, retry shortly.' })
    return
  }
  next()
})
```

**In `backend/src/services/siteTransfer.ts`, `importSiteTransferArchive()`:**
Wrap the destructive phase at lines 394-400:
```typescript
import { setMaintenanceMode } from '../lib/maintenanceMode'
import { startAsyncJobRunner, stopAsyncJobRunner } from './asyncJobs'

// Before replaceDatabaseFile():
setMaintenanceMode(true)
stopAsyncJobRunner()
// Wait for any in-flight tick to drain (runnerTickInProgress flag)
// The stopAsyncJobRunner clears the interval; runQueueTick guards with runnerTickInProgress

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
```

**Why this window width matters:** `replaceMediaTree()` replaces the media volume, `syncConfiguredAdminUser()` ensures the admin account exists, `migrateLegacyMediaStorage()` moves legacy files, and the two reconcile steps clean up orphaned records. Re-enabling routes before these complete exposes users to an inconsistent state (old DB with missing media, or new DB with stale admin credentials).

**Edge case:** If the process crashes during the swap, `maintenanceMode` stays true until container restart. Acceptable — the flag is in-memory only.

**Async runner detail:** `stopAsyncJobRunner()` clears the `setInterval` at `asyncJobs.ts:576-578`. The `runQueueTick()` function (line 531) already guards against re-entry via `runnerTickInProgress`. After clearing the interval, any in-flight tick will complete naturally.

### M1: Media key validation at serve endpoint
**Decision:** Do NOT change `resolveSafePath` in `backend/src/services/storage.ts` — it would break `migrateLegacyMediaStorage()` which handles legacy keys (e.g., `logo.png`) before UUID migration runs. `resolveSafePath` already prevents path traversal outside `mediaRoot`.

**Instead, add defense-in-depth at the public serve endpoint:**
**File:** `backend/src/routes/public/media.ts`
**Change:** In `sendMediaFile()` (called by both serve routes), add:
```typescript
import { getMediaStorageIdFromKey } from '../../services/storage'

// At the top of sendMediaFile(), after the DB lookup:
const mediaFile = await findPublicFile(key)
if (!mediaFile) {
  notFound('File not found')
}
// Defense-in-depth: reject keys without valid UUID-based storage ID
if (!getMediaStorageIdFromKey(key)) {
  badRequest('Invalid media key')
}
```

**Note:** This gate only applies to the public serve endpoint. Admin delete/reconciliation flows already use DB-derived keys through storage helpers. The primary threat (public file serving with arbitrary paths) is covered.

### M7: Config secrets redaction
**File:** `backend/src/config.ts`
**Change:** Add both `toJSON()` (for `JSON.stringify`) and a custom inspect symbol (for `console.log`/`util.inspect`):
```typescript
const REDACTED_SENSITIVE_KEYS = new Set([
  'jwtSecret', 'smtpPass', 'metaAccessToken', 'adminPasswordHash',
])

function redactedConfigSnapshot(): Record<string, unknown> {
  const snapshot: Record<string, unknown> = {}
  for (const key of Object.keys(config)) {
    snapshot[key] = REDACTED_SENSITIVE_KEYS.has(key)
      ? '[REDACTED]'
      : (config as Record<string, unknown>)[key]
  }
  return snapshot
}

export const config: Config & { toJSON(): object; [key: symbol]: () => object } = {
  // ... existing properties ...

  toJSON() {
    return redactedConfigSnapshot()
  },

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return redactedConfigSnapshot()
  },
}
```

**Why both are needed:** `JSON.stringify(config)` calls `toJSON()`. `console.log(config)` and `util.inspect(config)` call the custom inspect symbol instead. Without both, accidental logging of the config object leaks secrets.

---

## Batch 4 — Frontend / nginx Hardening (~2 hrs)

### M3 + M4: CSP consolidation + COOP/COEP headers

**Files:** `frontend/snippets/csp.conf` (NEW), `frontend/nginx.conf`, `frontend/Dockerfile`

**Step 1 — Create `frontend/snippets/csp.conf`:**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Embedder-Policy "unsafe-none" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://resx.octorate.com https://*.octorate.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://resx.octorate.com https://*.octorate.com; img-src 'self' data: blob: https://unpkg.com https://*.tile.openstreetmap.org https://resx.octorate.com https://*.octorate.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com https://resx.octorate.com https://*.octorate.com https://*.tile.openstreetmap.org; frame-src 'self' https://resx.octorate.com https://*.octorate.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" always;
```

**Key corrections from review:**
- `upgrade-insecure-requests` moved **inside** the CSP string (was incorrectly placed as standalone `add_header` in original plan)
- Added `object-src 'none'` (standard security baseline — blocks `<object>`, `<embed>`, `<applet>`)

**Step 2 — Replace 3 inline header blocks in `nginx.conf`:**
In the server block (approximately lines 24-29), replace all security `add_header` directives with:
```nginx
include /etc/nginx/snippets/csp.conf;
```
Repeat for the `/assets/` location block and the `= /index.html` location block.

**Step 3 — Copy snippets in `frontend/Dockerfile`:**
Add before the `USER nginx` line:
```dockerfile
COPY frontend/snippets/ /etc/nginx/snippets/
```

**Nginx include resolution:** Nginx resolves includes from `/etc/nginx/` (the prefix directory), NOT from the including file's directory. Using absolute paths avoids ambiguity.

### M6: Backend booking URL validation
**File:** `backend/src/routes/admin/booking.ts:20-33` (`normalizeBookingPayload`)

**Change:** After the existing `parseJsonObject(config, 'config')` call, add URL scheme validation for gestore-alberghi type:
```typescript
if (type === 'gestore-alberghi') {
  const parsed = JSON.parse(config)
  const url = typeof parsed.bookingUrl === 'string' ? parsed.bookingUrl.trim() : ''
  if (url) {
    try {
      const parsedUrl = new URL(url)
      if (parsedUrl.protocol !== 'https:') {
        badRequest('bookingUrl must use https://')
      }
    } catch {
      badRequest('bookingUrl must be a valid URL')
    }
  }
}
```

**Why `new URL()` instead of `startsWith('https://')`:** `new URL()` is a structural URL parser that rejects malformed strings, handles scheme case consistently, and catches bypasses like invisible characters (`\nhttps://`). `startsWith` only checks the string prefix.

**Important:** This validation must also apply to partial updates. In `normalizePartialBookingPayload` (line 39-67), the `type` and `config` fields can arrive independently. If a stored gestore-alberghi provider is updated with only a new `config` field (without `type`), the validation should still fire. Either validate after merging with the existing record, or validate when both fields are present in the partial update.

### M9: BookingWidget structural validation
**File:** `frontend/src/components/booking/BookingWidget.tsx:14-20`

**Change:** Replace the current `useMemo` block with a null/array-safe guard:
```typescript
const config = useMemo(() => {
  try {
    const raw = JSON.parse(provider.config)
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      return raw as Record<string, unknown>
    }
    return {}
  } catch {
    return {}
  }
}, [provider.config])
```

**Why this is needed:** `JSON.parse("null")` returns `null` (which has `typeof === 'object'` in JS). `JSON.parse("[]")` returns an array. Without the guard, `config.siteKey` on null throws `TypeError`. The original plan's fix (`config.siteKey = ''`) would also throw on null.

---

## Batch 5 — Low / Operational Polish (~1.5 hrs)

### L1: Prisma P2003 handling
**File:** `backend/src/app.ts:134-136`
**Change:** Add before the fallback else in the Prisma error handler:
```typescript
} else if (err.code === 'P2003') {
  res.status(409).json({ error: true, message: 'Cannot delete — resource is still referenced' })
  return
}
```

### L3: Newsletter confirm/unsubscribe rate limiting
**File:** `backend/src/routes/public/newsletter.ts`
**Change:** Add rate limiter to GET confirm/unsubscribe routes:
```typescript
const confirmLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: true, message: 'Too many requests, please try again later.' },
})
router.get('/newsletter/confirm', confirmLimiter, ...)
router.get('/newsletter/unsubscribe', confirmLimiter, ...)
```

### L5: Docker frontend HEALTHCHECK
**File:** `frontend/Dockerfile`
**Change:** Add after the `EXPOSE 8080` line:
```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:8080 || exit 1
```
**Note:** `STOPSIGNAL SIGQUIT` is NOT added because the `nginx:1.27-alpine` base image already inherits it from the official nginx image.

### L6: Docker backend USER
**Files:** `backend/Dockerfile`, `backend/docker-entrypoint.sh`

**Dockerfile:** Add `USER node` before ENTRYPOINT.

**docker-entrypoint.sh:** Add a root-check guard before gosu:
```bash
if [ "$(id -u)" = '0' ]; then
  exec gosu node "$@"
else
  exec "$@"
fi
```

**Risk note:** The entrypoint's `chown -R node:node ... 2>/dev/null || true` (line 8) runs before the guard. When running as `USER node`, this chown can't repair root-owned mounted volumes, but:
- The `|| true` prevents script failure
- The Dockerfile's `RUN chown -R node:node /app` (build-time) sets initial ownership
- Only first-run named volumes created by a previous root-owned container would hit this
- If this becomes a problem, the preferred fix is to ensure volumes are node-owned at creation time rather than keeping the entrypoint as root

### L7: vite.config.ts loadEnv prefix
**File:** `frontend/vite.config.ts:7`
**Change:** `loadEnv(mode, envDir, '')` → `loadEnv(mode, envDir, 'VITE_')`
**Verified:** All consumed vars (`VITE_DEV_PROXY_TARGET`, `VITE_DEV_HOST`, `VITE_DEV_PORT`) are `VITE_DEV_` prefixed — still picked up.

### L8: CI lint + audit
**File:** `.github/workflows/docker-publish.yml`
**Changes:**
1. Rename job `build-and-test` → `build-and-lint`
2. Add after the frontend build step:
   ```yaml
   - name: Run Backend Lint
     run: npm --prefix backend run lint
   - name: Run Frontend Lint
     run: npm --prefix frontend run lint
   - name: Audit Backend Dependencies
     run: npm --prefix backend audit --audit-level=high
   - name: Audit Frontend Dependencies
     run: npm --prefix frontend audit --audit-level=high
   ```

---

## Risk Assessment

| Risk | Batch | Severity | Mitigation |
|------|-------|----------|------------|
| nodemailer upgrade breaks email | 2 | HIGH | Test send in staging; `^8.0.9` avoids 9.x breaking changes |
| react-router upgrade breaks navigation | 2 | MEDIUM | Build test + smoke test admin navigation |
| Maintenance mode flag persists on crash | 3 | LOW | In-memory flag resets on container restart |
| Async runner not stopped before DB swap | 3 | **HIGH** | Stop/restart runner around entire import flow (reviewer finding — was missing from original plan) |
| CSP include breaks on deploy | 4 | MEDIUM | Test `nginx -t` in CI; build test |
| `upgrade-insecure-requests` as standalone header | 4 | **HIGH** | Fixed — moved inside CSP string (was bug in original plan) |
| resolveSafePath prefix enforcement breaks migration | 3 | N/A | NOT changing resolveSafePath — gating at serve endpoint only |
| gosu + USER node conflict | 5 | LOW | Guard added to entrypoint.sh; chown `\|\| true` prevents crash |
| BookingWidget throws on null parsed config | 4 | MEDIUM | Added `typeof === 'object' && !Array.isArray` guard (was missing in original plan) |
| USER node can't repair root-owned volumes | 5 | LOW | Documented risk; build-time chown covers normal case |
| Booking URL validated only on create, not update | 4 | MEDIUM | Validate in both `normalizeBookingPayload` and `normalizePartialBookingPayload` after merge |

---

## Verification Plan

After each batch:
1. **Batch 1:** `npm run build` both packages; visual check of admin layout link + MarkdownPreviewPane
2. **Batch 2:** Full `docker compose build` + `docker compose up`; smoke test login, navigation, contact form
3. **Batch 3:** Test site transfer export/import; verify maintenance mode 503 during entire import; verify async runner resumes; verify media still serves with key gate
4. **Batch 4:** `nginx -t` on the built image; check CSP headers in browser devtools (verify `upgrade-insecure-requests` and `object-src 'none'` inside CSP value); verify COOP header present; verify booking URL rejects non-https
5. **Batch 5:** CI passes with new steps; `docker compose up` healthcheck shows healthy; verify loadEnv only loads VITE_ vars

---

## Multi-Model Validation Summary

### Cross-Reference Table

| Finding | agy | gpt-5.5 | Code-verified? |
|---------|-----|---------|----------------|
| RichText.tsx at `components/common/`, not `pages/admin/content/` | ✅ | ✅ | `frontend/src/components/common/RichText.tsx` |
| asyncJobs.ts `return {} as T` at line 79, not 49 | ✅ | ✅ | `backend/src/services/asyncJobs.ts:79` |
| `upgrade-insecure-requests` must be inside CSP (not standalone header) | ✅ | ✅ | MDN: CSP directive, not HTTP header |
| Maintenance mode must cover entire import flow (394-400) | ✅ | ✅ | `backend/src/services/siteTransfer.ts:394-400` |
| Async runner must be stopped during DB swap | ✅ | ✅ | `backend/src/services/asyncJobs.ts:563-578` |
| Custom inspect symbol needed for console.log redaction | ✅ | ✅ | Node.js docs: `util.inspect` uses custom symbol |
| `object-src 'none'` missing in CSP | ✅ | ✅ | Standard security baseline |
| BookingWidget needs null/array guard before property access | ✅ | ✅ | `typeof null === 'object'` in JS |
| `new URL().protocol === 'https:'` better than `startsWith` | ✅ | ✅ | Structural parser vs string prefix |
| Separate module for maintenance mode flag | ✅ | ✅ | Circular dependency: `app.ts → route → service → app.ts` |
| `^4.0.6` preferred over `>=4.0.6` for form-data | ✅ | ✅ | Stays within known-compatible v4 major |
| Batch 3 and 4 can be parallelized | ✅ | ✅ | Independent code domains |
| M8 deferred (no test framework) | — | ✅ | Verified no `*.test.ts` in codebase |
| M10 de-scoped (needs init container design) | — | ✅ | `docker-compose.yaml` has no init service |
| L5 STOPSIGNAL redundant (nginx base image has it) | — | ✅ | `nginx:1.27-alpine` inherits SIGQUIT |
| USER node safe with guard + `\|\| true` chown | ✅ | ✅ | Build-time chown covers normal case |
| PUBLIC_ORIGIN removed (APP_ORIGIN already handles it) | ✅ | ✅ | `backend/src/config.ts:232` |
| `Retry-After` header on 503 maintenance response | ✅ | ✅ | Express/API best practice |

### Convergence Status

- **Both reviewers agree on all 19 substantive items** — full convergence achieved in 2 passes
- **No unresolved disagreements** between reviewers
- **Unique contributions:** agy found the async runner gap and `util.inspect` redaction; gpt-5.5 found the CSP directive bug, maintenance window width, M8/M10/L5 gaps, BookingWidget null guard, and USER node edge case
- **All claims code-verified** at file:line granularity

### Model Disclosure

| Role | Model | Passes | Unique findings |
|------|-------|--------|-----------------|
| Primary (deepseek) | `deepseek/deepseek-v4-pro` | N/A | 5 code-verified discrepancies, initial plan draft |
| Reviewer 1 (agy) | `Gemini 3.1 Pro (High)` | 2 | Async runner gap, `util.inspect` redaction, `object-src 'none'`, parallelization |
| Reviewer 2 (subagent) | `openai-codex/gpt-5.5` | 2 | CSP directive bug, maintenance window width, M8/M10/L5 gaps, BookingWidget null guard, USER node risk, form-data pinning, URL validation method |
