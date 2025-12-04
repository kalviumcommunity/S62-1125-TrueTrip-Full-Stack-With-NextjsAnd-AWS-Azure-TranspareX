import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CancelBookingButton from "@/components/cancelBookingButton";
import ProfileCard from "./ProfileCard";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const displayName = user.name || user.email;

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const refunds = await prisma.refund.findMany({
    where: { booking: { userId: user.id } },
    include: { booking: true },
    orderBy: { createdAt: "desc" },
  });

  // Simple stats
  const upcoming = bookings.filter(
    (b) => b.status === "BOOKED" && b.journeyDate > new Date()
  );
  const pendingRefunds = refunds.filter((r) => r.status === "PENDING");

  return (
    <section className="space-y-8 max-w-6xl mx-auto">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between bg-slate-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
            Passholder Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome back, <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">{displayName}</span> 👋
          </h1>
          <p className="text-slate-400 max-w-lg">
            Here’s a quick snapshot of your trips and refunds.
          </p>
        </div>

        <div className="shrink-0">
             <ProfileCard
                name={user.name ?? ""}
                email={user.email}
                createdAt={user.createdAt?.toISOString?.()}
             />
        </div>
      </div>

      {/* --- STATS & ACTIONS --- */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* New Trip Action */}
        <Link
          href="/book"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 to-orange-500 p-6 text-white shadow-lg transition-all hover:shadow-rose-500/25 hover:scale-[1.02]"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="rounded-full bg-white/20 w-10 h-10 flex items-center justify-center text-xl mb-4 group-hover:bg-white/30 transition-colors">
              ＋
            </div>
            <div>
              <div className="font-bold text-lg">Book a New Trip</div>
              <div className="text-rose-100 text-sm opacity-90">Start your next journey</div>
            </div>
          </div>
        </Link>

        {/* Upcoming Stats */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md flex flex-col justify-center">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Upcoming trips
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{upcoming.length}</span>
            <span className="text-sm text-slate-500">
                {upcoming.length === 1 ? "journey" : "journeys"} booked
            </span>
          </div>
        </div>

        {/* Refund Stats */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md flex flex-col justify-center">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Pending refunds
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{pendingRefunds.length}</span>
            <span className="text-sm text-slate-500">waiting to be processed</span>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1.4fr]">
        
        {/* LEFT COLUMN: BOOKINGS */}
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-white">Your Bookings</h2>
            </div>

          {bookings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-slate-500">
              No bookings yet.
            </div>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b) => {
                const now = new Date();
                const journeyDate = new Date(b.journeyDate);
                const isPast = journeyDate <= now;
                const isCancelled = b.status === "CANCELLED";
                
                // --- TIME LEFT CALCULATION ---
                let timeStatusLabel = "";
                let timeStatusColor = "text-slate-400"; // default

                if (isCancelled) {
                    timeStatusLabel = "Trip Cancelled";
                    timeStatusColor = "text-red-400";
                } else if (isPast) {
                    timeStatusLabel = "Trip Completed";
                    timeStatusColor = "text-slate-500";
                } else {
                    // Calculate difference in milliseconds
                    const diffMs = journeyDate.getTime() - now.getTime();
                    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                    const diffDays = Math.floor(diffHours / 24);

                    if (diffHours < 1) {
                        timeStatusLabel = "Starts in < 1 hour";
                        timeStatusColor = "text-orange-400 animate-pulse";
                    } else if (diffHours < 24) {
                        timeStatusLabel = `Starts in ${diffHours} hours`;
                        timeStatusColor = "text-emerald-400";
                    } else {
                        timeStatusLabel = `Starts in ${diffDays} days`;
                        timeStatusColor = "text-blue-400";
                    }
                }

                // Border/Status styling
                const borderClass = isCancelled 
                    ? "border-l-red-500" 
                    : isPast 
                        ? "border-l-slate-600" 
                        : "border-l-emerald-500";

                return (
                  <li
                    key={b.id}
                    className={`group relative flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/5 bg-slate-900/60 p-5 shadow-sm backdrop-blur-md transition-all hover:bg-slate-800/60 hover:border-white/10 hover:scale-[1.01] overflow-hidden`}
                  >
                    {/* Colored Accent Line on Left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCancelled ? "bg-red-500" : isPast ? "bg-slate-600" : "bg-emerald-500"}`}></div>

                    <div className="pl-4 flex flex-col gap-1 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2 text-lg font-bold text-white">
                        <span>{b.fromCity}</span>
                        <span className="text-slate-600">→</span>
                        <span>{b.toCity}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-400">
                            {journeyDate.toDateString()}
                        </span>
                        {/* --- THE NEW TIME DISPLAY --- */}
                        <span className={`text-xs font-mono font-medium uppercase tracking-wide ${timeStatusColor}`}>
                            {timeStatusLabel}
                        </span>
                      </div>
                    </div>

                    <div className="pl-4 sm:pl-0 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                isCancelled 
                                ? "bg-red-500/10 text-red-400 border-red-500/20" 
                                : isPast 
                                ? "bg-slate-700/30 text-slate-400 border-slate-700" 
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}>
                                {isPast && !isCancelled ? "COMPLETED" : b.status}
                            </span>

                            {/* Show Cancel Button only if Booked and Future */}
                            {b.status === "BOOKED" && !isPast && (
                                <CancelBookingButton bookingId={b.id} />
                            )}
                        </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* RIGHT COLUMN: REFUNDS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-white">Your Refunds</h2>
          </div>
         
          <div className="bg-slate-900/40 rounded-3xl border border-white/5 p-1">
            {refunds.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                    No refunds yet.
                </div>
            ) : (
                <ul className="grid gap-1">
                {refunds.map((r) => {
                    const requestedAt = new Date(r.createdAt);
                    const requestedText = requestedAt.toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    });

                    // Status Colors
                    let statusColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
                    if (r.status === "APPROVED") statusColor = "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
                    else if (r.status === "PAID") statusColor = "text-blue-400 bg-blue-400/10 border-blue-400/20";
                    else if (r.status === "REJECTED") statusColor = "text-red-400 bg-red-400/10 border-red-400/20";

                    return (
                    <li
                        key={r.id}
                        className="group p-4 rounded-2xl bg-slate-900/40 border border-transparent transition-all hover:bg-slate-800/50 hover:border-white/5"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="text-xs text-slate-500 mb-0.5">Refund for</div>
                                <div className="font-semibold text-slate-200 text-sm">
                                    {r.booking.fromCity} to {r.booking.toCity}
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold border ${statusColor}`}>
                                {r.status}
                            </span>
                        </div>

                        <div className="flex items-end justify-between mt-3">
                            <div className="text-[11px] text-slate-500">
                                <div className="mb-1">Requested: {requestedText}</div>
                                {r.policyNote && (
                                    <div className="text-slate-600 italic">"{r.policyNote}"</div>
                                )}
                            </div>
                            
                            {typeof r.estimatedAmount === "number" && (
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 uppercase">Est. Amount</div>
                                    <div className="text-lg font-bold text-white">
                                        ₹{r.estimatedAmount}
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                    );
                })}
                </ul>
            )}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="flex justify-center pt-8 pb-4">
        <form action="/logout" method="POST">
          <button className="text-xs text-slate-400 hover:text-rose-400 underline underline-offset-4 transition-colors">
            Sign out
          </button>
        </form>
      </div>
    </section>
  );
}