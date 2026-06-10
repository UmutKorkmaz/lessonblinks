import { notFound, redirect } from "next/navigation";

import { getLessonBaseBySlug, LESSON_BASES } from "@/lib/lessons";

interface LessonSlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LESSON_BASES.map((lesson) => ({ slug: lesson.slug }));
}

/**
 * Slug routes exist for actions.json pathPattern mapping (e.g. shared
 * /lesson/tip-usdc links unfurl as Blinks). Humans get redirected to the
 * canonical lesson page.
 */
export default async function LessonSlugPage({ params }: LessonSlugPageProps) {
  const { slug } = await params;
  const lesson = getLessonBaseBySlug(slug);

  if (!lesson) {
    notFound();
  }

  redirect(`/lessons/${lesson.id}`);
}
