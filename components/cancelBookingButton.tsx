"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!confirm("Cancel this trip and request a refund?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "POST",
      });

      if (res.ok) {
        alert("Cancellation requested. Refund is now pending 💸");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to cancel booking");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-red-500 text-white px-3 py-1 text-xs hover:bg-red-600 disabled:opacity-60"
    >
      {loading ? "Cancelling..." : "Cancel & Request Refund"}
    </button>
  );
}
