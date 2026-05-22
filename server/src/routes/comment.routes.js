const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createComment,
  getCommentsForPost,
  deleteComment,
} = require("../controllers/comment.controller");

// create comment on post
router.post("/:postId", protect, createComment);

// get comments for post
router.get("/:postId", getCommentsForPost);

// delete comment
router.delete("/:id", protect, deleteComment);

module.exports = router;