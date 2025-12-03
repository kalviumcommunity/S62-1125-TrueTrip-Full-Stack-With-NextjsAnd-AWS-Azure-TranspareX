import PageWrapper from "../../components/PageWrapper";

export default function SolutionPage() {
  return (
    <PageWrapper
      title="Our Solution"
      subtitle="TrueTrip standardises refund rules across operators, shows eligibility in plain language, and lets you track every refund in one place."
    >
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold mb-1">Clear Eligibility</h2>
          <p className="text-slate-600">
            Enter your PNR/booking ID and instantly see how much you're owed and
            why.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold mb-1">Live Tracking</h2>
          <p className="text-slate-600">
            Track every stage of your refund: requested, approved, processed and
            settled.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold mb-1">Operator Transparency</h2>
          <p className="text-slate-600">
            We turn complex policy PDFs into simple timelines and clear amounts.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
