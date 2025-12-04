import React from "react";

interface ProfileCardProps {
  name: string;
  email?: string | null;
  createdAt?: string;
}

export default function ProfileCard({
  name,
  email,
  createdAt,
}: ProfileCardProps) {
  // 1. Generate Initials from Name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  // 2. Format the Joined Date
  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-800/50 p-4 shadow-lg backdrop-blur-md transition-all hover:bg-slate-800/80 hover:border-white/10">
      
      {/* Avatar Circle */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-sm font-bold text-white shadow-inner shadow-black/20 ring-2 ring-slate-900">
        {initials}
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="font-semibold text-white tracking-tight">
          {name || "Traveler"}
        </span>
        
        {email && (
          <span className="text-xs text-slate-400 font-medium">
            {email}
          </span>
        )}

        {joinedDate && (
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              Member since {joinedDate}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}