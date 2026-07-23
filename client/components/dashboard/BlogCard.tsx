"use client";

import Link from "next/link";
import api from "@/lib/api";

type Blog = {
  id: number;
  title: string;
  content: string;
  fullname: string;
  category: string;
  created_at: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/blogs/${blog.id}`);

      alert("✅ Blog deleted successfully!");

      window.location.reload();
    } catch {
      alert("Failed to delete blog.");
    }
  };

  const readingTime = Math.max(
    1,
    Math.ceil(blog.content.split(" ").length / 200)
  );

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20">

      {/* Top Badges */}
      <div className="mb-5 flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs font-semibold text-purple-300">
          🤖 AI Blog
        </span>

        <span className="rounded-full bg-orange-600/20 px-3 py-1 text-xs font-semibold text-orange-300">
          🏷 {blog.category}
        </span>

        <span className="rounded-full bg-green-600/20 px-3 py-1 text-xs font-semibold text-green-300">
          ⭐ Featured
        </span>

        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
          📖 {readingTime} min read
        </span>

      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold leading-tight text-white transition group-hover:text-blue-400">
        {blog.title}
      </h2>

      {/* Description */}
      <p className="mt-5 line-clamp-4 leading-8 text-gray-400">
        {blog.content}
      </p>

      {/* Divider */}
      <div className="my-7 border-t border-gray-800" />

      {/* Footer */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="font-semibold text-blue-400">
            ✍️ {blog.fullname}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📅{" "}
            {new Date(blog.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Link
            href={`/blog/${blog.id}`}
            className="rounded-lg bg-green-600 px-4 py-2 font-semibold transition hover:scale-105 hover:bg-green-700"
          >
            👁 Read
          </Link>

          <Link
            href={`/edit-blog/${blog.id}`}
            className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:scale-105 hover:bg-yellow-400"
          >
            ✏ Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold transition hover:scale-105 hover:bg-red-700"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}