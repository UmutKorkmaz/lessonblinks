# LessonBlinks

Solana Actions as 30-second micro-lessons. Learn payments on devnet through five Blinks: USDC transfer, SOL tip, remittance, swap, and graduation NFT.

**Live:** https://blinks.umutkorkmaz.net  
**Turkish brand:** BlinkDers

## Quick start

```bash
cd app
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## Test a Blink (Blinks Inspector)

Primary testing tool — [blinks.xyz/inspector](https://www.blinks.xyz/inspector) (official Solana Actions debugger).

**Lesson 1 — direct Inspector link:**

```
https://www.blinks.xyz/inspector?url=https%3A%2F%2Fblinks.umutkorkmaz.net%2Fapi%2Factions%2Flesson-1-usdc
```

Or paste the Action URL into the Inspector:

```
https://blinks.umutkorkmaz.net/api/actions/lesson-1-usdc
```

> **Note:** dial.to (Dialect interstitial) has been unreliable (Vercel `DEPLOYMENT_PAUSED`). Use Blinks Inspector for development and QA.

## Curriculum

| # | Lesson | Status |
|---|--------|--------|
| 1 | Send USDC | Live (devnet) |
| 2 | Tip creator (SOL) | Live (devnet) |
| 3 | Send USDC abroad | Beta (devnet) |
| 4 | Swap SOL → USDC | Planned |
| 5 | Graduation NFT | Planned |

## Stack

- Next.js 15 (App Router)
- `@solana/actions`, `@solana/web3.js`, `@solana/spl-token`
- Devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6`

## Deploy

Hosted on DigitalOcean (`blinks.umutkorkmaz.net`). See `deploy/` for nginx config.

```bash
ssh root@YOUR_SERVER
cd /var/www/lessonblinks && git pull
cd app && npm ci && npm run build && pm2 restart lessonblinks
```

## Documentation

See [`docs/`](docs/) for architecture, curriculum, security, and lesson specs.

## License

MIT