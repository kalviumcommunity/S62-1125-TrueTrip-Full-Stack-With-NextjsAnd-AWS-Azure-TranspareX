"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  const travelLinks = [
    { href: "/dashboard", label: "Travel Overview", icon: "🏠" },
    { href: "/dashboard/bookings", label: "My Bookings", icon: "🎫" },
    { href: "/dashboard/trips", label: "Upcoming Trips", icon: "✈️" },
    { href: "/dashboard/history", label: "Travel History", icon: "📊" },
    { href: "/dashboard/settings", label: "Profile Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r p-6">
      <h2 className="text-lg font-bold mb-6 text-gray-800">Travel Dashboard</h2>
      <ul className="space-y-2">
        {travelLinks.map(link => (
          <li key={link.href}>
            <Link 
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                pathname === link.href 
                  ? "bg-blue-100 text-blue-700 font-semibold" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}