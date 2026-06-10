import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { SolanaProviders } from "@/components/SolanaProviders";
import { getDictionary, getLocaleInfo } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());

  return {
    title: dict.ui.siteTitle,
    description: dict.ui.siteDescription,
    icons: { icon: "/icon.svg" },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const { dir } = getLocaleInfo(locale);

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
