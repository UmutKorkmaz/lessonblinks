# Changelog

## 2026-06-09

### Changed — Blinks Inspector as primary test surface

- Replaced dial.to interstitial links with [blinks.xyz/inspector](https://www.blinks.xyz/inspector) deep-links (`?url=` encoded Action API URL).
- UI buttons now read **Test on blinks.xyz**; header links to the official Inspector.
- `getBlinkInspectorUrl()` added in `app/src/lib/lessons.ts`; `getDialToUrl()` kept as deprecated alias.
- README and dev checklist updated; dial.to noted as unreliable (`DEPLOYMENT_PAUSED` on Vercel).

### Fixed — Action metadata origin behind nginx

- Action `icon` / `external` URLs now use `NEXT_PUBLIC_BASE_URL` instead of `localhost:3210`.

### Infra

- Production: `https://blinks.umutkorkmaz.net` on DigitalOcean (PM2 port 3210).