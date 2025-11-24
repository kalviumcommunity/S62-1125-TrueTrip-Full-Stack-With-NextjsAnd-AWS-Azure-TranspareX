"use client";
import { useAuth } from "@/lib/auth"; // Updated import path

export default function Header() {
  useAuth();

  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* ... rest of your header code */}
    </header>
  );
}