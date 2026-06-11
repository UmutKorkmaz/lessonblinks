# Completion Storage

Issue #3 adds the storage boundary that later `/complete` callbacks and graduation gating will use.

## Provider

The first provider is a server-side file store:

- Provider env: `COMPLETION_STORE_PROVIDER=file`
- File env: `COMPLETION_STORE_FILE=data/completion-store.json`
- Default path: `app/data/completion-store.json`

`app/data/` is gitignored. This is durable for local development and preview servers with writable disk, but production should move the same `CompletionStore` interface to Supabase/Postgres before paid sponsor reporting.

## Data Model

```typescript
lessonCompletions: Array<{
  wallet: string;
  lessonId: "lesson-01" | "lesson-02" | "lesson-03" | "lesson-04" | "lesson-05";
  signature: string;
  verifiedAt: string;
  network: "devnet" | "mainnet-beta";
  metadata: Record<string, unknown>;
}>

graduates: Array<{
  wallet: string;
  mint: string;
  claimedAt: string;
  network: "devnet" | "mainnet-beta";
  metadata: Record<string, unknown>;
}>
```

Idempotency rules:

- Lesson completions are idempotent by `(wallet, lessonId, signature)`.
- Graduation claims are idempotent by `wallet`.
- Re-inserting an existing key returns the stored record with `created: false`.

## Usage

```typescript
import { getCompletionStore } from "@/lib/completion";

const store = getCompletionStore();

await store.recordLessonCompletion({
  wallet: account.toBase58(),
  lessonId: "lesson-02",
  signature,
  metadata: {
    amountLamports: 1_000_000,
    recipient: creator.toBase58(),
  },
});

const readyToGraduate = await store.hasCompletedLessons(account.toBase58(), [
  "lesson-01",
  "lesson-02",
  "lesson-03",
  "lesson-04",
]);

await store.recordGraduate({
  wallet: account.toBase58(),
  mint: mintAddress,
  metadata: { mintSignature },
});
```

## Sponsor-Safe Output

Do not expose full wallets or full signatures in sponsor reports. Use the reporting helpers:

```typescript
import { toSponsorSafeCompletion } from "@/lib/completion";

const safe = toSponsorSafeCompletion(completion);
```

The helper returns a salted wallet hash, short signature id, lesson id, timestamp, and network. Set `WALLET_REPORT_SALT` in production so the hash cannot be trivially correlated across environments.

## Supabase Migration Shape

When moving the provider to Supabase/Postgres, use this equivalent shape:

```sql
CREATE TABLE lesson_completions (
  wallet      TEXT NOT NULL,
  lesson_id   TEXT NOT NULL,
  signature   TEXT NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  network     TEXT NOT NULL DEFAULT 'devnet',
  metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (wallet, lesson_id, signature)
);

CREATE TABLE graduates (
  wallet     TEXT PRIMARY KEY,
  mint       TEXT NOT NULL,
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  network    TEXT NOT NULL DEFAULT 'devnet',
  metadata   JSONB NOT NULL DEFAULT '{}'::jsonb
);
```
