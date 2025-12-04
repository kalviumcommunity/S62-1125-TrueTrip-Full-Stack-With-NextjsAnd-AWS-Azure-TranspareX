"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Signup failed");
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-white">
      {/* LEFT SIDE - VISUALS (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-slate-900 relative overflow-hidden p-12 border-r border-white/5">
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-rose-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[100px]" />
        
        <div className="relative z-10 max-w-lg">
           <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm text-rose-300">
              {/* Icon: Sparkles */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Join 10,000+ Smart Travelers</span>
           </div>
           <h2 className="text-5xl font-bold mb-6 leading-tight">Your money belongs <span className="text-rose-500">in your pocket.</span></h2>
           <p className="text-xl text-slate-400 mb-8 leading-relaxed">
             Stop losing money to confusing cancellation policies. We automatically track, calculate, and recover your bus refunds.
           </p>
           
           <div className="flex gap-4 items-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
               <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-rose-500 to-purple-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                   {/* Icon: Shield Check */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
               </div>
               <div>
                   <p className="font-bold text-lg">Total Refunded</p>
                   <p className="text-rose-400 font-mono text-sm tracking-wider">$1,240,500+</p>
               </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                <p className="text-slate-400 mt-2">Enter your details to start tracking refunds.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all" 
                    />
                </div>
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
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Sign Up Free"} 
                  {!loading && (
                      // Icon: Arrow Right
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  )}
                </button>
            </form>

            <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-rose-400 hover:text-rose-300 font-semibold hover:underline">Log in</Link>
            </p>
        </div>
      </div>
    </div>
  );
}