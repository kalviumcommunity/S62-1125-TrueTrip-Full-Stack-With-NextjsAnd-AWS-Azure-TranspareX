"use client";

interface InvoiceCardProps {
  ticketId: string;
  amount: number;
  refund: number;
  status: string;
}

export default function InvoiceCard({
  ticketId,
  amount,
  refund,
  status,
}: InvoiceCardProps) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-3">Ticket Invoice</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Ticket ID:</strong> {ticketId}
        </p>
        <p>
          <strong>Paid Amount:</strong> ₹{amount}
        </p>
        <p>
          <strong>Refund Amount:</strong> ₹{refund}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "APPROVED" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
}
