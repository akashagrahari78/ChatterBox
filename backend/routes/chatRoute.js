const express = require("express")

const {getUserChat} = require("../controllers/chatController.js")

const chatRouter = express.Router();

//----------api endPoints------
chatRouter.get("/:id", getUserChat);

module.exports = chatRouter

