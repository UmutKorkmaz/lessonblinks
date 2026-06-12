import { type NextActionPostRequest } from "@solana/actions";

import { getActionUrl } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { getCompletionStore } from "@/lib/completion";
import { buildCompletedAction, parseCompletionBody } from "@/lib/lessons/completion";
import { LESSON_02_TIP_LAMPORTS } from "@/lib/lessons/constants";
import {
  LESSON_02_EXPLAINER,
  LESSON_02_ICON_PATH,
} from "@/lib/lessons/lesson-02";
import { validateLesson02QueryParams } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { validateTransferTx } from "@/lib/validators";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const POST = async (req: Request): Promise<Response> => {
  try {
    const requestUrl = getActionUrl(req);
    const body = (await req.json()) as NextActionPostRequest;
    const { account, signature } = parseCompletionBody(body);
    const { toPubkey } = validateLesson02QueryParams(requestUrl);

    await validateTransferTx({
      connection: getConnection(),
      signature,
      expectedSender: account,
      solTransfer: {
        from: account,
        to: toPubkey,
        lamports: LESSON_02_TIP_LAMPORTS,
      },
    });

    await getCompletionStore().recordLessonCompletion({
      wallet: account.toBase58(),
      lessonId: "lesson-02",
      signature,
      metadata: {
        amountLamports: LESSON_02_TIP_LAMPORTS,
        recipient: toPubkey.toBase58(),
      },
    });

    return Response.json(
      buildCompletedAction({
        req,
        iconPath: LESSON_02_ICON_PATH,
        explainer: LESSON_02_EXPLAINER,
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
