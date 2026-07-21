"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
  fullname: string;
  created_at: string;
};

export default function ReadBlogPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/api/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/dashboard"
          className="text-blue-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-5xl font-bold mt-8">
          {blog.title}
        </h1>

        <div className="mt-4 flex gap-6 text-gray-400">
          <span>✍️ {blog.fullname}</span>
          <span>
            📅 {new Date(blog.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-10 text-lg leading-9 whitespace-pre-wrap text-gray-300">
          {blog.content}
        </div>

      </div>
    </div>
  );
}