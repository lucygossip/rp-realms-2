const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "general",
        "tech-help",
        "announcements",
        "off-topic",
      ],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // optional but very useful for forums later
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // for future features (don’t overbuild yet, but safe to include)
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// index for faster feed loading
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);