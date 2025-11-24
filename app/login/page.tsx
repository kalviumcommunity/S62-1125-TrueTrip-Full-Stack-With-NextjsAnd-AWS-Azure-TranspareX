"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();

  function handleLogin() {
    // Mock token generation (in real apps, get it from backend)
    const mockToken = "mock.jwt.token.here";
    Cookies.set("token", mockToken, { expires: 1 }); // Expires in 1 day
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <p className="text-gray-600 mb-6">Click the button to simulate login</p>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </main>
  );
}