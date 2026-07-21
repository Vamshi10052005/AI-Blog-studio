"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/api/blogs/${id}`);

      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      console.error(error);
      alert("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/api/blogs/${id}`, {
        title,
        content,
      });

      alert("✅ Blog updated successfully!");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/dashboard"
          className="text-blue-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-8 text-4xl font-bold">
          Edit Blog
        </h1>

        <div className="mt-8 space-y-6">

          <div>
            <label className="mb-2 block text-lg font-medium">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-medium">
              Blog Content
            </label>

            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Blog"}
          </button>

        </div>
      </div>
    </div>
  );
}