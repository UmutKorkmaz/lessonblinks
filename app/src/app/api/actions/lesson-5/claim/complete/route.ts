import { type NextActionPostRequest } from "@solana/actions";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import type { ParsedInstruction, ParsedTransactionWithMeta } from "@solana/web3.js";

import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { getCompletionStore } from "@/lib/completion";
import { buildCompletedAction, parseCompletionBody } from "@/lib/lessons/completion";
import {
  LESSON_05_EXPLAINER,
  LESSON_05_ICON_PATH,
} from "@/lib/lessons/lesson-05";
import { getConnection } from "@/lib/solana/connection";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

function extractMintAddress(tx: ParsedTransactionWithMeta): string {
  const allInstructions: ParsedInstruction[] = [];

  for (const ix of tx.transaction.message.instructions) {
    if ("parsed" in ix) {
      allInstructions.push(ix);
    }
  }

  if (tx.meta?.innerInstructions) {
    for (const inner of tx.meta.innerInstructions) {
      for (const ix of inner.instructions) {
        if ("parsed" in ix) {
          allInstructions.push(ix as ParsedInstruction);
        }
      }
    }
  }

  const mintToIx = allInstructions.find(
    (ix) =>
      ix.program === "spl-token" &&
      ix.parsed?.type === "mintTo" &&
      ix.programId.equals(TOKEN_PROGRAM_ID),
  );

  if (!mintToIx) {
    throw new Error("No mintTo instruction found in transaction");
  }

  if (mintToIx.parsed.info.amount !== "1") {
    throw new Error("Badge must mint exactly 1 token");
  }

  return mintToIx.parsed.info.mint as string;
}

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as NextActionPostRequest;
    const { account, signature } = parseCompletionBody(body);

    const tx = await getConnection().getParsedTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      throw new Error("Transaction not found or not confirmed yet");
    }

    if (tx.meta?.err) {
      throw new Error("Transaction failed onchain");
    }

    const feePayer = tx.transaction.message.accountKeys[0].pubkey.toBase58();
    if (feePayer !== account.toBase58()) {
      throw new Error("Transaction signer mismatch");
    }

    const mintAddress = extractMintAddress(tx);

    await getCompletionStore().recordGraduate({
      wallet: feePayer,
      mint: mintAddress,
      metadata: { signature },
    });

    return Response.json(
      buildCompletedAction({
        req,
        iconPath: LESSON_05_ICON_PATH,
        explainer: LESSON_05_EXPLAINER,
        signature,
      }),
      { headers: actionHeaders },
    );
  } catch (error) {
    return Response.json(toActionError(error), {
      status: 400,
      headers: actionHeaders,
    });
  }
};
