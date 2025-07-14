import "@/styles/globals.css";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "EmoryLife",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <body>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
