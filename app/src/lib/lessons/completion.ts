import type { NextActionPostRequest } from "@solana/actions";

import { getActionOrigin } from "@/lib/action-origin";
import type {
  LessonCompletedAction,
  LessonExplainerMetadata,
} from "@/lib/lessons/types";

import { parseAccountPubkey } from "./validation";

export function parseCompletionBody(body: NextActionPostRequest): {
  account: ReturnType<typeof parseAccountPubkey>;
  signature: string;
} {
  const account = parseAccountPubkey(body.account);
  const signature = body.signature?.trim();

  if (!signature) {
    throw 'Missing "signature" in request body';
  }

  return { account, signature };
}

export function buildCompletedAction({
  req,
  iconPath,
  explainer,
  signature,
}: {
  req: Request;
  iconPath: string;
  explainer: LessonExplainerMetadata;
  signature: string;
}): LessonCompletedAction {
  const origin = getActionOrigin(req);

  return {
    type: "completed",
    icon: new URL(iconPath, origin).toString(),
    title: explainer.completion.successTitle,
    description: explainer.completion.successDescription,
    label: explainer.completion.badgeLabel,
    lesson: {
      lessonId: explainer.lessonId,
      lessonNumber: explainer.lessonNumber,
      completed: true,
      signature,
      nextLessonActionHref: explainer.completion.nextLessonActionHref,
    },
  };
}
