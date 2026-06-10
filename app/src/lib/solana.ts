import { Connection, PublicKey } from "@solana/web3.js";

export const DEFAULT_RPC_URL = "https://api.devnet.solana.com";

export function getRpcUrl(): string {
  return process.env.SOLANA_RPC_URL ?? DEFAULT_RPC_URL;
}

export function getConnection(): Connection {
  return new Connection(getRpcUrl(), "confirmed");
}

export function getCreatorPubkey(): PublicKey {
  const value = process.env.CREATOR_WALLET_PUBKEY;
  if (!value) {
    throw new Error("CREATOR_WALLET_PUBKEY is not configured");
  }

  return new PublicKey(value);
}

// Circle USDC mint on Solana devnet (this app runs on devnet).
const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

export function getUsdcMint(): PublicKey {
  const value = process.env.USDC_MINT ?? DEVNET_USDC_MINT;
  return new PublicKey(value);
}

export function resolveIconUrl(origin: string, path: string): string {
  return new URL(path, origin).toString();
}