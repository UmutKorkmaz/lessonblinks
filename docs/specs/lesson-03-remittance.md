# Lesson 3 — Send Remittance $0.50 USDC

**Project:** LessonBlinks / BlinkDers  
**Lesson ID:** `lesson-03`  
**Date:** 2026-06-09  
**Status:** Ready for implementation  
**Spec version:** 1.0

---

## One-liner

Lesson 3 teaches cross-border payments by having the learner send **$0.50 USDC** to a demo "family member" wallet — the Turkey-first anchor lesson for diaspora and remittance use cases.

---

## Learning objectives

After completing this blink, the learner should understand:

1. **Remittance** = sending money to someone in another country.
2. USDC on Solana settles in **seconds**, not business days.
3. The same stablecoin works globally (no FX conversion in this demo).
4. Traditional remittance has fees and delays (educational comparison only).

**Prerequisite:** Lessons 1–2 recommended.

---

## Action surface

| Field | Value |
|-------|-------|
| Blink URL | `https://{domain}/lesson/remittance` |
| Action API | `https://{domain}/api/actions/lesson-3-remittance` |
| Callback API | `https://{domain}/api/actions/lesson-3-remittance/complete` |
| Chain | Solana devnet |
| USDC mint | `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU` |
| Send amount | **$0.50 USDC** = `500_000` base units |
| Demo recipient | `REMITTANCE_DEMO_WALLET` env |

---

## Persona copy (Turkey-first)

### English — "Ayşe in Germany"

```
Lesson 3: Send money home

Your cousin Ayşe lives in Germany. You'll send $0.50 USDC — same token,
same network — arriving in seconds instead of 3 business days.

This is a devnet demo. No real remittance service.
```

### Turkish

```
Ders 3: Yurt dışına para gönder

Kuzeniniz Ayşe Almanya'da yaşıyor. 0,50 USDC göndereceksiniz — aynı ağ,
saniyeler içinde. Geleneksel havale günler sürer.

Bu bir devnet demosudur. Gerçek havale hizmeti değildir.
```

### Query param personas

| Param | Recipient label |
|-------|-----------------|
| `?persona=ayse` | Ayşe (Germany) — default TR |
| `?persona=mehmet` | Mehmet (UK) |
| default | Family demo wallet |

---

## Constants

```typescript
export const LESSON_03_ID = "lesson-03" as const;
export const LESSON_03_AMOUNT_USDC = 0.5;
export const LESSON_03_AMOUNT_BASE = 500_000;

export const REMITTANCE_DEMO_WALLET = process.env.REMITTANCE_DEMO_WALLET!;

/** Optional memo for indexing */
export const LESSON_03_MEMO = JSON.stringify({
  v: 1,
  course: "lessonblinks-101",
  lesson: 3,
  type: "remittance",
});
```

---

## Explainer metadata

```typescript
export const LESSON_03_EXPLAINER: LessonExplainerMetadata = {
  lessonId: "lesson-03",
  lessonNumber: 3,
  slug: "remittance",
  durationSeconds: 45,
  prerequisites: ["lesson-01", "lesson-02"],
  learningObjectives: [
    "Define remittance as cross-border money transfer",
    "Send USDC to a recipient wallet address",
    "Compare speed vs traditional wire at high level",
  ],
  explainer: {
    headline: "Send USDC remittance",
    summary: "Millions send money home every month. USDC on Solana is fast and global.",
    steps: [
      { order: 1, title: "Connect wallet", body: "Your USDC is ready from earlier lessons." },
      { order: 2, title: "Review send", body: "Exactly $0.50 USDC to the demo recipient." },
      { order: 3, title: "Confirm", body: "Funds arrive in the recipient's wallet in seconds." },
    ],
    callout: "Educational demo only — not a licensed money transmitter.",
  },
  completion: {
    badgeLabel: "Remittance Ready",
    successTitle: "Lesson 3 complete — you sent $0.50 USDC!",
    successDescription: "You completed a cross-border USDC transfer demo. Next: learn swaps.",
    nextLessonActionHref: "/api/actions/lesson-4-swap",
  },
};
```

---

## GET handler

```typescript
const payload: LessonActionGetResponse = {
  type: "action",
  icon: new URL("/lessons/03/icon.png", origin).toString(),
  title: t("lesson03.title", locale),
  description: buildRemittanceDescription(persona, locale),
  label: t("lesson03.label", locale), // "Send $0.50 USDC"
  links: {
    actions: [
      {
        type: "transaction",
        label: t("lesson03.action", locale),
        href: `${baseHref}&amount=0.5`,
      },
    ],
  },
  lesson: LESSON_03_EXPLAINER,
};
```

---

## POST handler

### Transaction composition

1. `createAssociatedTokenAccountIdempotentInstruction` (recipient ATA)
2. `createTransferCheckedInstruction` — 500_000 USDC
3. Optional: `createMemoInstruction(LESSON_03_MEMO)` for Helius indexing
4. Fee payer = sponsor

```typescript
import { createMemoInstruction } from "@solana/spl-memo";

const instructions = [
  createAssociatedTokenAccountIdempotentInstruction(...),
  createTransferCheckedInstruction(
    senderAta,
    DEVNET_USDC_MINT,
    recipientAta,
    account,
    LESSON_03_AMOUNT_BASE,
    6,
  ),
  createMemoInstruction(LESSON_03_MEMO, [account]),
];
```

### Validation

| Check | Error |
|-------|-------|
| `amount !== 0.5` | `Lesson 3 requires exactly $0.50 USDC` |
| Insufficient USDC | `You need at least $0.50 USDC` |
| Invalid recipient | `Invalid input query parameter: to` |

---

## Complete callback

### Verification

1. Signature confirmed/finalized
2. Parsed tx includes USDC transfer:
   - `amount === 500_000`
   - `mint === 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
   - Recipient === `REMITTANCE_DEMO_WALLET` (or validated `?to=`)
3. Optional: memo contains `"type":"remittance"`

### Analytics

```typescript
emit("lesson_completed", {
  lesson_id: "lesson-03",
  amount_usdc: 0.5,
  locale,
  campaign_ref: ref,
});
```

---

## actions.json

```json
{
  "pathPattern": "/lesson/remittance",
  "apiPath": "/api/actions/lesson-3-remittance"
}
```

### dial.to URL

```
https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-3-remittance?locale=tr
```

---

## Sponsor slot (Tier 1 — Remittance)

Ideal sponsor: cross-border fintech, Turkish neobank, stablecoin corridor provider.

Co-brand copy example:

> Sponsored by {Partner}. See how fast global USDC transfers can be.

---

## Legal disclaimer (required in GET description)

**EN:** Educational demo only. BlinkDers does not provide remittance services.

**TR:** Eğitim amaçlı demodur. BlinkDers havale hizmeti sunmaz.

---

## Testing checklist

| # | Test | Expected |
|---|------|----------|
| 1 | GET EN | Ayşe persona copy |
| 2 | GET `?locale=tr` | Turkish havale copy |
| 3 | POST `amount=1` | 400 |
| 4 | POST valid | 500_000 USDC + optional memo |
| 5 | Complete | Badge "Remittance Ready" |
| 6 | Wrong recipient tx | 400 verify fail |
| 7 | SF Turkey demo | Screen record for grant |

---

## Dialect registry

| Field | Value |
|-------|-------|
| Title | BlinkDers 3: Send USDC Remittance Demo |
| Description | Learn cross-border USDC in 30 seconds. Turkey-first remittance lesson. |
| Category | Education / Payments |

---

## Out of scope

- Real fiat off-ramp
- KYC / compliance flow
- FX rate display
- Multiple recipient selection UI