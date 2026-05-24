const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://rp-realms-2-client.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(o => o === origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true
}));

app.use(express.json());

// Routes

const authRoutes = require("./src/routes/auth.routes");
const postRoutes = require("./src/routes/post.routes");
const commentRoutes = require("./src/routes/comment.routes");
const adminRoutes = require("./src/routes/admin.routes");



app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

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