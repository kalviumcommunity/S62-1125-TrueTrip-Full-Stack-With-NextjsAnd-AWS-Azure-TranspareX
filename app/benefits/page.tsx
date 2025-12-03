import PageWrapper from "../../components/PageWrapper";

export default function BenefitsPage() {
  return (
    <PageWrapper
      title="Why Travellers Love TrueTrip"
      subtitle="We turn a stressful, confusing process into something you can actually trust."
    >
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <p className="font-semibold mb-1">Confidence</p>
          <p className="text-slate-600">
            Know your refund before cancelling so you never lose money out of
            confusion.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <p className="font-semibold mb-1">Control</p>
          <p className="text-slate-600">
            All your bookings and refund statuses in one clean dashboard.
          </p>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
          <p className="font-semibold mb-1">Trust</p>
          <p className="text-slate-600">
            Transparent timelines and status updates mean no more chasing
            multiple support teams.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
