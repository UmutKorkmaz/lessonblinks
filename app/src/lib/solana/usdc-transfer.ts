import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PublicKey,
  Transaction,
  type Connection,
  type TransactionInstruction,
} from "@solana/web3.js";
import {
  DEVNET_USDC_MINT,
  LESSON_01_TRANSFER_AMOUNT,
} from "@/lib/lessons/constants";

export interface BuildUsdcTransferParams {
  connection: Connection;
  sender: PublicKey;
  recipient: PublicKey;
  amount?: number;
}

export async function buildUsdcTransferTransaction({
  connection,
  sender,
  recipient,
  amount = LESSON_01_TRANSFER_AMOUNT,
}: BuildUsdcTransferParams): Promise<Transaction> {
  const mint = new PublicKey(DEVNET_USDC_MINT);

  const senderAta = await getAssociatedTokenAddress(mint, sender);
  const recipientAta = await getAssociatedTokenAddress(mint, recipient);

  const instructions: TransactionInstruction[] = [];

  try {
    await getAccount(connection, senderAta);
  } catch {
    throw new Error(
      "You need a devnet USDC token account with at least 0.01 USDC. Get free devnet USDC at https://faucet.circle.com (select Solana Devnet) and SOL for fees at https://faucet.solana.com.",
    );
  }

  try {
    await getAccount(connection, recipientAta);
  } catch {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        sender,
        recipientAta,
        recipient,
        mint,
        TOKEN_PROGRAM_ID,
      ),
    );
  }

  instructions.push(
    createTransferInstruction(
      senderAta,
      recipientAta,
      sender,
      amount,
      [],
      TOKEN_PROGRAM_ID,
    ),
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  return new Transaction({
    feePayer: sender,
    blockhash,
    lastValidBlockHeight,
  }).add(...instructions);
}