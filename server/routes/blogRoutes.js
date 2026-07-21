const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getDashboardStats,
  searchBlogs,
} = require("../controllers/blogController");

// Dashboard
router.get("/stats/dashboard", getDashboardStats);

// Search (must be BEFORE /:id)
router.get("/search", searchBlogs);

// Create
router.post("/", createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Update
router.put("/:id", updateBlog);

// Delete
router.delete("/:id", deleteBlog);

module.exports = router;
