"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const cities = [
  "Bengaluru (BLR)", "Mumbai (BOM)", "Delhi (DEL)", "Chennai (MAA)",
  "Hyderabad (HYD)", "Kolkata (CCU)", "Pune (PNQ)", "Ahmedabad (AMD)",
  "Goa (GOI)", "Jaipur (JAI)",
];

export default function BookingForm() {
  const router = useRouter();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [amount, setAmount] = useState("");
  
  // States for the "Crazy" animation
  const [status, setStatus] = useState<"IDLE" | "BOOKING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // 1. Validation
    const today = new Date().toISOString().split("T")[0] ?? "";
    if (!journeyDate || journeyDate <= today) {
      setErrorMsg("Please select a future date! 🗓️");
      return;
    }

    if (fromCity === toCity) {
      setErrorMsg("Origin and Destination cannot be the same! 🛑");
      return;
    }

    // 2. Start Animation Loop
    setStatus("BOOKING");

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromCity, toCity, journeyDate, amount }),
      });

      if (res.ok) {
        // 3. Show Success Animation
        setStatus("SUCCESS");
        
        // 4. Wait for user to admire the animation, then redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 2500); 
      } else {
        const text = await res.text();
        console.error("Booking failed:", res.status, text);
        setErrorMsg("Booking failed. Please try again.");
        setStatus("ERROR");
      }
    } catch (err) {
      setErrorMsg("Network error. Check your connection.");
      setStatus("ERROR");
    }
  }

  // --- RENDER HELPERS --- //

  // The Loading / Success Overlay
  if (status === "BOOKING" || status === "SUCCESS") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-md shadow-2xl">
        
        {status === "BOOKING" && (
          <div className="animate-pulse flex flex-col items-center gap-6">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-rose-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🚌</div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Securing your seat...</h3>
              <p className="text-slate-400 text-sm">Connecting to payment gateway</p>
            </div>
          </div>
        )}

        {status === "SUCCESS" && (
          <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
            <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Trip Confirmed!</h3>
              <p className="text-slate-300">Redirecting to your dashboard...</p>
            </div>
            
            {/* Fake Ticket Visual */}
            <div className="mt-4 w-full max-w-xs bg-white text-slate-900 p-4 rounded-lg shadow-lg relative overflow-hidden">
               <div className="border-b-2 border-dashed border-slate-300 pb-2 mb-2 flex justify-between">
                  <span className="font-bold">{fromCity.slice(0,3).toUpperCase()}</span>
                  <span className="text-slate-400">➜</span>
                  <span className="font-bold">{toCity.slice(0,3).toUpperCase()}</span>
               </div>
               <div className="text-xs text-slate-500 text-center uppercase tracking-widest">Boarding Pass Generated</div>
               {/* Decorative Circles for Ticket look */}
               <div className="absolute top-1/2 -left-2 w-4 h-4 bg-slate-800 rounded-full"></div>
               <div className="absolute top-1/2 -right-2 w-4 h-4 bg-slate-800 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // The Form View
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-1 backdrop-blur-xl shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative bg-slate-950/30 p-6 sm:p-8 rounded-[20px]">
        <h2 className="text-2xl font-bold text-white mb-1">Book a Journey</h2>
        <p className="text-slate-400 text-sm mb-6">Select your destination and secure a seat.</p>

        <form onSubmit={handleBooking} className="space-y-5">
          
          {/* Error Banner */}
          {errorMsg && (status === "ERROR" || status === "IDLE") && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-center gap-2 animate-pulse">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* FROM */}
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-focus-within:text-rose-400 transition-colors">From</label>
              <div className="relative">
                <select required className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white transition-all hover:border-white/20 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
                  <option value="" className="text-slate-500">Select Origin</option>
                  {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                <div className="pointer-events-none absolute right-4 top-3.5 text-slate-500">📍</div>
              </div>
            </div>

            {/* TO */}
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-focus-within:text-orange-400 transition-colors">To</label>
              <div className="relative">
                <select required className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white transition-all hover:border-white/20 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={toCity} onChange={(e) => setToCity(e.target.value)}>
                  <option value="" className="text-slate-500">Select Destination</option>
                  {cities.filter((c) => c !== fromCity).map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                <div className="pointer-events-none absolute right-4 top-3.5 text-slate-500">🏁</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* DATE */}
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-focus-within:text-blue-400 transition-colors">Date</label>
              <input type="date" required className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 transition-all hover:border-white/20 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]"
                value={journeyDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setJourneyDate(e.target.value)} />
            </div>

            {/* AMOUNT */}
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-focus-within:text-emerald-400 transition-colors">Price</label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-3 text-slate-400">₹</div>
                <input type="number" min={1} required placeholder="0.00" className="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-8 pr-4 py-3 text-white placeholder-slate-600 transition-all hover:border-white/20 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={status === "BOOKING"}
            className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 p-px shadow-lg shadow-rose-500/20 transition-transform active:scale-[0.98]">
            <div className="relative flex items-center justify-center gap-2 rounded-[11px] bg-slate-900/20 px-4 py-3 font-semibold text-white transition-colors group-hover:bg-transparent">
              <span>Confirm Booking</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

        </form>
      </div>
    </div>
  );
}