"use client";

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

export default function SolutionPage() {
  return (
    <PageWrapper
      title="The Refund Revolution"
      subtitle="We standardized the chaos. See the difference."
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* THE OLD WAY (Problem) */}
        <div className="rounded-3xl border border-red-900/30 bg-red-950/10 p-8 backdrop-blur-sm relative overflow-hidden group">
             <div className="absolute inset-0 bg-red-500/5 z-0 transition-opacity group-hover:bg-red-500/10" />
             <div className="relative z-10">
                <h3 className="text-red-400 font-bold text-xl mb-6 flex items-center gap-2">
                    {/* Icon: X */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    The Old Way
                </h3>
                <ul className="space-y-6 text-slate-300">
                    <li className="flex gap-4">
                        {/* Icon: File Warning */}
                        <svg className="h-6 w-6 text-red-500/50 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 13v2"/><path d="M12 17h.01"/></svg>
                        <span>Hidden PDF policies buried in emails with confusing legal jargon.</span>
                    </li>
                    <li className="flex gap-4">
                        {/* Icon: Timer */}
                        <svg className="h-6 w-6 text-red-500/50 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>14-21 day waiting periods with zero updates or transparency.</span>
                    </li>
                    <li className="flex gap-4">
                        {/* Icon: Help Circle */}
                        <svg className="h-6 w-6 text-red-500/50 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        <span>Confusion over who pays you: The bus operator or the booking app?</span>
                    </li>
                </ul>
             </div>
        </div>

        {/* THE TRUETRIP WAY (Solution) */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/10 p-8 backdrop-blur-sm relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] group">
             <div className="absolute inset-0 bg-emerald-500/5 z-0 transition-opacity group-hover:bg-emerald-500/10" />
             <div className="relative z-10">
                <h3 className="text-emerald-400 font-bold text-xl mb-6 flex items-center gap-2">
                    {/* Icon: Check */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    The TrueTrip Way
                </h3>
                <ul className="space-y-6 text-white">
                    <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                        <span>Plain English eligibility shown instantly before you cancel.</span>
                    </li>
                    <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                        <span>Live status tracking: Requested → Approved → Settled.</span>
                    </li>
                    <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                        <span>Automated escalation if timelines are missed.</span>
                    </li>
                </ul>
             </div>
        </div>

      </div>
    </PageWrapper>
  );
}