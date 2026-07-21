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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Recent Blogs
        </h2>

        <p className="text-gray-400">Loading blogs...</p>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Recent Blogs
      </h2>

      {blogs.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <p className="text-gray-400">
            No blogs published yet.
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