import type { ActionPostRequest, NextActionPostRequest } from "@solana/actions";
import {
  Connection,
  PublicKey,
  SystemProgram,
  type ParsedInstruction,
  type ParsedTransactionWithMeta,
} from "@solana/web3.js";

type AccountBody = ActionPostRequest | NextActionPostRequest | { account?: string };

/**
 * Parse and validate the `account` field from an Action POST body.
 * Matches official @solana/actions example error strings.
 */
export function parseAccount(body: AccountBody): PublicKey {
  if (!body.account) {
    throw 'Missing "account" in request body';
  }

  try {
    return new PublicKey(body.account);
  } catch {
    throw 'Invalid "account" provided';
  }
}

/**
 * Parse an optional base58 pubkey from a query param or env fallback.
 */
export function parsePubkey(
  value: string | null | undefined,
  label: string,
): PublicKey {
  if (!value) {
    throw `Invalid input query parameter: ${label}`;
  }

  try {
    return new PublicKey(value);
  } catch {
    throw `Invalid input query parameter: ${label}`;
  }
}

export interface SolTransferExpectation {
  from: PublicKey;
  to: PublicKey;
  lamports: number;
}

export interface SplTransferExpectation {
  from: PublicKey;
  to: PublicKey;
  mint: PublicKey;
  amount: number;
  /** When true, only `transferChecked` instructions are accepted. */
  requireChecked?: boolean;
}

export interface ValidateTransferTxOptions {
  connection: Connection;
  signature: string;
  expectedSender: PublicKey;
  solTransfer?: SolTransferExpectation;
  splTransfer?: SplTransferExpectation;
  commitment?: "confirmed" | "finalized";
}

export interface MemoExpectation {
  programId: PublicKey;
  memo: string;
}

export interface ValidateMemoTxOptions {
  connection: Connection;
  signature: string;
  expectedSender: PublicKey;
  memo: MemoExpectation;
  commitment?: "confirmed" | "finalized";
}

function findSolTransfer(
  instructions: ParsedInstruction[],
  expected: SolTransferExpectation,
): boolean {
  return instructions.some((ix) => {
    if (!("parsed" in ix) || ix.program !== "system") {
      return false;
    }

    const parsed = ix.parsed as {
      type?: string;
      info?: { source?: string; destination?: string; lamports?: number };
    };

    if (parsed.type !== "transfer" || !parsed.info) {
      return false;
    }

    return (
      parsed.info.source === expected.from.toBase58() &&
      parsed.info.destination === expected.to.toBase58() &&
      parsed.info.lamports === expected.lamports
    );
  });
}

function findSplTransfer(
  instructions: ParsedInstruction[],
  expected: SplTransferExpectation,
): boolean {
  return instructions.some((ix) => {
    if (!("parsed" in ix) || ix.program !== "spl-token") {
      return false;
    }

    const parsed = ix.parsed as {
      type?: string;
      info?: {
        authority?: string;
        source?: string;
        destination?: string;
        mint?: string;
        tokenAmount?: { amount?: string };
        amount?: string;
      };
    };

    const type = parsed.type;
    if (!parsed.info) {
      return false;
    }

    if (expected.requireChecked && type !== "transferChecked") {
      return false;
    }

    if (!expected.requireChecked && type !== "transfer" && type !== "transferChecked") {
      return false;
    }

    const rawAmount =
      parsed.info.tokenAmount?.amount ?? parsed.info.amount ?? null;
    if (rawAmount === null) {
      return false;
    }

    return (
      parsed.info.authority === expected.from.toBase58() &&
      parsed.info.destination === expected.to.toBase58() &&
      parsed.info.mint === expected.mint.toBase58() &&
      Number(rawAmount) === expected.amount
    );
  });
}

function collectParsedInstructions(
  tx: ParsedTransactionWithMeta,
): ParsedInstruction[] {
  const outer = tx.transaction.message.instructions.filter(
    (ix): ix is ParsedInstruction => "parsed" in ix,
  );

  const inner =
    tx.meta?.innerInstructions?.flatMap((group) =>
      group.instructions.filter((ix): ix is ParsedInstruction => "parsed" in ix),
    ) ?? [];

  return [...outer, ...inner];
}

function findMemoInstruction(
  instructions: ParsedInstruction[],
  expected: MemoExpectation,
): boolean {
  return instructions.some((ix) => {
    if (!ix.programId.equals(expected.programId)) {
      return false;
    }

    const parsed = ix.parsed as unknown;
    if (typeof parsed === "string") {
      return parsed === expected.memo;
    }

    if (!parsed || typeof parsed !== "object") {
      return false;
    }

    const parsedRecord = parsed as {
      memo?: string;
      info?: { memo?: string };
    };

    return (
      parsedRecord.memo === expected.memo ||
      parsedRecord.info?.memo === expected.memo
    );
  });
}

async function getVerifiedParsedTx({
  connection,
  signature,
  expectedSender,
  commitment = "confirmed",
}: {
  connection: Connection;
  signature: string;
  expectedSender: PublicKey;
  commitment?: "confirmed" | "finalized";
}): Promise<ParsedTransactionWithMeta> {
  const status = await connection.getSignatureStatus(signature, {
    searchTransactionHistory: true,
  });

  const confirmation = status.value?.confirmationStatus;
  if (
    !status.value ||
    (confirmation !== "confirmed" && confirmation !== "finalized")
  ) {
    throw "Transaction not confirmed";
  }

  const parsedTx = await connection.getParsedTransaction(signature, {
    commitment,
    maxSupportedTransactionVersion: 0,
  });

  if (!parsedTx) {
    throw "Transaction not found";
  }

  if (parsedTx.meta?.err) {
    throw "Transaction failed on-chain";
  }

  const feePayer = parsedTx.transaction.message.accountKeys[0]?.pubkey;
  if (!feePayer?.equals(expectedSender)) {
    throw "Transaction fee payer does not match account";
  }

  return parsedTx;
}

/**
 * Verify an on-chain transfer matches lesson expectations.
 * Used by `/complete` callback routes after the wallet confirms a transaction.
 */
export async function validateTransferTx(
  options: ValidateTransferTxOptions,
): Promise<ParsedTransactionWithMeta> {
  const {
    connection,
    signature,
    expectedSender,
    solTransfer,
    splTransfer,
    commitment = "confirmed",
  } = options;

  const parsedTx = await getVerifiedParsedTx({
    connection,
    signature,
    expectedSender,
    commitment,
  });

  const instructions = collectParsedInstructions(parsedTx);

  if (solTransfer) {
    const found = findSolTransfer(instructions, solTransfer);
    if (!found) {
      throw `Expected SOL transfer of ${solTransfer.lamports} lamports to ${solTransfer.to.toBase58()}`;
    }
  }

  if (splTransfer) {
    const found = findSplTransfer(instructions, splTransfer);
    if (!found) {
      throw `Expected SPL transfer of ${splTransfer.amount} to ${splTransfer.to.toBase58()}`;
    }
  }

  return parsedTx;
}

export async function validateMemoTx(
  options: ValidateMemoTxOptions,
): Promise<ParsedTransactionWithMeta> {
  const {
    connection,
    signature,
    expectedSender,
    memo,
    commitment = "confirmed",
  } = options;

  const parsedTx = await getVerifiedParsedTx({
    connection,
    signature,
    expectedSender,
    commitment,
  });

  const instructions = collectParsedInstructions(parsedTx);
  if (!findMemoInstruction(instructions, memo)) {
    throw "Expected lesson memo instruction";
  }

  return parsedTx;
}

/**
 * Ensure a native SOL recipient account will be rent-exempt after transfer.
 */
export async function assertRentExemptRecipient(
  connection: Connection,
  recipient: PublicKey,
  lamports: number,
): Promise<void> {
  const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
  if (lamports < minimumBalance) {
    throw `account may not be rent exempt: ${recipient.toBase58()}`;
  }
}

/** System program id helper for instruction builders */
export const SYSTEM_PROGRAM_ID = SystemProgram.programId;
