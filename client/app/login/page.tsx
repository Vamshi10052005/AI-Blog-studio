"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user (optional)
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful!");

      router.push("/dashboard");

    } catch (error: any) {
      alert(
        error?.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-10 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Login to your AI Blog Studio account
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}