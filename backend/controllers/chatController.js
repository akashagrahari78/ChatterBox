const userChatModel = require("../models/userChatModel.js"); // adjust path if needed

const getUserChat = async (req, res) => {
  const { id } = req.params;
  console.log("getting user chat: ", id);

  try {
    const chat = await userChatModel.findById(id)
      .populate("participants", "-password") 
      .populate("latestMessage");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserChat };
