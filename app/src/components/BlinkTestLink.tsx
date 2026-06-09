interface BlinkTestLinkProps {
  inspectorUrl: string;
  disabled?: boolean;
}

export function BlinkTestLink({ inspectorUrl, disabled = false }: BlinkTestLinkProps) {
  if (disabled) {
    return (
      <span className="blink-link blink-link--disabled" aria-disabled="true">
        Test on blinks.xyz
      </span>
    );
  }

  return (
    <a
      href={inspectorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="blink-link"
    >
      Test on blinks.xyz
      <span className="blink-link__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}