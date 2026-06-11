# LessonBlinks Curriculum

**Product:** LessonBlinks (EN) · BlinkDers (TR)
**Format:** 5 Solana Action Blinks · ~30 seconds each
**Network:** Solana devnet (MVP)
**USDC mint (devnet):** `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`

---

## 1. Pedagogical philosophy

Traditional crypto onboarding fails because it front-loads abstract concepts (keys, gas, DeFi) before the user experiences value. LessonBlinks inverts that order:

1. **Payments first** — USDC feels like money users already understand (lira, dollars).
2. **Social context second** — tipping creators mirrors Instagram/YouTube behavior.
3. **Remittance third** — resonates immediately in Turkey (diaspora, cross-border family sends).
4. **DeFi last** — swap only after the user trusts transfers.
5. **Credential capstone** — graduation NFT makes progress tangible and shareable.

**Turkey-first ordering** is not arbitrary: Lessons 1–3 map to the highest-intent use cases for Turkish mainstream users (payments, creators, remittance) before introducing token volatility and DEX routing.

---

## 2. Curriculum map

| # | Slug | Action | Amount | Concept | Turkey relevance |
|---|------|--------|--------|---------|------------------|
| 1 | `tip-usdc` | Send USDC to education wallet | 0.01 USDC | SPL tokens, stablecoins, ATAs | Dollar savings without bank FX spread |
| 2 | `tip-creator-sol` | Tip a creator | 0.001 SOL | Native SOL, lamports, creator economy | TR creator tipping culture (Twitch, YouTube TR) |
| 3 | `remittance` | Send USDC to family wallet | 0.05 USDC | Cross-border transfers, speed | #1 remittance corridor pain point (TR ↔ EU/US) |
| 4 | `swap-sol-usdc` | Swap SOL → USDC demo | 0.01 SOL | DEX, Jupiter, slippage | Introduce DeFi after payment fluency |
| 5 | `claim-graduation-nft` | Claim badge NFT | Sponsored | NFT credentials, ownership | Shareable proof for LinkedIn / X TR community |

**Total user cost (devnet):** ~$1.60 USDC + 0.01 SOL + negligible fees (sponsored where possible).

---

## 3. Lesson 1 — Send $1 USDC

**Blink URL:** `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-1-usdc`
**Spec:** [`specs/lesson-01-usdc-transfer.md`](specs/lesson-01-usdc-transfer.md)

### Learning objectives

After completing Lesson 1, the learner can:

1. Explain what USDC is (a dollar-pegged stablecoin on Solana).
2. Identify their wallet address and a second "receive" address.
3. Complete an SPL token transfer in one tap.
4. Recognize that a **token account (ATA)** may be created automatically.

### Key copy (EN)

> **Lesson 1:** Send $1 USDC to your savings address. USDC stays close to $1 — unlike volatile coins. You're learning payments, not trading.

### Key copy (TR — BlinkDers)

> **Ders 1:** 1 USDC'yi birikim adresinize gönderin. USDC, 1 dolara yakın kalır — bu bir ödeme dersi, yatırım değil.

### Prerequisites

- Wallet connected (Privy embedded or Phantom)
- Devnet USDC from project faucet or Circle faucet

### Completion criteria

- Verified `TransferChecked` or `Transfer` instruction for 1 USDC (1_000_000 base units, 6 decimals)
- Completion callback returns badge: **USDC Sender**

---

## 4. Lesson 2 — Tip a creator $0.10 USDC

**Blink URL:** `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-2-tip`
**Spec:** [`specs/lesson-02-tip-creator.md`](specs/lesson-02-tip-creator.md)

### Learning objectives

After completing Lesson 2, the learner can:

1. Send USDC to **another person's wallet** (not self-transfer).
2. Understand tipping as a micropayment with no bank intermediary.
3. See how Blinks embed payments in social feeds.

### Key copy (EN)

> **Lesson 2:** Tip a creator $0.10 USDC. Your tip lands in seconds — no 3-day bank hold, no 5% platform cut on this demo.

### Key copy (TR)

> **Ders 2:** Bir içerik üreticisine 0,10 USDC bahşiş verin. Bahşiş saniyeler içinde ulaşır — banka günleri yok.

### Prerequisites

- Lesson 1 recommended (not hard-gated in MVP)

### Completion criteria

- Verified USDC transfer of 100_000 base units to `CREATOR_WALLET_PUBKEY`
- Badge: **Creator Supporter**

---

## 5. Lesson 3 — Send remittance $0.50 USDC

**Blink URL:** `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-3-remittance`
**Spec:** [`specs/lesson-03-remittance.md`](specs/lesson-03-remittance.md)

### Learning objectives

After completing Lesson 3, the learner can:

1. Describe remittance as sending money across borders.
2. Compare speed/cost vs traditional wire (Western Union, bank SWIFT) at a high level.
3. Send USDC to a pre-filled "family member" demo wallet.

### Key copy (EN)

> **Lesson 3:** Send $0.50 USDC to Ayşe in Germany. Same token, same network — arrives in seconds, not 3 business days.

### Key copy (TR)

> **Ders 3:** Almanya'daki Ayşe'ye 0,50 USDC gönderin. Aynı ağ, saniyeler içinde — SWIFT değil, Solana.

### Turkey context

- Frame recipient as diaspora family (Almanya, Hollanda, UK common TR corridors).
- Optional `?recipient=ayse` persona with localized explainer.
- Pairs with SF Turkey grant narrative: **real-world payments for real people**.

### Prerequisites

- Lessons 1–2 recommended

### Completion criteria

- Verified USDC transfer of 500_000 base units to demo remittance wallet
- Memo instruction optional: `{"lesson":"03","type":"remittance"}`
- Badge: **Remittance Ready**

---

## 6. Lesson 4 — Swap 0.01 SOL → USDC

**Blink URL:** `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-4-swap`
**Spec:** [`specs/lesson-04-swap.md`](specs/lesson-04-swap.md)

### Learning objectives

After completing Lesson 4, the learner can:

1. Define a **swap** (trade one token for another).
2. Name **Jupiter** as a route aggregator across Solana DEXs.
3. Understand **slippage** and network fees at a beginner level.
4. Explain why Lesson 4 comes *after* payments (DeFi is optional; payments are universal).

### Key copy (EN)

> **Lesson 4:** Swap a tiny 0.01 SOL into USDC. You've mastered sending — now learn how to convert between tokens.

### Key copy (TR)

> **Ders 4:** 0,01 SOL'u USDC'ye çevirin. Göndermeyi öğrendiniz — şimdi token dönüşümü.

### Network note

Jupiter liquidity is mainnet-native. MVP options:

- **Devnet:** Mock swap lesson with pre-funded USDC credit (educational simulation flag).
- **Mainnet (flagged):** Real 0.01 SOL swap when `ENABLE_MAINNET=true`.

Default MVP path: devnet mock + mainnet opt-in for advanced users.

### Prerequisites

- Lessons 1–3 complete (soft gate: warn if incomplete)
- ≥ 0.02 SOL for swap + fees (devnet faucet)

### Completion criteria

- Jupiter swap tx confirmed OR devnet mock completion recorded
- Badge: **Swapped**

---

## 7. Lesson 5 — Claim graduation NFT

**Blink URL:** `https://dial.to/?action=solana-action:https://{domain}/api/actions/lesson-5/claim`
**Spec:** [`specs/lesson-05-graduation-nft.md`](specs/lesson-05-graduation-nft.md)

### Learning objectives

After completing Lesson 5, the learner can:

1. Explain NFTs as **wallet-owned credentials** (not just art).
2. Describe compressed NFTs (cheap, scalable mints).
3. Share graduation proof on social media.

### Key copy (EN)

> **Lesson 5:** You finished all four lessons! Claim your Graduate Badge — a real NFT in your wallet, sponsored by LessonBlinks.

### Key copy (TR)

> **Ders 5:** Dört dersi tamamladınız! Mezuniyet rozetinizi alın — cüzdanınızdaki gerçek bir NFT.

### Prerequisites

- **Hard gate:** Lessons 1–4 verified in `lesson_completions` table

### Completion criteria

- Bubblegum cNFT minted to learner wallet
- Badge: **BlinkDers Mezunu** / **LessonBlinks Graduate**

---

## 8. Progression diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Lesson 1   │────►│  Lesson 2   │────►│  Lesson 3   │
│ USDC send   │     │ Tip creator │     │ Remittance  │
│  (payments) │     │  (social)   │     │  (Turkey)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Lesson 4   │
                                        │ Swap SOL    │
                                        │  (DeFi)     │
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Lesson 5   │
                                        │ Graduation  │
                                        │    NFT      │
                                        └─────────────┘
```

---

## 9. Time budget

| Lesson | Read + tap + sign | Total |
|--------|-------------------|-------|
| 1 | 30s | 30s |
| 2 | 30s | 30s |
| 3 | 45s (more copy) | 45s |
| 4 | 45s | 45s |
| 5 | 30s | 30s |
| **Full course** | | **~3 min** |

---

## 10. Assessment rubric (grant / demo)

| Criterion | Pass |
|-----------|------|
| Completion rate L1→L2 | ≥ 60% in pilot cohort |
| Turkey locale usage | ≥ 40% of pilot users choose TR |
| Remittance lesson NPS | ≥ 8/10 on "felt relevant" |
| Graduation mint rate | ≥ 30% of L1 starters claim NFT |
| Inspector compliance | All 5 Actions pass Blinks Inspector |

---

## 11. Out of scope (post-MVP)

- Staking, lending, NFT trading lessons
- Custom amounts per lesson (breaks pedagogy)
- On-chain soulbound credentials
- Mobile native app (Blinks are the app)
- KYC / fiat on-ramp integration

---

## 12. Related documents

- [`PRODUCT-REVIEW.md`](PRODUCT-REVIEW.md) — why USDC-first
- [`TURKEY.md`](TURKEY.md) — grant + Trepa alignment
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — technical implementation
- Per-lesson specs in [`specs/`](specs/)
