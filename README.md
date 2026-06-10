# LessonBlinks

Solana Actions as 30-second micro-lessons. Learn payments on devnet through five Blinks: USDC transfer, SOL tip, remittance, swap, and graduation NFT.

**Live:** https://blinks.umutkorkmaz.net  
**Turkish brand:** BlinkDers  
**Languages:** 14 (en, tr, es, de, fr, it, pt, ru, ar, hi, id, zh, ja, ko) — defaults to the browser language, switchable in the header

## Quick start

```bash
cd app
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## Test a Blink (June 2026)

| Tool | Status |
|------|--------|
| **Embedded Blink on lesson page** | ✅ Recommended — connect devnet wallet, sign inline |
| **`npm run verify:actions`** | ✅ API smoke test (OPTIONS + GET) |
| **Local Inspector** ([blinks-xyz repo](https://github.com/solana-developers/blinks-xyz)) | ✅ Full protocol debug — run `npm run dev` locally |
| **dial.to website** (`/developer`, `/register`, interstitial) | ❌ Dead — 403 on every path; registry submission is via email/dashboard now |
| **blinks.xyz/inspector** | ❌ Parked domain (redirects to `/lander`) |

`api.dial.to` (which powers the embedded Blinks) is healthy — only the dial.to website is gone.

**Try Lesson 1:** open https://blinks.umutkorkmaz.net/lessons/1, connect Phantom (devnet), complete the Blink.

**Action API URL:**

```
https://blinks.umutkorkmaz.net/api/actions/lesson-1-usdc
```

**Local Inspector** (after cloning blinks-xyz):

```
http://localhost:3000/inspector?url=https%3A%2F%2Fblinks.umutkorkmaz.net%2Fapi%2Factions%2Flesson-1-usdc
```

## Curriculum

| # | Lesson | Status |
|---|--------|--------|
| 1 | Send your first USDC | Live (devnet) |
| 2 | Tip a creator in SOL | Live (devnet) |
| 3 | Send money across a border | Live (devnet) |
| 4 | Understand your first swap | Live (devnet demo — signed memo; Jupiter has no devnet liquidity) |
| 5 | Claim your graduation badge | Live (devnet — supply-1 token mint, mint authority burned) |

## Stack

- Next.js 15 (App Router)
- `@solana/actions`, `@dialectlabs/blinks`, `@solana/web3.js`, `@solana/spl-token`
- Devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6`

## Deploy

Hosted on DigitalOcean (`blinks.umutkorkmaz.net`). See `deploy/` for nginx config.

```bash
ssh root@YOUR_SERVER
cd /var/www/lessonblinks && git pull
bash deploy/deploy.sh
```

## Documentation

See [`docs/`](docs/) for architecture, curriculum, security, and lesson specs.

## License

MIT