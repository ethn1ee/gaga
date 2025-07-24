import "@/styles/globals.css";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { LocaleProvider } from "@/contexts/locale-context";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Nanum_Gothic, Nunito_Sans } from "next/font/google";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "EmoryLife",
  description:
    "Information hub for Korean community at Emory University. Or at least a place to post campus squirrel pics.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-gothic",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();

  let font;
  switch (locale) {
    case "en":
      font = nunitoSans;
      break;
    case "ko":
      font = nanumGothic;
      break;
    default:
      font = nunitoSans;
  }

  return (
    <html lang={locale} className={`${font.variable}`}>
      <body
        data-locale={locale}
        className="data-[locale=en]:[&_p]:font-light data-[locale=en]:[&_button]:font-light"
      >
        <NextIntlClientProvider>
          <LocaleProvider>
            <TRPCReactProvider>
              <AuthProvider>
                <Nav />
                <div className="bg-background min-h-svh md:border-b pt-14 md:pt-20">
                  {children}
                </div>
              </AuthProvider>
            </TRPCReactProvider>
            <Toaster />
            <Footer />
          </LocaleProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
