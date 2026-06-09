import Link from "next/link";
import { notFound } from "next/navigation";
import { BlinkTestLink } from "@/components/BlinkTestLink";
import { Header } from "@/components/Header";
import {
  getBaseUrl,
  getActionUrl,
  getBlinkInspectorUrl,
  getLessonById,
  LESSON_IDS,
  LESSONS,
  type Lesson,
} from "@/lib/lessons";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return LESSON_IDS.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { id } = await params;
  const lesson = getLessonById(Number(id));

  if (!lesson) {
    return { title: "Lesson not found" };
  }

  return {
    title: `Lesson ${lesson.id}: ${lesson.title}`,
    description: lesson.tagline,
  };
}

function PrerequisiteList({ lesson }: { lesson: Lesson }) {
  if (lesson.prerequisites.length === 0) {
    return <p className="lesson-detail__muted">None — this is the first lesson.</p>;
  }

  return (
    <ul className="lesson-detail__prereqs">
      {lesson.prerequisites.map((prereqId) => {
        const prereq = getLessonById(prereqId);
        if (!prereq) return null;

        return (
          <li key={prereq.id}>
            <Link href={`/lessons/${prereq.id}`}>
              Lesson {prereq.id}: {prereq.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const lessonId = Number(id);

  if (!Number.isInteger(lessonId) || lessonId < 1 || lessonId > 5) {
    notFound();
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    notFound();
  }

  const inspectorUrl = getBlinkInspectorUrl(lesson.actionPath, getBaseUrl());
  const actionUrl = getActionUrl(lesson.actionPath, getBaseUrl());
  const prevLesson = getLessonById(lesson.id - 1);
  const nextLesson = getLessonById(lesson.id + 1);

  return (
    <div className="page">
      <Header />

      <main className="page__main lesson-detail">
        <Link href="/" className="lesson-detail__back">
          ← All lessons
        </Link>

        <header className="lesson-detail__hero">
          <p className="lesson-detail__eyebrow">
            Lesson {lesson.id} of {LESSONS.length} · ~{lesson.durationSeconds}s
          </p>
          <h2 className="lesson-detail__title">{lesson.title}</h2>
          <p className="lesson-detail__tagline">{lesson.tagline}</p>
          {lesson.badgeLabel ? (
            <span className="lesson-detail__badge">Earn: {lesson.badgeLabel}</span>
          ) : null}
        </header>

        <section className="lesson-detail__card">
          <h3>What you&apos;ll learn</h3>
          <p>{lesson.description}</p>
        </section>

        <section className="lesson-detail__card lesson-detail__card--highlight">
          <h3>What you&apos;ll do in the Blink</h3>
          <p>{lesson.blinkAction}</p>
          <div className="lesson-detail__cta">
            <BlinkTestLink
              inspectorUrl={inspectorUrl}
              disabled={lesson.status === "coming-soon"}
            />
          </div>
          <p className="lesson-detail__hint">
            Opens{" "}
            <a href="https://www.blinks.xyz/inspector" target="_blank" rel="noopener noreferrer">
              blinks.xyz/inspector
            </a>{" "}
            with Action URL{" "}
            <code className="lesson-detail__code">{actionUrl}</code>
          </p>
        </section>

        <section className="lesson-detail__card">
          <h3>Learning objectives</h3>
          <ul className="lesson-detail__list">
            {lesson.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        <section className="lesson-detail__card">
          <h3>Prerequisites</h3>
          <PrerequisiteList lesson={lesson} />
        </section>

        <nav className="lesson-detail__nav" aria-label="Lesson navigation">
          {prevLesson ? (
            <Link href={`/lessons/${prevLesson.id}`} className="lesson-detail__nav-link">
              ← Lesson {prevLesson.id}
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`} className="lesson-detail__nav-link">
              Lesson {nextLesson.id} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      <footer className="page__footer">
        <p>Built for the Dialect Actions Registry · Solana Devnet</p>
      </footer>
    </div>
  );
}