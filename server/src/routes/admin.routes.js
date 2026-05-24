const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const {
  getAdminStats,
  getAllUsers,
  getAllPosts,
  deletePostAdmin,
  banUser,
  suspendUser,
  setUserActive,
  updateUserRole,
} = require("../controllers/admin.controller");

// Apply middleware to ALL admin routes
router.use(protect);
router.use(adminOnly);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/posts", getAllPosts);

router.delete("/posts/:id", deletePostAdmin);
router.patch("/users/:id/ban", banUser);
router.patch("/users/:id/suspend", suspendUser);
router.patch("/users/:id/activate", setUserActive);
router.patch("/users/:id/role", protect, adminOnly, updateUserRole);

module.exports = router;