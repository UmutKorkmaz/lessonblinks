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

Use the official **[Blinks Inspector](https://www.blinks.xyz/inspector)** — not dial.to (currently down).

1. Click **Test in Inspector** on any active lesson card, or
2. Open Inspector and paste an Action URL, e.g.:

```
https://blinks.umutkorkmaz.net/api/actions/lesson-1-usdc
```

Deep-link format used by the UI:

```
https://www.blinks.xyz/inspector?url=<url-encoded-action-api-url>
```

## Production

- PM2: `ecosystem.config.cjs` (port `3210`)
- nginx config: `../deploy/nginx-blinks.umutkorkmaz.net.conf`
- Env: `.env.local` on server (not committed)