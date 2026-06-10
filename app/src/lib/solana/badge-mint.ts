import {
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  type Connection,
} from "@solana/web3.js";

/** Rough rent for mint + ATA plus fees the learner must cover. */
const MIN_BALANCE_LAMPORTS = 4_000_000;

export interface BuildBadgeMintParams {
  connection: Connection;
  recipient: PublicKey;
}

export interface BadgeMintResult {
  transaction: Transaction;
  /** Ephemeral mint keypair — must partial-sign the transaction. */
  mintKeypair: Keypair;
}

/**
 * Builds a single transaction that mints a supply-1 "graduation badge" token:
 * create mint (learner pays rent) → init with decimals 0 → create learner ATA
 * → mint exactly 1 → burn the mint authority so supply is fixed forever.
 *
 * The ephemeral mint keypair partial-signs server-side; the learner is the
 * fee payer and final signer. No funded server wallet is required.
 */
export async function buildBadgeMintTransaction({
  connection,
  recipient,
}: BuildBadgeMintParams): Promise<BadgeMintResult> {
  const balance = await connection.getBalance(recipient);
  if (balance < MIN_BALANCE_LAMPORTS) {
    const requiredSol = (MIN_BALANCE_LAMPORTS / LAMPORTS_PER_SOL).toFixed(3);
    throw new Error(
      `You need about ${requiredSol} SOL for badge rent and fees. Get free devnet SOL at https://faucet.solana.com.`,
    );
  }

  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;
  const mintRent = await getMinimumBalanceForRentExemptMint(connection);
  const recipientAta = await getAssociatedTokenAddress(mint, recipient);

  const instructions = [
    SystemProgram.createAccount({
      fromPubkey: recipient,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: mintRent,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMint2Instruction(mint, 0, mint, null),
    createAssociatedTokenAccountInstruction(recipient, recipientAta, recipient, mint),
    createMintToInstruction(mint, recipientAta, mint, 1),
    createSetAuthorityInstruction(mint, mint, AuthorityType.MintTokens, null),
  ];

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  const transaction = new Transaction({
    feePayer: recipient,
    blockhash,
    lastValidBlockHeight,
  }).add(...instructions);

  return { transaction, mintKeypair };
}
