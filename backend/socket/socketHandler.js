// const userChatModel = require("../models/userChatModel.js")
// const userMessageModel = require("../models/userMessageModel.js")

const userChatModel = require('../models/userChatModel');
const userModel = require("../models/UserModel")
const messageModel = require("../models/userMessageModel.js")

module.exports = async (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('get-or-create-chat', async ({ user1Id, user2Id }) => {
    if (!user1Id || !user2Id) {
      return socket.emit('chat-error', 'Both user IDs are required.');
    }
    try {
      let chat = await userChatModel.findOne({
        isGroup: false,
        participants: { $all: [user1Id, user2Id] }
      }).populate('participants');

      if (!chat) {
        chat = await userChatModel.create({
          isGroup: false,
          participants: [user1Id, user2Id]
        });

        await userModel.findByIdAndUpdate(user1Id, { $push: { chats: chat._id } });
        await userModel.findByIdAndUpdate(user2Id, { $push: { chats: chat._id } });
      }

      socket.emit('chat-data', chat);
    } catch (err) {
      socket.emit('chat-error', err.message);
    }
  });

 
 socket.on('get-chat-messages', async ({ chatId }) => {
  if (!chatId) {
    return socket.emit('message-error', 'Chat ID is required.');
  }

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 }); // oldest first

    socket.emit('chat-messages', { chatId, messages });
  } catch (err) {
    socket.emit('message-error', err.message);
  }
});

  // Other socket events like send-message, typing, etc. can go here
};
