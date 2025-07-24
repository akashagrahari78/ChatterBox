const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "offline",
    },

    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat", 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
