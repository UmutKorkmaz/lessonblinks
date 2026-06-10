import { Header } from "@/components/Header";
import { LessonCard } from "@/components/LessonCard";
import { COURSE_DURATION_MINUTES, LESSONS } from "@/lib/lessons";

export default function Home() {
  const activeCount = LESSONS.filter((lesson) => lesson.status === "active").length;

  return (
    <div className="page">
      <Header />

      <main className="page__main">
        <section className="hero" aria-labelledby="hero-heading">
          <p className="hero__eyebrow">Solana Devnet · Free to try</p>
          <h1 id="hero-heading" className="hero__title">
            Learn Solana in <em>five taps</em>, not five tutorials.
          </h1>
          <p className="hero__subtitle">
            Every lesson is a real Blink — a one-tap Solana Action you sign with your own
            wallet. Send digital dollars, tip a creator, remit across a border, understand
            swaps, and graduate with an onchain badge.
          </p>
          <div className="hero__stats" role="list">
            <span className="hero__stat" role="listitem">
              <strong>{LESSONS.length}</strong> lessons
            </span>
            <span className="hero__stat" role="listitem">
              <strong>~{COURSE_DURATION_MINUTES} min</strong> total
            </span>
            <span className="hero__stat" role="listitem">
              <strong>{activeCount}</strong> live now
            </span>
            <span className="hero__stat" role="listitem">
              <strong>1</strong> badge to mint
            </span>
          </div>
        </section>

        <section className="path" aria-label="Lesson catalog">
          <h2 className="path__heading">The learning path</h2>
          {LESSONS.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </section>
      </main>

      <footer className="page__footer">
        <p>
          Runs on <strong>Solana Devnet</strong> — every transaction is real, every dollar is
          fake. Connect a devnet wallet on a lesson page to begin.
        </p>
      </footer>
    </div>
  );
}
