import { Header } from "@/components/Header";
import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";
import { getActionUrl, getBaseUrl, getBlinkInspectorUrl, LESSONS } from "@/lib/lessons";

export default function Home() {
  const baseUrl = getBaseUrl();

  const lessonCards = LESSONS.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    status: lesson.status,
    actionUrl: getActionUrl(lesson.actionPath, baseUrl),
    inspectorUrl: getBlinkInspectorUrl(lesson.actionPath, baseUrl),
    lessonPath: `/lesson/${lesson.slug}`,
  }));

  return (
    <div className="page">
      <Header />

      <main className="page__main">
        <section className="hero">
          <h2 className="hero__title">Learn Solana in 5 taps</h2>
          <p className="hero__subtitle">
            Each Blink is a 30-second lesson — send USDC, tip creators, remit abroad, swap, and
            claim a graduation NFT. No external docs required.
          </p>
          <ProgressBar currentStep={1} totalSteps={LESSONS.length} />
        </section>

        <section className="lessons-grid" aria-label="Lesson catalog">
          {lessonCards.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </section>
      </main>

      <footer className="page__footer">
        <p>
          Test Blinks with{" "}
          <a href="https://www.blinks.xyz/inspector" target="_blank" rel="noopener noreferrer">
            blinks.xyz/inspector
          </a>{" "}
          · Solana Devnet
        </p>
      </footer>
    </div>
  );
}