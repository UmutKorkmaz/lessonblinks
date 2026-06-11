# Lesson 2 — Tip a Creator $0.10 USDC

**Project:** LessonBlinks / BlinkDers  
**Lesson ID:** `lesson-02`  
**Date:** 2026-06-09  
**Status:** Ready for implementation  
**Spec version:** 1.0

---

## One-liner

Lesson 2 teaches peer-to-peer USDC payments by having the learner tip a creator **$0.10 USDC** via a Solana Action Blink — reinforcing the USDC-first curriculum (not native SOL).

---

## Learning objectives

After completing this blink, the learner should understand:

1. USDC can be sent to **another person** (not just self-transfer).
2. Tipping is a micropayment with no bank intermediary.
3. Creators can receive payments directly to their wallet address.
4. Social Blinks embed payments in feeds (X, dial.to).

**Prerequisite:** Lesson 1 recommended; no hard gate in MVP.

---

## Action surface

| Field | Value |
|-------|-------|
| Blink URL | `https://{domain}/lesson/tip-creator-sol` |
| Action API | `https://{domain}/api/actions/lesson-2-tip` |
| Callback API | `https://{domain}/api/actions/lesson-2-tip/complete` |
| Chain | Solana devnet |
| USDC mint | `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU` |
| Tip amount | **$0.10 USDC** = `100_000` base units |
| Creator recipient | `CREATOR_WALLET_PUBKEY` env (override `?to=`) |

---

## Constants

```typescript
export const LESSON_02_ID = "lesson-02" as const;
export const LESSON_02_TIP_USDC = 0.1;
export const LESSON_02_TIP_BASE = 100_000;

export const CREATOR_WALLET_PUBKEY =
  process.env.CREATOR_WALLET_PUBKEY ??
  process.env.NEXT_PUBLIC_CREATOR_WALLET_PUBKEY;
```

---

## Explainer metadata

```typescript
export const LESSON_02_EXPLAINER: LessonExplainerMetadata = {
  lessonId: "lesson-02",
  lessonNumber: 2,
  slug: "tip-creator",
  durationSeconds: 30,
  prerequisites: ["lesson-01"],
  learningObjectives: [
    "Send USDC to another wallet (a creator)",
    "Understand tipping as instant micropayments",
    "Complete a real onchain tip in one tap",
  ],
  explainer: {
    headline: "Tip a creator with USDC",
    summary:
      "Creators earn when fans tip directly. USDC tips land in seconds — no platform holding your money.",
    steps: [
      { order: 1, title: "Connect wallet", body: "Your wallet holds USDC from Lesson 1." },
      { order: 2, title: "Review tip", body: "You'll send exactly $0.10 USDC to the creator." },
      { order: 3, title: "Confirm", body: "The tip reaches the creator's wallet instantly." },
    ],
    callout: "Gas fee sponsored by LessonBlinks / BlinkDers.",
    glossary: {
      USDC: "Dollar-pegged stablecoin on Solana.",
      Tip: "A small voluntary payment to support a creator.",
    },
  },
  completion: {
    badgeLabel: "Creator Supporter",
    successTitle: "Lesson 2 complete — you tipped $0.10 USDC!",
    successDescription: "You supported a creator with a real USDC payment. Next: send a remittance.",
    nextLessonActionHref: "/api/actions/lesson-3-remittance",
  },
};
```

### Turkish copy

```typescript
export const LESSON_02_EXPLAINER_TR = {
  headline: "USDC ile içerik üreticisine bahşiş verin",
  summary: "Hayranlar doğrudan bahşiş verdiğinde içerik üreticileri kazanır.",
  label: "0,10 USDC Bahşiş Ver",
};
```

---

## GET handler

### Query parameters

| Param | Required | Description |
|-------|----------|-------------|
| `to` | No | Creator pubkey; defaults to `CREATOR_WALLET_PUBKEY` |
| `locale` | No | `en` \| `tr` |
| `ref` | No | Campaign id |

### Response shape

```typescript
const payload: LessonActionGetResponse = {
  type: "action",
  icon: new URL("/lessons/02/icon.png", origin).toString(),
  title: locale === "tr" ? "Ders 2 · İçerik Üreticisine Bahşiş" : "Lesson 2 · Tip a creator $0.10 USDC",
  description: buildDescription(LESSON_02_EXPLAINER, locale),
  label: "Tip $0.10 USDC",
  links: {
    actions: [
      {
        type: "transaction",
        label: locale === "tr" ? "0,10 USDC Bahşiş Ver" : "Tip $0.10 USDC",
        href: `${baseHref}&amount=0.1`,
      },
    ],
  },
  lesson: LESSON_02_EXPLAINER,
};
```

---

## POST handler

### Steps

1. Validate `account`, `to`, `amount === 0.1`.
2. Check sender USDC balance ≥ `100_000`.
3. Ensure creator USDC ATA exists (idempotent create; sponsor pays).
4. Build `createTransferCheckedInstruction`.
5. Sponsor as fee payer.
6. Return tx with `links.next` → `/complete`.

### Validation

| Check | Error |
|-------|-------|
| `amount !== 0.1` | `Lesson 2 requires a $0.10 USDC tip` |
| Missing creator env | `Creator wallet not configured` |
| Insufficient USDC | `You need at least $0.10 USDC` |

---

## Complete callback

### On-chain verification

Assert parsed transaction contains:

- SPL Token `transfer` or `transferChecked`
- `mint === 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
- `amount === 100_000`
- `destination` owner === creator pubkey
- `authority` === learner `account`

### Success payload

```typescript
{
  type: "completed",
  title: "Lesson 2 complete — you tipped $0.10 USDC!",
  label: "Creator Supporter",
  lesson: {
    lessonId: "lesson-02",
    lessonNumber: 2,
    completed: true,
    signature,
    nextLessonActionHref: "/api/actions/lesson-3-remittance",
  },
}
```

---

## actions.json

```json
{
  "pathPattern": "/lesson/tip-creator-sol",
  "apiPath": "/api/actions/lesson-2-tip"
}
```

---

## Sponsor integration (Tier 1 slot)

Lesson 2 ideal for **creator platform** sponsor:

- Co-brand GET description
- `CREATOR_WALLET_PUBKEY` = partner creator for campaign week
- Analytics: `lesson_sponsor_impression` with `sponsor_slug`

---

## Testing checklist

| # | Test | Expected |
|---|------|----------|
| 1 | GET | Single tip action, USDC copy (not SOL) |
| 2 | POST `amount=0.2` | 400 |
| 3 | POST valid | 100_000 USDC transfer tx |
| 4 | Complete | Verifies USDC to creator |
| 5 | `?locale=tr` | Turkish strings |
| 6 | dial.to | Interstitial + sign |
| 7 | Gas sponsor | User with 0 SOL succeeds |

---

## Dialect registry

| Field | Value |
|-------|-------|
| Title | LessonBlinks 2: Tip a Creator $0.10 USDC |
| Description | 30-second lesson — support a creator with USDC. Gas sponsored. |
| Action URL | `https://{domain}/api/actions/lesson-2-tip` |

---

## Out of scope

- Custom tip amounts
- Platform fee splits
- SOL tips (replaced by USDC-first decision)
- Creator discovery UI