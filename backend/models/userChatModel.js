const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
}, {timestamps: true});

mongoose.exports = mongoose.model("Chat", chatSchema)
