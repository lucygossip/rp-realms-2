const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");

const {
  registerUser,
  loginUser,
  getMe,
  updateAvatar,
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED ROUTES
router.get("/me", protect, getMe);

router.put(
  "/avatar",
  protect,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;