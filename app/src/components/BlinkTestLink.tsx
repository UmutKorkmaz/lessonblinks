import Link from "next/link";

interface BlinkTestLinkProps {
  lessonPath: string;
  startLabel: string;
  disabledLabel: string;
  disabled?: boolean;
}

export function BlinkTestLink({
  lessonPath,
  startLabel,
  disabledLabel,
  disabled = false,
}: BlinkTestLinkProps) {
  if (disabled) {
    return (
      <span className="blink-link--disabled" aria-disabled="true">
        {disabledLabel}
      </span>
    );
  }

  return (
    <Link href={lessonPath} className="blink-link">
      {startLabel}
      <span className="blink-link__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
