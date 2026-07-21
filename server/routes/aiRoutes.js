const express = require("express");
const router = express.Router();

const {
  generateBlog,
  rewriteBlog,
  summarizeBlog,
  grammarCheck,
  generateSEO,
} = require("../controllers/aiController");

// ================= GENERATE BLOG =================
router.post("/generate", generateBlog);

// ================= REWRITE BLOG =================
router.post("/rewrite", rewriteBlog);

// ================= SUMMARIZE BLOG =================
router.post("/summarize", summarizeBlog);

// ================= GRAMMAR CHECK =================
router.post("/grammar", grammarCheck);

// ================= SEO GENERATOR =================
router.post("/seo", generateSEO);

module.exports = router;