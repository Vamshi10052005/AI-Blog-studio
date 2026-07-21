"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await api.post("/api/blogs", {
        title,
        content,
        user_id: user.id,
      });

      alert("🎉 Blog Published Successfully!");

      router.push("/dashboard");

    } catch (error: any) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex justify-center items-center">
      <div className="w-full max-w-3xl rounded-2xl bg-gray-900 p-10 shadow-xl">

        <h1 className="text-4xl font-bold text-white mb-8">
          ✍️ Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-300 mb-2">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-4 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Blog Content
            </label>

            <textarea
              rows={12}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              placeholder="Write your blog here..."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-4 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-white font-bold"
          >
            Publish Blog
          </button>

        </form>

      </div>
    </main>
  );
}