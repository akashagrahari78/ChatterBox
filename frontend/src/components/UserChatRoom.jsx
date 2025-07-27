import { motion, AnimatePresence } from "framer-motion";
import { useContext, useRef, useState,useEffect } from "react";
import { FiPaperclip, FiSmile, FiMoreVertical, FiSend, FiX } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";
import socket from "../socket";
import { GetUserIdFromToken } from "../utils/GetUserIdFromToken";

const UserChatRoom = ({ activeChat }) => {
  const { messages, sendMessage,setChatMessages, selectedChat } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // const handleSend = () => {
  //   if (message.trim() || attachment) {
  //     sendMessage({
  //       text: message,
  //       attachment,
  //       isMe: true,
  //       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     });
  //     setMessage("");
  //     setAttachment(null);
  //   }
  // };

  const handleSend = () => {
  if (!message.trim() && !attachment) return;
  const newMsg = {
    chatId: selectedChat._id,
    senderId: GetUserIdFromToken(),
    text: message.trim(),
    attachment: null, // We'll handle files later
  };

  socket.emit("send-message", newMsg);
  setMessage("");
  setAttachment(null);
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    fileInputRef.current.value = "";
  };

  useEffect(() => {
  socket.on("new-message", (msg) => {
     console.log("Message received:", msg);
    setChatMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("new-message");
  };
}, []);

  return (
    <div className="flex-1 flex flex-col bg-white" ref={chatContainerRef}>
      {/* Chat Header */}
      <div className="border-b w-full bg-white sticky top-0 z-10 border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">Alex Johnson</h2>
        </div>
        <button className="p-2 rounded-full hover:bg-indigo-50 text-indigo-600">
          <FiMoreVertical />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ 
        marginTop: '73px', 
        marginBottom: attachment ? '136px' : '80px' 
      }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  msg.isMe
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                {msg.attachment && (
                  <div className="mb-2 rounded-md overflow-hidden">
                    <img 
                      src={URL.createObjectURL(msg.attachment)} 
                      alt="Attachment" 
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                )}
                <p>{msg.text}</p>
                <div
                  className={`text-xs mt-1 flex items-center ${
                    msg.isMe ? "justify-end text-indigo-200" : "text-gray-500"
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.isMe && (
                    <span className="ml-1">
                      {msg.read ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Attachment Preview */}
      {attachment && (
        <div className="sticky bottom-20 bg-white p-2 border-t border-gray-200 flex items-center">
          <div className="flex items-center bg-indigo-50 rounded-lg p-2 ml-4 max-w-[calc(100%-32px)]">
            <span className="truncate">{attachment.name}</span>
            <button 
              onClick={removeAttachment}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Message Input -  */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="mx-auto max-w-3xl"> {/* Constrains width */}
          <div className="flex items-center bg-gray-50 rounded-full px-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="p-2 text-gray-500 hover:text-indigo-600 cursor-pointer"
            >
              <FiPaperclip />
            </label>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent py-3 px-2 focus:outline-none"
            />
            
            <button className="p-2 text-gray-500 hover:text-indigo-600">
              <FiSmile />
            </button>
            
            <button 
              onClick={handleSend}
              disabled={!message.trim() && !attachment}
              className={`p-2 rounded-full ml-2 ${
                message.trim() || attachment 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatRoom;