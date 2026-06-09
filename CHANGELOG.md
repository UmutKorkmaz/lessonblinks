# Changelog

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