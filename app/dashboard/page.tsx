import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CancelBookingButton from "@/components/cancelBookingButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

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

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {displayName} 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Here’s a quick snapshot of your trips and refunds.
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white/90 rounded-2xl border border-pink-100 p-4 shadow-sm text-sm space-y-1">
        <h2 className="font-semibold mb-1">Profile</h2>
        <p>
          <strong>Name:</strong> {user.name || "—"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      {/* Create bookings */}
      <a
        href="/book"
        className="inline-block rounded-lg bg-rose-500 text-white px-4 py-2 text-sm hover:bg-rose-600"
      >
        + Book a New Trip
      </a>

      {/* Bookings */}
      <div className="bg-white/90 rounded-2xl border border-pink-100 p-4 shadow-sm text-sm">
        <h2 className="font-semibold mb-3">Your Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-slate-500">No bookings yet.</p>
        ) : (
          <ul className="space-y-2">
            {bookings.map((b) => (
              <li key={b.id} className="flex justify-between items-center">
                <span>
                  {b.fromCity} → {b.toCity} |{" "}
                  {new Date(b.journeyDate).toDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-pink-100 px-2 py-1 rounded-full">
                    {b.status}
                  </span>

                  {b.status === "BOOKED" && (
                    <CancelBookingButton bookingId={b.id} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Refunds */}
      <div className="bg-white/90 rounded-2xl border border-pink-100 p-4 shadow-sm text-sm">
        <h2 className="font-semibold mb-3">Your Refunds</h2>

        {refunds.length === 0 ? (
          <p className="text-slate-500">No refunds yet.</p>
        ) : (
          <ul className="space-y-2">
            {refunds.map((r) => (
              <li key={r.id} className="flex justify-between items-center">
                <span>
                  {r.booking.fromCity} → {r.booking.toCity} |{" "}
                  {new Date(r.booking.journeyDate).toDateString()}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    r.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : r.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : r.status === "PAID"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout */}
      <form action="/logout" method="POST">
        <button className="rounded-lg bg-gray-700 text-white px-4 py-2 text-sm hover:bg-gray-800">
          Logout
        </button>
      </form>
    </section>
  );
}
