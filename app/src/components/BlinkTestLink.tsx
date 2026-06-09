import Link from "next/link";

interface BlinkTestLinkProps {
  lessonPath: string;
  disabled?: boolean;
}

export function BlinkTestLink({ lessonPath, disabled = false }: BlinkTestLinkProps) {
  if (disabled) {
    return (
      <span className="blink-link blink-link--disabled" aria-disabled="true">
        Coming soon
      </span>
    );
  }

  return (
    <Link href={lessonPath} className="blink-link">
      Try this lesson
      <span className="blink-link__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}