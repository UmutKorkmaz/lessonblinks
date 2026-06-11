# Lesson 2 - Tip a Creator 0.001 SOL

**Project:** LessonBlinks / BlinkDers  
**Lesson ID:** `lesson-02`  
**Date:** 2026-06-11
**Status:** Implemented
**Spec version:** 1.1

---

## One-liner

Lesson 2 teaches native SOL transfers by having the learner tip a creator **0.001 SOL** via a Solana Action Blink. This keeps the course USDC-first, SOL-aware: Lesson 1 starts with stablecoin payments, then Lesson 2 shows the native asset that pays fees.

---

## Learning objectives

After completing this blink, the learner should understand:

1. Native SOL can be sent directly to another wallet.
2. Lamports are the smallest unit of SOL.
3. A creator tip is a micropayment with no bank intermediary.
4. Social Blinks can embed payments in feeds.

**Prerequisite:** Lesson 1 recommended; no hard gate in MVP.

---

## Action surface

| Field | Value |
|-------|-------|
| Blink URL | `https://{domain}/lesson/tip-creator-sol` |
| Action API | `https://{domain}/api/actions/lesson-2-tip` |
| Callback API | `https://{domain}/api/actions/lesson-2-tip/complete` |
| Chain | Solana devnet |
| Tip amount | **0.001 SOL** = `1_000_000` lamports |
| Creator recipient | `CREATOR_WALLET_PUBKEY` env, overrideable with `?to=` |

---

## Constants

```typescript
export const LESSON_02_ID = "lesson-02" as const;
export const LESSON_02_TIP_SOL = 0.001;
export const LESSON_02_TIP_LAMPORTS = 1_000_000;

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
  slug: "tip-creator-sol",
  durationSeconds: 30,
  prerequisites: ["lesson-01"],
  learningObjectives: [
    "Send native SOL (not USDC) to another wallet",
    "Recognize lamports as the smallest unit of SOL",
    "Complete a real onchain tip in one tap",
  ],
  explainer: {
    headline: "Tip a creator with native SOL",
    summary:
      "SOL is Solana's native currency. Tipping sends lamports directly from your wallet to a creator - no token account required.",
    steps: [
      { order: 1, title: "Connect your wallet", body: "Your wallet holds SOL and signs the transfer." },
      { order: 2, title: "Review the tip", body: "You'll send exactly 0.001 SOL plus a small network fee." },
      { order: 3, title: "Confirm onchain", body: "The tip lands in the creator's wallet in seconds." },
    ],
    callout:
      "1 SOL = 1,000,000,000 lamports. This lesson sends 1,000,000 lamports.",
    glossary: {
      SOL: "Solana's native token used for fees and transfers.",
      Lamports: "Smallest unit of SOL.",
      "Network fee": "Small SOL cost paid to validators for processing your transaction.",
    },
  },
  completion: {
    badgeLabel: "SOL Tipper",
    successTitle: "Lesson 2 complete - you tipped 0.001 SOL!",
    successDescription:
      "You just made a native SOL transfer on Solana. Next up: send a cross-border remittance in Lesson 3.",
    nextLessonActionHref: "/api/actions/lesson-3-remittance",
  },
};
```

### Turkish copy

```typescript
export const LESSON_02_EXPLAINER_TR = {
  headline: "Native SOL ile icerik ureticisine bahsis verin",
  summary:
    "SOL, Solana aginin native para birimidir. Bahsis lamportlari dogrudan cuzdaninizdan icerik ureticisinin adresine tasir.",
  label: "0,001 SOL Bahsis Ver",
};
```

---

## GET handler

### Query parameters

| Param | Required | Description |
|-------|----------|-------------|
| `to` | No | Creator pubkey; defaults to `CREATOR_WALLET_PUBKEY` |
| `amount` | No | Must equal `0.001` when supplied |
| `lang` | No | Locale code |
| `ref` | No | Campaign id |

### Response shape

```typescript
const payload: LessonActionGetResponse = {
  type: "action",
  icon: new URL("/icon.svg", origin).toString(),
  title: "Lesson 2: Tip a creator 0.001 SOL",
  description: buildDescription(LESSON_02_EXPLAINER, locale),
  label: "Tip 0.001 SOL",
  links: {
    actions: [
      {
        type: "transaction",
        label: "Tip 0.001 SOL",
        href: `${baseHref}&amount=0.001`,
      },
    ],
  },
  lesson: LESSON_02_EXPLAINER,
};
```

---

## POST handler

### Steps

1. Validate `account`, `to`, and `amount === 0.001` when `amount` is supplied.
2. Build a native SOL `SystemProgram.transfer`.
3. Transfer exactly `1_000_000` lamports from learner to creator.
4. Use the learner as fee payer so the wallet preview shows the network fee.
5. Return the serialized transaction with `links.next` -> `/complete`.

### Validation

| Check | Error |
|-------|-------|
| `amount !== 0.001` | `Lesson 2 requires a 0.001 SOL tip` |
| Missing creator env | `Creator wallet not configured` |
| Invalid sender account | `Invalid "account" provided` |

---

## Complete callback

### On-chain verification

Assert the parsed transaction contains:

- `SystemProgram.transfer`
- `lamports === 1_000_000`
- `source === learner account`
- `destination === CREATOR_WALLET_PUBKEY` or validated `to` override

### Success payload

```typescript
{
  type: "completed",
  title: "Lesson 2 complete - you tipped 0.001 SOL!",
  label: "SOL Tipper",
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

Lesson 2 is ideal for a **creator platform** or wallet sponsor:

- Co-brand GET description
- `CREATOR_WALLET_PUBKEY` = partner creator for campaign week
- Analytics: `lesson_sponsor_impression` with `sponsor_slug`

---

## Testing checklist

| # | Test | Expected |
|---|------|----------|
| 1 | GET | Single tip action, SOL copy |
| 2 | POST `amount=0.002` | 400 |
| 3 | POST valid | `1_000_000` lamport transfer tx |
| 4 | Complete | Verifies SOL transfer to creator |
| 5 | `?lang=tr` | Turkish strings |
| 6 | dial.to | Interstitial + sign |
| 7 | Fee preview | Wallet shows 0.001 SOL plus network fee paid by the learner |

---

## Dialect registry

| Field | Value |
|-------|-------|
| Title | LessonBlinks 2: Tip a Creator 0.001 SOL |
| Description | 30-second lesson - support a creator with native SOL. |
| Action URL | `https://{domain}/api/actions/lesson-2-tip` |

---

## Out of scope

- Custom tip amounts
- Platform fee splits
- USDC creator tips
- Creator discovery UI
