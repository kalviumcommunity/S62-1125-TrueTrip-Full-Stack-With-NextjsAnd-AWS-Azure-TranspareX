"use client";


import Image from "next/image";

export default function HomePage() {
  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto bg-gray-50 min-h-screen">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Search Buses
      </h1>

      {/* Search Form */}
      <div className="flex flex-wrap items-center gap-4 bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="From"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <input
          type="text"
          placeholder="To"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          className="border border-gray-300 p-3 rounded-xl w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md transition transform hover:-translate-y-1">
          Search
        </button>
      </div>

      {/* Why TrueTrip */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Why TrueTrip?</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Transparent ticket cancellations, reliable service, and refunds processed clearly.
        </p>
      </div>

    </div>

import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { useState, useEffect } from "react";

interface Trip {
  id: number;
  title: string;
  description: string;
  destination: string;
  price: number;
  startDate: string;
  endDate: string;
  averageRating: number;
  reviewCount: number;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

export default function Home() {
  const { user, login, register, logout, isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar, addNotification } = useUI();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "trips">("trips");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Auth forms
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoadingTrips(true);
      const response = await fetch("/api/trips?limit=6");
      const data = await response.json();
      
      if (data.success) {
        setTrips(data.data.trips);
      }
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      addNotification("Failed to load trips", "error");
    } finally {
      setLoadingTrips(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      addNotification("Login successful!", "success");
      setActiveTab("trips");
    } catch (error) {
      addNotification(error instanceof Error ? error.message : "Login failed", "error");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm);
      addNotification("Registration successful!", "success");
      setActiveTab("trips");
    } catch (error) {
      addNotification(error instanceof Error ? error.message : "Registration failed", "error");
    }
  };

  const handleLogout = () => {
    logout();
    addNotification("Logged out successfully", "info");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">TrueTrip</h1>
          <p className="text-xl mb-8">Transparent Travel Supply-Chain System</p>
          
          {/* Theme Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleTheme}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </header>

        {/* Auth Section */}
        {!isAuthenticated && (
          <section className="max-w-md mx-auto mb-12">
            <div className="flex border-b mb-4">
              <button
                className={`flex-1 py-2 px-4 ${activeTab === "trips" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("trips")}
              >
                Trips
              </button>
              <button
                className={`flex-1 py-2 px-4 ${activeTab === "login" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 ${activeTab === "register" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>

            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border rounded text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border rounded text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Login
                </button>
              </form>
            )}

            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full p-2 border rounded text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full p-2 border rounded text-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-2 border rounded text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border rounded text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border rounded text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Register
                </button>
              </form>
            )}
          </section>
        )}

        {/* User Info */}
        {isAuthenticated && user && (
          <section className="max-w-md mx-auto mb-8 p-6 border rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-2">Welcome, {user.firstName}!</h2>
            <p className="mb-4">Role: <span className="capitalize">{user.role.toLowerCase()}</span></p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </section>
        )}

        {/* Trips Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Trips</h2>
          
          {loadingTrips ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4">Loading trips...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{trip.destination}</p>
                  <p className="mb-4">{trip.description.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${trip.price}</span>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1">{trip.averageRating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-gray-500">({trip.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Status Display */}
        <section className="mt-12 max-w-md mx-auto p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <h3 className="font-semibold">Authentication</h3>
              <p>Status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
              <p>User: {user?.username || "None"}</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <h3 className="font-semibold">UI State</h3>
              <p>Theme: {theme}</p>
              <p>Sidebar: {sidebarOpen ? "Open" : "Closed"}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}