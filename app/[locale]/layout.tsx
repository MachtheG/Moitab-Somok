import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MobileBar } from "@/components/layout/mobile-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RevealObserver } from "@/components/shared/reveal-observer";
import { routing } from "@/i18n/routing";
import { personJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#002900", width: "device-width", initialScale: 1, viewportFit: "cover" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: `%s · ${t("siteName")}` },
    description: t("description"),
    applicationName: t("siteName"),
    alternates: { canonical: locale === "en" ? "/" : "/sw", languages: { en: "/", sw: "/sw", "x-default": "/" } },
    openGraph: { type: "website", siteName: t("siteName"), locale: locale === "sw" ? "sw_KE" : "en_KE" },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply Lite mode before first paint, keeping pages static. */}
        <script dangerouslySetInnerHTML={{ __html: `if(document.cookie.indexOf("lite=1")>-1)document.documentElement.classList.add("lite")` }} />
      </head>
      <body className="min-h-dvh bg-white font-sans text-black antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(SITE_URL)) }} />
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main" className="pb-16 sm:pb-0">{children}</main>
          <SiteFooter />
          <MobileBar />
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
