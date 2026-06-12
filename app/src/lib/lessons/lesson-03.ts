import { PublicKey } from "@solana/web3.js";

import { getCreatorPubkey } from "@/lib/solana";

export const LESSON_03_ACTION_PATH = "/api/actions/lesson-3-remittance";
export const LESSON_03_USDC_AMOUNT = 50_000;
export const LESSON_03_USDC_DECIMALS = 6;

export function getRemittanceRecipient(requestUrl: URL): PublicKey {
  const to =
    requestUrl.searchParams.get("to") ??
    process.env.REMITTANCE_WALLET_PUBKEY ??
    process.env.NEXT_PUBLIC_REMITTANCE_WALLET_PUBKEY;

  if (to) {
    try {
      return new PublicKey(to);
    } catch {
      throw new Error('Invalid "to" query parameter');
    }
  }

  return getCreatorPubkey();
}
