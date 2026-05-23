const Post = require("../models/Post.model");

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      tags: req.body.tags || [],
      author: req.user._id, // IMPORTANT (JWT middleware)
    });

    res.status(201).json(post);
    console.log("CREATE POST HIT:", req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      // join comments collection
      {
        $lookup: {
          from: "comments", // MUST match MongoDB collection name
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },

      // add computed field
      {
        $addFields: {
          replyCount: { $size: "$comments" },
        },
      },

      // remove heavy comment data (important for performance)
      {
        $project: {
          comments: 0,
        },
      },

      // sort newest first
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    const updated = await post.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isAuthor =
      post.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({
      category: req.params.category,
    }).populate("author", "username");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCategory,
};