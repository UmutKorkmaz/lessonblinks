"use client";

import { BlinkComponent, useBlink } from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { getSolanaActionUrl } from "@/lib/lessons";

interface LessonBlinkProps {
  actionUrl: string;
  /** Locale forwarded to the Action API as ?lang= so the Blink renders localized */
  locale: string;
  loadingLabel: string;
  errorLabel: string;
}

export function LessonBlink({ actionUrl, locale, loadingLabel, errorLabel }: LessonBlinkProps) {
  const rpcUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
  const { adapter } = useBlinkSolanaWalletAdapter(rpcUrl);
  const localizedActionUrl = `${actionUrl}${actionUrl.includes("?") ? "&" : "?"}lang=${locale}`;
  const solanaActionUrl = getSolanaActionUrl(localizedActionUrl);
  const { blink, isLoading } = useBlink({ url: solanaActionUrl });

  return (
    <div className="lesson-blink">
      <div className="lesson-blink__wallet">
        <WalletMultiButton />
      </div>

      {isLoading ? (
        <p className="lesson-blink__status">{loadingLabel}</p>
      ) : blink ? (
        <BlinkComponent blink={blink} adapter={adapter} stylePreset="x-dark" />
      ) : (
        <p className="lesson-blink__status lesson-blink__status--error">{errorLabel}</p>
      )}
    </div>
  );
}
