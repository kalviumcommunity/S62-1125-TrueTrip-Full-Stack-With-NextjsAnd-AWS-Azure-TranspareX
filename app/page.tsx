"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto bg-gray-50 min-h-screen">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Search Buses
      </h1>

      {/* Search Form */}
      <div className="flex flex-wrap items-center gap-4 bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="From"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <input
          type="text"
          placeholder="To"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md transition transform hover:-translate-y-1">
          Search
        </button>
      </div>

      {/* Why TrueTrip */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Why TrueTrip?</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Transparent ticket cancellations, reliable service, and refunds processed clearly.
        </p>
      </div>

    </div>
  );
}
