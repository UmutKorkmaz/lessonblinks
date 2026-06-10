# Changelog

## 2026-06-10

### Added — Lessons 4 and 5 go live (full 5-lesson path)

- **Lesson 4 · Swap** — devnet-mock per spec (Jupiter has no devnet liquidity): balance gate of 0.015 SOL, then the learner signs a real devnet transaction carrying a `swap-demo` memo (SPL Memo v2) as onchain proof of completion.
- **Lesson 5 · Graduation badge** — real supply-1 token mint in one transaction: create mint (learner pays rent) → init decimals 0 → ATA → mint 1 → burn mint authority. Ephemeral mint keypair partial-signs server-side via `createPostResponse({ signers })`; no funded server wallet needed.
- Richer lesson content model: `whyItMatters`, `steps`, `concepts`, `glossary`, `funFact` per lesson, rendered on detail pages.

### Changed — Design overhaul

- Space Grotesk display + Inter body via `next/font`; design tokens, radial Solana-brand atmosphere, designed hover/focus/active states, `prefers-reduced-motion` support.
- Landing page rebuilt as a numbered learning path (ghost numerals, concept chips, stat chips) replacing the uniform card grid.
- Lesson detail pages restructured: progress bar, why-it-matters, numbered steps, gradient-bordered Blink panel, glossary, prev/next nav with titles.
- `dial.to/developer` (devnet) fallback link under each embedded Blink; header links to the Blink tester instead of the parked inspector.

### Fixed

- `actions.json` pathPatterns now match the real `/lesson/[slug]` routes (old patterns 404'd).
- `/lesson/[slug]` redirects humans to canonical `/lessons/[id]` instead of duplicating the page.
- Removed dead routes from old numbering: `lesson-3-swap`, `lesson-04/stake` (staking is out of curriculum), and unused `_lib/respond.ts`.
- Stale "staking" copy in Lesson 2 success message.

## 2026-06-09 (b)

### Changed — Embedded `@dialectlabs/blinks` replaces broken hosted inspectors

- **dial.to** — down (`DEPLOYMENT_PAUSED` / timeout).
- **blinks.xyz/inspector** — parked (redirects to `/lander`).
- Lesson pages now render an inline Blink via `@dialectlabs/blinks` + wallet adapter (Phantom/Solflare, devnet).
- Homepage cards link to `/lessons/[id]` instead of external inspector URLs.
- Dev protocol debugging: run local [solana-developers/blinks-xyz](https://github.com/solana-developers/blinks-xyz) Inspector.

## 2026-06-09 (a)

### Changed — Blinks Inspector as primary test surface (superseded)

- Attempted switch from dial.to to blinks.xyz/inspector; hosted inspector later found parked.

### Fixed — Action metadata origin behind nginx

- Action `icon` / `external` URLs now use `NEXT_PUBLIC_BASE_URL` instead of `localhost:3210`.

### Infra

- Production: `https://blinks.umutkorkmaz.net` on DigitalOcean (PM2 port 3210).