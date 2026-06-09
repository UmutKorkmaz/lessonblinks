import {
  createPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from "@solana/actions";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { LESSON_02_ACTION_PATH, LESSON_02_TIP_SOL } from "@/lib/lessons/constants";
import { buildLessonDescription } from "@/lib/lessons/description";
import {
  getLesson02ActionLabel,
  getLesson02TransferMessage,
  LESSON_02_EXPLAINER,
  LESSON_02_ICON_PATH,
  LESSON_02_TITLE,
} from "@/lib/lessons/lesson-02";
import type { LessonActionGetResponse } from "@/lib/lessons/types";
import {
  parseAccountPubkey,
  validateLesson02QueryParams,
} from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildSolTransferTransaction } from "@/lib/solana/sol-transfer";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validateLesson02QueryParams(requestUrl);

    const baseHref = new URL(
      `${LESSON_02_ACTION_PATH}?to=${toPubkey.toBase58()}&amount=${LESSON_02_TIP_SOL}`,
      requestUrl.origin,
    ).toString();

    const payload: LessonActionGetResponse = {
      type: "action",
      icon: new URL(LESSON_02_ICON_PATH, requestUrl.origin).toString(),
      title: LESSON_02_TITLE,
      description: buildLessonDescription(LESSON_02_EXPLAINER),
      label: getLesson02ActionLabel(),
      links: {
        actions: [
          {
            type: "transaction",
            label: getLesson02ActionLabel(),
            href: baseHref,
          },
        ],
      },
      lesson: LESSON_02_EXPLAINER,
    };

    return Response.json(payload satisfies ActionGetResponse, {
      headers: actionHeaders,
    });
  } catch (error) {
    console.error("[lesson-2-tip] GET error:", error);
    return Response.json(toActionError(error), {
      status: 400,
      headers: actionHeaders,
    });
  }
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validateLesson02QueryParams(requestUrl);

    const body = (await req.json()) as ActionPostRequest;
    const sender = parseAccountPubkey(body.account);

    const connection = getConnection();
    const transaction = await buildSolTransferTransaction({
      connection,
      sender,
      recipient: toPubkey,
    });

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: getLesson02TransferMessage(toPubkey.toBase58()),
        links: {
          next: {
            type: "post",
            href: `${LESSON_02_ACTION_PATH}/complete`,
          },
        },
      },
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    console.error("[lesson-2-tip] POST error:", error);
    return Response.json(toActionError(error), {
      status: 400,
      headers: actionHeaders,
    });
  }
};