# LessonBlinks — Monetization

**Product:** LessonBlinks (EN) · BlinkDers (TR)  
**Model:** Sponsored Blinks + grant funding (MVP) → partner co-marketing (scale)  
**Last updated:** 2026-06-09

---

## 1. Revenue thesis

LessonBlinks monetizes **distribution**, not course fees. Users never pay for lessons (beyond nominal USDC lesson amounts that teach real transfers). Sponsors pay to reach a **verified, wallet-connected, lesson-completed** audience.

**Key insight:** A user who completes Lesson 3 (remittance) is a higher-intent payments lead than a generic ad click.

---

## 2. Sponsor tiers

### Tier 0 — Self-funded (MVP)

| Attribute | Value |
|-----------|-------|
| **Price** | $0 (founder-funded) |
| **Includes** | Default LessonBlinks branding on all 5 lessons |
| **Sponsor slot** | None |
| **Gas sponsorship** | Project treasury |
| **Target** | Devnet launch, grant applications |

**Unit economics:**

| Cost item | Per user (devnet) | Per graduate (5 lessons) |
|-----------|-------------------|--------------------------|
| Gas sponsorship | ~$0.001 | ~$0.005 |
| Devnet USDC faucet | $1.60 USDC (lessons) | $1.60 |
| cNFT mint (L5) | — | ~$0.0003 |
| **Total sponsor cost** | | **~$1.61 + $0.005** |

---

### Tier 1 — Lesson Sponsor

| Attribute | Value |
|-----------|-------|
| **Price** | $2,500 / month / lesson |
| **Includes** | Co-branded explainer copy on one lesson GET `description` |
| **Logo** | Sponsor logo in lesson icon badge (bottom-right, 64×64) |
| **CTA** | One `links.actions` secondary button → sponsor URL |
| **Analytics** | Weekly report: views, taps, completions |
| **Exclusivity** | One sponsor per lesson slot |

**Available slots:**

| Lesson | Slot name | Ideal sponsor category |
|--------|-----------|------------------------|
| L1 | Payments Partner | Neobank, stablecoin wallet |
| L2 | Creator Partner | Creator platform, streaming |
| L3 | Remittance Partner | Cross-border payments, fintech |
| L4 | DeFi Partner | Jupiter ecosystem, DEX |
| L5 | Graduation Partner | NFT platform, employer brand |

**Deliverables:**

- Sponsor copy approval (EN + optional TR)
- 30-day minimum commitment
- Impression floor: 10K GET requests/month (or pro-rata refund)

---

### Tier 2 — Curriculum Sponsor

| Attribute | Value |
|-----------|-------|
| **Price** | $8,000 / month |
| **Includes** | Tier 1 benefits on **all 5 lessons** |
| **Branding** | "BlinkDers, powered by {Sponsor}" on landing page |
| **Gas sponsorship** | Sponsor funds `FEE_PAYER` wallet (up to $500/mo cap) |
| **Graduation NFT** | Sponsor logo on badge metadata (trait: `Sponsor: X`) |
| **Analytics** | Full funnel dashboard access |
| **Exclusivity** | Category exclusivity (one fintech curriculum sponsor) |

**Ideal customers:**

- Turkish neobank entering crypto
- Remittance company seeking Solana awareness
- Stablecoin issuer (Circle ecosystem)

---

### Tier 3 — Enterprise Cohort

| Attribute | Value |
|-----------|-------|
| **Price** | $25,000+ / quarter (custom) |
| **Includes** | White-label BlinkDers for internal onboarding |
| **Custom lessons** | Up to 2 bespoke lesson Actions |
| **Embedded wallet** | Privy tenant with sponsor branding |
| **SLA** | 99.9% Action uptime |
| **Support** | Dedicated Slack channel |

**Ideal customers:**

- Exchange onboarding (compliance-friendly micro-lessons)
- Corporate Web3 training programs
- Government innovation sandbox pilots

---

## 3. Pricing rationale

| Benchmark | LessonBlinks positioning |
|-----------|------------------------|
| Twitter/X ads (finance) | $5–15 CPM; no wallet connect |
| Crypto influencer post | $500–5K; no completion proof |
| Binance Learn campaign | Platform-locked |
| **LessonBlinks Tier 1** | $2.5K/mo with verified on-chain completions |

**Effective CPM (illustrative):**

- 10K GET requests/month × $2,500 = **$0.25 per lesson view**
- 500 completions/month → **$5.00 per verified completion**

Comparable to high-intent fintech CPA ($10–50) at lower risk (fixed monthly fee).

---

## 4. Sponsor integration (technical)

### GET response co-branding

```typescript
const payload: LessonActionGetResponse = {
  type: "action",
  title: sponsor
    ? `Lesson 3 · Send remittance — with ${sponsor.name}`
    : "Lesson 3 · Send remittance",
  description: [
    LESSON_03.explainer.summary,
    "",
    sponsor ? `Sponsored by ${sponsor.name}. ${sponsor.tagline}` : "",
  ].join("\n"),
  icon: sponsor
    ? `${baseUrl}/lessons/03/icon-${sponsor.slug}.png`
    : `${baseUrl}/lessons/03/icon.png`,
  links: {
    actions: [
      { label: "Send $0.50 USDC", href: `${baseHref}` },
      ...(sponsor
        ? [{ label: sponsor.ctaLabel, href: sponsor.ctaUrl }]
        : []),
    ],
  },
};
```

### Sponsor config (DB)

```sql
CREATE TABLE sponsors (
  id            UUID PRIMARY KEY,
  slug          TEXT UNIQUE,
  name          TEXT NOT NULL,
  tier          SMALLINT,  -- 1, 2, or 3
  lesson_ids    TEXT[],    -- e.g. ['lesson-03']
  cta_label     TEXT,
  cta_url       TEXT,
  tagline       TEXT,
  active_from   TIMESTAMPTZ,
  active_until  TIMESTAMPTZ
);
```

### Analytics events for billing

- `lesson_sponsor_impression` — GET with sponsor slug
- `lesson_sponsor_cta_click` — secondary action tap
- `lesson_completed` — billable conversion metric

---

## 5. Grant funding (non-dilutive)

| Source | Amount | Use of funds |
|--------|--------|--------------|
| SF Turkey Grant | Up to $10K USDG | MVP build + TR launch |
| Startup Accelerator | Up to $10K USDC | Mainnet migration |
| Touching Grass Turkey | $500 USDG | IRL workshops |
| Circle / ecosystem | TBD | USDC lesson sponsorship |

Grants fund **build**, sponsors fund **distribution**.

---

## 6. Revenue projections (12 months)

| Quarter | Sponsors | MRR | Grants | Total |
|---------|----------|-----|--------|-------|
| Q1 | 0 (Tier 0) | $0 | $10K (grant) | $10K |
| Q2 | 1× Tier 1 | $2.5K | $0 | $7.5K |
| Q3 | 2× Tier 1 + 1× Tier 2 | $13K | $0 | $39K |
| Q4 | 1× Tier 3 | $25K+ | $0 | $75K+ |

**Assumptions:** Turkey pilot proves 25% L1→L5 funnel; first remittance sponsor by Q2.

---

## 7. What we do NOT sell (MVP)

- User data / wallet addresses to third parties
- Paid lesson skip ("pay $5 to mint graduation NFT")
- Token launches bundled with lessons
- Affiliate links without disclosure

---

## 8. Sponsor outreach playbook

### Email template (Tier 1 — remittance)

```
Subject: Sponsor BlinkDers Lesson 3 — remittance micro-lesson (Turkey)

Hi {Name},

BlinkDers teaches Solana payments in 30-second Blinks. Lesson 3 is a
USDC remittance demo — 500+ Turkish wallets in our pilot cohort.

Tier 1 sponsorship: $2,500/mo for co-branded Lesson 3 with verified
completion analytics.

15-min call this week?

— LessonBlinks team
```

### Proof points for sales

- Dialect registry listing
- PostHog funnel screenshot
- Trepa + BlinkDers Turkish video views
- SF Turkey grant status (if awarded)

---

## 9. Contract terms (summary)

| Term | Standard |
|------|----------|
| Payment | Net-30 USDC on Solana |
| Minimum term | 1 month (Tier 1), 3 months (Tier 2+) |
| Cancellation | 14-day notice |
| Content approval | Sponsor reviews copy within 5 business days |
| Performance | No guaranteed completions; impression floor only (Tier 1) |

---

## 10. Related documents

- [`GTM.md`](GTM.md) — launch + partner pipeline
- [`ANALYTICS.md`](ANALYTICS.md) — sponsor reporting events
- [`TURKEY.md`](TURKEY.md) — Turkey market entry
- [`PRODUCT-REVIEW.md`](PRODUCT-REVIEW.md) — business model validation