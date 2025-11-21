"use client";

import { Card } from "@/components";

export default function TransparencyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Refund & Cancellation Transparency</h1>
      <p className="text-gray-600">
        TrueTrip is committed to making cancellations and refunds fully transparent. 
        See how refund timelines, policies, and operator reliability work — openly and honestly.
      </p>

      {/* Refund Policy */}
      <Card>
        <h2 className="text-xl font-semibold mb-2">Refund Policy</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>100% refund if cancelled 24 hours before departure</li>
          <li>50% refund if cancelled 6–24 hours before departure</li>
          <li>No refund if cancelled within 6 hours</li>
          <li>Refund is processed within 3–7 business days</li>
        </ul>
      </Card>

      {/* Refund Timelines */}
      <Card>
        <h2 className="text-xl font-semibold mb-2">Refund Timeline</h2>
        <div className="space-y-2 text-gray-700">
          <p>✔ Refund initiated immediately after cancellation</p>
          <p>✔ Bank processing time: 1–3 days</p>
          <p>✔ Platform verification: up to 24 hours</p>
          <p>✔ Total estimated time: 3–7 days</p>
        </div>
      </Card>

      {/* Operator Reliability Scores */}
      <Card>
        <h2 className="text-xl font-semibold mb-2">Operator Reliability Score</h2>
        <div className="text-gray-700 space-y-2">
          <p>🟢 InterCity Travels — 92% on-time refunds</p>
          <p>🟡 BlueLine Bus Service — 76% on-time refunds</p>
          <p>🟠 SpeedGo Travels — 58% on-time refunds</p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Scores are based on last 90 days of refund and cancellation data.
        </p>
      </Card>

      {/* Public Cancellation Logs */}
      <Card>
        <h2 className="text-xl font-semibold mb-2">Recent Cancellation Logs</h2>
        <div className="space-y-2 text-gray-700">
          <p>🔹 Booking #1021 — Cancelled — Refund initiated — 2 hours ago</p>
          <p>🔹 Booking #0997 — Cancelled — Refund completed — Yesterday</p>
          <p>🔹 Booking #0984 — Cancelled — Awaiting bank processing — 3 days ago</p>
        </div>
      </Card>

      {/* Transparency Commitment */}
      <Card>
        <h2 className="text-xl font-semibold mb-2">Why Transparency Matters</h2>
        <p className="text-gray-700">
          Many bus services hide refund timelines, deny cancellations, or provide unclear rules. 
          TrueTrip solves this by publishing policies, logs, and performance — all in the open.
        </p>
      </Card>
    </div>
  );
}
