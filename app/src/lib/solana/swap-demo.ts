import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
  type Connection,
} from "@solana/web3.js";
import {
  LESSON_04_MIN_RESERVE_LAMPORTS,
  LESSON_04_SWAP_LAMPORTS,
} from "@/lib/lessons/lesson-04";

/** SPL Memo program (same id on devnet and mainnet). */
export const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

interface SwapDemoMemo {
  v: 1;
  course: "lessonblinks-101";
  lesson: 4;
  type: "swap-demo";
}

const SWAP_DEMO_MEMO: SwapDemoMemo = {
  v: 1,
  course: "lessonblinks-101",
  lesson: 4,
  type: "swap-demo",
};

export const SWAP_DEMO_MEMO_TEXT = JSON.stringify(SWAP_DEMO_MEMO);

export interface BuildSwapDemoParams {
  connection: Connection;
  account: PublicKey;
}

/**
 * Devnet-mock for Lesson 4 (Jupiter has no devnet liquidity).
 * Verifies the learner holds the swap amount + fee reserve, then builds a
 * memo-only transaction they sign — onchain proof of lesson completion.
 */
export async function buildSwapDemoTransaction({
  connection,
  account,
}: BuildSwapDemoParams): Promise<Transaction> {
  const balance = await connection.getBalance(account);
  const required = LESSON_04_SWAP_LAMPORTS + LESSON_04_MIN_RESERVE_LAMPORTS;

  if (balance < required) {
    const requiredSol = (required / LAMPORTS_PER_SOL).toFixed(3);
    throw new Error(
      `You need at least ${requiredSol} SOL (swap amount + fees) to take this lesson. Get free devnet SOL at https://faucet.solana.com.`,
    );
  }

  const memoIx = new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [{ pubkey: account, isSigner: true, isWritable: false }],
    data: Buffer.from(SWAP_DEMO_MEMO_TEXT, "utf8"),
  });

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  return new Transaction({
    feePayer: account,
    blockhash,
    lastValidBlockHeight,
  }).add(memoIx);
}
