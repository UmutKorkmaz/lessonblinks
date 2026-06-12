import { type NextActionPostRequest } from "@solana/actions";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

import { getActionUrl } from "@/lib/action-origin";
import { toActionError } from "@/lib/actions/errors";
import { actionHeaders } from "@/lib/actions/headers";
import { getCompletionStore } from "@/lib/completion";
import { buildCompletedAction, parseCompletionBody } from "@/lib/lessons/completion";
import {
  getRemittanceRecipient,
  LESSON_03_USDC_AMOUNT,
} from "@/lib/lessons/lesson-03";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import type { LessonExplainerMetadata } from "@/lib/lessons/types";
import { getConnection } from "@/lib/solana";
import { getUsdcMint } from "@/lib/solana";
import { validateTransferTx } from "@/lib/validators";

const LESSON_03_ICON_PATH = "/icon.svg";

function getLesson03Explainer(): LessonExplainerMetadata {
  const lesson = getDictionary(DEFAULT_LOCALE).lessons["3"];

  return {
    lessonId: "lesson-03",
    lessonNumber: 3,
    slug: "remittance",
    durationSeconds: 45,
    prerequisites: ["lesson-01", "lesson-02"],
    learningObjectives: lesson.learningObjectives,
    explainer: {
      headline: lesson.title,
      summary: lesson.description,
      steps: lesson.steps.map((step, index) => ({
        order: index + 1,
        title: step.title,
        body: step.body,
      })),
      callout: lesson.funFact,
    },
    completion: {
      badgeLabel: lesson.badgeLabel,
      successTitle: "Lesson 3 complete",
      successDescription: lesson.successMessage,
      nextLessonActionHref: "/api/actions/lesson-4-swap",
    },
  };
}

export const OPTIONS = async () => Response.json(null, { headers: actionHeaders });

export const POST = async (req: Request): Promise<Response> => {
  try {
    const requestUrl = getActionUrl(req);
    const body = (await req.json()) as NextActionPostRequest;
    const { account, signature } = parseCompletionBody(body);
    const recipient = getRemittanceRecipient(requestUrl);
    const mint = getUsdcMint();
    const recipientAta = getAssociatedTokenAddressSync(mint, recipient);

    await validateTransferTx({
      connection: getConnection(),
      signature,
      expectedSender: account,
      splTransfer: {
        from: account,
        to: recipientAta,
        mint,
        amount: LESSON_03_USDC_AMOUNT,
        requireChecked: true,
      },
    });

    await getCompletionStore().recordLessonCompletion({
      wallet: account.toBase58(),
      lessonId: "lesson-03",
      signature,
      metadata: {
        amountUsdcBaseUnits: LESSON_03_USDC_AMOUNT,
        recipient: recipient.toBase58(),
        recipientTokenAccount: recipientAta.toBase58(),
      },
    });

    return Response.json(
      buildCompletedAction({
        req,
        iconPath: LESSON_03_ICON_PATH,
        explainer: getLesson03Explainer(),
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
