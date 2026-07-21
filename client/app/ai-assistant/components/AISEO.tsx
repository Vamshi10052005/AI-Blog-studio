"use client";

import { useState } from "react";
import api from "@/lib/api";

interface SEOResult {
  title: string;
  description: string;
  keywords: string[];
}

export default function AISEO() {
  const [content, setContent] = useState("");
  const [seo, setSEO] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSEO = async () => {
    if (!content.trim()) {
      alert("Please enter blog content.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/ai/seo", {
        content,
      });

      setSEO(res.data);
    } catch (err: any) {
      alert(err?.response?.data?.message || "SEO generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      <textarea
        rows={14}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your blog here..."
        className="w-full rounded-lg bg-gray-800 p-4"
      />

      <button
        onClick={generateSEO}
        className="bg-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-700"
      >
        {loading ? "Generating..." : "Generate SEO"}
      </button>

      {seo && (
        <div className="space-y-6 mt-8">

          <div>
            <h2 className="text-xl font-bold mb-2">
              SEO Title
            </h2>

            <input
              value={seo.title}
              readOnly
              className="w-full rounded-lg bg-gray-800 p-4"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">
              Meta Description
            </h2>

            <textarea
              rows={4}
              value={seo.description}
              readOnly
              className="w-full rounded-lg bg-gray-800 p-4"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">
              Focus Keywords
            </h2>

            <div className="flex flex-wrap gap-3">
              {seo.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-purple-600 px-4 py-2 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}