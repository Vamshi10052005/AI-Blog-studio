"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BlogCard from "./BlogCard";

type Blog = {
  id: number;
  title: string;
  content: string;
  fullname: string;
  category: string;
  created_at: string;
};

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    if (search.trim() !== "") {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((blog) => blog.category === category);
    }

    setFilteredBlogs(result);
  }, [search, category, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/blogs");

      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16">

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <h2 className="text-3xl font-bold text-white">
          Recent Blogs
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">

          <input
            type="text"
            placeholder="🔍 Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-white outline-none focus:border-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-white"
          >
            <option>All</option>
            <option>General</option>
            <option>Technology</option>
            <option>Programming</option>
            <option>Artificial Intelligence</option>
            <option>Web Development</option>
            <option>Cloud Computing</option>
            <option>Data Science</option>
            <option>Cybersecurity</option>
            <option>Career</option>
            <option>Business</option>
            <option>Productivity</option>
          </select>

        </div>

      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
          <p className="animate-pulse text-gray-400">
            Loading blogs...
          </p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
          <p className="text-gray-400">
            📭 No blogs found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

    </section>
  );
}