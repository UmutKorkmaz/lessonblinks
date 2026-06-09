import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  type Connection,
} from "@solana/web3.js";
import { LESSON_02_TIP_LAMPORTS } from "@/lib/lessons/constants";

export interface BuildSolTransferParams {
  connection: Connection;
  sender: PublicKey;
  recipient: PublicKey;
  lamports?: number;
}

export async function buildSolTransferTransaction({
  connection,
  sender,
  recipient,
  lamports = LESSON_02_TIP_LAMPORTS,
}: BuildSolTransferParams): Promise<Transaction> {
  const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
  if (lamports < minimumBalance) {
    throw `account may not be rent exempt: ${recipient.toBase58()}`;
  }

  const senderBalance = await connection.getBalance(sender);
  const feeBuffer = 5_000;
  const requiredBalance = lamports + feeBuffer;
  if (senderBalance < requiredBalance) {
    throw `Insufficient SOL balance. You need at least ${(requiredBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL (tip + fees).`;
  }

  const transferIx = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports,
  });

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  return new Transaction({
    feePayer: sender,
    blockhash,
    lastValidBlockHeight,
  }).add(transferIx);
}