import { PublicKey } from "@solana/web3.js";
import {
  DEFAULT_RECIPIENT_PUBKEY,
  LESSON_01_RECIPIENT_PUBKEY,
} from "./constants";

function parseRecipientPubkey(to: string | null | undefined, fallbackMessage: string): PublicKey {
  const value = to;
  if (!value) {
    throw fallbackMessage;
  }

  try {
    return new PublicKey(value);
  } catch {
    throw "Invalid input query parameter: to";
  }
}

/**
 * Resolve the tip recipient from `?to=` query param or env (creator → treasury).
 */
export function resolveRecipient(url: URL): PublicKey {
  return parseRecipientPubkey(
    url.searchParams.get("to") ?? DEFAULT_RECIPIENT_PUBKEY,
    "Creator wallet not configured",
  );
}

/**
 * Resolve the education/treasury recipient for Lesson 1 USDC transfers.
 */
export function resolveEducationWallet(url: URL): PublicKey {
  return parseRecipientPubkey(
    url.searchParams.get("to") ?? LESSON_01_RECIPIENT_PUBKEY,
    "Education/treasury wallet not configured. Set EDUCATION_WALLET_PUBKEY.",
  );
}