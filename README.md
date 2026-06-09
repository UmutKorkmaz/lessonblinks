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

## Test a Blink

```
https://dial.to/?action=solana-action:https://blinks.umutkorkmaz.net/api/actions/lesson-1-usdc
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
- `@solana/actions`, `@solana/web3.js`, `@solana/spl-token`
- Devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHiiQ2PysUac9mKNkHjWwy6`

## Documentation

See [`docs/`](docs/) for architecture, curriculum, security, deployment, and lesson specs.

## License

MIT