# LessonBlinks — Go-to-Market

**Product:** LessonBlinks (EN) · BlinkDers (TR)  
**Primary channel:** Solana Blinks via Dialect registry + dial.to  
**Launch target:** Devnet MVP → Dialect registry → Turkey pilot

---

## 1. GTM thesis

**Education = distribution.** LessonBlinks does not acquire users to a website — it meets users in feeds where Blinks already unfurl (X, Farcaster, Discord, QR).

| Phase | Goal | Channel |
|-------|------|---------|
| 0 — Build | 5 working Actions on devnet | Internal |
| 1 — Register | Dialect registry approval | dial.to |
| 2 — Test | Inspector + dial.to interstitial QA | Blinks Inspector |
| 3 — Pilot | 100 Turkey wallets complete L1 | X TR + Telegram |
| 4 — Scale | Sponsor co-marketing | Partner blinks |

---

## 2. Dialect Actions Registry

### What is Dialect?

Dialect operates the **Actions Registry** at [dial.to/register](https://dial.to/register). Registered Actions get:

- Trusted interstitial on `dial.to`
- Discoverability in registry search
- Standardized unfurl for social platforms

### Registration package (per lesson)

Prepare **5 submissions** (one per lesson) or one collection — confirm current Dialect policy at submit time.

| Field | Lesson 1 example |
|-------|------------------|
| **Title** | LessonBlinks 1: Send $1 USDC |
| **Description** | 30-second Solana lesson — send USDC on devnet and learn stablecoin payments. Gas sponsored. |
| **Category** | Education / Onboarding |
| **Action URL** | `https://lessonblinks.com/api/actions/lesson-1-usdc` |
| **Icon** | 512×512 PNG (`/lessons/01/icon.png`) |
| **Website** | `https://lessonblinks.com` |
| **Twitter** | `@lessonblinks` (placeholder) |
| **Security notes** | Fixed amounts; server-built txs; on-chain verification |

### TR variants (BlinkDers)

| Field | Value |
|-------|-------|
| Title | BlinkDers 1: 1 USDC Gönder |
| Description | 30 saniyede Solana dersi — devnet'te USDC gönderin. Gas ücreti sponsorlu. |
| Action URL | Same endpoint + `?locale=tr` in marketing links |

### `actions.json` (required)

Serve at `https://{domain}/actions.json`:

```json
{
  "rules": [
    {
      "pathPattern": "/lesson/tip-usdc",
      "apiPath": "/api/actions/lesson-1-usdc"
    },
    {
      "pathPattern": "/lesson/tip-creator-sol",
      "apiPath": "/api/actions/lesson-2-tip"
    },
    {
      "pathPattern": "/lesson/remittance",
      "apiPath": "/api/actions/lesson-3-remittance"
    },
    {
      "pathPattern": "/lesson/swap-sol-usdc",
      "apiPath": "/api/actions/lesson-4-swap"
    },
    {
      "pathPattern": "/lesson/claim-graduation-nft",
      "apiPath": "/api/actions/lesson-5/claim"
    }
  ]
}
```

Next.js route (`src/app/actions.json/route.ts`) must return this with CORS headers.

---

## 3. dial.to testing

### Interstitial URL format

```
https://dial.to/?action=solana-action:https://{domain}/api/actions/{lesson-action-path}
```

URL-encoded example (Lesson 3):

```
https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Flessonblinks.com%2Fapi%2Factions%2Flesson-3-remittance
```

### dial.to test matrix

| # | Test | Pass criteria |
|---|------|---------------|
| 1 | Paste Action URL in dial.to | Interstitial loads title + icon |
| 2 | Connect Phantom (devnet) | Wallet switches to devnet |
| 3 | Tap action button | POST returns transaction |
| 4 | Sign transaction | Confirms on Solana Explorer (devnet) |
| 5 | Completion callback (L1–3, L5) | Success card renders |
| 6 | TR locale link | Turkish title/description |
| 7 | Mobile Safari | Interstitial + Phantom deep link |
| 8 | Invalid wallet | Friendly ActionError |

### Blinks Inspector

Tool: [blinks.xyz/inspector](https://www.blinks.xyz/inspector)

For each Action URL:

1. Paste URL → Run GET
2. Validate schema (type, icon, title, description, label)
3. Connect wallet → Run POST
4. Verify serialized transaction decodes
5. Check CORS panel (green)

**Screenshot each lesson** for registry submission and grant appendix.

---

## 4. Shareable Blink links

### Production link table

| Lesson | dial.to link | X post template |
|--------|--------------|-----------------|
| 1 | `dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-1-usdc` | "Learn Solana in 30s — send $1 USDC 👇" |
| 2 | `dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-2-tip` | "Tip a creator with SOL in one tap" |
| 3 | `dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-3-remittance` | "Send money home in seconds — Lesson 3" |
| 4 | `dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-4-swap` | "Your first swap — 0.01 SOL → USDC" |
| 5 | `dial.to/?action=solana-action:https://lessonblinks.com/api/actions/lesson-5/claim` | "I graduated BlinkDers 🎓 Claim your badge" |

### QR codes

Generate QR for each dial.to URL for:

- Istanbul Solana meetups (Touching Grass Fund)
- University workshops
- SF Turkey grant demo day

---

## 5. Launch checklist

### Pre-launch (T-14 days)

- [ ] All 5 Action routes deployed to production HTTPS
- [ ] `actions.json` live with CORS
- [ ] Icons 512×512 for all lessons + graduation badge
- [ ] SECURITY.md P0 items complete
- [ ] DEVNET-CHECKLIST.md all green
- [ ] Analytics events firing (see ANALYTICS.md)
- [ ] Privy landing page live at `/tr` (BlinkDers)
- [ ] Faucet API funded with devnet USDC

### Registry (T-7 days)

- [ ] Blinks Inspector pass — 5/5 lessons
- [ ] dial.to manual pass — 5/5 lessons
- [ ] Submit Dialect registry application
- [ ] Prepare security narrative (from SECURITY.md §8)

### Launch day (T-0)

- [ ] Publish X thread (EN + TR) with Lesson 1 dial.to link
- [ ] Post in Superteam Turkey Telegram
- [ ] Submit Trepa walkthrough video (see TURKEY.md)
- [ ] Monitor sponsor wallet balance
- [ ] Monitor completion funnel in analytics

### Post-launch (T+7 days)

- [ ] Review L1→L2 drop-off; iterate copy
- [ ] First sponsor outreach (MONETIZATION.md Tier 1)
- [ ] SF Turkey grant application with metrics screenshot
- [ ] Weekly dial.to regression test

---

## 6. Content marketing plan

### Week 1 — Lesson 1 focus

- X thread: "Why USDC first?" (3 tweets + blink link)
- 60s vertical video: complete Lesson 1 on phone
- BlinkDers TR mirror post

### Week 2 — Creator angle

- Partner with 1 TR micro-influencer for Lesson 2
- Creator receives `CREATOR_WALLET_PUBKEY` tips live

### Week 3 — Remittance story

- Carousel: traditional remittance vs USDC lesson (educational disclaimer)
- Lesson 3 dial.to link in bio

### Week 4 — Graduation push

- "First 100 graduates" campaign
- NFT share template for LinkedIn TR

---

## 7. Partnership pipeline

| Partner type | Lesson | Value exchange |
|--------------|--------|----------------|
| TR creator | L2 | They promote; receive tips |
| Remittance fintech | L3 | Co-branded explainer copy |
| Jupiter | L4 | "Powered by Jupiter" badge |
| Superteam Turkey | All | Grant + distribution |
| University blockchain club | L1 | Workshop QR codes |

---

## 8. KPIs (first 30 days)

| KPI | Target |
|-----|--------|
| Registry approvals | 5/5 |
| Unique wallets L1 | 200 |
| dial.to → sign rate | 40% |
| TR locale share | 35% |
| Social shares of L5 NFT | 50 |

---

## 9. Rollback plan

If critical security issue found post-launch:

1. Set `LESSON_{N}_ENABLED=false` env flag (per-route guard)
2. Remove from Dialect registry (contact Dialect)
3. Post public status on X
4. Fix → re-run DEVNET-CHECKLIST → re-register

---

## 10. Related documents

- [`SECURITY.md`](SECURITY.md) — registry blockers
- [`DEVNET-CHECKLIST.md`](DEVNET-CHECKLIST.md) — QA steps
- [`TURKEY.md`](TURKEY.md) — Turkey launch + Trepa
- [`MONETIZATION.md`](MONETIZATION.md) — sponsor revenue
