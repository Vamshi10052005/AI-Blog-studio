const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ================= CREATE BLOG =================
router.post("/", createBlog);

// ================= GET ALL BLOGS =================
router.get("/", getBlogs);

// ================= GET SINGLE BLOG =================
router.get("/:id", getBlogById);

// ================= UPDATE BLOG =================
router.put("/:id", updateBlog);

// ================= DELETE BLOG =================
router.delete("/:id", deleteBlog);

module.exports = router;