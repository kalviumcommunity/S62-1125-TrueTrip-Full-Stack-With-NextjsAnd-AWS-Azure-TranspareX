import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "TrueTrip",
  description: "Transparent Bus & Trip Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* NAVBAR */}
        <nav className="w-full bg-white shadow-md px-6 py-4 mb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="text-2xl font-semibold text-blue-600">
              TrueTrip
            </Link>

            {/* Nav Links */}
            <div className="flex gap-6 text-lg font-medium">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-blue-600 transition">
                Signup
              </Link>
              <Link href="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link href="/bookings/sample-id" className="hover:text-blue-600 transition">
                Sample Booking
              </Link>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-6 py-4">
          {children}
        </main>
      </body>
    </html>
  );
}
