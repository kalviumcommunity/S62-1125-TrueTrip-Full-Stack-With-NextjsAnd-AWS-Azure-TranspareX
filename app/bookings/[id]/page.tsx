interface Props {
  params: { id: string };
}

export default async function BookingDetails({ params }: Props) {
  const { id } = params;

  const demo = {
    id,
    status: "Cancelled",
    refund: "Pending Processing",
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Booking Details</h1>
      <div className="border p-4 mb-4">
        <p><strong>From:</strong> City A</p>
        <p><strong>To:</strong> City B</p>
        <p><strong>Date:</strong> 20 Nov 2025</p>
        <p><strong>Seat:</strong> 12A</p>
        <p><strong>Status:</strong> Confirmed</p>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 mb-4">Cancel & Refund</button>
      <p>Refunds processed transparently within 24 hours.</p>
    </div>
  );
}
