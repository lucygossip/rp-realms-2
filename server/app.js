const express = require("express");
const cors = require("cors");

const app = express();

//app.use(cors());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Routes

const authRoutes = require("./src/routes/auth.routes");
const postRoutes = require("./src/routes/post.routes");
const commentRoutes = require("./src/routes/comment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Health Check

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 Handler

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// Global Error Handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;