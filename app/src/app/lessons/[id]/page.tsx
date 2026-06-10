import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { LessonBlink } from "@/components/LessonBlink";
import { ProgressBar } from "@/components/ProgressBar";
import { format, getDictionary, type Dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import {
  getActionUrl,
  getBaseUrl,
  getLessonById,
  LESSON_BASES,
  type Lesson,
} from "@/lib/lessons";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { id } = await params;
  const dict = getDictionary(await getLocale());
  const lesson = getLessonById(dict, Number(id));

  if (!lesson) {
    return { title: "Lesson not found" };
  }

  return {
    title: format(dict.ui.lessonMetaTitle, { x: lesson.id, title: lesson.title }),
    description: lesson.tagline,
  };
}

function PrerequisiteList({ lesson, dict }: { lesson: Lesson; dict: Dictionary }) {
  if (lesson.prerequisites.length === 0) {
    return <p className="lesson-detail__muted">{dict.ui.noPrereqs}</p>;
  }

  return (
    <ul className="lesson-detail__prereqs">
      {lesson.prerequisites.map((prereqId) => {
        const prereq = getLessonById(dict, prereqId);
        if (!prereq) return null;

        return (
          <li key={prereq.id}>
            <Link href={`/lessons/${prereq.id}`}>
              {dict.ui.lessonWord} {prereq.id}: {prereq.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const lesson = getLessonById(dict, Number(id));
  if (!lesson) {
    notFound();
  }

  const actionUrl = getActionUrl(lesson.actionPath, getBaseUrl());
  const prevLesson = getLessonById(dict, lesson.id - 1);
  const nextLesson = getLessonById(dict, lesson.id + 1);
  const glossaryEntries = Object.entries(lesson.glossary);
  const totalLessons = LESSON_BASES.length;

  return (
    <div className="page">
      <Header dict={dict} locale={locale} />

      <main className="page__main lesson-detail">
        <Link href="/" className="lesson-detail__back">
          ← {dict.ui.backToLessons}
        </Link>

        <header className="lesson-detail__hero">
          <p className="lesson-detail__eyebrow">
            {format(dict.ui.lessonXofY, { x: lesson.id, y: totalLessons })}
          </p>
          <h1 className="lesson-detail__title">{lesson.title}</h1>
          <p className="lesson-detail__tagline">{lesson.tagline}</p>
          <div className="lesson-detail__meta">
            <span className="lesson-detail__chip">
              {format(dict.ui.durationFormat, { s: lesson.durationSeconds })}
            </span>
            {lesson.concepts.slice(0, 3).map((concept) => (
              <span key={concept} className="lesson-detail__chip">
                {concept}
              </span>
            ))}
            {lesson.badgeLabel ? (
              <span className="lesson-detail__chip lesson-detail__chip--earn">
                {dict.ui.earnPrefix}
                {lesson.badgeLabel}
              </span>
            ) : null}
          </div>
        </header>

        <div className="lesson-detail__progress">
          <ProgressBar
            currentStep={lesson.id}
            totalSteps={totalLessons}
            label={format(dict.ui.lessonXofY, { x: lesson.id, y: totalLessons })}
          />
        </div>

        <section className="lesson-detail__card">
          <h3>{dict.ui.whatYoullLearn}</h3>
          <p>{lesson.description}</p>
          {lesson.funFact ? (
            <p className="lesson-detail__funfact">
              <strong>{dict.ui.didYouKnow}</strong> {lesson.funFact}
            </p>
          ) : null}
        </section>

        <section className="lesson-detail__card">
          <h3>{dict.ui.whyItMatters}</h3>
          <p>{lesson.whyItMatters}</p>
        </section>

        <section className="lesson-detail__card">
          <h3>{dict.ui.howItWorks}</h3>
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
          <h3>{dict.ui.doItHere}</h3>
          <p>{lesson.blinkAction}</p>
          {lesson.status === "active" ? (
            <>
              <LessonBlink
                actionUrl={actionUrl}
                loadingLabel={dict.ui.loadingBlink}
                errorLabel={dict.ui.blinkError}
              />
              <p className="lesson-detail__hint">
                {dict.ui.actionApiLabel}{" "}
                <code className="lesson-detail__code">{actionUrl}</code>
              </p>
            </>
          ) : (
            <p className="lesson-detail__soon">{dict.ui.comingSoonLesson}</p>
          )}
        </section>

        {glossaryEntries.length > 0 ? (
          <section className="lesson-detail__card">
            <h3>{dict.ui.wordsYouLearned}</h3>
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
          <h3>{dict.ui.learningObjectives}</h3>
          <ul className="lesson-detail__list">
            {lesson.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        <section className="lesson-detail__card">
          <h3>{dict.ui.prerequisites}</h3>
          <PrerequisiteList lesson={lesson} dict={dict} />
        </section>

        <nav className="lesson-detail__nav" aria-label="Lesson navigation">
          {prevLesson ? (
            <Link href={`/lessons/${prevLesson.id}`} className="lesson-detail__nav-link">
              <span aria-hidden="true">←</span>
              <span>
                <span className="lesson-detail__nav-label">{dict.ui.previous}</span>
                {prevLesson.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`} className="lesson-detail__nav-link">
              <span>
                <span className="lesson-detail__nav-label">{dict.ui.next}</span>
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
        <p>{dict.ui.footerLesson}</p>
      </footer>
    </div>
  );
}
