import { PublicKey } from "@solana/web3.js";
import {
  LESSON_02_TIP_LAMPORTS,
  LESSON_02_TIP_SOL,
} from "./constants";
import { resolveRecipient } from "./recipient";

export interface Lesson02QueryParams {
  toPubkey: PublicKey;
  amount: number;
}

export function validateLesson02QueryParams(
  requestUrl: URL,
): Lesson02QueryParams {
  const toPubkey = resolveRecipient(requestUrl);

  let amount = LESSON_02_TIP_SOL;
  const amountParam = requestUrl.searchParams.get("amount");

  if (amountParam !== null) {
    try {
      amount = parseFloat(amountParam);
      if (Number.isNaN(amount) || amount <= 0) {
        throw new Error("invalid amount");
      }
    } catch {
      throw "Invalid input query parameter: amount";
    }

    if (amount !== LESSON_02_TIP_SOL) {
      throw "Lesson 2 requires a 0.001 SOL tip";
    }
  }

  return { toPubkey, amount };
}

export function parseAccountPubkey(account: string): PublicKey {
  try {
    return new PublicKey(account);
  } catch {
    throw 'Invalid "account" provided';
  }
}

export { LESSON_02_TIP_LAMPORTS };