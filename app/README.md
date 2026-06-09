# LessonBlinks App

Next.js application for Solana Actions micro-lessons.

## Development

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Verify Action endpoints

```bash
npm run verify:actions
# production:
BASE_URL=https://blinks.umutkorkmaz.net npm run verify:actions
```

## Test Blinks in the browser

**Recommended:** open a lesson page, connect a devnet wallet, complete the embedded Blink.

```
http://localhost:3000/lessons/1
```

Hosted inspectors (`dial.to`, `blinks.xyz/inspector`) are down/parked as of June 2026. For protocol debugging, run the local Inspector from [solana-developers/blinks-xyz](https://github.com/solana-developers/blinks-xyz).

## Production

- PM2: `ecosystem.config.cjs` (port `3210`)
- nginx config: `../deploy/nginx-blinks.umutkorkmaz.net.conf`
- Env: `.env.local` on server (not committed) — include `NEXT_PUBLIC_SOLANA_RPC_URL`