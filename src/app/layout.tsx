import "@/styles/globals.css";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "EmoryLife",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <div className="bg-background min-h-svh border-b">
          <AuthProvider>
            <Nav />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </AuthProvider>
          <Toaster />
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
