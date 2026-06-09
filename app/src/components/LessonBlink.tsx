"use client";

import { BlinkComponent, useBlink } from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { getSolanaActionUrl } from "@/lib/lessons";

interface LessonBlinkProps {
  actionUrl: string;
}

export function LessonBlink({ actionUrl }: LessonBlinkProps) {
  const rpcUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
  const { adapter } = useBlinkSolanaWalletAdapter(rpcUrl);
  const solanaActionUrl = getSolanaActionUrl(actionUrl);
  const { blink, isLoading } = useBlink({ url: solanaActionUrl });

  return (
    <div className="lesson-blink">
      <div className="lesson-blink__wallet">
        <WalletMultiButton />
      </div>

      {isLoading ? (
        <p className="lesson-blink__status">Loading Blink…</p>
      ) : blink ? (
        <BlinkComponent blink={blink} adapter={adapter} stylePreset="x-dark" />
      ) : (
        <p className="lesson-blink__status lesson-blink__status--error">
          Could not load Blink. Check the Action URL and CORS headers.
        </p>
      )}
    </div>
  );
}