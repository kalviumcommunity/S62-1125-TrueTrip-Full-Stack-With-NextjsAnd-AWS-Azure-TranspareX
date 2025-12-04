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

// --- Main Page Component ---
export default function BenefitsPage() {
  return (
    <PageWrapper
      title="Why Travelers Love Us"
      subtitle="We turned a stressful, confusing black box into a transparent, automated dashboard."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BIG CARD - LEFT */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-rose-500/20 blur-2xl transition-all group-hover:bg-rose-500/30" />
          {/* Icon: Shield Check */}
          <svg className="mb-4 h-10 w-10 text-rose-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <h3 className="text-2xl font-bold text-white mb-2">Unshakeable Confidence</h3>
          <p className="text-slate-400 text-lg">
            Never guess again. Know exactly how much you'll get back before you hit the cancel button. We analyze hidden PDF policies so you don't have to.
          </p>
        </div>

        {/* TALL CARD - RIGHT */}
        <div className="md:row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-rose-500/10 to-purple-900/10 p-8 backdrop-blur-sm">
          {/* Icon: Layout Dashboard */}
          <svg className="mb-4 h-10 w-10 text-rose-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <h3 className="text-2xl font-bold text-white mb-2">Total Control Dashboard</h3>
          <p className="text-slate-400 mb-6">All your bookings, all your refunds, one single screen.</p>
          
          <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono text-slate-300 shadow-xl">
            <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
              <span>Status</span>
              <span className="text-emerald-400 font-bold">Processed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amount</span>
              <span className="text-white text-lg">$45.00</span>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono text-slate-300 opacity-60">
            <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
              <span>Status</span>
              <span className="text-amber-400 font-bold">Pending</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amount</span>
              <span className="text-white text-lg">$12.50</span>
            </div>
          </div>
        </div>

        {/* SMALL CARD 1 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-rose-500/50 transition-colors group">
          {/* Icon: Clock */}
          <svg className="mb-3 h-8 w-8 text-rose-400 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <h3 className="text-xl font-bold text-white">Real-time Updates</h3>
          <p className="text-slate-400 text-sm mt-2">No more chasing customer support. Get notified instantly via email.</p>
        </div>

        {/* SMALL CARD 2 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-rose-500/50 transition-colors group">
          {/* Icon: Zap */}
          <svg className="mb-3 h-8 w-8 text-rose-400 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <h3 className="text-xl font-bold text-white">Instant Calcs</h3>
          <p className="text-slate-400 text-sm mt-2">Paste a PNR, get a refund quote in milliseconds.</p>
        </div>
      </div>
    </PageWrapper>
  );
}