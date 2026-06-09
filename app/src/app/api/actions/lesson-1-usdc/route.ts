import {
  createPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from "@solana/actions";
import { getActionOrigin, getActionUrl } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import {
  LESSON_01_ACTION_PATH,
  LESSON_01_ICON_PATH,
} from "@/lib/lessons/constants";
import { buildLessonDescription } from "@/lib/lessons/description";
import {
  getLesson01ActionLabel,
  getLesson01TransferMessage,
  LESSON_01_EXPLAINER,
  LESSON_01_TITLE,
} from "@/lib/lessons/lesson-01";
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
    const baseHref = new URL(
      `${LESSON_01_ACTION_PATH}?to=${recipient.toBase58()}`,
      origin,
    ).toString();

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_01_ICON_PATH, origin).toString(),
      title: LESSON_01_TITLE,
      description: [
        buildLessonDescription(LESSON_01_EXPLAINER),
        "",
        "What you'll learn:",
        "• USDC is a stablecoin, not native SOL",
        "• SPL tokens live in token accounts",
        "• Real transfers happen in one wallet signature",
      ].join("\n"),
      label: getLesson01ActionLabel(),
      links: {
        actions: [
          {
            type: "transaction",
            label: getLesson01ActionLabel(),
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
    const recipient = resolveEducationWallet(getActionUrl(req));

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
        message: getLesson01TransferMessage(recipient.toBase58()),
      },
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};