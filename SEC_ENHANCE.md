# NixitCMS — Security Hardening Plan

**Date:** 2026-07-07 (revised)
**Status:** Ready for implementation
**Canonical plan:** [`FIX-PLAN.md`](./FIX-PLAN.md) — contains complete details, code snippets, and risk assessment.

---

## Executive Summary

This plan implements 24 findings from the [CODE-REVIEW-2026-07-07.md](./CODE-REVIEW-2026-07-07.md) security audit across 5 staged batches. The plan was reviewed and refined through a multi-model review loop:

- **Primary agent** (deepseek) — drafted the plan
- **agy** (Gemini 3.1 Pro High) — 2 review passes
- **gpt-5.5** — 2 review passes

All claims validated against source code at file:line granularity. Full convergence achieved — both reviewers agree on all substantive items.

### Key Corrections Found During Review

| Issue | Severity | Found by |
|-------|----------|----------|
| `upgrade-insecure-requests` incorrectly placed as standalone nginx header (must be inside CSP string) | **Bug in plan** | gpt-5.5 |
| Maintenance mode re-enabled too early (before media replacement/reconciliation) | **Bug in plan** | gpt-5.5 |
| Async job runner not paused during DB swap (can lock SQLite file) | **Gap in plan** | agy |
| `console.log` redaction missing `util.inspect` custom symbol | **Gap in plan** | agy |
| BookingWidget null-guard missing (throws on `JSON.parse("null")`) | **Bug in plan** | gpt-5.5 |
| Missing `object-src 'none'` in CSP | **Gap in plan** | agy |
| 3 findings (M8, M10, L5-STOPSIGNAL) missing from original plan | **Gap in plan** | gpt-5.5 |

All corrections are incorporated in the revised plan.

---

## Batch Overview

| Batch | Focus | Items | Time |
|-------|-------|-------|------|
| 1 | Zero-risk one-liners | 4 | ~30 min |
| 2 | Dependency upgrades | 3 | ~1 hr |
| 3 | Backend hardening | 4 | ~3 hrs |
| 4 | Frontend / nginx hardening | 3 | ~2 hrs |
| 5 | Operational polish | 6 | ~1.5 hrs |

Batches 3 and 4 are independent and can be developed in parallel.

---

## Items De-Scoped

| ID | Reason |
|----|--------|
| **M8** (protocol-relative URL test) | No test framework in codebase; deferred until test harness exists |
| **M10** (production db:setup decoupling) | Requires init container design; tracked as follow-up |
| **L5-STOPSIGNAL** | Already inherited from `nginx:1.27-alpine` base image |

---

See [`FIX-PLAN.md`](./FIX-PLAN.md) for full implementation details, code snippets, risk assessment, verification plan, and multi-model validation table.
