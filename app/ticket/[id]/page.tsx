export default async function TicketPage({ params }: { params: { id: string } }) {
  const ticket = {
    id: params.id,
    status: "Pending",
    from: "City A",
    to: "City B",
  };

  if (!ticket) {
    return <p>No ticket found.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ticket Details</h1>

      <p>
        <strong>Status:</strong> {ticket.status}
      </p>

      <p>
        <strong>From:</strong> {ticket.from}
      </p>

      <p>
        <strong>To:</strong> {ticket.to}
      </p>
    </div>
  );
}
