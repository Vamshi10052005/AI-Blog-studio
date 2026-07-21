const pool = require("../config/database");

// ================= CREATE BLOG =================

const createBlog = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newBlog = await pool.query(
      `INSERT INTO blogs(title, content, user_id)
       VALUES($1, $2, $3)
       RETURNING *`,
      [title, content, user_id]
    );

    res.status(201).json({
      message: "Blog Created Successfully",
      blog: newBlog.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET ALL BLOGS =================

const getBlogs = async (req, res) => {
  try {
    const blogs = await pool.query(
      `SELECT
        blogs.*,
        users.fullname
      FROM blogs
      JOIN users
      ON blogs.user_id = users.id
      ORDER BY blogs.created_at DESC`
    );

    res.json(blogs.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET SINGLE BLOG =================

const getBlogById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        blogs.*,
        users.fullname
      FROM blogs
      JOIN users
      ON blogs.user_id = users.id
      WHERE blogs.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ================= UPDATE BLOG =================

const updateBlog = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlog = await pool.query(
      `UPDATE blogs
      SET title = $1,
          content = $2
      WHERE id = $3
      RETURNING *`,
      [title, content, id]
    );

    res.json({
      message: "Blog Updated Successfully",
      blog: updatedBlog.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ================= DELETE BLOG =================

const deleteBlog = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM blogs WHERE id = $1",
      [id]
    );

    res.json({
      message: "Blog Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};