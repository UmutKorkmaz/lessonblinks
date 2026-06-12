import { type NextActionPostRequest } from "@solana/actions";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

import { getActionUrl } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { getCompletionStore } from "@/lib/completion";
import { buildCompletedAction, parseCompletionBody } from "@/lib/lessons/completion";
import {
  DEVNET_USDC_MINT,
  LESSON_01_ICON_PATH,
  LESSON_01_TRANSFER_AMOUNT,
} from "@/lib/lessons/constants";
import { LESSON_01_EXPLAINER } from "@/lib/lessons/lesson-01";
import { resolveEducationWallet } from "@/lib/lessons/recipient";
import { getConnection } from "@/lib/solana/connection";
import { validateTransferTx } from "@/lib/validators";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const POST = async (req: Request): Promise<Response> => {
  try {
    const requestUrl = getActionUrl(req);
    const body = (await req.json()) as NextActionPostRequest;
    const { account, signature } = parseCompletionBody(body);
    const recipient = resolveEducationWallet(requestUrl);
    const mint = new PublicKey(DEVNET_USDC_MINT);
    const recipientAta = getAssociatedTokenAddressSync(mint, recipient);

    await validateTransferTx({
      connection: getConnection(),
      signature,
      expectedSender: account,
      splTransfer: {
        from: account,
        to: recipientAta,
        mint,
        amount: LESSON_01_TRANSFER_AMOUNT,
        requireChecked: true,
      },
    });

    await getCompletionStore().recordLessonCompletion({
      wallet: account.toBase58(),
      lessonId: "lesson-01",
      signature,
      metadata: {
        amountUsdcBaseUnits: LESSON_01_TRANSFER_AMOUNT,
        recipient: recipient.toBase58(),
        recipientTokenAccount: recipientAta.toBase58(),
      },
    });

    return Response.json(
      buildCompletedAction({
        req,
        iconPath: LESSON_01_ICON_PATH,
        explainer: LESSON_01_EXPLAINER,
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
