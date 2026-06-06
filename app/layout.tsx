import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { LUCKY_ORANGE_SITE_ID } from "@/lib/luckyOrange";

export const metadata: Metadata = {
  metadataBase: new URL("https://worldcup2026-hub.com"),
  title: {
    default: "2026 World Cup Global Info Hub",
    template: "%s · World Cup Info Hub",
  },
  description:
    "Schedules, standings, scores, teams, host city guides, and local kickoff times for the 2026 finals—fast, mobile-friendly, and wagering-free.",
  openGraph: {
    title: "2026 World Cup Global Info Hub",
    description:
      "Neutral schedules, standings, host city guides, and local kickoff times for World Cup 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {ADSENSE_CLIENT ? (
          <Script
            id="adsense-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              id="ga-loader"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        {LUCKY_ORANGE_SITE_ID ? (
          <Script
            id="lucky-orange-loader"
            async
            defer
            src={`https://tools.luckyorange.com/core/lo.js?site-id=${LUCKY_ORANGE_SITE_ID}`}
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
