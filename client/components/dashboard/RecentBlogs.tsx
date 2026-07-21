"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BlogCard from "./BlogCard";

type Blog = {
  id: number;
  title: string;
  content: string;
  fullname: string;
  created_at: string;
};

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        fetchBlogs();
      } else {
        searchBlogs(search);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/blogs");

      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchBlogs = async (query: string) => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/blogs/search?q=${encodeURIComponent(query)}`
      );

      setBlogs(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16">

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <h2 className="text-3xl font-bold text-white">
          Recent Blogs
        </h2>

        <input
          type="text"
          placeholder="🔍 Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-white outline-none transition focus:border-blue-500 md:w-80"
        />

      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
          <p className="text-gray-400 animate-pulse">
            Loading blogs...
          </p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
          <p className="text-gray-400">
            📭 No blogs found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}

    </section>
  );
}