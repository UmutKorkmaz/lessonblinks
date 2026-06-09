import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { BlinkTestLink } from "@/components/BlinkTestLink";
import {
  getActionUrl,
  getBaseUrl,
  getBlinkInspectorUrl,
  getLessonBySlug,
} from "@/lib/lessons";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const isActive = lesson.status === "active";

  return (
    <div className="page">
      <Header />

      <main className="page__main lesson-detail">
        <Link href="/" className="lesson-detail__back">
          ← All lessons
        </Link>

        <p className="lesson-detail__eyebrow">Lesson {lesson.id}</p>
        <h1 className="lesson-detail__title">{lesson.title}</h1>
        <p className="lesson-detail__tagline">{lesson.tagline}</p>
        <p className="lesson-detail__description">{lesson.description}</p>

        <section className="lesson-detail__section">
          <h2>What you&apos;ll do</h2>
          <p>{lesson.blinkAction}</p>
        </section>

        <section className="lesson-detail__section">
          <h2>Learning objectives</h2>
          <ul className="lesson-detail__list">
            {lesson.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        <div className="lesson-detail__actions">
          <BlinkTestLink
            inspectorUrl={getBlinkInspectorUrl(lesson.actionPath, baseUrl)}
            disabled={!isActive}
          />
          {isActive && (
            <p className="lesson-detail__hint">
              Opens{" "}
              <a href="https://www.blinks.xyz/inspector" target="_blank" rel="noopener noreferrer">
                blinks.xyz/inspector
              </a>{" "}
              with Action URL{" "}
              <code className="lesson-detail__code">
                {getActionUrl(lesson.actionPath, baseUrl)}
              </code>
            </p>
          )}
          {!isActive && (
            <p className="lesson-detail__soon">This lesson is coming soon.</p>
          )}
        </div>
      </main>
    </div>
  );
}