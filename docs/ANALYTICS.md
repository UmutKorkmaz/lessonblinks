# LessonBlinks — Analytics Event Schema

**Product:** LessonBlinks / BlinkDers  
**Provider:** PostHog (recommended) or Vercel Analytics + custom warehouse  
**Last updated:** 2026-06-09  
**Privacy:** No PII; wallet pubkeys are pseudonymous identifiers

---

## 1. Design principles

| Principle | Implementation |
|-----------|----------------|
| **No PII** | No email, name, IP in event payloads (IP handled by provider) |
| **Wallet as ID** | `wallet_pubkey` truncated in logs: `DRpb...x7Q2` |
| **Server-side truth** | `lesson_completed` only after on-chain verification |
| **Sponsor billing** | Dedicated impression + CTA events |
| **Locale tracking** | `locale: en \| tr` on all lesson events |

---

## 2. Identity model

```typescript
interface AnalyticsContext {
  /** Truncated base58 — full pubkey only in server DB */
  wallet_id?: string;
  locale: "en" | "tr";
  network: "devnet" | "mainnet-beta";
  client: "phantom" | "backpack" | "dialto" | "privy" | "unknown";
  session_id: string;       // UUID per browser session
  campaign_ref?: string;    // ?ref= query param
  sponsor_slug?: string;
}
```

**PostHog setup:**

- Project: `lessonblinks-prod`
- Person properties: `locale`, `lessons_completed_count`, `is_graduate`
- Group analytics: `sponsor_slug` for B2B reporting

---

## 3. Event catalog

### 3.1 Funnel events

#### `lesson_blink_opened`

User opens dial.to interstitial or Inspector; GET request hits server.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `lesson_id` | string | yes | `lesson-01` … `lesson-05` |
| `lesson_number` | number | yes | 1–5 |
| `locale` | string | yes | `en` or `tr` |
| `entry_surface` | string | yes | `dialto`, `x`, `landing`, `qr`, `inspector` |
| `campaign_ref` | string | no | UTM / `?ref=` value |
| `sponsor_slug` | string | no | Active sponsor |

```typescript
emit("lesson_blink_opened", {
  lesson_id: "lesson-01",
  lesson_number: 1,
  locale: "tr",
  entry_surface: "dialto",
});
```

---

#### `lesson_action_tapped`

Blink client POSTs to Action endpoint (transaction requested).

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `wallet_id` | string | yes (truncated) |
| `locale` | string | yes |
| `has_sponsor` | boolean | yes |

---

#### `lesson_tx_built`

Server successfully returned serialized transaction.

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `wallet_id` | string | yes |
| `tx_type` | string | yes | `legacy` or `versioned` |
| `gas_sponsored` | boolean | yes |
| `build_duration_ms` | number | yes |

---

#### `lesson_tx_signed`

Client reported confirmed signature (from completion callback or webhook).

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `wallet_id` | string | yes |
| `signature` | string | yes (first 8 chars only in analytics) |
| `confirmation_status` | string | yes | `confirmed`, `finalized` |

---

#### `lesson_completed`

**Server-only** — emitted from `/complete` after instruction verification.

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `wallet_id` | string | yes |
| `signature` | string | yes |
| `amount_usdc` | number | no | USDC lessons only |
| `amount_lamports` | number | no | SOL lessons only |
| `locale` | string | yes |
| `verification_duration_ms` | number | yes |
| `badge_label` | string | yes |

---

#### `lesson_failed`

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `wallet_id` | string | no |
| `error_code` | string | yes | `INSUFFICIENT_USDC`, `INVALID_ACCOUNT`, etc. |
| `error_stage` | string | yes | `get`, `post`, `sign`, `complete`, `verify` |
| `locale` | string | yes |

---

### 3.2 Graduation events

#### `graduation_eligible`

GET/POST determined wallet completed L1–L4.

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `lessons_completed` | number | yes |

---

#### `graduation_minted`

cNFT mint confirmed.

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `mint_signature` | string | yes |
| `asset_id` | string | no |
| `sponsor_slug` | string | no |

---

#### `graduation_blocked`

Prerequisite or already-claimed.

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `reason` | string | yes | `prerequisites`, `already_claimed` |
| `lessons_completed` | number | yes |

---

### 3.3 Wallet & faucet events

#### `wallet_connected`

Privy or Phantom connect on landing page.

| Property | Type | Required |
|----------|------|----------|
| `wallet_provider` | string | yes | `privy`, `phantom` |
| `locale` | string | yes |
| `is_embedded` | boolean | yes |

---

#### `faucet_requested`

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `amount_usdc` | number | yes |
| `success` | boolean | yes |
| `deny_reason` | string | no | `rate_limit`, `devnet_only` |

---

### 3.4 Sponsor events

#### `lesson_sponsor_impression`

GET served with active sponsor.

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `sponsor_slug` | string | yes |
| `sponsor_tier` | number | yes |

---

#### `lesson_sponsor_cta_click`

User tapped sponsor secondary action.

| Property | Type | Required |
|----------|------|----------|
| `lesson_id` | string | yes |
| `sponsor_slug` | string | yes |
| `cta_url` | string | yes (domain only, not full path with params) |

---

### 3.5 Curriculum-level events

#### `curriculum_started`

First `lesson_completed` for a wallet (any lesson).

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `entry_lesson_id` | string | yes |
| `locale` | string | yes |
| `campaign_ref` | string | no |

---

#### `curriculum_graduated`

Lesson 5 completed.

| Property | Type | Required |
|----------|------|----------|
| `wallet_id` | string | yes |
| `days_to_complete` | number | yes |
| `locale` | string | yes |

---

## 4. Funnel definitions

### Primary funnel (PostHog insight)

```
lesson_blink_opened (L1)
  → lesson_action_tapped (L1)
  → lesson_tx_built (L1)
  → lesson_completed (L1)
  → lesson_completed (L2)
  → lesson_completed (L3)
  → lesson_completed (L4)
  → graduation_minted
```

### Turkey pilot dashboard

| Chart | Events |
|-------|--------|
| TR vs EN split | `locale` breakdown on `lesson_blink_opened` |
| Remittance engagement | L3 `lesson_action_tapped` / `lesson_blink_opened` |
| Sponsor ROI | `lesson_sponsor_impression` → `lesson_completed` |
| Drop-off | `lesson_failed` by `error_stage` |

---

## 5. Implementation

### Server emit helper

```typescript
// src/lib/analytics/emit.ts
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.POSTHOG_API_KEY!);

export function emit(
  event: string,
  properties: Record<string, unknown>,
  distinctId?: string,
) {
  if (process.env.ANALYTICS_ENABLED !== "true") return;

  posthog.capture({
    distinctId: distinctId ?? properties.wallet_id ?? "anonymous",
    event,
    properties: {
      ...properties,
      product: "lessonblinks",
      schema_version: 1,
    },
  });
}
```

### Call sites

| Location | Event |
|----------|-------|
| GET handler (start) | `lesson_blink_opened` |
| POST handler (success) | `lesson_tx_built` |
| `/complete` (verified) | `lesson_completed` |
| `/complete` (catch) | `lesson_failed` |
| `graduation/route.ts` | `graduation_*` |
| `api/faucet/usdc` | `faucet_requested` |

---

## 6. Webhook payload (V2)

For sponsor Slack/email reports:

```json
{
  "event": "lesson_completed",
  "timestamp": "2026-06-09T12:00:00Z",
  "data": {
    "lesson_id": "lesson-03",
    "wallet_id": "DRpbCBMx…x7Q2",
    "locale": "tr",
    "sponsor_slug": "partner-fintech",
    "campaign_ref": "trepa-video"
  }
}
```

`LESSON_COMPLETION_WEBHOOK_URL` env triggers on `lesson_completed` and `graduation_minted`.

---

## 7. Retention policy

| Data | Retention |
|------|-----------|
| PostHog events | 12 months |
| `lesson_completions` store | Indefinite server-side; sponsor exports use salted wallet hashes |
| Server logs | 30 days |
| Full signatures | DB only, not analytics |

GDPR/KVKK: wallet pubkey deletion on request → anonymize `wallet` in DB.

---

## 8. Schema versioning

| Version | Date | Changes |
|---------|------|---------|
| 1 | 2026-06-09 | Initial schema |

Breaking changes increment `schema_version` in all events.

---

## 9. Related documents

- [`MONETIZATION.md`](MONETIZATION.md) — sponsor billing metrics
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — `lib/analytics/emit.ts`
- [`GTM.md`](GTM.md) — launch KPIs
