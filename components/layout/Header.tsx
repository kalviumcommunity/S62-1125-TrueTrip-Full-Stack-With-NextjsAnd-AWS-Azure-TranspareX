"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-lg">TranspareX Bus System</h1>
      <nav className="flex gap-4">
        <Link href="/">Search Buses</Link>
        <Link href="/bookings">My Bookings</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
