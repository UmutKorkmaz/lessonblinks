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
  getLesson05ActionLabel,
  getLesson05SuccessMessage,
  LESSON_05_ACTION_PATH,
  LESSON_05_EXPLAINER,
  LESSON_05_ICON_PATH,
  LESSON_05_TITLE,
} from "@/lib/lessons/lesson-05";
import { parseAccountPubkey } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildBadgeMintTransaction } from "@/lib/solana/badge-mint";
import type { LessonActionGetResponse as LessonGetResponse } from "@/lib/lessons/types";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const origin = getActionOrigin(req);

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_05_ICON_PATH, origin).toString(),
      title: LESSON_05_TITLE,
      description: [
        buildLessonDescription(LESSON_05_EXPLAINER),
        "",
        "What you'll learn:",
        "• NFTs are wallet-owned credentials, not just art",
        "• Burning mint authority fixes supply at exactly 1",
        "• Your badge is verifiable on any devnet explorer",
      ].join("\n"),
      label: getLesson05ActionLabel(),
      links: {
        actions: [
          {
            type: "transaction",
            label: getLesson05ActionLabel(),
            href: new URL(LESSON_05_ACTION_PATH, origin).toString(),
          },
        ],
      },
      lesson: LESSON_05_EXPLAINER,
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
    const recipient = parseAccountPubkey(body.account);

    const connection = getConnection();
    const { transaction, mintKeypair } = await buildBadgeMintTransaction({
      connection,
      recipient,
    });

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: getLesson05SuccessMessage(mintKeypair.publicKey.toBase58()),
      },
      signers: [mintKeypair],
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};
