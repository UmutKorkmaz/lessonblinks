interface ProgressBarProps {
  totalSteps?: number;
  currentStep?: number;
}

export function ProgressBar({ totalSteps = 5, currentStep = 1 }: ProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="progress-bar__track">
        {steps.map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div
              key={step}
              className={[
                "progress-bar__step",
                isCompleted && "progress-bar__step--completed",
                isCurrent && "progress-bar__step--current",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="progress-bar__dot">
                {isCompleted ? (
                  <span className="progress-bar__check" aria-hidden="true">
                    ✓
                  </span>
                ) : (
                  <span className="progress-bar__number">{step}</span>
                )}
              </div>
              {step < totalSteps && <div className="progress-bar__connector" />}
            </div>
          );
        })}
      </div>
      <p className="progress-bar__label">
        Lesson <strong>{currentStep}</strong> of {totalSteps}
      </p>
    </div>
  );
}