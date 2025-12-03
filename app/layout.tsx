// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TrueTrip — Transparency in Bus Refunds",
  description: "Know your rights, track refunds, and travel with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800 bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50">
        <div className="min-h-screen flex flex-col">
          {/* NAVBAR (shows on EVERY page) */}
          <header className="border-b border-pink-100 bg-pink-50/80 backdrop-blur">
            <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-semibold">
                  T
                </div>
                <span className="font-semibold tracking-tight text-sm md:text-base">
                  TrueTrip
                </span>
              </Link>

              {/* Center links */}
              <ul className="hidden md:flex items-center gap-6 text-xs md:text-sm text-slate-700">
                <li>
                  <Link href="/problem" className="hover:text-pink-600">
                    The Problem
                  </Link>
                </li>
                <li>
                  <Link href="/solution" className="hover:text-pink-600">
                    Solution
                  </Link>
                </li>
                <li>
                  <Link href="/benefits" className="hover:text-pink-600">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-pink-600">
                    How It Works
                  </Link>
                </li>
              </ul>

              {/* Right CTAs */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex px-3 py-1 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex px-3 md:px-4 py-1 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="border-t border-pink-100 text-xs text-slate-500 py-4 text-center">
            © {new Date().getFullYear()} TrueTrip — Built with 💗 for safer bus travel
          </footer>
        </div>
      </body>
    </html>
  );
}
