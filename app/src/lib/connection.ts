import { clusterApiUrl, Connection } from "@solana/web3.js";
import { SOLANA_CLUSTER, SOLANA_RPC_URL } from "./constants";

let cached: Connection | null = null;

/**
 * Singleton Solana RPC connection for Action route handlers.
 * Reads `SOLANA_RPC_URL` / `SOLANA_RPC` from env; defaults to public devnet.
 */
export function getConnection(): Connection {
  if (!cached) {
    const endpoint =
      SOLANA_RPC_URL ||
      clusterApiUrl(SOLANA_CLUSTER === "mainnet-beta" ? "mainnet-beta" : "devnet");

    cached = new Connection(endpoint, "confirmed");
  }

  return cached;
}

/** Reset cached connection (useful in tests or after env changes). */
export function resetConnection(): void {
  cached = null;
}