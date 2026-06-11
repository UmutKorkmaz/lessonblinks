import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type { LessonId } from "@/lib/lessons/types";

export type CompletionNetwork = "devnet" | "mainnet-beta";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export interface LessonCompletionInput {
  wallet: string;
  lessonId: LessonId;
  signature: string;
  verifiedAt?: string;
  network?: CompletionNetwork;
  metadata?: JsonObject;
}

export interface LessonCompletionRecord {
  wallet: string;
  lessonId: LessonId;
  signature: string;
  verifiedAt: string;
  network: CompletionNetwork;
  metadata: JsonObject;
}

export interface GraduateInput {
  wallet: string;
  mint: string;
  claimedAt?: string;
  network?: CompletionNetwork;
  metadata?: JsonObject;
}

export interface GraduateRecord {
  wallet: string;
  mint: string;
  claimedAt: string;
  network: CompletionNetwork;
  metadata: JsonObject;
}

export interface InsertResult<T> {
  record: T;
  created: boolean;
}

export interface CompletionStore {
  recordLessonCompletion(
    input: LessonCompletionInput,
  ): Promise<InsertResult<LessonCompletionRecord>>;
  getLessonCompletion(
    wallet: string,
    lessonId: LessonId,
    signature: string,
  ): Promise<LessonCompletionRecord | null>;
  listLessonCompletions(wallet: string): Promise<LessonCompletionRecord[]>;
  hasCompletedLessons(wallet: string, lessonIds: LessonId[]): Promise<boolean>;
  recordGraduate(input: GraduateInput): Promise<InsertResult<GraduateRecord>>;
  getGraduate(wallet: string): Promise<GraduateRecord | null>;
}

interface CompletionStoreSnapshot {
  version: 1;
  lessonCompletions: LessonCompletionRecord[];
  graduates: GraduateRecord[];
}

export interface SponsorSafeCompletion {
  walletId: string;
  lessonId: LessonId;
  signatureId: string;
  verifiedAt: string;
  network: CompletionNetwork;
}

export interface SponsorSafeGraduate {
  walletId: string;
  mintId: string;
  claimedAt: string;
  network: CompletionNetwork;
}

const DEFAULT_STORE_FILE = path.join(process.cwd(), "data", "completion-store.json");
const DEFAULT_NETWORK: CompletionNetwork = "devnet";

function emptySnapshot(): CompletionStoreSnapshot {
  return {
    version: 1,
    lessonCompletions: [],
    graduates: [],
  };
}

function normalizeIdentifier(value: string, label: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new Error(`${label} is required`);
  }
  return normalized;
}

function normalizeStoreFile(value: string | undefined): string {
  if (!value) {
    return DEFAULT_STORE_FILE;
  }
  return path.isAbsolute(value) ? value : path.join(process.cwd(), value);
}

function completionKey(
  wallet: string,
  lessonId: LessonId,
  signature: string,
): string {
  return `${wallet}:${lessonId}:${signature}`;
}

async function readSnapshot(filePath: string): Promise<CompletionStoreSnapshot> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<CompletionStoreSnapshot>;
    return {
      version: 1,
      lessonCompletions: Array.isArray(parsed.lessonCompletions)
        ? parsed.lessonCompletions
        : [],
      graduates: Array.isArray(parsed.graduates) ? parsed.graduates : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return emptySnapshot();
    }
    throw error;
  }
}

async function writeSnapshot(
  filePath: string,
  snapshot: CompletionStoreSnapshot,
): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  await rename(temporaryPath, filePath);
}

export class FileCompletionStore implements CompletionStore {
  private readonly filePath: string;
  private pendingWrite: Promise<void> = Promise.resolve();

  constructor(filePath = normalizeStoreFile(process.env.COMPLETION_STORE_FILE)) {
    this.filePath = filePath;
  }

  async recordLessonCompletion(
    input: LessonCompletionInput,
  ): Promise<InsertResult<LessonCompletionRecord>> {
    return this.withWriteLock(async () => {
      const wallet = normalizeIdentifier(input.wallet, "wallet");
      const signature = normalizeIdentifier(input.signature, "signature");
      const snapshot = await readSnapshot(this.filePath);
      const key = completionKey(wallet, input.lessonId, signature);
      const existing = snapshot.lessonCompletions.find(
        (record) =>
          completionKey(record.wallet, record.lessonId, record.signature) === key,
      );

      if (existing) {
        return { record: existing, created: false };
      }

      const record: LessonCompletionRecord = {
        wallet,
        lessonId: input.lessonId,
        signature,
        verifiedAt: input.verifiedAt ?? new Date().toISOString(),
        network: input.network ?? DEFAULT_NETWORK,
        metadata: input.metadata ?? {},
      };

      snapshot.lessonCompletions.push(record);
      await writeSnapshot(this.filePath, snapshot);
      return { record, created: true };
    });
  }

  async getLessonCompletion(
    wallet: string,
    lessonId: LessonId,
    signature: string,
  ): Promise<LessonCompletionRecord | null> {
    const normalizedWallet = normalizeIdentifier(wallet, "wallet");
    const normalizedSignature = normalizeIdentifier(signature, "signature");
    const key = completionKey(normalizedWallet, lessonId, normalizedSignature);
    const snapshot = await readSnapshot(this.filePath);

    return (
      snapshot.lessonCompletions.find(
        (record) =>
          completionKey(record.wallet, record.lessonId, record.signature) === key,
      ) ?? null
    );
  }

  async listLessonCompletions(wallet: string): Promise<LessonCompletionRecord[]> {
    const normalizedWallet = normalizeIdentifier(wallet, "wallet");
    const snapshot = await readSnapshot(this.filePath);

    return snapshot.lessonCompletions
      .filter((record) => record.wallet === normalizedWallet)
      .sort((left, right) => left.verifiedAt.localeCompare(right.verifiedAt));
  }

  async hasCompletedLessons(
    wallet: string,
    lessonIds: LessonId[],
  ): Promise<boolean> {
    const completions = await this.listLessonCompletions(wallet);
    const completed = new Set(completions.map((record) => record.lessonId));
    return lessonIds.every((lessonId) => completed.has(lessonId));
  }

  async recordGraduate(
    input: GraduateInput,
  ): Promise<InsertResult<GraduateRecord>> {
    return this.withWriteLock(async () => {
      const wallet = normalizeIdentifier(input.wallet, "wallet");
      const snapshot = await readSnapshot(this.filePath);
      const existing = snapshot.graduates.find((record) => record.wallet === wallet);

      if (existing) {
        return { record: existing, created: false };
      }

      const record: GraduateRecord = {
        wallet,
        mint: normalizeIdentifier(input.mint, "mint"),
        claimedAt: input.claimedAt ?? new Date().toISOString(),
        network: input.network ?? DEFAULT_NETWORK,
        metadata: input.metadata ?? {},
      };

      snapshot.graduates.push(record);
      await writeSnapshot(this.filePath, snapshot);
      return { record, created: true };
    });
  }

  async getGraduate(wallet: string): Promise<GraduateRecord | null> {
    const normalizedWallet = normalizeIdentifier(wallet, "wallet");
    const snapshot = await readSnapshot(this.filePath);
    return snapshot.graduates.find((record) => record.wallet === normalizedWallet) ?? null;
  }

  private async withWriteLock<T>(operation: () => Promise<T>): Promise<T> {
    const run = this.pendingWrite.then(operation, operation);
    this.pendingWrite = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }
}

let storeSingleton: CompletionStore | null = null;

export function getCompletionStore(): CompletionStore {
  if (storeSingleton) {
    return storeSingleton;
  }

  const provider = process.env.COMPLETION_STORE_PROVIDER ?? "file";
  if (provider !== "file") {
    throw new Error(`Unsupported COMPLETION_STORE_PROVIDER: ${provider}`);
  }

  storeSingleton = new FileCompletionStore();
  return storeSingleton;
}

export function buildWalletReportId(wallet: string): string {
  const salt = process.env.WALLET_REPORT_SALT ?? "lessonblinks";
  return createHash("sha256")
    .update(`${salt}:${wallet}`)
    .digest("hex")
    .slice(0, 16);
}

export function toSponsorSafeCompletion(
  record: LessonCompletionRecord,
): SponsorSafeCompletion {
  return {
    walletId: buildWalletReportId(record.wallet),
    lessonId: record.lessonId,
    signatureId: record.signature.slice(0, 8),
    verifiedAt: record.verifiedAt,
    network: record.network,
  };
}

export function toSponsorSafeGraduate(record: GraduateRecord): SponsorSafeGraduate {
  return {
    walletId: buildWalletReportId(record.wallet),
    mintId: record.mint.slice(0, 8),
    claimedAt: record.claimedAt,
    network: record.network,
  };
}
