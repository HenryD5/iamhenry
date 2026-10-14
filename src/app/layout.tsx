import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { createPageMetadata } from "@/shared/seo/metadata";
import { siteConfig } from "@/shared/config/site";
import { env } from "@/shared/utils/env";
import { THEME_INLINE_SCRIPT } from "@/shared/utils/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  ...createPageMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${manrope.variable} ${jetBrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INLINE_SCRIPT }} />
      </head>
      {env.NEXT_PUBLIC_GTM_ID ? (
        <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM_ID} />
      ) : null}
      <body>{children}</body>
    </html>
  );
}
