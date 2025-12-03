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
      console.log("Login response:", res.status, data);

      if (!res.ok) {
        setError(data?.error || "Invalid email or password");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-sm bg-white/90 border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Welcome back</h1>

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-rose-500 py-2.5 text-white font-medium hover:bg-rose-600 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-slate-600">
          New here?{" "}
          <Link href="/signup" className="text-pink-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
