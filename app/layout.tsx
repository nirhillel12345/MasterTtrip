import type { Metadata } from "next";
import { Assistant, Geist_Mono } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MasterTrip",
  description: "פלטפורמת השותפים והדירות למטיילים ישראלים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-assistant)] text-[15px] leading-relaxed text-slate-900 antialiased sm:text-base">
        {children}
        <footer className="mt-auto border-t border-slate-200/90 bg-white/95">
          <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-3 px-4 py-5 text-sm text-slate-600 sm:flex-row sm:px-6">
            <p className="text-center sm:text-right">© 2026 MasterTrip. כל הזכויות שמורות.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <a
                href="mailto:itaysofer295@gmail.com"
                className="font-semibold text-cyan-700 transition hover:text-cyan-800 hover:underline"
              >
                יצירת קשר
              </a>
              <span className="text-slate-300" aria-hidden>
                |
              </span>
              <a href="tel:0507228899" className="font-medium text-slate-700 transition hover:text-slate-900 hover:underline">
                טלפון: 0507228899
              </a>
              <span className="text-slate-300" aria-hidden>
                |
              </span>
              <a
                href="https://wa.me/972507228899"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cyan-700 transition hover:text-cyan-800 hover:underline"
              >
                וואטסאפ
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
