"use client";
import AISEO from "./components/AISEO";
import { useState } from "react";
import AIWriter from "./components/AIWriter";
import AIRewrite from "./components/AIRewrite";
import AISummarizer from "./components/AISummarizer";
import AIGrammar from "./components/AIGrammar";

export default function AIAssistantPage() {
  const [tab, setTab] = useState("writer");

  const tabs = [
    { id: "writer", label: "✍️ Generate" },
    { id: "rewrite", label: "🔄 Rewrite" },
    { id: "summary", label: "📝 Summary" },
    { id: "grammar", label: "✅ Grammar" },
    { id: "seo", label: "📈 SEO" },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          ✨ AI Assistant
        </h1>

        <div className="flex gap-3 mb-8 flex-wrap">

          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                tab === item.id
                  ? "bg-purple-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        {tab === "writer" && <AIWriter />}
        {tab === "rewrite" && <AIRewrite />}
        {tab === "summary" && <AISummarizer />}
        {tab === "grammar" && <AIGrammar />}
        {tab === "seo" && <AISEO />}

      </div>
    </main>
  );
}