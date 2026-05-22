const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCategory,
} = require("../controllers/post.controller");

// CREATE
router.post("/", protect, createPost);

// READ (feed)
router.get("/", getPosts);

// READ single post
router.get("/:id", getPostById);

// Get post by category
router.get("/category/:category", getPostsByCategory);

// UPDATE
router.put("/:id", protect, updatePost);

// DELETE
router.delete("/:id", protect, deletePost);

module.exports = router;