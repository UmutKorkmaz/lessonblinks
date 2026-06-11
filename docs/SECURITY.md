# LessonBlinks — Security Checklist

**Product:** LessonBlinks / BlinkDers  
**Scope:** Solana Actions API routes (`@solana/actions`)  
**Last updated:** 2026-06-09  
**Status:** Must-fix before Dialect registry submission

This checklist is derived from the [Solana Actions spec](https://solana.com/developers/guides/advanced/actions), official examples, and LessonBlinks-specific threat models.

---

## 1. Severity legend

| Level | Meaning | Registry blocker? |
|-------|---------|-------------------|
| **P0** | Exploit likely; user funds at risk | Yes |
| **P1** | Abuse / data integrity risk | Yes |
| **P2** | Best practice; ship soon | Recommended |
| **P3** | Hardening | No |

---

## 2. P0 — Must fix before launch

### P0-1 — CORS headers on every response

**Risk:** Blink clients (dial.to, X, Phantom) cannot call Action; or inconsistent behavior.

**Fix:**

```typescript
import { createActionHeaders } from "@solana/actions";

const headers = createActionHeaders();

// Every GET, POST, OPTIONS returns { headers }
export const OPTIONS = async () => Response.json(null, { headers });
```

**Verify:** Blinks Inspector shows green CORS; `curl -X OPTIONS -I` includes `Access-Control-Allow-Origin: *`.

- [ ] All 5 lesson routes
- [ ] All `/complete` callback routes
- [ ] `actions.json` route

---

### P0-2 — Never trust transaction signatures alone for completion

**Risk:** Attacker submits unrelated tx signature; earns lesson credit or graduation NFT.

**Fix:** In every `/complete` handler:

1. `getSignatureStatus(signature)` — require `confirmed` or `finalized`
2. `getParsedTransaction(signature)` — inspect **parsed instructions**
3. Assert instruction type, amounts, mint, and accounts match lesson constants

Reference: [Solana chaining example warning](https://github.com/solana-developers/solana-actions/blob/main/examples/next-js/src/app/api/actions/chaining-basics/next-action/route.ts)

```typescript
// BAD — signature existence only
if (await connection.getSignatureStatus(sig)) { markComplete(); }

// GOOD — verify transfer shape
const tx = await connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 });
assertUsdcTransfer(tx, { amount: 1_000_000, mint: DEVNET_USDC_MINT, dest: expected });
```

- [ ] Lesson 01 complete verifies USDC amount + mint + recipient
- [ ] Lesson 02 complete verifies tip amount + creator pubkey
- [ ] Lesson 03 complete verifies remittance amount + demo wallet
- [ ] Lesson 05 verifies prerequisites from DB, not client claims

---

### P0-3 — Hard-code lesson amounts server-side

**Risk:** User changes `?amount=` query param to tip $0.000001 or drain sponsor wallet.

**Fix:**

```typescript
const ALLOWED_AMOUNT = 1_000_000; // 1 USDC, 6 decimals
const requested = Number(url.searchParams.get("amount"));
if (requested !== ALLOWED_AMOUNT / 1_000_000) {
  throw "Lesson 1 requires exactly $1 USDC";
}
```

- [ ] Lesson 01: $1 USDC (1_000_000)
- [ ] Lesson 02: $0.10 USDC (100_000)
- [ ] Lesson 03: $0.50 USDC (500_000)
- [ ] Lesson 04: 0.01 SOL (10_000_000 lamports) — ignore user override
- [ ] Lesson 05: no user-supplied amount

---

### P0-4 — Validate all pubkeys before use

**Risk:** Invalid base58 crashes handler or hits wrong account.

**Fix:**

```typescript
function parsePubkey(value: string, label: string): PublicKey {
  try {
    return new PublicKey(value);
  } catch {
    throw `Invalid input query parameter: ${label}`;
  }
}
```

- [ ] POST `body.account`
- [ ] Query `to`, `recipient`, `from`
- [ ] Env-loaded pubkeys validated at boot

---

### P0-5 — Sponsor / mint keys server-only

**Risk:** Leaked `FEE_PAYER_SECRET_KEY` or `MINT_AUTHORITY_SECRET_KEY` drains treasury.

**Fix:**

- Store in Vercel encrypted env / KMS — never `NEXT_PUBLIC_*`
- Separate devnet and mainnet keys
- Rotate if exposed
- Fund sponsor with minimal float (auto-refill alert)

- [ ] No secret keys in client bundle (`next build` grep check)
- [ ] `.env.example` has placeholders only
- [ ] CI secret scan enabled

---

### P0-6 — Return only intended transactions from POST

**Risk:** POST handler injects malicious instructions (drain wallet).

**Fix:**

- Build transactions from known program IDs only:
  - `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` (SPL Token)
  - `11111111111111111111111111111111` (System, if needed)
  - Jupiter tx: pass through **unmodified** Jupiter response only
  - Bubblegum: use Metaplex SDK, no hand-rolled unknown programs
- Never concatenate user-supplied instruction data

- [ ] Code review per lesson POST handler
- [ ] Simulation in dev before returning tx (`connection.simulateTransaction`)

---

### P0-7 — Graduation NFT prerequisite enforcement

**Risk:** User mints graduation NFT without completing lessons (Sybil credentials).

**Fix:**

```typescript
const count = await db.lessonCompletions.count({
  where: { wallet, lesson_id: { in: ["lesson-01","lesson-02","lesson-03","lesson-04"] } },
});
if (count < 4) return forbidden("Complete Lessons 1–4 first");
if (await db.graduates.findUnique({ where: { wallet } })) return conflict("Already claimed");
```

- [ ] Server-side DB check on POST (not GET alone)
- [ ] Unique constraint on `graduates.wallet`

---

## 3. P1 — Must fix before registry

### P1-1 — Rate limiting

| Endpoint | Limit |
|----------|-------|
| POST lesson actions | 30/min per IP |
| POST `/complete` | 10/min per wallet |
| Faucet API | 1 request/wallet/day |
| Graduation POST | 5/min per IP + wallet |

**Implementation:** Vercel KV / Upstash Redis sliding window.

- [ ] Rate limit middleware on `/api/actions/**`
- [ ] 429 returns `ActionError` JSON with CORS headers

---

### P1-2 — Error responses use ActionError shape

**Risk:** Blink clients fail to parse errors; leak stack traces.

**Fix:**

```typescript
return Response.json(
  { message: "Lesson 1 requires exactly $1 USDC" } satisfies ActionError,
  { status: 400, headers },
);
```

- [ ] No raw `Error.stack` in responses
- [ ] No internal RPC URLs in error messages
- [ ] Structured server-side logging only

---

### P1-3 — HTTPS only in production

**Risk:** Registry rejects non-HTTPS Action URLs; MITM on Action metadata.

- [ ] All Action URLs use `https://`
- [ ] `actions.json` on production domain with valid TLS
- [ ] No mixed-content icons (icon URLs must be HTTPS)

---

### P1-4 — Icon and metadata integrity

**Risk:** Malicious icon URL phishing.

- [ ] Icons served from same origin (`/lessons/NN/icon.png`)
- [ ] No user-controlled `icon` field
- [ ] PNG 512×512, no embedded scripts

---

### P1-5 — Faucet abuse prevention

**Risk:** Unlimited devnet USDC drain from project faucet.

- [ ] 5 USDC max per wallet per 24h
- [ ] CAPTCHA or Privy auth required
- [ ] Devnet only (`SOLANA_CLUSTER=devnet` guard)

---

### P1-6 — Jupiter passthrough integrity (Lesson 4)

**Risk:** Man-in-the-middle modifies Jupiter swap tx.

- [ ] Fetch Jupiter over HTTPS from official endpoints only
- [ ] Deserialize and return without adding instructions
- [ ] Log `outAmount` and `priceImpactPct` server-side

---

## 4. P2 — Ship within 30 days

### P2-1 — RPC endpoint protection

- [ ] Helius API key in env, not query string in client
- [ ] Fallback RPC with circuit breaker
- [ ] No public debug endpoints exposing RPC

### P2-2 — Webhook signature verification

- [ ] Helius webhooks validate `HELIUS_WEBHOOK_SECRET`
- [ ] Reject unsigned webhook payloads

### P2-3 — Dependency pinning

- [ ] Lock `@solana/actions`, `@solana/web3.js` versions
- [ ] `npm audit` in CI
- [ ] Dependabot enabled

### P2-4 — Content Security Policy on landing pages

- [ ] CSP headers on `lessonblinks.com` / `blinkders.com`
- [ ] Privy domain allowlist

### P2-5 — Memo PII

- [ ] No emails or names in on-chain memo JSON
- [ ] Wallet pubkeys only

---

## 5. P3 — Ongoing hardening

- [ ] Bug bounty program post-mainnet
- [ ] Penetration test before mainnet graduation mint
- [ ] On-chain denylist for known exploit wallets
- [ ] Transaction simulation gate in production (`DEBUG_SIMULATE=false` default)

---

## 6. Pre-registry security audit script

Run before Dialect submission:

```bash
#!/bin/bash
set -e
DOMAIN="${1:-https://lessonblinks.com}"

echo "=== OPTIONS CORS ==="
for path in \
  "/api/actions/lesson-1-usdc" \
  "/api/actions/lesson-2-tip" \
  "/api/actions/lesson-3-remittance" \
  "/api/actions/lesson-4-swap" \
  "/api/actions/lesson-5/claim"; do
  curl -sI -X OPTIONS "$DOMAIN$path" | grep -i access-control
done

echo "=== actions.json ==="
curl -s "$DOMAIN/actions.json" | jq .

echo "=== Secret leak scan ==="
grep -r "SECRET_KEY\|privateKey" src/ --include="*.tsx" --include="*.ts" && exit 1 || true

echo "=== Inspector ==="
echo "Manual: https://www.blinks.xyz/inspector — paste each Action URL"
```

---

## 7. Incident response

| Event | Action |
|-------|--------|
| Sponsor key compromise | Rotate key, pause `ENABLE_GAS_SPONSOR`, audit txs |
| Faucet drain | Pause faucet, lower per-wallet cap |
| Registry delisting | Fix finding within 48h, resubmit |
| Malicious tx report | Disable affected lesson route, post-mortem |

**Contact:** security@lessonblinks.com (placeholder — set before launch)

---

## 8. Registry submission security narrative

For Dialect registration form:

> LessonBlinks Actions return server-built transactions with fixed amounts. Completion callbacks verify parsed on-chain instructions before recording progress. Sponsor keys are server-side only. Graduation mint requires four verified lesson completions. No user private keys are collected. Icons and metadata are same-origin hosted.

---

## 9. Sign-off

| Role | Name | Date | P0 complete |
|------|------|------|-------------|
| Engineering | | | [ ] |
| Security review | | | [ ] |
| Product | | | [ ] |

**Do not submit to Dialect until all P0 and P1 boxes are checked.**

---

## 10. References

- [Solana Actions advanced guide](https://solana.com/developers/guides/advanced/actions)
- [Official Next.js Action examples](https://github.com/solana-developers/solana-actions/tree/main/examples/next-js)
- [Blinks Inspector](https://www.blinks.xyz/inspector)
- [`DEVNET-CHECKLIST.md`](DEVNET-CHECKLIST.md)