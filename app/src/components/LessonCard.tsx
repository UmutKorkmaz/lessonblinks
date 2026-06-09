import { BlinkTestLink } from "./BlinkTestLink";
import type { LessonStatus } from "@/lib/lessons";

export interface LessonCardData {
  id: number;
  title: string;
  description: string;
  status: LessonStatus;
  actionUrl: string;
  inspectorUrl: string;
  lessonPath: string;
}

interface LessonCardProps {
  lesson: LessonCardData;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const isActive = lesson.status === "active";

  return (
    <article className={`lesson-card ${isActive ? "lesson-card--active" : "lesson-card--soon"}`}>
      <div className="lesson-card__header">
        <span className="lesson-card__number">Lesson {lesson.id}</span>
        <span className={`lesson-card__badge lesson-card__badge--${lesson.status}`}>
          {isActive ? "Active" : "Coming Soon"}
        </span>
      </div>

      <h2 className="lesson-card__title">{lesson.title}</h2>
      <p className="lesson-card__description">{lesson.description}</p>

      <div className="lesson-card__footer">
        <BlinkTestLink inspectorUrl={lesson.inspectorUrl} disabled={!isActive} />
        {isActive && (
          <a href={lesson.lessonPath} className="lesson-card__detail-link">
            View lesson page
          </a>
        )}
      </div>
    </article>
  );
}