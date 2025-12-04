"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Invalid email or password");
        return;
      }

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-white">
      {/* LEFT SIDE - VISUALS */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-slate-900 relative overflow-hidden p-12 border-r border-white/5">
         <div className="absolute top-[-20%] left-[-20%] h-[500px] w-[500px] bg-rose-600/10 rounded-full blur-[120px]"></div>
         <div className="relative z-10 max-w-lg">
            <h2 className="text-5xl font-bold mb-6 leading-tight">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">Back.</span></h2>
            <p className="text-xl text-slate-400 mb-8">
              Your refunds have been updated. Log in to see which claims have been approved.
            </p>
         </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-6 text-rose-500">
                    {/* Icon: Lock Keyhole */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Log in to TrueTrip</h1>
                <p className="text-slate-400 mt-2">Enter your email below to login to your account.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all" 
                    />
                </div>

                {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}

                <button 
                   type="submit"
                   disabled={loading}
                   className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl transition-all hover:bg-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {loading ? "Logging in..." : "Log In"}
                    {!loading && (
                        // Icon: Arrow Right
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-rose-400 hover:text-rose-300 font-semibold hover:underline">Sign up</Link>
            </p>
        </div>
      </div>
    </div>
  );
}