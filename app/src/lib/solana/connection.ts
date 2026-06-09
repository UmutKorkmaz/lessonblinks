import { clusterApiUrl, Connection } from "@solana/web3.js";
import { SOLANA_NETWORK, SOLANA_RPC } from "@/lib/lessons/constants";

let connection: Connection | null = null;

export function getConnection(): Connection {
  if (!connection) {
    const endpoint =
      SOLANA_RPC ||
      clusterApiUrl(SOLANA_NETWORK === "mainnet-beta" ? "mainnet-beta" : "devnet");
    connection = new Connection(endpoint, "confirmed");
  }
  return connection;
}