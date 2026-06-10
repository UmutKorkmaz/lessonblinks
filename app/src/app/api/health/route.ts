import { NextResponse } from "next/server";

import { en } from "@/lib/i18n/en";
import { getBaseUrl, LESSON_BASES } from "@/lib/lessons";

export async function GET() {
  const baseUrl = getBaseUrl().replace(/\/$/, "");

  return NextResponse.json({
    status: "ok",
    network: "devnet",
    lessons: LESSON_BASES.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: en.lessons[String(lesson.id)]?.title,
      actionPath: lesson.actionPath,
      actionUrl: `${baseUrl}${lesson.actionPath}`,
    })),
  });
}
