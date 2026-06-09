# LessonBlinks — Turkey Strategy

**Product (TR):** BlinkDers  
**Primary market:** Turkey + Turkish diaspora (EU, UK, US)  
**Last updated:** 2026-06-09

---

## 1. Why Turkey first

| Factor | Implication for BlinkDers |
|--------|---------------------------|
| High remittance volume | Lesson 3 (remittance) is emotionally resonant |
| Young, mobile-first population | Blinks in X/Instagram beat desktop tutorials |
| Creator economy growth | Lesson 2 maps to local YouTube/Twitch culture |
| USD/EUR savings demand | USDC Lesson 1 maps to dollar mental model |
| Active Solana community | Superteam Turkey grants + events |

**Curriculum order is Turkey-optimized:** payments → creators → remittance → DeFi → credential.

---

## 2. SF Turkey grant fit

### Grant overview

| Field | Value |
|-------|-------|
| Program | [Solana Foundation Turkey Grants](https://superteam.fun/earn/grants/solana-foundation-turkey-grants) |
| Reward | Up to **$10,000 USDG** |
| Eligibility | Turkey residents (Superteam Earn profile region = Turkey) |
| Timeline | 30+ days review (slow) |
| Paid to date | ~$16.4K across cohort |

### Alignment narrative

**Problem (TR):** Kripto eğitimi çoğu zaman İngilizce, uzun videolar ve SOL/DeFi jargonu ile başlıyor. Türkiye'deki yeni kullanıcılar ödeme ve havale senaryolarına öncelik veriyor.

**Solution:** BlinkDers — 30 saniyelik Solana Action dersleri. USDC ile başla, gas ücreti sponsorlu, gömülü cüzdan ile e-posta kaydı.

**Traction metrics for application:**

- 5 registered Blinks on Dialect
- 200+ devnet lesson completions
- 40%+ Turkish locale usage
- Trepa walkthrough video (see §4)
- Demo video: Ayşe remittance lesson end-to-end

### Application checklist

- [ ] Superteam Earn profile region set to **Turkey**
- [ ] MVP live on HTTPS with `?locale=tr` support
- [ ] 2-min demo video (Turkish voiceover)
- [ ] GitHub repo link (public or reviewer access)
- [ ] Metrics dashboard screenshot (PostHog)
- [ ] Grant budget breakdown (see §6)

### Complementary grants

| Grant | Amount | Fit |
|-------|--------|-----|
| [Touching Grass Fund Turkey](https://superteam.fun/earn/grants/touching-grass-turkey) | $500 USDG | IRL BlinkDers workshop |
| [Startup Accelerator](https://superteam.fun/earn/grants/startup-accelerator-grant) | $10K USDC | Post-MVP scaling |
| [Agentic Engineering](https://superteam.fun/earn/grants/agentic-engineering) | $200 USDG | Future AI tutor agent |

---

## 3. Trepa bounty synergy

### Bounty overview

| Field | Value |
|-------|-------|
| Listing | [Walk through a Trepa round in your language](https://superteam.fun/earn/listing/walk-through-a-trepa-round-in-your-language) |
| Reward | **750 USDC** |
| Deadline | Jun 30, 2026 |
| Effort | ~1 day |
| Language | **Turkish** — low competition niche |

### Combined content strategy

Produce **one Turkish tutorial video** that covers:

1. **Trepa round walkthrough** (bounty requirement)
2. **BlinkDers Lesson 1–3** as "learn payments before you predict"

**Script outline (5–8 min):**

```
0:00 — Giriş: Trepa nedir?
1:00 — Trepa turu adım adım (bounty core)
3:00 — "Önce ödemeleri öğren" → BlinkDers tanıtımı
3:30 — Ders 1: 1 USDC gönder (dial.to ekran kaydı)
4:30 — Ders 3: Havale dersi (Ayşe hikayesi)
5:30 — Trepa + BlinkDers: aynı cüzdan, farklı kullanım
6:30 — Kapanış + linkler
```

**Deliverables:**

- [ ] Turkish voiceover video (YouTube or X)
- [ ] dial.to links in description
- [ ] Submit to Superteam Earn before Jun 30
- [ ] Cross-post to BlinkDers X account

**ROI:** 750 USDC bounty + marketing asset for grant application.

---

## 4. Turkish copy guidelines

### Tone

- **Siz** form (formal-you) for trust; **sen** only in social ads if targeting Gen Z
- Short sentences; avoid literal English calques
- Explain jargon once, then use Turkish term consistently

### Terminology glossary

| EN | TR (preferred) | Avoid |
|----|----------------|-------|
| Wallet | Cüzdan | Portföy |
| USDC | USDC (keep) | "kripto dolar" without explanation |
| Stablecoin | Sabit coin / stabil kripto | — |
| Gas fee | İşlem ücreti | "gas" without translation |
| Blink | Blink (keep) | — |
| Lesson | Ders | — |
| Tip | Bahşiş | "tip" |
| Remittance | Havale / yurt dışına para gönderme | "remittance" |
| Swap | Takas / dönüştürme | — |
| NFT | NFT (keep) | — |
| Sign | Onayla / imzala | — |
| Devnet | Devnet (test ağı) | — |

### Lesson titles (TR)

| # | Title |
|---|-------|
| 1 | Ders 1 · 1 USDC Gönder |
| 2 | Ders 2 · İçerik Üreticisine Bahşiş |
| 3 | Ders 3 · Yurt Dışına USDC Gönder |
| 4 | Ders 4 · SOL'u USDC'ye Çevir |
| 5 | Ders 5 · Mezuniyet Rozeti |

### Error messages (TR examples)

| EN | TR |
|----|-----|
| Connect a valid Solana wallet | Geçerli bir Solana cüzdanı bağlayın |
| You need exactly $1 USDC | Bu ders tam olarak 1 USDC gerektirir |
| Complete Lessons 1–4 first | Önce Ders 1–4'ü tamamlayın |
| Gas sponsored by BlinkDers | İşlem ücreti BlinkDers tarafından karşılanıyor |

### Implementation

```typescript
// src/lib/lessons/i18n/tr.ts
export const LESSON_03_TR = {
  title: "Ders 3 · Yurt Dışına USDC Gönder",
  description: [
    "Havale, ailenize yurt dışından para göndermektir.",
    "Bu derste 0,50 USDC'yi Almanya'daki demo alıcıya gönderiyorsunuz.",
    "Geleneksel havale günler sürer; Solana saniyeler.",
  ].join("\n"),
  label: "0,50 USDC Gönder",
};
```

Locale resolution: `?locale=tr` → `Accept-Language: tr` → default `en`.

---

## 5. Distribution channels (Turkey)

| Channel | Tactic |
|---------|--------|
| X (TR crypto) | dial.to link threads; graduation NFT screenshots |
| Telegram | Superteam Turkey, local Solana groups |
| Instagram Reels | 30s Lesson 1 screen recording |
| University clubs | ITU, METU, Boğaziçi blockchain clubs |
| IRL events | Touching Grass workshops with QR codes |
| Diaspora forums | Reddit r/Turkey, expat Facebook (educational tone) |

---

## 6. Grant budget template ($10K USDG)

| Line item | Amount | Notes |
|-----------|--------|-------|
| Engineering (MVP completion) | $4,000 | 5 lessons + Privy + sponsor |
| Design (TR icons, badge) | $800 | 512×512 set |
| Devnet → mainnet sponsor float | $1,500 | Gas + mint costs |
| TR video production (Trepa + BlinkDers) | $750 | Trepa bounty covers part |
| IRL workshop (Touching Grass) | $500 | QR onboarding |
| Analytics + infra (6 mo) | $600 | Vercel, Helius, Supabase |
| Buffer | $1,850 | Contingency |
| **Total** | **$10,000** | |

---

## 7. Legal / compliance notes

BlinkDers is **educational** — not a licensed money transmitter.

**Required disclaimers (TR):**

> BlinkDers eğitim amaçlıdır. Gerçek havale hizmeti sunmaz. Devnet işlemleri test ağındadır; gerçek para değildir.

> Mainnet sürümünde kendi araştırmanızı yapın (DYOR).

Consult local counsel before claiming remittance cost comparisons with named providers.

---

## 8. Pilot program

### Cohort: BlinkDers İlk 100

| Parameter | Value |
|-----------|-------|
| Size | 100 wallets |
| Entry | X giveaway + Telegram signup |
| Incentive | First 100 graduates get named on leaderboard |
| Duration | 2 weeks |
| Success | ≥60 complete L1; ≥25 complete L5 |

### Feedback collection

- Google Form (TR): "Hangi ders en faydalıydı?"
- PostHog funnel: L1 → L3 drop-off
- 5 user interviews (Turkish)

---

## 9. Timeline

| Week | Milestone |
|------|-----------|
| W1 | Devnet MVP + TR copy |
| W2 | Inspector + dial.to QA |
| W3 | Dialect registry + Trepa video submit |
| W4 | Turkey pilot launch (100 wallets) |
| W6 | SF Turkey grant application |
| W8 | Touching Grass IRL workshop |
| W12 | Mainnet readiness review |

---

## 10. Related documents

- [`CURRICULUM.md`](CURRICULUM.md) — Turkey-first lesson order
- [`GTM.md`](GTM.md) — Dialect + dial.to launch
- [`PRODUCT-REVIEW.md`](PRODUCT-REVIEW.md) — USDC-first decisions
- [`../superteam/TURKEY-ELIGIBILITY.md`](../../superteam/TURKEY-ELIGIBILITY.md) — bounty list