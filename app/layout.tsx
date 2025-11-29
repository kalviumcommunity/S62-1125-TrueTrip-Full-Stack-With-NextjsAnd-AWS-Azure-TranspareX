import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "TrueTrip",
  description: "Transparent Bus & Trip Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* Header / Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            {/* Logo + Name */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="TrueTrip Logo" width={50} height={50} />
              <span className="text-2xl font-bold text-gray-900">TrueTrip</span>
            </Link>

            {/* Example Nav Links */}
            <nav className="flex gap-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-5xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
