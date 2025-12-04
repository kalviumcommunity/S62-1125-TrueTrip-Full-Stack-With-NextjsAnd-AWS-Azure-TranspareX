import "./globals.css";
import type { Metadata } from "next";
import React from "react";
// We use standard <a> tags to avoid preview environment errors with next/link

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
      <head>
        <style>{`
          @keyframes drive {
            from { transform: translateX(-100%); }
            to { transform: translateX(100vw); }
          }
          .animate-bus {
            animation: drive 15s linear infinite;
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </head>
      <body className="antialiased text-slate-200 bg-slate-950 selection:bg-rose-500 selection:text-white">
        
        {/* BACKGROUND BLOBS (The Aurora Effect) */}
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="min-h-screen flex flex-col relative">
          {/* FLOATING NAVBAR */}
          <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 rounded-full px-6 py-3 flex items-center justify-between transition-all hover:bg-slate-900/90">
              
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 group">
                <div className="relative h-9 w-9">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-full blur group-hover:blur-md transition-all"></div>
                    <div className="relative h-full w-full bg-slate-950 text-white rounded-full flex items-center justify-center font-bold text-lg border border-white/10">T</div>
                </div>
                <span className="font-bold tracking-tight text-lg text-white">
                  TrueTrip
                </span>
              </a>

              {/* Center links */}
              <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                {["Problem", "Solution", "Benefits", "How It Works"].map((item) => (
                    <li key={item}>
                        <a href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-rose-400 transition-colors relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all group-hover:w-full"></span>
                        </a>
                    </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <a href="/login" className="hidden sm:inline-block text-sm font-semibold text-slate-300 hover:text-white transition">
                  Log in
                </a>
                <a
                  href="/signup"
                  className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 w-full pt-32 pb-12 px-4 md:px-8">
            {children}
          </main>

          {/* FOOTER WITH BUS ANIMATION */}
          <footer className="relative mt-auto border-t border-white/10 bg-slate-950/50 backdrop-blur-sm text-xs text-slate-500">
            
            {/* --- THE MOVING BUS --- */}
            <div className="absolute -top-[18px] left-0 w-full overflow-hidden pointer-events-none h-8 z-10">
                <div className="animate-bus absolute left-0 bottom-0 text-rose-500/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="transform scale-x-[-1]">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                    </svg>
                    {/* Small dust effect behind the bus */}
                    <div className="absolute bottom-1 right-[-10px] space-x-1 flex opacity-50">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-ping delay-75"></div>
                    </div>
                </div>
            </div>

            <div className="py-6 text-center">
                © {new Date().getFullYear()} TrueTrip — Built with 💗 for safer bus travel
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}