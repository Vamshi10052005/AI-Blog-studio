"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function AISummarizer() {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/ai/summarize", {
        content,
      });

      setSummary(res.data.summary);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Summary failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          📝 AI Summarizer
        </h2>

        <textarea
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your blog or article here..."
          className="w-full rounded-lg bg-gray-800 p-4"
        />

        <button
          onClick={summarize}
          className="mt-5 bg-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-700"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>

        {summary && (
          <>
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Summary
            </h2>

            <textarea
              rows={8}
              value={summary}
              readOnly
              className="w-full rounded-lg bg-gray-800 p-4"
            />
          </>
        )}

      </div>
    </div>
  );
}