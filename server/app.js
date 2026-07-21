const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const aiRoutes = require("./routes/aiRoutes");

const pool = require("./config/database");

console.log("App.js is starting...");

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("🚀 AI Blog Studio Backend is Running!");
});

// ================= DATABASE =================

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database Connection Error:", err);
  } else {
    console.log("✅ Database Connected!");
    console.log(result.rows[0]);
  }
});

// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});