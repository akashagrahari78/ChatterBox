import { motion, AnimatePresence } from "framer-motion";
import { FiPaperclip, FiSmile, FiMoreVertical, FiSend } from "react-icons/fi";

const MainChatArea = ({ activeChat }) => {
   
    const messages = [
      {
        id: 1,
        sender: "Alex Johnson",
        text: "Hey team! How's the project going?",
        time: "10:30 AM",
        isMe: false,
        read: true,
      },
      {
        id: 2,
        sender: "You",
        text: "Going well! Just finished the UI components.",
        time: "10:32 AM",
        isMe: true,
        read: true,
      },
    ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b h-[73px] border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">Alex Johnson</h2>
         </div>
        <button className="p-2 rounded-full hover:bg-indigo-50 text-indigo-600">
          <FiMoreVertical />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                {/* {!msg.isMe && (
                  <p className="font-medium text-indigo-600 mb-1">{msg.sender}</p>
                )} */}
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

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center bg-gray-50 rounded-full px-4">
          <button className="p-2 text-gray-500 hover:text-indigo-600">
            <FiPaperclip />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-3 px-2 focus:outline-none"
          />
          <button className="p-2 text-gray-500 hover:text-indigo-600">
            <FiSmile />
          </button>
          <button className="p-2 bg-indigo-600 text-white rounded-full ml-2">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChatArea;