"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function AIRewrite() {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("Professional");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);

  const rewriteBlog = async () => {
    if (!content.trim()) {
      alert("Please enter blog content.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/ai/rewrite", {
        content,
        style,
      });

      setRewritten(res.data.blog);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Rewrite failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      <textarea
        rows={14}
        placeholder="Paste your blog here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-lg bg-gray-800 p-4"
      />

      <div className="flex gap-4">

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="rounded-lg bg-gray-800 p-4"
        >
          <option>Professional</option>
          <option>Casual</option>
          <option>Technical</option>
          <option>Creative</option>
        </select>

        <button
          onClick={rewriteBlog}
          className="bg-purple-600 px-8 rounded-lg font-bold"
        >
          {loading ? "Rewriting..." : "Rewrite"}
        </button>

      </div>

      {rewritten && (
        <>
          <h2 className="text-2xl font-bold">
            Rewritten Blog
          </h2>

          <textarea
            rows={14}
            value={rewritten}
            onChange={(e) => setRewritten(e.target.value)}
            className="w-full rounded-lg bg-gray-800 p-4"
          />
        </>
      )}

    </div>
  );
}