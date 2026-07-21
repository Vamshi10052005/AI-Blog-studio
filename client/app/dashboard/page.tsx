import QuickActions from "../../components/dashboard/QuickActions";
import RecentBlogs from "../../components/dashboard/RecentBlogs";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-800 px-10 py-6">

        <h1 className="text-3xl font-bold text-blue-500">
          AI Blog Studio
        </h1>

        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
        >
          Home
        </Link>

      </nav>

      <div className="mx-auto max-w-7xl px-10 py-16">

        {/* Welcome */}

        <h2 className="text-5xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mt-3 text-xl text-gray-400">
          Ready to create another amazing blog?
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-5">

          <Link
            href="/create-blog"
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
          >
            ➕ Create Blog
          </Link>

          <Link
            href="//ai-assistant"
            className="rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold hover:bg-purple-700"
          >
            ✨ AI Writer
          </Link>

        </div>

        {/* Dashboard */}

        <RecentBlogs />

        <QuickActions />

      </div>

    </main>
  );
}