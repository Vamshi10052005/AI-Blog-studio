"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AIWriterPage() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const generateBlog = async () => {
    if (!topic.trim()) {
      alert("Enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/ai/generate", {
        topic,
        tone,
        length,
      });

      const generated = res.data.blog;

      const lines = generated.split("\n");

      setTitle(lines[0].replace(/^#+\s*/, "").trim());
      setContent(generated);

    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to generate blog.");
    } finally {
      setLoading(false);
    }
  };

  const publishBlog = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await api.post("/api/blogs", {
        title,
        content,
        user_id: user.id,
      });

      alert("🎉 Blog Published!");

      router.push("/dashboard");

    } catch (err: any) {
      alert(err?.response?.data?.message || "Publish failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold mb-8">
          ✨ AI Blog Writer
        </h1>

        <div className="space-y-5">

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter blog topic..."
            className="w-full rounded-lg bg-gray-800 p-4"
          />

          <div className="flex gap-4">

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="rounded-lg bg-gray-800 p-4"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Technical</option>
            </select>

            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="rounded-lg bg-gray-800 p-4"
            >
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>

          </div>

          <button
            onClick={generateBlog}
            className="rounded-lg bg-purple-600 px-8 py-3 font-bold"
          >
            {loading ? "Generating..." : "✨ Generate Blog"}
          </button>

          {content && (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-gray-800 p-4 mt-8"
              />

              <textarea
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-lg bg-gray-800 p-4 mt-4"
              />

              <button
                onClick={publishBlog}
                className="rounded-lg bg-blue-600 px-8 py-3 font-bold mt-5"
              >
                🚀 Publish Blog
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
}