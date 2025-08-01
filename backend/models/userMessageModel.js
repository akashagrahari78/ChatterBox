const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    chat: {
      // refer to the group or individual where the message was sent
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    seenBy: [ //it is received by how many users
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timeStamps: true }
);

mongoose.exports = mongoose.model("Message", messageSchema);
