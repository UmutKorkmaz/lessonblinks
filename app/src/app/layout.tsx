import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SolanaProviders } from "@/components/SolanaProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "LessonBlinks — Blinks as Micro-Lessons",
  description: "One-tap Solana Actions as 30-second lessons for new crypto users.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}