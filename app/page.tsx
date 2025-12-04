import Image from "next/image";
import Link from "next/link";

function StatCard({ label, value, delay }: { label: string; value: string, delay: string }) {
  return (
    <div className={`flex flex-col p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-float ${delay}`}>
      <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500">{value}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-rose-500/80 mt-1">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
      
      {/* LEFT CONTENT */}
      <div className="relative z-10 flex flex-col gap-8">
        
        

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-100">
          No More <br />
          Guessing Games <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-indigo-400 to-blue-300 text-shimmer">
            with Bus Refunds.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-100 max-w-lg leading-relaxed font-medium">
          TrueTrip brings clarity to chaos. Track your money, know your rights, and travel with <span className="text-slate-50 font-bold ">absolute confidence</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-rose-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:bg-rose-700 hover:scale-105 active:scale-95 hover:shadow-rose-500/25"
          >
            <span className="mr-2">Start Your Journey</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 font-bold text-slate-200 transition-all hover:bg-white/50 hover:text-shadow-gray-500"
          >
             How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
            <StatCard label="Transparency" value="98%" delay="animation-delay-0" />
            <StatCard label="Tracking" value="24/7" delay="animation-delay-2000" />
            <StatCard label="Operators" value="100+" delay="animation-delay-4000" />
        </div>
      </div>

      {/* RIGHT VISUALS (The Crazy Part) */}
      <div className="relative perspective-1000">
        
        {/* Abstract shapes behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-rose-200/40 to-violet-200/40 rounded-full blur-3xl -z-10 animate-pulse"></div>

        {/* Main Card Container with 3D Tilt Effect */}
        <div className="relative group w-full max-w-lg mx-auto transform transition-all duration-500 hover:rotate-y-6 hover:rotate-x-6 perspective-1000">
            
            {/* The Glass Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white/10 border border-white/40 shadow-2xl backdrop-blur-md p-2">
                
                {/* Image Wrapper */}
                <div className="relative h-[450px] w-full overflow-hidden rounded-[2rem]">
                    <Image
                        src="/bus-hero.png"
                        alt="Bus travel"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating Refund Status Widget */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-rose-500/20">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Refund Status</div>
                        <div className="text-lg font-bold text-slate-800">Processed in <span className="text-green-600">2 hours</span></div>
                    </div>
                </div>
            </div>

            {/* Decorative Floating Elements (Orbiting) */}
            <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-rose-100 animate-float animation-delay-2000 hidden md:block">
                <div className="text-2xl">🚌</div>
            </div>
             <div className="absolute bottom-20 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-rose-100 animate-float hidden md:block">
                <div className="text-2xl">💸</div>
            </div>

        </div>
      </div>
    </section>
  );
}