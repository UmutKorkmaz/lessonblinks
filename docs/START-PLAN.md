# LessonBlinks Start Plan

Date: 2026-06-11

Live app: https://blinks.umutkorkmaz.net/

GitHub: https://github.com/UmutKorkmaz/lessonblinks

## Decision

LessonBlinks is already implemented and should be the active web3 project.

The next phase is not a greenfield build. It is a reliability, measurement, and sponsor-readiness pass:

1. Make the live lesson matrix canonical.
2. Resolve docs/code drift.
3. Add durable completion tracking.
4. Add verified progression and graduation gating.
5. Add production analytics and sponsor reporting.
6. Prepare grant and sponsor proof assets.

## Current Implementation

Confirmed in the repo:

- Next.js 15 app under `app/`.
- Five active Action endpoints.
- Embedded Blink rendering on lesson pages.
- 14-language UI.
- Production deploy assets under `deploy/`.
- `verify:actions` script exists.
- GitHub repo homepage points to `https://blinks.umutkorkmaz.net/`.

## Canonical Route Matrix

This is the current code truth as of 2026-06-11.

| Lesson | Slug | Share path | Action endpoint | Current transaction |
|---:|---|---|---|---|
| 1 | `tip-usdc` | `/lesson/tip-usdc` | `/api/actions/lesson-1-usdc` | Send `0.01 USDC` to education/treasury wallet |
| 2 | `tip-creator-sol` | `/lesson/tip-creator-sol` | `/api/actions/lesson-2-tip` | Tip `0.001 SOL` to creator wallet |
| 3 | `remittance` | `/lesson/remittance` | `/api/actions/lesson-3-remittance` | Send `0.05 USDC` to demo remittance wallet |
| 4 | `swap-sol-usdc` | `/lesson/swap-sol-usdc` | `/api/actions/lesson-4-swap` | Sign devnet swap-demo memo |
| 5 | `claim-graduation-nft` | `/lesson/claim-graduation-nft` | `/api/actions/lesson-5/claim` | Mint supply-1 devnet graduation badge |

The current `actions.json` route matches these five share paths and endpoints.

## Known Drift

These must be fixed before public grant or sponsor claims.

- Several docs still need to be kept aligned with the canonical route matrix.
- Some lesson specs describe Lesson 2 as `$0.10 USDC`, while code currently uses `0.001 SOL`.
- Completion callbacks are documented, but the current action routes do not expose durable `/complete` endpoints.
- Lesson 5 says completion is "on your honor" in code copy; it is not yet gated by verified Lessons 1-4.
- `verify:actions` only checks Lesson 1 OPTIONS and GET.
- Analytics docs describe PostHog/server truth, while implementation is still lightweight/local.

## Product Positioning

Sell verified educational distribution, not a payment product.

Best first revenue wedge:

- Lesson 3 sponsor slot for a wallet, exchange, remittance fintech, stablecoin partner, or Turkish web3 sponsor.
- Weekly sponsor report with opens, taps, completions, locale split, campaign refs, and CTA clicks.

Guardrails:

- Keep Turkey-facing claims educational.
- Do not call Lesson 3 a real remittance service.
- Do not add fiat rails, custody, exchange, or crypto payment processing without partner/legal review.
- Truncate or hash wallet addresses in reports.

## Phase 1: Registry-Grade MVP

Goal: the current app is reliable, measurable, and ready for a public devnet pilot.

Tasks:

1. Reconcile docs/code route matrix.
2. Decide Lesson 2 direction and update docs/code.
3. Add durable completion storage.
4. Add verified completion callbacks for Lessons 1-4.
5. Gate Lesson 5 with verified prerequisites and one-claim-per-wallet.
6. Expand `verify:actions` to all five routes.
7. Add production analytics events for the sponsor/grant funnel.

Exit criteria:

- One wallet can complete Lessons 1-5 on devnet.
- Progression is stored durably.
- Graduation cannot be claimed before Lessons 1-4.
- Graduation cannot be claimed twice by the same wallet.
- `actions.json` exposes exactly the canonical five paths.
- All Action routes pass CORS and GET schema checks.
- Analytics can show opened, tapped, transaction-built, completed, and graduated counts by lesson and locale.

## Phase 2: Grant And Pilot Proof

Goal: use the working app to produce fundable proof.

Tasks:

- Create grant proof pack under `docs/grants/`.
- Record a 2-minute Turkish demo video.
- Create screenshots for the live app and lesson flows.
- Add pilot metrics template.
- Run a 100-wallet Turkish devnet pilot.
- Submit Solana Foundation Turkey Grant with live URL, repo, video, and metrics.

Exit criteria:

- 100 wallets start Lesson 1.
- 60 wallets complete Lesson 1.
- 25 wallets graduate.
- At least 40 percent of usage is Turkish locale or Turkish campaign traffic.

## Phase 3: Sponsor Package

Goal: convert pilot proof into one paid sponsor pilot.

Tasks:

- Add sponsor config.
- Add sponsor copy/CTA rendering in GET responses.
- Track sponsor impressions and CTA clicks.
- Generate weekly sponsor report.
- Contact 20 sponsor targets.
- Close 3 calls and 1 paid/LOI sponsor pilot.

Exit criteria:

- One sponsor slot can be configured without code changes.
- Sponsor report includes impressions, completions, CTA clicks, conversion rate, and campaign refs.
- A paid pilot or written LOI exists.

## Start Here

Use `docs/SPRINT-01.md` as the first execution checklist.
