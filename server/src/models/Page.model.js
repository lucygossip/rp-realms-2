const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  content: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 IMPORTANT FIX
module.exports =
  mongoose.models.Page || mongoose.model("Page", PageSchema);