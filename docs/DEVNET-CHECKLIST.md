# LessonBlinks — Devnet Testing Checklist

**Product:** LessonBlinks / BlinkDers  
**Network:** Solana devnet  
**USDC mint:** `4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6`  
**Last updated:** 2026-06-09

Complete this checklist before Dialect registry submission. All tests assume `SOLANA_CLUSTER=devnet`.

---

## 0. Environment setup

### 0.1 Prerequisites

- [ ] Node.js 20+ installed
- [ ] Phantom or Backpack wallet with **devnet** enabled
- [ ] Project cloned and `npm install` complete
- [ ] `.env.local` configured (see ARCHITECTURE.md §11)

### 0.2 Required env vars

```bash
SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=...
SOLANA_CLUSTER=devnet
DEVNET_USDC_MINT=4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6
FEE_PAYER_SECRET_KEY=<base58>
FAUCET_AUTHORITY_SECRET_KEY=<base58>
CREATOR_WALLET_PUBKEY=<base58>
REMITTANCE_DEMO_WALLET=<base58>
ENABLE_GAS_SPONSOR=true
ANALYTICS_ENABLED=false  # optional for local
```

### 0.3 Wallet funding

| Wallet | Devnet SOL | Devnet USDC |
|--------|------------|-------------|
| Test user wallet | ≥ 0.1 SOL (faucet) | ≥ 2 USDC (project faucet or Circle) |
| Fee payer | ≥ 0.5 SOL | — |
| Faucet authority | ≥ 10 USDC | Circle faucet |
| Mint authority (L5) | ≥ 0.5 SOL | — |

**Faucets:**

- SOL: `solana airdrop 1 <pubkey> --url devnet` or [faucet.solana.com](https://faucet.solana.com/)
- USDC: [faucet.circle.com](https://faucet.circle.com/) → Solana devnet

### 0.4 Start local server

```bash
npm run dev
# Server at http://localhost:3000
```

- [ ] Server starts without env validation errors
- [ ] `curl http://localhost:3000/actions.json` returns 5 rules

---

## 1. Global infrastructure tests

### 1.1 actions.json

```bash
curl -s http://localhost:3000/actions.json | jq '.rules | length'
# Expected: 5
```

- [ ] 5 path rules present
- [ ] `OPTIONS` on `/actions.json` returns CORS headers (if routed)

### 1.2 CORS (all routes)

For each endpoint below, run:

```bash
curl -sI -X OPTIONS "http://localhost:3000/api/actions/lessons/01-usdc-transfer" \
  | grep -i access-control-allow-origin
# Expected: *
```

- [ ] `01-usdc-transfer` + `/complete`
- [ ] `02-tip-creator` + `/complete`
- [ ] `03-remittance` + `/complete`
- [ ] `04-swap`
- [ ] `05-graduation-nft` + `/complete`

### 1.3 Blinks Inspector

Open [blinks.xyz/inspector](https://www.blinks.xyz/inspector).

- [ ] Inspector loads without login issues
- [ ] Can paste localhost URL (or use ngrok/cloudflare tunnel for remote Inspector)

**Tunnel (if needed):**

```bash
npx ngrok http 3000
# Use https://xxxx.ngrok.io/api/actions/lessons/...
```

---

## 2. Lesson 1 — USDC Transfer ($1)

**Endpoint:** `/api/actions/lessons/01-usdc-transfer`

### 2.1 GET

```bash
curl -s "http://localhost:3000/api/actions/lessons/01-usdc-transfer" | jq '{type, title, label}'
```

- [ ] `type` = `"action"`
- [ ] Title contains "Lesson 1" or "Ders 1"
- [ ] `lesson` block present with `lessonId: "lesson-01"`
- [ ] Icon URL resolves (200 OK)
- [ ] `?locale=tr` returns Turkish title

### 2.2 POST

- [ ] Inspector: connect devnet wallet with ≥ 1 USDC
- [ ] POST returns base64 serialized transaction
- [ ] Wallet preview shows **1 USDC** transfer
- [ ] Fee payer is sponsor pubkey (not user) when `ENABLE_GAS_SPONSOR=true`
- [ ] Transaction confirms on [Explorer devnet](https://explorer.solana.com/?cluster=devnet)

### 2.3 Complete callback

- [ ] After confirm, client POSTs to `/complete` with signature
- [ ] Response `type` = `"completed"`
- [ ] Badge label: "USDC Sender"
- [ ] Re-submitting same signature → 400 or idempotent success
- [ ] Wrong amount tx signature → 400 `Transaction does not match lesson requirements`

### 2.4 Error cases

- [ ] POST with invalid `account` → 400
- [ ] POST with `?amount=2` → 400 (fixed amount enforcement)
- [ ] Wallet with 0 USDC → helpful error message

---

## 3. Lesson 2 — Tip Creator ($0.10 USDC)

**Endpoint:** `/api/actions/lessons/02-tip-creator`

### 3.1 GET

- [ ] Title: tip creator $0.10 USDC (not SOL)
- [ ] Single linked action with fixed amount
- [ ] `lesson.learningObjectives` mentions USDC tip

### 3.2 POST

- [ ] Transfer 100_000 USDC base units to `CREATOR_WALLET_PUBKEY`
- [ ] Gas sponsored
- [ ] `links.next.href` points to `/complete`

### 3.3 Complete

- [ ] Verifies USDC transfer to creator
- [ ] Badge: "Creator Supporter"
- [ ] `nextLessonActionHref` points to Lesson 3

### 3.4 Blinks Inspector (primary — dial.to currently down)

Use [blinks.xyz/inspector](https://www.blinks.xyz/inspector) with `?url=` deep-link or paste the Action URL.

### 3.5 dial.to (optional — when Dialect interstitial is back online)

```
https://dial.to/?action=solana-action:http://localhost:3000/api/actions/lessons/02-tip-creator
```

- [ ] Interstitial renders (use tunnel URL in production)

---

## 4. Lesson 3 — Remittance ($0.50 USDC)

**Endpoint:** `/api/actions/lessons/03-remittance`

### 4.1 GET

- [ ] Description mentions remittance / havale (TR locale)
- [ ] Demo recipient persona (Ayşe) in copy
- [ ] `lesson_id: "lesson-03"`

### 4.2 POST

- [ ] Transfer 500_000 USDC base units to `REMITTANCE_DEMO_WALLET`
- [ ] Optional memo instruction present
- [ ] Gas sponsored

### 4.3 Complete

- [ ] Verifies amount + recipient + mint `4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6`
- [ ] Badge: "Remittance Ready"

### 4.4 Turkey copy

- [ ] `?locale=tr` — Turkish description renders correctly
- [ ] No untranslated English fragments in TR mode

---

## 5. Lesson 4 — Swap (0.01 SOL → USDC)

**Endpoint:** `/api/actions/lessons/04-swap`

### 5.1 Devnet mode (mock)

When `LESSON_04_MODE=devnet-mock` (default MVP):

- [ ] GET explains swap concept + Jupiter
- [ ] POST returns educational mock tx OR credits USDC from faucet
- [ ] User learns swap UI flow without mainnet funds

### 5.2 Mainnet mode (optional)

When `ENABLE_MAINNET=true` and `LESSON_04_MODE=mainnet`:

- [ ] Jupiter quote returns route for 0.01 SOL → USDC
- [ ] POST returns VersionedTransaction
- [ ] Wallet shows swap preview
- [ ] Insufficient SOL → friendly error

### 5.3 Common

- [ ] Fixed 0.01 SOL — reject other amounts
- [ ] CORS + Inspector pass

---

## 6. Lesson 5 — Graduation NFT

**Endpoint:** `/api/actions/lessons/05-graduation-nft`

### 6.1 Prerequisites

Seed test wallet completions:

```sql
INSERT INTO lesson_completions (wallet, lesson_id, signature, verified)
VALUES
  ('<TEST_WALLET>', 'lesson-01', 'sig1', true),
  ('<TEST_WALLET>', 'lesson-02', 'sig2', true),
  ('<TEST_WALLET>', 'lesson-03', 'sig3', true),
  ('<TEST_WALLET>', 'lesson-04', 'sig4', true);
```

### 6.2 GET — eligible wallet

- [ ] `?account=<TEST_WALLET>` shows "Claim Badge" enabled
- [ ] Icon: graduation badge PNG

### 6.3 GET — ineligible wallet

- [ ] Fresh wallet → `disabled: true` with prerequisite message
- [ ] Shows progress "0/4" or similar

### 6.4 POST — mint

- [ ] Returns signable transaction
- [ ] Fee payer = mint authority (sponsored)
- [ ] User signs → cNFT appears in Phantom collectibles (devnet)
- [ ] `graduates` table row created

### 6.5 GET — already claimed

- [ ] Second GET returns `type: "completed"`
- [ ] Explorer link to asset

### 6.6 POST — already claimed

- [ ] Returns 409 `Already claimed`

---

## 7. Gas sponsorship verification

- [ ] User with **0 SOL** but ≥ 2 USDC completes Lesson 1 (sponsor pays fee)
- [ ] Sponsor balance decreases after each sponsored tx
- [ ] `SPONSOR_DAILY_LAMPORTS_CAP` blocks excessive requests (429)

---

## 8. Faucet API

**Endpoint:** `POST /api/faucet/usdc`

```bash
curl -X POST http://localhost:3000/api/faucet/usdc \
  -H "Content-Type: application/json" \
  -d '{"wallet":"<PUBKEY>"}'
```

- [ ] Returns 5 USDC on first request
- [ ] Second request same wallet within 24h → 429
- [ ] Mainnet guard rejects if `SOLANA_CLUSTER != devnet`

---

## 9. Privy landing (BlinkDers /tr)

- [ ] `/tr` or `?locale=tr` landing loads BlinkDers branding
- [ ] Email signup creates embedded wallet
- [ ] Wallet pubkey displayed
- [ ] "Start Lesson 1" links to dial.to or embedded blink

---

## 10. Analytics (if enabled)

- [ ] `lesson_blink_opened` fires on GET
- [ ] `lesson_tx_built` fires on POST success
- [ ] `lesson_completed` fires only from `/complete` after verify
- [ ] No full wallet pubkey in PostHog (truncated)

---

## 11. Full curriculum walkthrough

Perform sequentially with one wallet:

| Step | Action | Pass |
|------|--------|------|
| 1 | Faucet 5 USDC | [ ] |
| 2 | Complete Lesson 1 | [ ] |
| 3 | Complete Lesson 2 | [ ] |
| 4 | Complete Lesson 3 | [ ] |
| 5 | Complete Lesson 4 | [ ] |
| 6 | Claim graduation NFT | [ ] |
| 7 | Total time < 5 minutes | [ ] |

---

## 12. Production smoke (post-deploy)

Replace `localhost:3000` with `lessonblinks.com`:

```bash
DOMAIN=https://lessonblinks.com

for lesson in 01-usdc-transfer 02-tip-creator 03-remittance 04-swap 05-graduation-nft; do
  echo "=== $lesson ==="
  curl -s "$DOMAIN/api/actions/lessons/$lesson" | jq '.type, .title'
done
```

- [ ] All 5 return HTTP 200
- [ ] HTTPS valid (no cert warnings)
- [ ] Icons load from production CDN
- [ ] dial.to interstitial works for all 5

---

## 13. Sign-off

| Tester | Date | Result |
|--------|------|--------|
| | | ☐ Pass / ☐ Fail |

**Blockers for Dialect submit:**

- Any P0 SECURITY.md item failing
- Any lesson failing Inspector
- Graduation mint not verifiable on Explorer

---

## 14. Related documents

- [`SECURITY.md`](SECURITY.md)
- [`GTM.md`](GTM.md)
- [`specs/`](specs/) — per-lesson implementation details