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

## Test a Blink (June 2026)

Hosted testing tools are currently broken:

| Tool | Status |
|------|--------|
| **Embedded Blink on lesson page** | ✅ Recommended — connect devnet wallet, sign inline |
| **`npm run verify:actions`** | ✅ API smoke test (OPTIONS + GET) |
| **Local Inspector** ([blinks-xyz repo](https://github.com/solana-developers/blinks-xyz)) | ✅ Full protocol debug — run `npm run dev` locally |
| **dial.to** | ❌ Down (`DEPLOYMENT_PAUSED`) |
| **blinks.xyz/inspector** | ❌ Parked domain (redirects to `/lander`) |

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
| 1 | Send USDC | Live (devnet) |
| 2 | Tip creator (SOL) | Live (devnet) |
| 3 | Send USDC abroad | Beta (devnet) |
| 4 | Swap SOL → USDC | Planned |
| 5 | Graduation NFT | Planned |

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