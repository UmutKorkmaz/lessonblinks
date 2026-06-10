import {
  createPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from "@solana/actions";
import { getActionOrigin } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { buildLessonDescription } from "@/lib/lessons/description";
import {
  getLesson04ActionLabel,
  getLesson04SuccessMessage,
  LESSON_04_ACTION_PATH,
  LESSON_04_EXPLAINER,
  LESSON_04_ICON_PATH,
  LESSON_04_TITLE,
} from "@/lib/lessons/lesson-04";
import { parseAccountPubkey } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildSwapDemoTransaction } from "@/lib/solana/swap-demo";
import type { LessonActionGetResponse as LessonGetResponse } from "@/lib/lessons/types";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const origin = getActionOrigin(req);

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_04_ICON_PATH, origin).toString(),
      title: LESSON_04_TITLE,
      description: [
        buildLessonDescription(LESSON_04_EXPLAINER),
        "",
        "What you'll learn:",
        "• A swap trades one token for another onchain",
        "• Jupiter aggregates routes across Solana DEXs",
        "• Slippage and fees affect the final amount",
      ].join("\n"),
      label: getLesson04ActionLabel(),
      links: {
        actions: [
          {
            type: "transaction",
            label: getLesson04ActionLabel(),
            href: new URL(LESSON_04_ACTION_PATH, origin).toString(),
          },
        ],
      },
      lesson: LESSON_04_EXPLAINER,
    };

    return Response.json(payload satisfies ActionGetResponse, {
      headers: actionHeaders,
    });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as ActionPostRequest;
    const account = parseAccountPubkey(body.account);

    const connection = getConnection();
    const transaction = await buildSwapDemoTransaction({ connection, account });

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: getLesson04SuccessMessage(),
      },
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};
