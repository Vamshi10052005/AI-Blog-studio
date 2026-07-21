"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function AIGrammar() {
  const [content, setContent] = useState("");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);

  const checkGrammar = async () => {
    if (!content.trim()) {
      alert("Please enter some text.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/ai/grammar", {
        content,
      });

      setCorrected(res.data.corrected);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Grammar check failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          ✅ AI Grammar Checker
        </h2>

        <textarea
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your text..."
          className="w-full rounded-lg bg-gray-800 p-4"
        />

        <button
          onClick={checkGrammar}
          className="mt-5 bg-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          {loading ? "Checking..." : "Check Grammar"}
        </button>

        {corrected && (
          <>
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Corrected Text
            </h2>

            <textarea
              rows={14}
              value={corrected}
              readOnly
              className="w-full rounded-lg bg-gray-800 p-4"
            />
          </>
        )}

      </div>
    </div>
  );
}