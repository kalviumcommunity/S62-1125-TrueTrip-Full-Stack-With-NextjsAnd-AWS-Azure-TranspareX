import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50 font-inter text-slate-900 antialiased flex justify-center items-center">
      <div className="w-full max-w-[1200px] px-6 md:px-10 lg:px-14 flex flex-col">

        {/* NAV */}
        <nav className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold shadow-sm">
              T
            </div>
            <span className="font-semibold text-base">TrueTrip</span>
          </div>

          {/* Center links */}
          <ul className="hidden lg:flex items-center gap-10 text-slate-700">
            <li className="hover:text-slate-900 transition">The Problem</li>
            <li className="hover:text-slate-900 transition">Solution</li>
            <li className="hover:text-slate-900 transition">Benefits</li>
            <li className="hover:text-slate-900 transition">How It Works</li>
          </ul>

          {/* CTA */}
          <button className="hidden lg:inline-flex items-center border-2 border-rose-200 text-rose-600 px-5 py-2 rounded-full text-sm">
            Get Started
          </button>
        </nav>

        {/* HERO — fully centered vertically */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-14 min-h-[calc(100vh-90px)] py-10 lg:py-0">
        {/* LEFT */}
        <div className="flex-1 max-w-[520px]">
        <div className="inline-block bg-white/70 px-4 py-2 rounded-full shadow-sm text-sm mb-6">
        Transparency in Public Transport
       </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
      No More <br />
      Guessing Games <br />
      with{" "}
      <span
    className="inline-block"
    style={{
      background: "linear-gradient(90deg,#f16aa6,#caa6f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Bus Refunds
  </span>
</h1>

    <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-7">
      TrueTrip brings clarity and trust to intercity bus ticket cancellations.
      Know your rights, track your refunds, and travel with confidence.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <a className="inline-flex bg-rose-400 hover:bg-rose-500 transition px-6 py-3 rounded-full text-white shadow text-sm">
        Start Your Journey →
      </a>
      <a className="text-slate-700 text-sm hover:underline">
        Learn More
      </a>
    </div>

    <div className="flex items-center flex-wrap gap-8">
      <Stat label="Transparency Rate" value="98%" />
      <Stat label="Refund Tracking" value="24/7" />
      <Stat label="Bus Operators" value="100+" />
    </div>
  </div>

  {/* RIGHT */}
  <div className="flex-1 max-w-[520px] flex justify-center">
    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden w-full">
      <div className="relative h-[340px] sm:h-[430px] md:h-[520px] w-full">
        <Image
          src="/bus-hero.png"
          alt="bus hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Status card */}
      <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-rose-300 flex items-center justify-center text-white">
          ✓
        </div>
        <div className="text-sm">
          <div className="text-xs text-slate-500">Refund Status</div>
          <div className="text-sm font-semibold text-slate-800">
            Processed in 2 hours
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute -top-6 -right-10 w-40 h-32 bg-violet-100/40 blur-xl rounded-2xl" />
    </div>
  </div>
</section>     </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}
