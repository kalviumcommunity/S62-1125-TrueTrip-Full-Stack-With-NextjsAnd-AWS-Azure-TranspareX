import PageWrapper from "../../components/PageWrapper";

export default function ProblemPage() {
  return (
    <PageWrapper
      title="The Problem with Bus Refunds"
      subtitle="Refund rules are buried in fine print and every operator has a different policy. Most passengers don't even know if they're eligible."
    >
      <p className="text-sm md:text-base text-slate-600">
        Money goes missing, timelines are unclear, and customer care gives vague
        answers. TrueTrip exists so passengers never have to guess if or when
        their refund is coming.
      </p>

      <div className="mt-3 bg-rose-50 border border-pink-100 rounded-2xl p-4 text-sm space-y-2">
        <p>🚫 Hidden refund rules on booking platforms</p>
        <p>⏳ Long waiting times with no visibility</p>
        <p>📞 Confusing answers from support teams</p>
        <p>💸 Passengers lose money because they cancel “too late”</p>
      </div>
    </PageWrapper>
  );
}
