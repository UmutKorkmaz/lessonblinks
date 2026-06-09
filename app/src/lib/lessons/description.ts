import type { LessonExplainerMetadata } from "./types";

export function buildLessonDescription(
  lesson: LessonExplainerMetadata,
): string {
  return [
    lesson.explainer.summary,
    "",
    "Steps:",
    ...lesson.explainer.steps.map(
      (step) => `${step.order}. ${step.title} — ${step.body}`,
    ),
    "",
    lesson.explainer.callout ?? "",
  ].join("\n");
}