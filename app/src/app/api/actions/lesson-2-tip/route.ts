import {
  createPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from "@solana/actions";
import { getActionOrigin, getActionUrl } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import {
  buildActionStrings,
  formatSuccessMessage,
  getActionDict,
  getActionLocale,
} from "@/lib/lessons/action-text";
import { LESSON_02_ACTION_PATH, LESSON_02_TIP_SOL } from "@/lib/lessons/constants";
import { LESSON_02_EXPLAINER, LESSON_02_ICON_PATH } from "@/lib/lessons/lesson-02";
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
    const origin = getActionOrigin(req);
    const requestUrl = getActionUrl(req);
    const { toPubkey } = validateLesson02QueryParams(requestUrl);
    const lang = getActionLocale(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 2);

    const baseHref = new URL(
      `${LESSON_02_ACTION_PATH}?to=${toPubkey.toBase58()}&amount=${LESSON_02_TIP_SOL}&lang=${lang}`,
      origin,
    ).toString();

    const payload: LessonActionGetResponse = {
      type: "action",
      icon: new URL(LESSON_02_ICON_PATH, origin).toString(),
      title: strings.title,
      description: strings.description,
      label: strings.label,
      links: {
        actions: [
          {
            type: "transaction",
            label: strings.label,
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
    const requestUrl = getActionUrl(req);
    const { toPubkey } = validateLesson02QueryParams(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 2);

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
        message: formatSuccessMessage(strings, { recipient: toPubkey.toBase58() }),
        links: {
          next: {
            type: "post",
            href: `${LESSON_02_ACTION_PATH}/complete?to=${toPubkey.toBase58()}`,
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
