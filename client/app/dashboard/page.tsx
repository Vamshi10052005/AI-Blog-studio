"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

import RecentBlogs from "../../components/dashboard/RecentBlogs";
import QuickActions from "../../components/dashboard/QuickActions";

type DashboardStats = {
  totalBlogs: number;
  aiBlogs: number;
  totalViews: number;
  draftBlogs: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    aiBlogs: 0,
    totalViews: 0,
    draftBlogs: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get("/api/blogs/stats/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-800 px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-500">
          AI Blog Studio
        </h1>

        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold transition hover:bg-blue-700"
        >
          Home
        </Link>
      </nav>

      <div className="mx-auto max-w-7xl px-8 py-12">

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold">
            👋 Welcome Back
          </h2>

          <p className="mt-3 text-lg text-gray-400">
            Create blogs faster using AI and manage everything from one dashboard.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400">📄 Total Blogs</p>

            <h2 className="mt-4 text-4xl font-bold text-blue-400">
              {stats.totalBlogs}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400">🤖 AI Generated</p>

            <h2 className="mt-4 text-4xl font-bold text-purple-400">
              {stats.aiBlogs}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400">👁 Total Views</p>

            <h2 className="mt-4 text-4xl font-bold text-green-400">
              {stats.totalViews}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400">📝 Draft Blogs</p>

            <h2 className="mt-4 text-4xl font-bold text-orange-400">
              {stats.draftBlogs}
            </h2>
          </div>

        </div>

        {/* Main Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          {/* Left */}
          <div className="lg:col-span-2">
            <RecentBlogs />
          </div>

          {/* Right */}
          <div className="space-y-8">

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

              <h2 className="mb-5 text-2xl font-bold">
                ⚡ Quick Actions
              </h2>

              <div className="flex flex-col gap-4">

                <Link
                  href="/create-blog"
                  className="rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold transition hover:bg-blue-700"
                >
                  ➕ Create Blog
                </Link>

                <Link
                  href="/ai-assistant"
                  className="rounded-xl bg-purple-600 px-6 py-4 text-center font-semibold transition hover:bg-purple-700"
                >
                  ✨ AI Assistant
                </Link>

              </div>

            </div>

            <QuickActions />

          </div>

        </div>

      </div>

    </main>
  );
}