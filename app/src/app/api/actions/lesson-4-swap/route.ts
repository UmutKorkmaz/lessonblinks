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
  LESSON_04_ACTION_PATH,
  LESSON_04_EXPLAINER,
  LESSON_04_ICON_PATH,
} from "@/lib/lessons/lesson-04";
import { parseAccountPubkey } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildSwapDemoTransaction } from "@/lib/solana/swap-demo";
import type { LessonActionGetResponse as LessonGetResponse } from "@/lib/lessons/types";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const origin = getActionOrigin(req);
    const requestUrl = getActionUrl(req);
    const lang = getActionLocale(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 4);

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_04_ICON_PATH, origin).toString(),
      title: strings.title,
      description: strings.description,
      label: strings.label,
      links: {
        actions: [
          {
            type: "transaction",
            label: strings.label,
            href: new URL(`${LESSON_04_ACTION_PATH}?lang=${lang}`, origin).toString(),
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
    const strings = buildActionStrings(getActionDict(getActionUrl(req)), 4);
    const body = (await req.json()) as ActionPostRequest;
    const account = parseAccountPubkey(body.account);

    const connection = getConnection();
    const transaction = await buildSwapDemoTransaction({ connection, account });

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: formatSuccessMessage(strings),
        links: {
          next: {
            type: "post",
            href: `${LESSON_04_ACTION_PATH}/complete`,
          },
        },
      },
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};
