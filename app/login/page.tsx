"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Later we will use a real backend endpoint
    Cookies.set("token", "mock.jwt.token");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <form className="flex flex-col gap-2 w-80">
        <input type="email" placeholder="Email" className="border p-2"/>
        <input type="password" placeholder="Password" className="border p-2"/>
        <button className="bg-blue-500 text-white p-2 mt-2">Login</button>
      </form>
      <p className="mt-2">
        Don’t have an account? <a href="/signup" className="text-blue-500">Signup</a>
      </p>
    </div>
  );
}
