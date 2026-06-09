interface BlinkTestLinkProps {
  dialToUrl: string;
  disabled?: boolean;
}

export function BlinkTestLink({ dialToUrl, disabled = false }: BlinkTestLinkProps) {
  if (disabled) {
    return (
      <span className="blink-link blink-link--disabled" aria-disabled="true">
        Test Blink
      </span>
    );
  }

  return (
    <a
      href={dialToUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="blink-link"
    >
      Test Blink
      <span className="blink-link__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}