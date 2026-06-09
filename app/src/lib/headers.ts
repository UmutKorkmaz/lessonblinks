import { createActionHeaders as sdkCreateActionHeaders } from "@solana/actions";
import { SOLANA_CLUSTER } from "./constants";

const chainId = SOLANA_CLUSTER === "mainnet-beta" ? "mainnet" : "devnet";

/**
 * Standard CORS + Solana Actions headers for GET, POST, and OPTIONS.
 * Includes `Access-Control-Allow-Origin: *` and blockchain id for devnet/mainnet.
 */
export const actionHeaders = sdkCreateActionHeaders({ chainId });

/**
 * Build Action headers with optional overrides (chain id, action version, extra headers).
 */
export function createActionHeaders(
  args?: Parameters<typeof sdkCreateActionHeaders>[0],
) {
  return sdkCreateActionHeaders({
    chainId,
    ...args,
  });
}