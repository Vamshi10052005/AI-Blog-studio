"use client";

import Link from "next/link";
import api from "@/lib/api";

type Blog = {
  id: number;
  title: string;
  content: string;
  fullname: string;
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

    } catch (error) {

      alert("Failed to delete blog.");

    }
  };

  return (
    <div className="group rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-blue-900/30">

      {/* Title */}

      <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition">
        {blog.title}
      </h2>

      {/* Content */}

      <p className="mt-5 leading-8 text-gray-400 line-clamp-4">
        {blog.content}
      </p>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">

        <div>
          <p className="font-medium text-blue-400">
            ✍️ {blog.fullname}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📅 {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href={`/blog/${blog.id}`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            👁 Read
          </Link>

          <Link
            href={`/edit-blog/${blog.id}`}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
          >
            ✏ Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}