"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminActions({ refundId }: { refundId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAction(status: "APPROVED" | "REJECTED") {
    if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/refunds/${refundId}/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-end gap-2 text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-xs">Processing...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => handleAction("APPROVED")}
        title="Approve Refund"
        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all duration-200"
      >
        <Check className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleAction("REJECTED")}
        title="Reject Refund"
        className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}