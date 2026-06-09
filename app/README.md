# LessonBlinks App

Next.js app for **Blinks as Micro-Lessons** — Solana Action endpoints plus a lesson catalog UI.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
cd app
npm install
```

Copy environment variables for local dev (optional for GET/OPTIONS smoke tests):

```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SOLANA_RPC_URL=https://api.devnet.solana.com
EDUCATION_WALLET_PUBKEY=<your-devnet-treasury-pubkey>
```

`EDUCATION_WALLET_PUBKEY` is required for `POST /api/actions/lesson-1-usdc` transaction building. `GET` and `OPTIONS` work without it.

## Development

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the lesson catalog.

Other scripts:

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Next.js dev server on port 3000 |
| `build` | `npm run build` | Production build |
| `start` | `npm run start` | Run production server (after build) |
| `lint` | `npm run lint` | Next.js ESLint |
| `typecheck` | `npm run typecheck` | TypeScript check |
| `verify:actions` | `npm run verify:actions` | Curl OPTIONS + GET for Lesson 1 Action |

## Verify Lesson 1 Action

With the dev server running in another terminal:

```bash
npm run verify:actions
```

Or run the script directly:

```bash
bash scripts/verify-actions.sh
```

Override the base URL if needed:

```bash
BASE_URL=http://localhost:3000 bash scripts/verify-actions.sh
```

The script checks:

- `OPTIONS http://localhost:3000/api/actions/lesson-1-usdc` → HTTP 200 or 204
- `GET http://localhost:3000/api/actions/lesson-1-usdc?to=<demo-recipient>` → JSON with `"type": "action"`

If port 3000 is already in use, Next.js may start on 3001 — pass `BASE_URL` accordingly:

```bash
BASE_URL=http://localhost:3001 npm run verify:actions
```

## Test a Blink in the browser

1. Run `npm run dev`
2. Open a lesson card and click **Test Blink**, or visit dial.to with the Action URL:
   `https://dial.to/?action=solana-action:http://localhost:3000/api/actions/lesson-1-usdc`

## Project layout

```
app/
├── scripts/verify-actions.sh   # Action endpoint smoke test
├── src/
│   ├── app/
│   │   ├── api/actions/        # Solana Action route handlers
│   │   └── page.tsx            # Lesson catalog
│   ├── components/
│   └── lib/                    # Lessons, Solana helpers, i18n
└── package.json
```