import { type NextActionPostRequest } from "@solana/actions";

import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { getCompletionStore } from "@/lib/completion";
import { buildCompletedAction, parseCompletionBody } from "@/lib/lessons/completion";
import {
  LESSON_04_EXPLAINER,
  LESSON_04_ICON_PATH,
} from "@/lib/lessons/lesson-04";
import { getConnection } from "@/lib/solana/connection";
import { MEMO_PROGRAM_ID, SWAP_DEMO_MEMO_TEXT } from "@/lib/solana/swap-demo";
import { validateMemoTx } from "@/lib/validators";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as NextActionPostRequest;
    const { account, signature } = parseCompletionBody(body);

    await validateMemoTx({
      connection: getConnection(),
      signature,
      expectedSender: account,
      memo: {
        programId: MEMO_PROGRAM_ID,
        memo: SWAP_DEMO_MEMO_TEXT,
      },
    });

    await getCompletionStore().recordLessonCompletion({
      wallet: account.toBase58(),
      lessonId: "lesson-04",
      signature,
      metadata: {
        memo: SWAP_DEMO_MEMO_TEXT,
      },
    });

    return Response.json(
      buildCompletedAction({
        req,
        iconPath: LESSON_04_ICON_PATH,
        explainer: LESSON_04_EXPLAINER,
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
