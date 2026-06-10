import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { LessonBlink } from "@/components/LessonBlink";
import { ProgressBar } from "@/components/ProgressBar";
import {
  getActionUrl,
  getBaseUrl,
  getDialDeveloperUrl,
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
    title: `Lesson ${lesson.id}: ${lesson.title} — LessonBlinks`,
    description: lesson.tagline,
  };
}

function PrerequisiteList({ lesson }: { lesson: Lesson }) {
  if (lesson.prerequisites.length === 0) {
    return <p className="lesson-detail__muted">None — this is where the path starts.</p>;
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

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    notFound();
  }

  const actionUrl = getActionUrl(lesson.actionPath, getBaseUrl());
  const fallbackUrl = getDialDeveloperUrl(lesson.actionPath, getBaseUrl());
  const prevLesson = getLessonById(lesson.id - 1);
  const nextLesson = getLessonById(lesson.id + 1);
  const glossaryEntries = Object.entries(lesson.glossary);

  return (
    <div className="page">
      <Header />

      <main className="page__main lesson-detail">
        <Link href="/" className="lesson-detail__back">
          ← All lessons
        </Link>

        <header className="lesson-detail__hero">
          <p className="lesson-detail__eyebrow">
            Lesson {lesson.id} of {LESSONS.length}
          </p>
          <h1 className="lesson-detail__title">{lesson.title}</h1>
          <p className="lesson-detail__tagline">{lesson.tagline}</p>
          <div className="lesson-detail__meta">
            <span className="lesson-detail__chip">~{lesson.durationSeconds}s</span>
            {lesson.concepts.slice(0, 3).map((concept) => (
              <span key={concept} className="lesson-detail__chip">
                {concept}
              </span>
            ))}
            {lesson.badgeLabel ? (
              <span className="lesson-detail__chip lesson-detail__chip--earn">
                Earn: {lesson.badgeLabel}
              </span>
            ) : null}
          </div>
        </header>

        <div className="lesson-detail__progress">
          <ProgressBar currentStep={lesson.id} totalSteps={LESSONS.length} />
        </div>

        <section className="lesson-detail__card">
          <h3>What you&apos;ll learn</h3>
          <p>{lesson.description}</p>
          {lesson.funFact ? (
            <p className="lesson-detail__funfact">
              <strong>Did you know?</strong> {lesson.funFact}
            </p>
          ) : null}
        </section>

        <section className="lesson-detail__card">
          <h3>Why it matters</h3>
          <p>{lesson.whyItMatters}</p>
        </section>

        <section className="lesson-detail__card">
          <h3>How it works</h3>
          <ol className="lesson-detail__steps">
            {lesson.steps.map((step) => (
              <li key={step.title} className="lesson-detail__step">
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="lesson-detail__card lesson-detail__card--highlight">
          <h3>Do it — right here</h3>
          <p>{lesson.blinkAction}</p>
          {lesson.status === "active" ? (
            <>
              <LessonBlink actionUrl={actionUrl} fallbackUrl={fallbackUrl} />
              <p className="lesson-detail__hint">
                Action API: <code className="lesson-detail__code">{actionUrl}</code>
              </p>
            </>
          ) : (
            <p className="lesson-detail__soon">This lesson is coming soon.</p>
          )}
        </section>

        {glossaryEntries.length > 0 ? (
          <section className="lesson-detail__card">
            <h3>Words you just learned</h3>
            <dl className="lesson-detail__glossary">
              {glossaryEntries.map(([term, definition]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

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
              <span aria-hidden="true">←</span>
              <span>
                <span className="lesson-detail__nav-label">Previous</span>
                {prevLesson.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`} className="lesson-detail__nav-link">
              <span>
                <span className="lesson-detail__nav-label">Next</span>
                {nextLesson.title}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      <footer className="page__footer">
        <p>
          Built for the Dialect Actions Registry · <strong>Solana Devnet</strong>
        </p>
      </footer>
    </div>
  );
}
