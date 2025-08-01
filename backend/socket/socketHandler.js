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

//  -------------for getting chat messages---------------------
 socket.on('get-chat-messages', async ({ chatId }) => {
  if (!chatId) {
    return socket.emit('message-error', 'Chat ID is required.');
  }

  try {
    const messages = await messageModel.find({ chat: chatId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 }); // oldest first

    socket.emit('chat-messages', { chatId, messages });
  } catch (err) {
    socket.emit('message-error', err.message);
  }
})


//------------------------------For sending messages-------------------
socket.on('send-message', async ({ chatId, senderId, text, attachment }) => {
  if (!chatId || !senderId || (!text && !attachment)) {
    return socket.emit('message-error', 'Missing chatId, senderId or message content');
  }

  try {
    const newMessage = new messageModel({
      chat: chatId,
      sender: senderId,
      content: text,
      attachment: attachment || null,
    });

    await newMessage.save();

    const populatedMessage = await newMessage.populate('sender', 'name email');

    // Send to sender
    socket.emit('new-message', populatedMessage);

    // Send to all others in the chat room
    socket.to(chatId).emit('new-message', populatedMessage);

  } catch (err) {
    socket.emit('message-error', err.message);
  }
});

socket.on("join-chat", (chatId) => {
  socket.join(chatId);
});



  // Other socket events like send-message, typing, etc. can go here
};
