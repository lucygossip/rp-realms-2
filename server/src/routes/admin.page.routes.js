const express = require("express");
const router = express.Router();

const Page = require("../models/Page.model");
const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

// PUT /api/admin/pages/:slug
router.put("/:slug", protect, adminOnly, async (req, res) => {
  try {
    const { title, content } = req.body;

    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        content,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;