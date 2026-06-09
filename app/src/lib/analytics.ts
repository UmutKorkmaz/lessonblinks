export type AnalyticsEventType = "lesson_started" | "lesson_completed";

export interface TrackEventPayload {
  event: AnalyticsEventType;
  lessonId: string;
  wallet?: string;
  txSignature?: string;
}

export interface AnalyticsSummary {
  total: number;
  byEvent: Record<AnalyticsEventType, number>;
  byLesson: Record<string, { lesson_started: number; lesson_completed: number }>;
}

const ANALYTICS_ENDPOINT = "/api/analytics";

export async function trackEvent(payload: TrackEventPayload): Promise<void> {
  const response = await fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      `Analytics track failed (${response.status}): ${errorBody?.error ?? response.statusText}`,
    );
  }
}

export async function trackLessonStarted(
  lessonId: string,
  options?: Pick<TrackEventPayload, "wallet">,
): Promise<void> {
  return trackEvent({ event: "lesson_started", lessonId, ...options });
}

export async function trackLessonCompleted(
  lessonId: string,
  options?: Pick<TrackEventPayload, "wallet" | "txSignature">,
): Promise<void> {
  return trackEvent({ event: "lesson_completed", lessonId, ...options });
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await fetch(ANALYTICS_ENDPOINT, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      `Analytics summary failed (${response.status}): ${errorBody?.error ?? response.statusText}`,
    );
  }

  return response.json() as Promise<AnalyticsSummary>;
}