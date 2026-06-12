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
import {
  LESSON_01_ACTION_PATH,
  LESSON_01_ICON_PATH,
} from "@/lib/lessons/constants";
import { LESSON_01_EXPLAINER } from "@/lib/lessons/lesson-01";
import { resolveEducationWallet } from "@/lib/lessons/recipient";
import { parseAccountPubkey } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildUsdcTransferTransaction } from "@/lib/solana/usdc-transfer";
import type { LessonActionGetResponse as LessonGetResponse } from "@/lib/lessons/types";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const origin = getActionOrigin(req);
    const requestUrl = getActionUrl(req);
    const recipient = resolveEducationWallet(requestUrl);
    const lang = getActionLocale(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 1);

    const baseHref = new URL(
      `${LESSON_01_ACTION_PATH}?to=${recipient.toBase58()}&lang=${lang}`,
      origin,
    ).toString();

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_01_ICON_PATH, origin).toString(),
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
      lesson: LESSON_01_EXPLAINER,
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
    const requestUrl = getActionUrl(req);
    const recipient = resolveEducationWallet(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 1);

    const body = (await req.json()) as ActionPostRequest;
    const sender = parseAccountPubkey(body.account);

    const connection = getConnection();
    const transaction = await buildUsdcTransferTransaction({
      connection,
      sender,
      recipient,
    });

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: formatSuccessMessage(strings, { recipient: recipient.toBase58() }),
        links: {
          next: {
            type: "post",
            href: `${LESSON_01_ACTION_PATH}/complete?to=${recipient.toBase58()}`,
          },
        },
      },
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};
