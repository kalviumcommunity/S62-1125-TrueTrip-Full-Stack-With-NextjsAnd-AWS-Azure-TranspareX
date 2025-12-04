"use client";

import Link from "next/link";
import { ReactNode } from "react";

// --- Internal Component: PageWrapper ---
function PageWrapper({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white selection:bg-rose-500 selection:text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-rose-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {title && (
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">{title}</span>
              </h1>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">{children}</div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: (
        // Icon: UploadCloud
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
      ),
      title: "Add Booking",
      desc: "Book your ticket and enter travel details.",
    },
    {
      num: "02",
      icon: (
        // Icon: Search
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      ),
      title: "We Analyze",
      desc: "Our engine cross-references 50+ operator policies to find your exact refund amount.",
    },
    {
      num: "03",
      icon: (
        // Icon: Banknote
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
      ),
      title: "Get Paid",
      desc: "Track the status live. We notify you the second the money hits your bank.",
    },
  ];

  return (
    <PageWrapper
      title="How It Works"
      subtitle="From ticket to bank account in three effortless steps."
    >
      <div className="relative mt-12 grid gap-8 md:grid-cols-3">
        {/* Connecting Line (Desktop Only) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-rose-500/0" />

        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center group">
            {/* Number Circle */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-950 bg-slate-900 shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-transform group-hover:scale-110 duration-300">
               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center">
                  {step.icon}
               </div>
            </div>
            
            {/* Content */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 w-full backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="mb-2 text-xs font-bold tracking-widest text-rose-400">STEP {step.num}</div>
              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          href="/signup"
          className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-rose-600 px-10 font-bold text-white transition-all duration-300 hover:w-64 hover:bg-rose-500 hover:shadow-[0_0_40px_rgba(225,29,72,0.5)]"
        >
          <span className="mr-2 text-lg">Start Tracking Now</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </PageWrapper>
  );
}