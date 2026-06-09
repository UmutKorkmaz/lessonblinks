# Lesson 5 — Claim Graduation NFT

**Project:** LessonBlinks / BlinkDers  
**Lesson ID:** `lesson-05`  
**Date:** 2026-06-09  
**Status:** Ready for implementation  
**Spec version:** 1.0

---

## One-liner

Lesson 5 is the capstone: learners who completed Lessons 1–4 claim a **Graduation Badge cNFT** in one tap — sponsored mint, wallet-owned credential.

---

## Learning objectives

After completing this blink, the learner should understand:

1. NFTs can represent **achievements** (not just art).
2. **Compressed NFTs (cNFTs)** scale cheaply on Solana.
3. Credentials are **wallet-owned** and shareable on social media.
4. Prerequisites can be enforced server-side before minting.

---

## Action surface

| Field | Value |
|-------|-------|
| Blink URL | `https://{domain}/lesson/05-graduation` |
| Action API | `https://{domain}/api/actions/lessons/05-graduation-nft` |
| Callback API | `https://{domain}/api/actions/lessons/05-graduation-nft/complete` |
| Chain | Solana devnet → mainnet-beta |
| User cost | ~$0 (sponsored mint) |
| Prerequisite | Lessons 1–4 verified in DB |

---

## Curriculum context

| Lesson | Action | Badge |
|--------|--------|-------|
| 1 | Send $1 USDC | USDC Sender |
| 2 | Tip creator $0.10 | Creator Supporter |
| 3 | Remittance $0.50 | Remittance Ready |
| 4 | Swap 0.01 SOL | Swapped |
| **5** | **Claim cNFT** | **Graduate** |

---

## MVP strategy

### Tier B — Bubblegum cNFT (recommended)

Mint cNFT to learner wallet. Include memo in same tx for indexing.

```
Transaction (sponsored):
  1. ComputeBudgetProgram.setComputeUnitLimit
  2. createMemoInstruction — { v:1, course:"lessonblinks-101", lesson:5 }
  3. mintV1 (Bubblegum) — leafOwner = user
```

**Fallback Tier A:** If tree/delegate fails, return `completed` Action with off-chain badge image.

---

## NFT metadata

```json
{
  "name": "LessonBlinks Graduate",
  "symbol": "BLINKS",
  "description": "Completed all 5 LessonBlinks micro-lessons on Solana.",
  "image": "https://cdn.lessonblinks.com/badges/graduate.png",
  "external_url": "https://lessonblinks.com/graduate",
  "attributes": [
    { "trait_type": "Course", "value": "LessonBlinks 101" },
    { "trait_type": "Lessons Completed", "value": "5" },
    { "trait_type": "Locale", "value": "en" },
    { "trait_type": "Tier", "value": "Graduate" }
  ]
}
```

### Turkish variant

```json
{
  "name": "BlinkDers Mezunu",
  "description": "BlinkDers'in 5 dersini tamamladınız."
}
```

Inject `locale` trait at mint time from `?locale=tr`.

---

## GET handler — three states

### Case A — eligible, not claimed

```json
{
  "type": "action",
  "title": "LessonBlinks — Graduation",
  "description": "You finished Lessons 1–4! Claim your Graduate Badge cNFT. Sponsored — you just sign.",
  "label": "Claim Badge",
  "links": {
    "actions": [{ "label": "Claim Badge", "href": "/api/actions/lessons/05-graduation-nft" }]
  }
}
```

### Case B — already claimed

```json
{
  "type": "completed",
  "title": "Already graduated 🎓",
  "description": "You own your LessonBlinks Graduate Badge.",
  "links": {
    "actions": [{ "label": "View NFT", "href": "https://explorer.solana.com/..." }]
  }
}
```

### Case C — prerequisites not met

```json
{
  "type": "action",
  "title": "LessonBlinks — Graduation",
  "description": "Complete Lessons 1–4 first. Progress: 2/4.",
  "label": "Locked",
  "disabled": true,
  "error": { "message": "Finish Lessons 1–4 to unlock your graduation NFT." },
  "links": {
    "actions": [{ "label": "Lesson 3 — Remittance", "href": "/api/actions/lessons/03-remittance" }]
  }
}
```

**Input:** `GET ?account=<pubkey>` for state resolution.

---

## POST handler

### Prerequisite check

```typescript
const required = ["lesson-01", "lesson-02", "lesson-03", "lesson-04"];
const done = await db.lessonCompletions.findMany({ where: { wallet: account } });
if (done.length < 4) return forbidden("Complete Lessons 1–4 first");
if (await db.graduates.findUnique({ where: { wallet: account } }))
  return conflict("Already claimed");
```

### Mint transaction

```typescript
export async function buildGraduationTx(user: PublicKey, locale: string) {
  const memo = createMemoInstruction(
    JSON.stringify({ v: 1, course: "lessonblinks-101", lesson: 5, locale }),
    [mintAuthority.publicKey],
  );
  const mintIx = await buildBubblegumMintIx({
    leafOwner: user,
    name: locale === "tr" ? "BlinkDers Mezunu" : "LessonBlinks Graduate",
    symbol: "BLINKS",
    uri: GRADUATE_METADATA_URI,
  });

  // feePayer = mintAuthority; partialSign server-side
  return versionedTx;
}
```

### POST response

```json
{
  "type": "transaction",
  "transaction": "<base64>",
  "message": "Sign to claim your Graduate Badge NFT. Mint is sponsored by LessonBlinks."
}
```

### Errors

| HTTP | Message | When |
|------|---------|------|
| 400 | Missing account | No body.account |
| 403 | Complete Lessons 1–4 first | Prerequisites |
| 409 | Already claimed | In graduates table |
| 503 | Mint temporarily unavailable | RPC/tree failure |

---

## Complete callback

After mint confirms:

1. Verify Bubblegum `mintV1` in parsed tx
2. `leafOwner === account`
3. Insert `graduates` row + `lesson_completions (lesson-05)`
4. Resolve asset ID via Helius DAS
5. Return `completed` with explorer link

```typescript
emit("graduation_minted", { wallet_id: truncate(account), locale });
emit("curriculum_graduated", { wallet_id: truncate(account), days_to_complete });
```

---

## Database schema

```sql
CREATE TABLE graduates (
  wallet          TEXT PRIMARY KEY,
  asset_id        TEXT,
  mint_signature  TEXT NOT NULL UNIQUE,
  locale          TEXT DEFAULT 'en',
  minted_at       TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Environment variables

```bash
SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=...
MINT_AUTHORITY_SECRET_KEY=...
MERKLE_TREE=...
GRADUATE_METADATA_URI=https://...
DATABASE_URL=...
```

### One-time setup

`scripts/setup-graduation-tree.ts`:

1. Create Merkle tree depth 14
2. Fund mint authority 0.5 SOL
3. Upload metadata to CDN/Irys

---

## Anti-abuse

| Rule | Implementation |
|------|----------------|
| One badge per wallet | `graduates.wallet` PK |
| Must complete 1–4 | DB count before POST |
| Rate limit | 5 POST/min per wallet |
| Economic barrier | Lessons 1–4 cost ~$1.60 USDC |

---

## Testing checklist

- [ ] Eligible wallet: GET shows Claim Badge
- [ ] Ineligible: disabled + progress count
- [ ] POST mint: cNFT in Phantom devnet
- [ ] Second claim: `type: completed`
- [ ] User 0 SOL: still works (sponsored)
- [ ] TR locale: metadata name "BlinkDers Mezunu"
- [ ] Blinks Inspector pass
- [ ] dial.to unfurl

---

## Dialect registry

| Field | Value |
|-------|-------|
| Title | LessonBlinks 5: Graduation NFT |
| Category | Education / NFT |
| Security | Sponsored mint; no user funds at risk |
| Action URL | `https://{domain}/api/actions/lessons/05-graduation-nft` |

---

## actions.json

```json
{
  "pathPattern": "/lesson/05-graduation",
  "apiPath": "/api/actions/lessons/05-graduation-nft"
}
```

---

## Acceptance criteria

1. Wallet with L1–L4 done → one sign → NFT in wallet < 60s
2. Incomplete wallet → locked state with next lesson link
3. Repeat claim → completed state
4. Sponsor cost per graduate < $0.01 mainnet
5. Passes SECURITY.md P0 checks

---

## References

- [Metaplex Bubblegum](https://developers.metaplex.com/bubblegum)
- [Solana Actions chaining](https://solana.com/developers/guides/advanced/actions)
- [`lesson-5-graduation-nft.md`](../lesson-5-graduation-nft.md) — extended draft