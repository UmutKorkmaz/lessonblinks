# LessonBlinks — Dialect Registry Guide

**Product:** LessonBlinks (EN) · BlinkDers (TR)  
**Goal:** Register all 5 curriculum Blinks in the [Dialect Actions Registry](https://dial.to/register) so they unfurl on X/Twitter and render as `trusted` in wallet clients.  
**Last updated:** 2026-06-09

This guide covers `actions.json` setup, CORS, icon hosting, pre-submission testing (Blinks Inspector + dial.to), and the Dialect registration workflow — using **this repo’s actual route pattern**.

---

## Table of contents

1. [Prerequisites](#1-prerequisites)
2. [How Blinks are discovered](#2-how-blinks-are-discovered)
3. [`actions.json` in this project](#3-actionsjson-in-this-project)
4. [CORS requirements](#4-cors-requirements)
5. [Icon hosting](#5-icon-hosting)
6. [URL formats (Action, dial.to, Inspector)](#6-url-formats-action-dialto-inspector)
7. [Pre-submission testing](#7-pre-submission-testing)
8. [Testing on X / Twitter](#8-testing-on-x--twitter)
9. [Dialect registry submission](#9-dialect-registry-submission)
10. [All 5 lessons — registration package](#10-all-5-lessons--registration-package)
11. [Troubleshooting](#11-troubleshooting)
12. [Related documents](#12-related-documents)

---

## 1. Prerequisites

Complete before opening a Dialect submission:

- [ ] All 5 Action routes deployed to a **stable HTTPS domain** (e.g. `https://lessonblinks.com`)
- [ ] `NEXT_PUBLIC_BASE_URL` set to that domain in production
- [ ] Every lesson passes [Blinks Inspector](https://www.blinks.xyz/inspector) (GET + POST + OPTIONS)
- [ ] `actions.json` returns 5 rules at `https://{domain}/actions.json`
- [ ] Icons return HTTP 200 from absolute HTTPS URLs
- [ ] Full devnet walkthrough complete — see [`DEVNET-CHECKLIST.md`](DEVNET-CHECKLIST.md)

**Do not submit** while using `localhost`, ngrok URLs, or a domain you plan to change within 30 days. Registry review is manual; URL changes require re-submission.

---

## 2. How Blinks are discovered

Solana Blinks clients resolve Actions in three ways:

| Method | Example | When to use |
|--------|---------|-------------|
| **Direct Action URL** | `https://lessonblinks.com/api/actions/lesson-1-usdc` | Registry submission, Inspector, dial.to |
| **`solana-action:` protocol** | `solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc` | Embedded clients, some wallets |
| **Website path + `actions.json`** | `https://lessonblinks.com/lesson/tip-usdc` | Social sharing with marketing fallback page |

`actions.json` is the **sitemap for Blinks**: it maps human-readable paths on your domain to Action API endpoints. Blink clients that see `https://lessonblinks.com/lesson/tip-usdc` fetch `https://lessonblinks.com/actions.json`, match the `pathPattern`, and call the mapped `apiPath`.

**Dialect registry status** (from [Dialect docs](https://docs.dialect.to/blinks/blinks-provider/blink-registry)):

| Status | Meaning |
|--------|---------|
| `trusted` | Registered and accepted — unfurls on X when posted |
| `none` | Not registered — **will not unfurl** on X (conservative wallet default) |
| `blocked` | Flagged malicious — do not use |

All 5 LessonBlinks must reach `trusted` for the MVP distribution goal in [`README.md`](../README.md).

---

## 3. `actions.json` in this project

### 3.1 File location and routing

This project serves `actions.json` via a **Next.js App Router API route**, rewritten to the domain root:

| File | Role |
|------|------|
| `app/src/app/api/actions.json/route.ts` | Generates the JSON payload |
| `app/next.config.ts` | Rewrites `/actions.json` → `/api/actions.json` |

```typescript
// app/next.config.ts
async rewrites() {
  return [
    { source: "/actions.json", destination: "/api/actions.json" },
  ];
}
```

**Production URL:** `https://{domain}/actions.json`  
**Implementation URL:** `https://{domain}/api/actions.json` (same payload via rewrite)

### 3.2 Route handler pattern

```typescript
// app/src/app/api/actions.json/route.ts
import { createActionHeaders } from "@solana/actions";

const ACTIONS_JSON = {
  rules: [
    {
      pathPattern: "/lesson/tip-usdc",
      apiPath: "/api/actions/lesson-1-usdc",
    },
    {
      pathPattern: "/lesson/tip-creator-sol",
      apiPath: "/api/actions/lesson-2-tip",
    },
    {
      pathPattern: "/lesson/remittance",
      apiPath: "/api/actions/lesson-3-remittance",
    },
    {
      pathPattern: "/lesson/swap-sol-usdc",
      apiPath: "/api/actions/lesson-4-swap",
    },
    {
      pathPattern: "/lesson/claim-graduation-nft",
      apiPath: "/api/actions/lesson-5/claim",
    },
  ],
} as const;

const headers = createActionHeaders();

export async function GET() {
  return Response.json(ACTIONS_JSON, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}
```

### 3.3 `actions.json` requirements (spec)

| Requirement | This project |
|-------------|--------------|
| Served at **domain root** | ✅ via `next.config.ts` rewrite |
| Valid JSON with `rules` array | ✅ |
| Each rule has `pathPattern` + `apiPath` | ✅ |
| `pathPattern` is a path on your domain (starts with `/`) | ✅ |
| `apiPath` is relative (`/api/...`) or absolute HTTPS URL | ✅ relative paths |
| `GET` returns CORS headers | ✅ `createActionHeaders()` |
| `OPTIONS` returns CORS headers | ✅ required for preflight |

### 3.4 Rule semantics

- **`pathPattern`** — Public URL path users can share (e.g. `/lesson/tip-usdc`). Clients match this against links posted on social feeds.
- **`apiPath`** — Backend Solana Action endpoint. Can be relative (resolved against your domain) or a fully qualified URL on another subdomain.

**Adding a new lesson:** append a rule, deploy, verify with `curl`, then add a Dialect registry entry.

### 3.5 Verify after deploy

```bash
DOMAIN=https://lessonblinks.com

# Rule count
curl -s "$DOMAIN/actions.json" | jq '.rules | length'
# Expected: 5

# Full payload
curl -s "$DOMAIN/actions.json" | jq .

# CORS on actions.json
curl -sI -X OPTIONS "$DOMAIN/actions.json" \
  | grep -iE 'access-control-allow-(origin|methods|headers)'
```

Expected headers include:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Encoding, Accept-Encoding
```

### 3.6 Path → API mapping reference

| Shareable path | Action API | Lesson |
|----------------|------------|--------|
| `/lesson/tip-usdc` | `/api/actions/lesson-1-usdc` | 1 — Send USDC |
| `/lesson/tip-creator-sol` | `/api/actions/lesson-2-tip` | 2 — Tip 0.001 SOL |
| `/lesson/remittance` | `/api/actions/lesson-3-remittance` | 3 — Remittance demo |
| `/lesson/swap-sol-usdc` | `/api/actions/lesson-4-swap` | 4 — Swap SOL → USDC demo |
| `/lesson/claim-graduation-nft` | `/api/actions/lesson-5/claim` | 5 — Graduation NFT |

Each path should also have a marketing fallback page under `app/src/app/lesson/[slug]/` for browsers that do not render Blinks.

---

## 4. CORS requirements

Blink clients (dial.to, Phantom, Backpack, X embed) run in the browser and **preflight** Action endpoints with `OPTIONS`. Missing CORS = blank Blink card.

### 4.1 Required on every endpoint

Apply CORS to **all** of the following:

- `GET /actions.json`
- `OPTIONS /actions.json`
- Every Action route: `GET`, `POST`, `OPTIONS`
- Chained routes: `POST /complete` (Lessons 1–2 when implemented)

### 4.2 Implementation pattern

Use `createActionHeaders()` from `@solana/actions` on **every** response:

```typescript
import { createActionHeaders } from "@solana/actions";

const headers = createActionHeaders();

export async function GET(req: Request) {
  return Response.json(payload, { headers });
}

export async function POST(req: Request) {
  return Response.json(payload, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}
```

This sets at minimum:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Content-Encoding, Accept-Encoding
```

### 4.3 Optional blockchain headers (recommended)

For multi-chain clarity, Dialect’s starter guide also sets:

```typescript
import { ACTIONS_CORS_HEADERS, BLOCKCHAIN_IDS } from "@solana/actions";

const headers = {
  ...ACTIONS_CORS_HEADERS,
  "x-blockchain-ids": BLOCKCHAIN_IDS.devnet, // or mainnet-beta
  "x-action-version": "2.4",
};
```

LessonBlinks MVP uses **devnet** for Lessons 1–2; set cluster per lesson before mainnet promotion.

### 4.4 CORS smoke script

```bash
DOMAIN=https://lessonblinks.com

ENDPOINTS=(
  "/actions.json"
  "/api/actions/lesson-1-usdc"
  "/api/actions/lesson-2-tip"
  "/api/actions/lesson-3-remittance"
  "/api/actions/lesson-4-swap"
  "/api/actions/lesson-5/claim"
)

for path in "${ENDPOINTS[@]}"; do
  echo "=== OPTIONS $path ==="
  curl -sI -X OPTIONS "$DOMAIN$path" | grep -i access-control-allow-origin
done
```

All must return `Access-Control-Allow-Origin: *`.

---

## 5. Icon hosting

Every Action `GET` response must include an **`icon`** field: an absolute `https://` URL to a PNG, SVG, or WebP image. Relative paths are rejected by strict clients.

### 5.1 This project’s pattern

Icons live in `app/public/` and are resolved at request time:

```typescript
// app/src/lib/solana.ts
export function resolveIconUrl(requestUrl: URL, path: string): string {
  return new URL(path, requestUrl.origin).toString();
}

// In route handlers:
icon: resolveIconUrl(requestUrl, "/icon.svg"),
```

**Production example:** `https://lessonblinks.com/icon.svg`

### 5.2 Hosting options

| Option | Path | Best for |
|--------|------|----------|
| **Same origin (`public/`)** | `app/public/lessons/02/icon.png` | MVP — zero extra infra |
| **CDN** | `https://cdn.lessonblinks.com/badges/graduate.png` | Lesson 5 NFT art, high traffic |
| **Vercel static** | Deployed with the Next app | Automatic HTTPS |

### 5.3 Icon requirements

| Rule | Recommendation |
|------|----------------|
| Format | PNG (512×512), SVG, or WebP |
| URL | Absolute HTTPS — no `http://`, no relative paths in JSON |
| Size | 512×512 px for registry submission; optimize < 200 KB |
| Availability | Must return `200` with correct `Content-Type` |
| CORS | Static files on same domain inherit site CORS; CDN should allow `*` or same-origin |
| Consistency | Use the same icon URL in GET metadata and Dialect submission form |

### 5.4 Per-lesson icon checklist

```bash
DOMAIN=https://lessonblinks.com

# Lesson 1–2 (shared icon today)
curl -sI "$DOMAIN/icon.svg" | head -5

# Lesson 5 (when using dedicated badge art)
curl -sI "https://cdn.lessonblinks.com/badges/blinks-graduate.png" | head -5
```

- [ ] Icon loads in Blinks Inspector preview
- [ ] Icon loads in dial.to interstitial
- [ ] Icon visible when unfurled on X (post-registration)

### 5.5 Registry icon vs Action icon

Dialect’s submission form asks for a **512×512 PNG** for the registry listing. This can match the Action `icon` field or be a marketing variant — keep branding consistent.

---

## 6. URL formats (Action, dial.to, Inspector)

### 6.1 Action URL (canonical)

The **Action URL** is the HTTPS endpoint Blink clients call for `GET`/`POST`. This is what you register with Dialect.

```
https://{domain}/api/actions/lesson-1-usdc
```

Replace `{domain}` with `NEXT_PUBLIC_BASE_URL` (no trailing slash).

### 6.2 `solana-action:` protocol URL

```
solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc
```

- Use when the URL has **no query parameters** → do not URL-encode the link.
- If the Action URL has query params (`?to=...&amount=...`), URL-encode the full HTTPS URL per the [Solana Actions spec](https://solana.com/developers/guides/advanced/actions).

### 6.3 dial.to interstitial URL format

Dialect’s Blink interstitial wraps any Action URL:

**Unencoded (no query params):**

```
https://dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc
```

**URL-encoded (required when Action URL contains `?` or `&`):**

```
https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Flessonblinks.com%2Fapi%2Factions%2Flesson-4-swap%3Flang%3Dtr
```

**Helper in this repo** (`app/src/lib/lessons.ts`):

```typescript
export function getDialToUrl(actionPath: string, baseUrl = getBaseUrl()): string {
  const actionUrl = `${baseUrl.replace(/\/$/, "")}${actionPath}`;
  return `https://dial.to/?action=solana-action:${encodeURIComponent(actionUrl)}`;
}
```

`encodeURIComponent` is safe for all Action URLs (with or without query params).

### 6.4 Website path URL (via `actions.json`)

Share the mapped path for users who need a fallback website:

```
https://lessonblinks.com/lesson/tip-usdc
```

Blink-aware clients resolve this through `actions.json`; others land on the lesson marketing page.

### 6.5 Blinks Inspector URL format

**Inspector base URL:**

```
https://www.blinks.xyz/inspector
```

The Inspector is a **paste-and-test** tool. There is no required query-parameter format — you enter the **raw HTTPS Action URL**:

```
https://lessonblinks.com/api/actions/lesson-1-usdc
```

**Do not** paste dial.to URLs into Inspector — paste the Action API URL directly.

**Local development:** Inspector cannot reach `localhost`. Use a tunnel:

```bash
npx ngrok http 3000
# Paste: https://xxxx.ngrok-free.app/api/actions/lesson-1-usdc
```

### 6.6 Quick reference — Lesson 1 (production)

| Format | URL |
|--------|-----|
| Action URL | `https://lessonblinks.com/api/actions/lesson-1-usdc` |
| dial.to | `https://dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc` |
| Website path | `https://lessonblinks.com/lesson/tip-usdc` |
| Inspector input | `https://lessonblinks.com/api/actions/lesson-1-usdc` |

---

## 7. Pre-submission testing

Run this sequence **once per lesson** before Dialect submission.

### 7.1 Step 1 — `actions.json` and CORS

```bash
curl -s "$DOMAIN/actions.json" | jq '.rules[] | {pathPattern, apiPath}'
curl -sI -X OPTIONS "$DOMAIN/actions.json" | grep -i access-control
```

### 7.2 Step 2 — Blinks Inspector

1. Open **https://www.blinks.xyz/inspector**
2. Paste the **Action URL** (not dial.to)
3. **GET tab:** verify `type`, `title`, `description`, `icon`, `links.actions`
4. **OPTIONS tab:** confirm `Access-Control-Allow-Origin: *`
5. **POST tab:** connect wallet, trigger transaction build, confirm base64 `transaction` in response
6. Fix any schema or CORS errors before proceeding

| Check | Pass criteria |
|-------|---------------|
| GET schema | `type: "action"`, valid `icon` HTTPS URL, `label` ≤ 5 words |
| POST body | `{ "account": "<base58>" }` returns signable tx |
| Errors | `ActionError` JSON with human-readable `message` (not stack traces) |
| Completed state | Lesson 5 returns `type: "completed"` when already claimed |

### 7.3 Step 3 — dial.to interstitial

1. Open the `getDialToUrl()` link for the lesson (or construct manually — §6.3)
2. Confirm card renders: icon, title, description, action button(s)
3. Connect wallet → sign on **devnet** (or correct cluster)
4. Confirm registry status badge shows (`none` before registration is expected)

### 7.4 Step 4 — `curl` smoke

```bash
curl -s "$DOMAIN/api/actions/lesson-1-usdc" | jq '{type, title, label, icon}'
curl -s -X POST "$DOMAIN/api/actions/lesson-1-usdc" \
  -H "Content-Type: application/json" \
  -d '{"account":"11111111111111111111111111111111"}' \
  | jq 'keys'
# Expect transaction or ActionError — never HTML error page
```

### 7.5 Step 5 — Full curriculum

Walk Lessons 1 → 5 sequentially with one wallet. See [`DEVNET-CHECKLIST.md`](DEVNET-CHECKLIST.md) §11.

---

## 8. Testing on X / Twitter

### 8.1 Before registration (`none` status)

- Posting a Blink link on X **will not unfurl** as an interactive Blink card (wallet conservative default).
- The link still works as a normal URL; users can open dial.to manually.
- Use this phase for copy/UX review only — not for launch distribution.

### 8.2 After registration (`trusted` status)

Once Dialect accepts your submission:

1. Post the **dial.to interstitial URL** or **website path URL** in a draft tweet.
2. Confirm the Blink card unfurls with icon, title, and action button.
3. Tap through on mobile (Phantom / Backpack) and complete one devnet transaction.
4. Verify the completed state renders or redirects appropriately.

**Recommended post format for Lesson 1:**

```
Learn Solana in 30 seconds ⚡

Lesson 1: Tip $1 USDC — a real stablecoin transfer in one tap.

https://dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc
```

Or use the shorter website path (requires `actions.json` on the same domain):

```
https://lessonblinks.com/lesson/tip-usdc
```

### 8.3 X testing checklist

| # | Test | Expected |
|---|------|----------|
| 1 | Post dial.to URL after `trusted` | Blink card unfurls in timeline |
| 2 | Post website path URL | Blink card unfurls via `actions.json` resolution |
| 3 | Tap action button on mobile | Wallet opens, tx preview correct |
| 4 | Wrong cluster wallet | Clear error, no silent failure |
| 5 | Edit tweet / quote tweet | Card still unfurls |
| 6 | TR cohort post (`BlinkDers`) | Turkish metadata if `?locale=tr` supported |

### 8.4 Testing unregistered Blinks locally

Wallet SDKs and Dialect’s React `Blink` component accept `securityLevel="all"` to render unregistered Actions during development. Production X posts still require registry `trusted` status.

---

## 9. Dialect registry submission

### 9.1 Overview

The [Dialect Actions Registry](https://dial.to/registry) is a public good maintained by Dialect and the Solana Foundation. As of launch, **only registered Actions unfurl in the X feed**.

**Apply at:** [https://dial.to/register](https://dial.to/register)  
**Contact:** [hello@dialect.to](mailto:hello@dialect.to)  
**Review:** Manual (plan for several business days)

### 9.2 Submission checklist (per Dialect)

| Step | Action |
|------|--------|
| 1 | **Action works** — test on dial.to and Blinks Inspector |
| 2 | **Clear description** — metadata matches actual transaction behavior |
| 3 | **Thorough testing** — devnet + production domain, multiple wallets |
| 4 | **Secure Actions** — fixed amounts, no arbitrary calldata, see [`SECURITY.md`](SECURITY.md) |
| 5 | **Valid contact** — email/Telegram for follow-up |
| 6 | **Patience** — manual review queue |

### 9.3 What to submit (per lesson)

Prepare one row per lesson:

| Field | Example (Lesson 1) |
|-------|-------------------|
| **Action URL** | `https://lessonblinks.com/api/actions/lesson-1-usdc` |
| **Title** | Lesson 1: Tip $1 USDC |
| **Description** | 30-second Solana lesson — send $1 USDC and learn SPL token transfers. |
| **Category** | Education / Onboarding |
| **Icon** | 512×512 PNG URL |
| **Website** | `https://lessonblinks.com/lesson/tip-usdc` |
| **Cluster** | devnet (MVP) → mainnet-beta when promoted |
| **Security note** | Fixed $1 USDC amount; no user-supplied transfer targets in MVP |

Submit **all 5 lessons** in one email when the curriculum is stable. Reference the course: **LessonBlinks / Blinks 101**.

### 9.4 Registry status API

Clients check:

```
https://dial.to/registry
```

After approval, your Action URLs should report `trusted`. Re-test unfurl on X within 24 hours of confirmation.

### 9.5 Post-approval maintenance

- **Do not change Action URL paths** without re-registering.
- **Icon/title/description** changes are fine if behavior is unchanged; material tx changes need re-review.
- **New lesson** → new registry entry + new `actions.json` rule.
- Monitor [`SECURITY.md`](SECURITY.md) — compromised infra = request takedown before users are harmed.

---

## 10. All 5 lessons — registration package

Copy-paste ready after replacing `{domain}` with production host.

### Lesson 1 — Send USDC

| Field | Value |
|-------|-------|
| Action URL | `https://{domain}/api/actions/lesson-1-usdc` |
| Website path | `https://{domain}/lesson/tip-usdc` |
| dial.to | `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-1-usdc` |
| Title | Lesson 1: Send your first USDC |
| Category | Education / Payments |

### Lesson 2 — Tip 0.001 SOL

| Field | Value |
|-------|-------|
| Action URL | `https://{domain}/api/actions/lesson-2-tip` |
| Website path | `https://{domain}/lesson/tip-creator-sol` |
| dial.to | `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-2-tip` |
| Title | Lesson 2: Tip a creator 0.001 SOL |
| Category | Education / Payments |

### Lesson 3 — Remittance demo

| Field | Value |
|-------|-------|
| Action URL | `https://{domain}/api/actions/lesson-3-remittance` |
| Website path | `https://{domain}/lesson/remittance` |
| dial.to | `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-3-remittance` |
| Title | Lesson 3: Send a remittance demo |
| Category | Education / Payments |

### Lesson 4 — Swap SOL → USDC demo

| Field | Value |
|-------|-------|
| Action URL | `https://{domain}/api/actions/lesson-4-swap` |
| Website path | `https://{domain}/lesson/swap-sol-usdc` |
| dial.to | `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-4-swap` |
| Title | Lesson 4: Swap SOL to USDC demo |
| Category | Education / DeFi |

### Lesson 5 — Graduation NFT

| Field | Value |
|-------|-------|
| Action URL | `https://{domain}/api/actions/lesson-5/claim` |
| Website path | `https://{domain}/lesson/claim-graduation-nft` |
| dial.to | `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-5/claim` |
| Title | Lesson 5: Claim your Blinks 101 Graduate Badge |
| Category | Education / NFT |
| Security | Sponsored cNFT mint; prerequisites Lessons 1–4 |

### Batch verification script

```bash
DOMAIN=https://lessonblinks.com

declare -A LESSONS=(
  ["01"]="/api/actions/lesson-1-usdc"
  ["02"]="/api/actions/lesson-2-tip"
  ["03"]="/api/actions/lesson-3-remittance"
  ["04"]="/api/actions/lesson-4-swap"
  ["05"]="/api/actions/lesson-5/claim"
)

for id in "${!LESSONS[@]}"; do
  path="${LESSONS[$id]}"
  echo "=== Lesson $id ==="
  curl -sf "$DOMAIN$path" | jq -r '.title' || echo "FAIL: $path"
  echo "dial.to: https://dial.to/?action=solana-action:$(python3 -c "import urllib.parse; print(urllib.parse.quote('solana-action:${DOMAIN}${path}', safe=''))")"
  echo
done
```

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Blank Blink on dial.to | Missing `OPTIONS` handler | Add `export async function OPTIONS()` with `createActionHeaders()` |
| Inspector CORS error | Headers missing on GET/POST | Return `headers` on **every** response, including 400/500 |
| `actions.json` 404 | Rewrite not deployed | Confirm `next.config.ts` rewrite; hit `/api/actions.json` directly |
| Icon broken | Relative `icon` in JSON | Use `resolveIconUrl()` or absolute CDN URL |
| X link shows plain URL | Not registered (`none`) | Complete Dialect submission; wait for `trusted` |
| POST returns HTML | Wrong route or server error | Check Vercel logs; ensure JSON `ActionError` on failures |
| dial.to works, path URL fails | `pathPattern` mismatch | Align `actions.json` rule with shared path exactly |
| Inspector can’t reach local | localhost not public | Use ngrok / Cloudflare Tunnel |
| Wrong cluster in wallet | `x-blockchain-ids` mismatch | Set devnet vs mainnet-beta to match `SOLANA_CLUSTER` |

---

## 12. Related documents

| Document | Purpose |
|----------|---------|
| [`DEVNET-CHECKLIST.md`](DEVNET-CHECKLIST.md) | Full pre-submit test matrix |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Stack, env vars, route layout |
| [`SECURITY.md`](SECURITY.md) | Security posture for registry review |
| [`CURRICULUM.md`](CURRICULUM.md) | Lesson ordering and copy |
| [`GTM.md`](GTM.md) | Launch distribution on X TR |

**External references:**

- [Solana Actions & Blinks spec](https://solana.com/developers/guides/advanced/actions)
- [Dialect — Build your first Blink](https://docs.dialect.to/blinks/blinks-provider/build-your-first-blink)
- [Dialect — Register your Blink](https://docs.dialect.to/blinks/blinks-provider/blink-registry)
- [Blinks Inspector](https://www.blinks.xyz/inspector)
- [dial.to interstitial](https://dial.to)
- [Dialect registry API](https://dial.to/registry)

---

## Submission sign-off

| Lesson | Inspector ✅ | dial.to ✅ | Registry submitted | X unfurl ✅ |
|--------|-------------|-----------|-------------------|------------|
| 1 — USDC transfer | ☐ | ☐ | ☐ | ☐ |
| 2 — SOL tip | ☐ | ☐ | ☐ | ☐ |
| 3 — Remittance demo | ☐ | ☐ | ☐ | ☐ |
| 4 — Swap demo | ☐ | ☐ | ☐ | ☐ |
| 5 — Graduation | ☐ | ☐ | ☐ | ☐ |

**Submitted by:** _______________  
**Date:** _______________  
**Production domain:** _______________
