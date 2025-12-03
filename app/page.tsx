// app/page.tsx
import Image from "next/image";
import Link from "next/link";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* LEFT */}
      <div className="flex flex-col gap-6 max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm border border-pink-100">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          Transparency in Public Transport
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-extrabold leading-tight">
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

        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
          TrueTrip brings clarity and trust to intercity bus ticket cancellations.
          Know your rights, understand refund rules, and track your money every
          step of the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-rose-600 transition"
          >
            Start Your Journey →
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-rose-200 px-6 py-2.5 text-sm text-slate-800 bg-white/70 hover:bg-rose-50 transition"
          >
            See How It Works
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-6 sm:gap-10">
          <Stat label="Transparency Rate" value="98%" />
          <Stat label="Refund Tracking" value="24/7" />
          <Stat label="Bus Operators" value="100+" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md rounded-3xl bg-white shadow-xl border border-pink-100 overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src="/bus-hero.png"
              alt="Bus hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Status card */}
          <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-rose-400 flex items-center justify-center text-white text-lg">
              ✓
            </div>
            <div className="text-xs sm:text-sm">
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Refund Status
              </div>
              <div className="font-semibold text-slate-800">
                Processed in 2 hours
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -top-6 -right-10 w-40 h-32 bg-violet-100/50 blur-xl rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
