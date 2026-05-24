const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },

    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Character",
    },

    race: {
      type: String,
      default: "",
    },

    class: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    traits: {
      type: [String],
      default: [],
    },

    backstory: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "retired", "deceased"],
      default: "active",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);