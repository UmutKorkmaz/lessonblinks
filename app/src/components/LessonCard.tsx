import { BlinkTestLink } from "./BlinkTestLink";
import { format, type Dictionary } from "@/lib/i18n";
import type { Lesson } from "@/lib/lessons";

interface LessonCardProps {
  lesson: Lesson;
  dict: Dictionary;
}

export function LessonCard({ lesson, dict }: LessonCardProps) {
  const isActive = lesson.status === "active";
  const lessonPath = `/lessons/${lesson.id}`;

  return (
    <article
      className={`lesson-card ${isActive ? "lesson-card--active" : "lesson-card--soon"}`}
    >
      <span className="lesson-card__numeral" aria-hidden="true">
        {String(lesson.id).padStart(2, "0")}
      </span>

      <div className="lesson-card__body">
        <div className="lesson-card__meta">
          <span className={`lesson-card__badge lesson-card__badge--${lesson.status}`}>
            {isActive ? dict.ui.liveBadge : dict.ui.comingSoonBadge}
          </span>
          <span className="lesson-card__duration">
            {format(dict.ui.durationFormat, { s: lesson.durationSeconds })}
          </span>
          {lesson.badgeLabel ? (
            <span className="lesson-card__earn">
              {dict.ui.earnPrefix}
              {lesson.badgeLabel}
            </span>
          ) : null}
        </div>

        <h3 className="lesson-card__title">{lesson.title}</h3>
        <p className="lesson-card__tagline">{lesson.tagline}</p>

        <div className="lesson-card__concepts" aria-label="Concepts covered">
          {lesson.concepts.map((concept) => (
            <span key={concept} className="lesson-card__concept">
              {concept}
            </span>
          ))}
        </div>

        <div className="lesson-card__footer">
          <BlinkTestLink
            lessonPath={lessonPath}
            disabled={!isActive}
            startLabel={dict.ui.startLesson}
            disabledLabel={dict.ui.comingSoonCta}
          />
        </div>
      </div>
    </article>
  );
}
