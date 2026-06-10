import { Header } from "@/components/Header";
import { LessonCard } from "@/components/LessonCard";
import { format, getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import { COURSE_DURATION_MINUTES, getLessons } from "@/lib/lessons";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const lessons = getLessons(dict);
  const activeCount = lessons.filter((lesson) => lesson.status === "active").length;

  return (
    <div className="page">
      <Header dict={dict} locale={locale} />

      <main className="page__main">
        <section className="hero" aria-labelledby="hero-heading">
          <p className="hero__eyebrow">{dict.ui.heroEyebrow}</p>
          <h1 id="hero-heading" className="hero__title">
            {dict.ui.heroTitlePre}
            <em>{dict.ui.heroTitleHighlight}</em>
            {dict.ui.heroTitlePost}
          </h1>
          <p className="hero__subtitle">{dict.ui.heroSubtitle}</p>
          <div className="hero__stats" role="list">
            <span className="hero__stat" role="listitem">
              <strong>{lessons.length}</strong> {dict.ui.statLessons}
            </span>
            <span className="hero__stat" role="listitem">
              <strong>{format(dict.ui.statMinutes, { m: COURSE_DURATION_MINUTES })}</strong>{" "}
              {dict.ui.statTotal}
            </span>
            <span className="hero__stat" role="listitem">
              <strong>{activeCount}</strong> {dict.ui.statLiveNow}
            </span>
            <span className="hero__stat" role="listitem">
              <strong>1</strong> {dict.ui.statBadge}
            </span>
          </div>
        </section>

        <section className="path" aria-label="Lesson catalog">
          <h2 className="path__heading">{dict.ui.pathHeading}</h2>
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} dict={dict} />
          ))}
        </section>
      </main>

      <footer className="page__footer">
        <p>{dict.ui.footerHome}</p>
      </footer>
    </div>
  );
}
