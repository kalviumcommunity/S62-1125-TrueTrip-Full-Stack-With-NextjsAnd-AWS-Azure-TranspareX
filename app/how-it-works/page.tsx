import Link from "next/link";
import PageWrapper from "../../components/PageWrapper";

export default function HowItWorksPage() {
  return (
    <PageWrapper
      title="How TrueTrip Works"
      subtitle="From ticket to refund in three clear steps."
    >
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
            1
          </div>
          <p className="font-semibold mb-1">Add Your Booking</p>
          <p className="text-slate-600">
            Enter your ticket details or upload a screenshot. We fetch the exact
            policy and charges.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
            2
          </div>
          <p className="font-semibold mb-1">See Your Refund</p>
          <p className="text-slate-600">
            We calculate your eligible refund, expected timeline, and who is
            responsible.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
            3
          </div>
          <p className="font-semibold mb-1">Track Until it Lands</p>
          <p className="text-slate-600">
            Watch status updates until the money reaches your bank account.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/signup"
          className="inline-flex items-center rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-rose-600"
        >
          Get Started for Free →
        </Link>
      </div>
    </PageWrapper>
  );
}
