# Lesson 4 — Swap 0.01 SOL → USDC

**Project:** LessonBlinks / BlinkDers  
**Lesson ID:** `lesson-04`  
**Date:** 2026-06-09  
**Status:** Ready for implementation  
**Spec version:** 1.0

---

## One-liner

Lesson 4 introduces DeFi by having the learner swap a tiny **0.01 SOL** into USDC via Jupiter — deliberately placed **after** USDC payment lessons (Turkey-first curriculum).

---

## Learning objectives

After completing this blink, the learner should understand:

1. A **swap** trades one token for another on-chain.
2. **USDC** is useful for saving value without SOL volatility.
3. **Jupiter** aggregates routes across Solana DEXs.
4. **Slippage** and network fees affect the final amount.
5. Why swaps come after payments (DeFi is optional; payments are universal).

**Prerequisite:** Lessons 1–3 recommended (soft warning if incomplete).

---

## Action surface

| Field | Value |
|-------|-------|
| Blink URL | `https://{domain}/lesson/04-swap` |
| Action API | `https://{domain}/api/actions/lessons/04-swap` |
| Chain | devnet-mock (MVP) or mainnet-beta (flagged) |
| Swap amount | **0.01 SOL** = `10_000_000` lamports |
| Pair | SOL → USDC |

---

## Network modes

| Mode | Env | Behavior |
|------|-----|----------|
| **devnet-mock** (default) | `LESSON_04_MODE=devnet-mock` | Educational mock: server records completion via faucet credit or simulated memo tx |
| **mainnet** | `LESSON_04_MODE=mainnet`, `ENABLE_MAINNET=true` | Real Jupiter swap 0.01 SOL → USDC |

Jupiter has no devnet liquidity — mock mode is required for pure devnet MVP.

---

## Constants

```typescript
// Mainnet
export const SOL_MINT = "So11111111111111111111111111111111111111112";
export const MAINNET_USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

// Devnet lesson
export const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6";
export const SWAP_AMOUNT_LAMPORTS = 10_000_000;
export const SLIPPAGE_BPS = 100;
export const MIN_SOL_RESERVE_LAMPORTS = 5_000_000;
export const JUPITER_LITE_BASE = "https://lite-api.jup.ag/swap/v1";
```

---

## Explainer metadata

```typescript
export const LESSON_04_EXPLAINER = {
  lessonId: "lesson-04",
  lessonNumber: 4,
  slug: "swap",
  durationSeconds: 45,
  prerequisites: ["lesson-01", "lesson-02", "lesson-03"],
  learningObjectives: [
    "Define swap as trading one token for another",
    "Use Jupiter as a route aggregator",
    "Understand slippage and fees at beginner level",
  ],
  explainer: {
    headline: "Swap SOL to USDC",
    summary:
      "You've mastered sending USDC. Now convert a tiny bit of SOL into USDC using Jupiter.",
    steps: [
      { order: 1, title: "Connect wallet", body: "You need a little SOL for this swap and fees." },
      { order: 2, title: "Review swap", body: "0.01 SOL → approximately USDC (slippage applies)." },
      { order: 3, title: "Confirm", body: "Jupiter finds the best route; you sign once." },
    ],
    callout: "Keep some SOL for future transaction fees.",
  },
  completion: {
    badgeLabel: "Swapped",
    nextLessonActionHref: "/api/actions/lessons/05-graduation-nft",
  },
};
```

### Turkish

```
title: "Ders 4 · SOL'u USDC'ye Çevir"
label: "0,01 SOL Takas Et"
description: USDC göndermeyi öğrendiniz. Şimdi Jupiter ile küçük bir SOL → USDC takası yapın.
```

---

## GET handler

```typescript
const payload: ActionGetResponse = {
  type: "action",
  icon: new URL("/lessons/04/icon.png", origin).toString(),
  title: "Lesson 4 · Swap SOL to USDC",
  description: [
    "A swap trades one token for another.",
    "You'll swap 0.01 SOL into USDC via Jupiter.",
    "Check amounts in your wallet before signing — slippage applies.",
    "",
    mode === "devnet-mock"
      ? "Devnet demo mode: educational simulation."
      : "Mainnet: real funds (~$1–2).",
  ].join("\n"),
  label: "Swap 0.01 SOL",
  disabled: insufficientBalance,
  error: insufficientBalance
    ? { message: "Add ~0.02 SOL total for swap and fees." }
    : undefined,
};
```

Optional: accept `?account=` on GET for preflight balance check.

---

## POST handler — mainnet (Jupiter)

### Pipeline

1. Validate `account` as `PublicKey`
2. `getBalance(account)` ≥ `SWAP_AMOUNT_LAMPORTS + MIN_SOL_RESERVE_LAMPORTS`
3. Jupiter `GET /quote` — SOL → USDC, 0.01 SOL
4. Jupiter `POST /swap` — build `swapTransaction`
5. `VersionedTransaction.deserialize(swapTransaction)`
6. `createPostResponse({ transaction, message })`

```typescript
const quoteParams = new URLSearchParams({
  inputMint: SOL_MINT,
  outputMint: MAINNET_USDC_MINT,
  amount: String(SWAP_AMOUNT_LAMPORTS),
  slippageBps: String(SLIPPAGE_BPS),
  swapMode: "ExactIn",
});

const message = `Swap 0.01 SOL → ~${formatUsdc(quote.outAmount)} USDC via Jupiter.`;
```

### Error taxonomy

| Code | Message |
|------|---------|
| `INVALID_ACCOUNT` | Connect a valid Solana wallet to continue. |
| `INSUFFICIENT_SOL` | You need a bit more SOL for swap and fees. |
| `NO_ROUTE` | No swap route found. Try again later. |
| `QUOTE_FAILED` | Swaps are busy right now. Wait and retry. |

---

## POST handler — devnet-mock

For devnet MVP without Jupiter:

**Option A — Faucet credit (recommended):**

1. Verify user has ≥ 0.01 SOL (educational requirement)
2. Build small `SystemProgram.transfer` or memo tx user signs
3. Server credits 0.01 USDC from faucet to user ATA
4. Record `lesson-04` completion in DB

**Option B — Memo-only:**

```typescript
createMemoInstruction(
  JSON.stringify({ v: 1, course: "lessonblinks-101", lesson: 4, type: "swap-demo" }),
  [account],
);
```

Return message:

> Devnet demo: you signed a lesson completion. 0.01 USDC credited to your wallet.

---

## Completion (V2)

MVP Lesson 4 may omit `/complete` callback. V2 adds:

- `POST /api/actions/lessons/04-swap/complete`
- Verify Jupiter swap instruction in parsed tx (mainnet)
- Or verify memo / faucet credit (devnet)

For graduation prerequisites, record completion in DB on successful POST follow-up or webhook.

---

## File layout

```
src/app/api/actions/lessons/04-swap/route.ts
src/lib/jupiter/swap.ts
src/lib/lessons/lesson-04.ts
src/constants/tokens.ts
```

---

## Security

| Risk | Mitigation |
|------|------------|
| Malicious tx | Only pass through Jupiter response unmodified |
| Oversized swap | Hard-code `10_000_000` lamports |
| API abuse | Rate limit 30 POST/min per IP |

---

## Testing checklist

### devnet-mock

- [ ] GET returns swap explainer
- [ ] POST with funded SOL wallet succeeds
- [ ] POST with empty wallet → `INSUFFICIENT_SOL`
- [ ] Completion recorded for graduation gate

### mainnet (when enabled)

- [ ] Jupiter quote returns route
- [ ] Phantom shows SOL → USDC swap
- [ ] ATA creation included for first USDC receive
- [ ] Inspector pass

---

## Dialect registry

| Field | Value |
|-------|-------|
| Title | LessonBlinks 4: Swap SOL to USDC |
| Description | First swap via Jupiter — 0.01 SOL, beginner-friendly. |
| Note | Disclose devnet-mock vs mainnet in registry notes |

---

## actions.json

```json
{
  "pathPattern": "/lesson/04-swap",
  "apiPath": "/api/actions/lessons/04-swap"
}
```

---

## Out of scope

- Reverse swap USDC → SOL
- Custom amounts
- Limit orders
- Staking (removed from curriculum)