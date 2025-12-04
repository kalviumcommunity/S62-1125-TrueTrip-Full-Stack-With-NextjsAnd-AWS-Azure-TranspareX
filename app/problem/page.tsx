"use client";

import { ReactNode } from "react";

// --- Internal Component: PageWrapper (Built-in to prevent import errors) ---
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
      {/* --- BACKGROUND GRAPHICS --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-rose-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {title && (
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {/* Page Content */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function ProblemPage() {
  return (
    <PageWrapper
      title="The Broken System"
      subtitle="Why is getting your own money back so incredibly difficult?"
    >
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Left Side: The Narrative */}
        <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-sm text-red-400 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>Current Reality</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Money goes missing in the <span className="text-red-500">fine print.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Refund rules are buried in 20-page PDFs. Timelines are unclear. Customer care gives vague answers. 
              <br /><br />
              Most passengers don't even know if they are eligible, so they leave millions on the table every year.
            </p>
        </div>

        {/* Right Side: The Pain Points Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
            
            {/* Card 1 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-red-950/20 hover:border-red-500/30">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    {/* Icon: Ban/Hidden */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Hidden Rules</h3>
                <p className="text-sm text-slate-400">Policies hidden deep in booking platforms designed to make you give up.</p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-red-950/20 hover:border-red-500/30">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    {/* Icon: Hourglass */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Zero Visibility</h3>
                <p className="text-sm text-slate-400">Wait 14-21 days with no updates. Is it coming? Who knows.</p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-red-950/20 hover:border-red-500/30">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    {/* Icon: Phone Off */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" x2="1" y1="1" y2="23"/></svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Vague Support</h3>
                <p className="text-sm text-slate-400">"Contact the operator." "Contact the app." Everyone points fingers.</p>
            </div>

             {/* Card 4 */}
             <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-red-950/20 hover:border-red-500/30">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    {/* Icon: Money Flying */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/><path d="M19 15l-2-2-2 2"/><path d="M5 10l2 2 2-2"/></svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Late Cancellations</h3>
                <p className="text-sm text-slate-400">Passengers lose money because they cancel "too late" due to confusing rules.</p>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
}