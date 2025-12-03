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

      // success -> go to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-sm bg-white/90 border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Create your account</h1>

        <form onSubmit={handleSignup} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            {loading ? "Creating..." : "Sign Up →"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
