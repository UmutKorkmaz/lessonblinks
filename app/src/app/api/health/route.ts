import { NextResponse } from "next/server";

import { getBaseUrl, LESSONS } from "@/lib/lessons";

export async function GET() {
  const baseUrl = getBaseUrl().replace(/\/$/, "");

  return NextResponse.json({
    status: "ok",
    network: "devnet",
    lessons: LESSONS.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      actionPath: lesson.actionPath,
      actionUrl: `${baseUrl}${lesson.actionPath}`,
    })),
  });
}