const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateBlog = async (req, res) => {
  try {
    const { topic, tone, length } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const prompt = `
You are a professional blog writer.

Write a high-quality blog on the topic:

"${topic}"

Requirements:
- Tone: ${tone || "Professional"}
- Length: ${length || "Medium"}
- Include an engaging title.
- Write an introduction.
- Use clear headings.
- Include bullet points where appropriate.
- End with a conclusion.
- Return only the blog content.
`;

    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      blog: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI generation failed.",
    });
  }
};
const rewriteBlog = async (req, res) => {
  try {
    const { content, style } = req.body;

    const prompt = `
Rewrite the following blog in a ${style} style.

Blog:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      blog: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Rewrite failed.",
    });
  }
};
const summarizeBlog = async (req, res) => {
  try {
    const { content } = req.body;

    const prompt = `
Summarize the following blog into a concise, easy-to-read summary.

Blog:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      summary: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Summary generation failed.",
    });
  }
};

const grammarCheck = async (req, res) => {
  try {
    const { content } = req.body;

    const prompt = `
Correct all grammar, spelling, punctuation, and sentence structure mistakes in the following text.

Do not change the meaning.

Text:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      corrected: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Grammar check failed.",
    });
  }
};

const generateSEO = async (req, res) => {
  try {
    const { content } = req.body;

    const prompt = `
You are an SEO expert.

Read the following blog and generate:

1. SEO Title
2. Meta Description (max 160 characters)
3. 5 Focus Keywords

Return ONLY valid JSON in this format:

{
  "title": "...",
  "description": "...",
  "keywords": ["...", "...", "..."]
}

Blog:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text.replace(/```json|```/g, "").trim();

    res.json(JSON.parse(text));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "SEO generation failed.",
    });
  }
};
module.exports = {
  generateBlog,
  rewriteBlog,
  summarizeBlog,
  grammarCheck,
   generateSEO,
};