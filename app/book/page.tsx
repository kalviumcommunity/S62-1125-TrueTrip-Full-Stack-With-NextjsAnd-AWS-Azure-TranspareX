"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const cities = [
  "Bengaluru (BLR)",
  "Mumbai (BOM)",
  "Delhi (DEL)",
  "Chennai (MAA)",
  "Hyderabad (HYD)",
  "Kolkata (CCU)",
  "Pune (PNQ)",
  "Ahmedabad (AMD)",
  "Goa (GOI)",
  "Jaipur (JAI)",
];

export default function BookingForm() {
  const router = useRouter();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [amount, setAmount] = useState("");

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

// Future date only
const today = new Date().toISOString().split("T")[0] ?? "";
if (!journeyDate || journeyDate <= today) {
  alert("Please select a future date! 🗓️");
  return;
}


    // From / To cannot be same
    if (fromCity === toCity) {
      alert("From and To cannot be the same city 🙂");
      return;
    }

    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromCity, toCity, journeyDate, amount }),
    });

    if (res.ok) {
      alert("Booking successful ✨");
      router.push("/dashboard");
    } else {
      const text = await res.text();
      console.error("Booking failed:", res.status, text);
      alert("Booking failed ❌");
    }
  }

  return (
    <form onSubmit={handleBooking} className="space-y-4 text-sm">
      <div>
        <label className="block mb-1 font-medium">From City</label>
        <select
          required
          className="w-full border rounded-lg px-3 py-2"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        >
          <option value="">Select</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">To City</label>
        <select
          required
          className="w-full border rounded-lg px-3 py-2"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        >
          <option value="">Select</option>
          {cities
            .filter((city) => city !== fromCity)
            .map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Journey Date</label>
        <input
          type="date"
          required
          className="w-full border rounded-lg px-3 py-2"
          value={journeyDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setJourneyDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Ticket Amount (₹)</label>
        <input
          type="number"
          min={1}
          required
          className="w-full border rounded-lg px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg py-2.5">
        Book Trip →
      </button>
    </form>
  );
}
