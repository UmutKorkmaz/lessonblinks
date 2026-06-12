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
  LESSON_05_ACTION_PATH,
  LESSON_05_EXPLAINER,
  LESSON_05_ICON_PATH,
} from "@/lib/lessons/lesson-05";
import { parseAccountPubkey } from "@/lib/lessons/validation";
import { getConnection } from "@/lib/solana/connection";
import { buildBadgeMintTransaction } from "@/lib/solana/badge-mint";
import type { LessonActionGetResponse as LessonGetResponse } from "@/lib/lessons/types";
import { getCompletionStore } from "@/lib/completion";

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const GET = async (req: Request) => {
  try {
    const origin = getActionOrigin(req);
    const requestUrl = getActionUrl(req);
    const lang = getActionLocale(requestUrl);
    const strings = buildActionStrings(getActionDict(requestUrl), 5);

    const accountParam = requestUrl.searchParams.get("account");
    if (accountParam) {
      const store = getCompletionStore();
      const graduate = await store.getGraduate(accountParam);
      if (graduate) {
        return Response.json({
          type: "completed",
          icon: new URL(LESSON_05_ICON_PATH, origin).toString(),
          title: LESSON_05_EXPLAINER.completion.successTitle,
          description: LESSON_05_EXPLAINER.completion.successDescription,
          label: LESSON_05_EXPLAINER.completion.badgeLabel,
        }, { headers: actionHeaders });
      }

      const ready = await store.hasCompletedLessons(accountParam, [
        "lesson-01",
        "lesson-02",
        "lesson-03",
        "lesson-04",
      ]);
      if (!ready) {
        const completions = await store.listLessonCompletions(accountParam);
        const doneIds = new Set(completions.map((c) => c.lessonId));
        const missing = (["lesson-01", "lesson-02", "lesson-03", "lesson-04"] as const)
          .filter((id) => !doneIds.has(id))
          .map((id) => id.replace("lesson-0", ""));
        return Response.json({
          type: "action",
          icon: new URL(LESSON_05_ICON_PATH, origin).toString(),
          title: strings.title,
          description: `Complete lesson${missing.length > 1 ? "s" : ""} ${missing.join(", ")} first. (${doneIds.size}/4 done)`,
          label: strings.label,
          disabled: true,
          links: { actions: [] },
          lesson: LESSON_05_EXPLAINER,
        }, { headers: actionHeaders });
      }
    }

    const payload: LessonGetResponse = {
      type: "action",
      icon: new URL(LESSON_05_ICON_PATH, origin).toString(),
      title: strings.title,
      description: strings.description,
      label: strings.label,
      links: {
        actions: [
          {
            type: "transaction",
            label: strings.label,
            href: new URL(`${LESSON_05_ACTION_PATH}?lang=${lang}`, origin).toString(),
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
    const origin = getActionOrigin(req);
    const strings = buildActionStrings(getActionDict(getActionUrl(req)), 5);
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
        message: formatSuccessMessage(strings, {
          mint: mintKeypair.publicKey.toBase58(),
        }),
        links: {
          next: {
            type: "post",
            href: new URL(`${LESSON_05_ACTION_PATH}/complete`, origin).toString(),
          },
        },
      },
      signers: [mintKeypair],
    });

    return Response.json(payload, { headers: actionHeaders });
  } catch (error) {
    return Response.json(toActionError(error), { status: 400, headers: actionHeaders });
  }
};
