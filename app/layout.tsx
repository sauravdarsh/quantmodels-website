import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import "./globals.css";

const segoeUi = localFont({
  src: [
    { path: "./fonts/segoeuil.ttf", weight: "300", style: "normal" },
    { path: "./fonts/segoeui.ttf", weight: "400", style: "normal" },
    { path: "./fonts/segoeuib.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-segoe-ui",
  display: "swap",
});

const consolas = localFont({
  src: [
    { path: "./fonts/consola.ttf", weight: "400", style: "normal" },
    { path: "./fonts/consolab.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-consolas",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QuantModels.ai | Institutional Quant Analytics",
    template: "%s | QuantModels.ai",
  },
  description:
    "QuantModels.ai provides institutional pricing, volatility, and risk analytics for modern investment teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${segoeUi.variable} ${consolas.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <div className="relative flex min-h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_52%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-40 -z-10 h-[36rem] bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.65),_transparent_62%)]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
