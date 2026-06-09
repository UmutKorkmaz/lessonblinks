import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EVENTS_FILE = path.join(process.cwd(), "data", "events.ndjson");

type AnalyticsEventType = "lesson_started" | "lesson_completed";

interface AnalyticsEvent {
  event: AnalyticsEventType;
  lessonId: string;
  wallet?: string;
  txSignature?: string;
  timestamp: string;
}

interface AnalyticsSummary {
  total: number;
  byEvent: Record<AnalyticsEventType, number>;
  byLesson: Record<string, { lesson_started: number; lesson_completed: number }>;
}

function isAnalyticsEventType(value: unknown): value is AnalyticsEventType {
  return value === "lesson_started" || value === "lesson_completed";
}

function isValidPayload(body: unknown): body is Omit<AnalyticsEvent, "timestamp"> {
  if (!body || typeof body !== "object") return false;

  const { event, lessonId, wallet, txSignature } = body as Record<string, unknown>;

  return (
    isAnalyticsEventType(event) &&
    typeof lessonId === "string" &&
    lessonId.length > 0 &&
    (wallet === undefined || typeof wallet === "string") &&
    (txSignature === undefined || typeof txSignature === "string")
  );
}

async function ensureDataDir(): Promise<void> {
  await mkdir(path.dirname(EVENTS_FILE), { recursive: true });
}

async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await readFile(EVENTS_FILE, "utf8");
    return raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as AnalyticsEvent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function buildSummary(events: AnalyticsEvent[]): AnalyticsSummary {
  const summary: AnalyticsSummary = {
    total: events.length,
    byEvent: {
      lesson_started: 0,
      lesson_completed: 0,
    },
    byLesson: {},
  };

  for (const entry of events) {
    summary.byEvent[entry.event] += 1;

    if (!summary.byLesson[entry.lessonId]) {
      summary.byLesson[entry.lessonId] = {
        lesson_started: 0,
        lesson_completed: 0,
      };
    }

    summary.byLesson[entry.lessonId][entry.event] += 1;
  }

  return summary;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      {
        error: "Invalid payload",
        expected: {
          event: "lesson_started | lesson_completed",
          lessonId: "string",
          wallet: "string (optional)",
          txSignature: "string (optional)",
        },
      },
      { status: 400 },
    );
  }

  const record: AnalyticsEvent = {
    ...body,
    timestamp: new Date().toISOString(),
  };

  try {
    await ensureDataDir();
    await appendFile(EVENTS_FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.error("[analytics] failed to persist event", error);
    return NextResponse.json({ error: "Failed to store event" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, event: record }, { status: 201 });
}

export async function GET() {
  try {
    const events = await readEvents();
    return NextResponse.json(buildSummary(events));
  } catch (error) {
    console.error("[analytics] failed to read events", error);
    return NextResponse.json({ error: "Failed to read analytics summary" }, { status: 500 });
  }
}