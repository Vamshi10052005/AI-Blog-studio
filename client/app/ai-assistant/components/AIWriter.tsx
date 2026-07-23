"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AIWriter() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [category, setCategory] = useState("General");

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
      alert(err?.response?.data?.message || "Generation failed.");
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
        category,
        user_id: user.id,
      });

      alert("🎉 Blog Published!");

      router.push("/dashboard");

    } catch (err: any) {
      alert(err?.response?.data?.message || "Publish failed.");
    }
  };

  return (
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
        className="bg-purple-600 px-8 py-3 rounded-lg font-bold"
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>

      {content && (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-gray-800 p-4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg bg-gray-800 p-4"
          >
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

          <textarea
            rows={18}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg bg-gray-800 p-4"
          />

          <button
            onClick={publishBlog}
            className="bg-blue-600 px-8 py-3 rounded-lg font-bold"
          >
            Publish Blog
          </button>
        </>
      )}

    </div>
  );
}