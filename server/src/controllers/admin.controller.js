const User = require("../models/User.model");
const Post = require("../models/Post.model");

const getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const posts = await Post.countDocuments();

    const bannedUsers = await User.countDocuments({ banned: true });

    res.json({
      users,
      posts,
      bannedUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deletePostAdmin = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "banned") {
      return res.status(400).json({ message: "User already banned" });
    }

    user.status = "banned";
    await user.save();

    res.json({
      message: "User banned successfully",
      user: {
        id: user._id,
        username: user.username,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const suspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "suspended") {
      return res.status(400).json({ message: "User already suspended" });
    }

    user.status = "suspended";
    await user.save();

    res.json({
      message: "User suspended successfully",
      user: {
        id: user._id,
        username: user.username,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const setUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "active") {
      return res.status(400).json({ message: "User already active" });
    }

    user.status = "active";
    await user.save();

    res.json({
      message: "User reactivated successfully",
      user: {
        id: user._id,
        username: user.username,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["user", "moderator", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // optional safety: prevent demoting last admin
    if (user.role === "admin" && role !== "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot demote the last admin",
        });
      }
    }

    user.role = role;
    await user.save();

    res.json({
      message: "Role updated successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  getAllPosts,
  deletePostAdmin,
  banUser,
  suspendUser,
  setUserActive,
  updateUserRole,
};