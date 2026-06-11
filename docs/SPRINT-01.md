# Sprint 01: Registry-Grade LessonBlinks

Date: 2026-06-11

Goal: make the existing live LessonBlinks app consistent, verifiable, and ready for a public devnet pilot.

## Sprint Scope

This sprint does not add new product surface. It makes the current five lessons trustworthy.

In scope:

- Canonical route and lesson matrix.
- Lesson 2 product decision.
- Durable completion model.
- Verified completion callbacks.
- Lesson 5 graduation gating.
- Full Action verification script.
- Baseline production analytics.

Out of scope:

- Mainnet migration.
- Paid sponsor UI.
- Privy embedded wallet.
- New lessons.
- Enterprise/white-label flows.

## Audit Result

Current code route matrix:

| Lesson | Share path | Action endpoint | Route file |
|---:|---|---|---|
| 1 | `/lesson/tip-usdc` | `/api/actions/lesson-1-usdc` | `app/src/app/api/actions/lesson-1-usdc/route.ts` |
| 2 | `/lesson/tip-creator-sol` | `/api/actions/lesson-2-tip` | `app/src/app/api/actions/lesson-2-tip/route.ts` |
| 3 | `/lesson/remittance` | `/api/actions/lesson-3-remittance` | `app/src/app/api/actions/lesson-3-remittance/route.ts` |
| 4 | `/lesson/swap-sol-usdc` | `/api/actions/lesson-4-swap` | `app/src/app/api/actions/lesson-4-swap/route.ts` |
| 5 | `/lesson/claim-graduation-nft` | `/api/actions/lesson-5/claim` | `app/src/app/api/actions/lesson-5/claim/route.ts` |

Current findings:

- `app/src/app/api/actions.json/route.ts` currently maps the five share paths to the five actual endpoints.
- No route files currently exist for `/complete` callbacks.
- Lesson 2 code currently uses native SOL, not USDC.
- Docs/specs still contain older route names in some places.
- `app/scripts/verify-actions.sh` only verifies Lesson 1 OPTIONS and GET.

## Issues To Create

### Issue 1: Reconcile canonical lesson route matrix across docs and code

Outcome:

- `docs/START-PLAN.md` remains the canonical matrix.
- `README.md`, `docs/DIALECT-REGISTRY.md`, `docs/DEVNET-CHECKLIST.md`, `docs/ARCHITECTURE.md`, and `docs/specs/*.md` no longer conflict on route names.
- `actions.json` still returns exactly five rules.

Acceptance:

- `curl "$BASE_URL/actions.json"` returns the five canonical rules.
- No docs reference the older grouped Action endpoint prefix unless explicitly marked historical.

### Issue 2: Decide and apply Lesson 2 currency direction

Outcome:

- Decide whether Lesson 2 is `0.001 SOL` or `$0.10 USDC`.
- Update all copy, specs, constants, validation, and success messages to match.

Recommendation:

- Keep current `0.001 SOL` implementation for now because it teaches native SOL fees and is already live.
- Update docs to say the course is "USDC-first, SOL-aware" instead of pretending every early action is USDC.

Acceptance:

- `app/src/lib/lessons/lesson-02.ts`, `docs/CURRICULUM.md`, `docs/DEVNET-CHECKLIST.md`, `docs/specs/lesson-02-tip-creator.md`, and `docs/DIALECT-REGISTRY.md` agree.

### Issue 3: Add durable completion and graduate storage

Outcome:

- Add a small persistence layer for lesson completions and graduates.
- Start with a provider interface so the first implementation can be SQLite, Supabase, or file-backed local storage.

Minimal tables:

- `lesson_completions(wallet, lesson_id, signature, verified_at, metadata)`
- `graduates(wallet, mint, claimed_at, metadata)`

Acceptance:

- Completion insert is idempotent by `(wallet, lesson_id, signature)`.
- Graduate insert is idempotent by wallet.
- Local development has setup docs and `.env.example` keys.

### Issue 4: Implement verified completion callbacks for Lessons 1-4

Outcome:

- Add `/complete` callback endpoints or equivalent server verification flow.
- Verify parsed transactions before recording completion.

Acceptance:

- Lesson 1 verifies USDC mint, amount, sender, and recipient.
- Lesson 2 verifies SOL transfer amount, sender, and creator recipient.
- Lesson 3 verifies USDC mint, amount, sender, and remittance recipient.
- Lesson 4 verifies the swap-demo memo transaction shape.
- Invalid signatures do not create completion rows.

### Issue 5: Gate Lesson 5 graduation by verified prerequisites

Outcome:

- Lesson 5 checks durable completions for Lessons 1-4 before building the mint transaction.
- Repeated claims return already-completed state or a safe error, not a second mint.

Acceptance:

- Wallet with 0 verified completions cannot claim.
- Wallet with Lessons 1-4 can claim.
- Same wallet cannot claim twice.
- Tests cover locked, eligible, and already-claimed states.

### Issue 6: Expand `verify:actions` to all five lessons

Outcome:

- `npm run verify:actions` checks `actions.json`, OPTIONS, GET schema, and basic POST error behavior for all five routes.

Acceptance:

- Script prints a per-route summary.
- Script exits non-zero on missing CORS, missing `type: action`, bad JSON, or route mismatch.
- Script supports `BASE_URL=https://blinks.umutkorkmaz.net`.

### Issue 7: Add production analytics baseline

Outcome:

- Add server-side events for the funnel needed by grants and sponsors.

Events:

- `lesson_opened`
- `lesson_transaction_requested`
- `lesson_completion_verified`
- `lesson_completion_failed`
- `graduation_locked`
- `graduation_claimed`

Acceptance:

- Events include lesson id, locale, campaign ref, and truncated/hash wallet id where applicable.
- No full wallet addresses are sent to sponsor reports by default.
- Analytics can produce a basic lesson funnel for grant screenshots.

## Sprint Exit Criteria

- [ ] Docs and code agree on the five current lesson routes.
- [ ] Lesson 2 direction is explicit and reflected everywhere.
- [ ] Durable completion storage exists.
- [ ] Lessons 1-4 can record verified completion.
- [ ] Lesson 5 is gated by verified progression.
- [ ] `npm run verify:actions` covers all five routes.
- [ ] A basic analytics funnel can be shown for a pilot.

## Suggested Order

1. Issue 1
2. Issue 2
3. Issue 6
4. Issue 3
5. Issue 4
6. Issue 5
7. Issue 7

Reasoning:

- Route/doc consistency and Lesson 2 decision prevent wasted implementation.
- Expanded verification gives fast feedback before storage and callbacks.
- Completion storage and verified callbacks are the main technical work.
- Analytics should use the final event points after verification is real.
