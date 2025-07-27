import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { FiPlus, FiLogOut, FiUser, FiMessageSquare, FiUsers } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";
import socket from "../socket"; 

import ChatToggleButton from "./ChatToggleButton";
import UserMessages from "./User";
import UserGroupChat from "./Groups";
import { GetUserIdFromToken } from "../utils/GetUserIdFromToken";

const LeftSidebar = () => {
  const {
    directMessages,
    groupChats,
    setSelectedChat,  // <-- Get setter from context
  } = useContext(ChatContext);

  const [activeChat, setActiveChat] = useState("general");
  const [expandedSection, setExpandedSection] = useState({
    dms: true,
    groups: true,
  });

  const currentUserId = GetUserIdFromToken()

  const setActiveChatHandler = (dm) => {
    setActiveChat(dm.id);

    socket.emit("get-or-create-chat", {
      user1Id: currentUserId,
      user2Id: dm.id,
    })

    socket.once("chat-data", (chat) => {
      console.log("Opened Chat:", chat);
      setSelectedChat(chat); //Update context with the selected chat
    })

    socket.once("chat-error", (error) => {
      console.error("Chat error:", error);
    });
  };

  

  const toggleSection = (section) => {
    setExpandedSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 h-screen bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-sm"
    >
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <FiUser />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </motion.div>
        <div className="flex-1">
          <p className="font-medium">Username</p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-1 rounded-2xl hover:bg-indigo-50 text-gray-500 hover:text-indigo-600"
          onClick={() => console.log("Logout")}
        >
          <FiLogOut />
        </motion.button>
      </div>

      {/* New Chat Button */}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#4F46E5" }}
        whileTap={{ scale: 0.98 }}
        className="mx-4 mt-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center space-x-2 font-medium"
      >
        <FiPlus />
        <span>New Chat</span>
      </motion.button>

      {/* Direct Messages Section */}
      <div className="mt-6 px-4">
        <ChatToggleButton
          icon={FiMessageSquare}
          label="Direct Messages"
          isExpanded={expandedSection.dms}
          onClick={() => toggleSection("dms")}
        />

        <AnimatePresence>
          {expandedSection.dms && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-1 overflow-hidden"
            >
              {directMessages.map((dm) => (
                <UserMessages
                  key={dm.id}
                  message={dm}
                  isActive={activeChat === dm.id}
                  onClick={() => setActiveChatHandler(dm)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Group Chats Section */}
      <div className="mt-4 px-4 pb-4">
        <ChatToggleButton
          icon={FiUsers}
          label="Group Chats"
          isExpanded={expandedSection.groups}
          onClick={() => toggleSection("groups")}
        />
        
        <AnimatePresence>
          {expandedSection.groups && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-1 overflow-hidden"
            >
              {groupChats.map((group) => (
                <UserGroupChat
                  key={group.id}
                  group={group}
                  isActive={activeChat === group.id}
                  onClick={() => setActiveChat(group.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeftSidebar;
