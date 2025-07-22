import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FiMessageSquare, 
  FiUsers, 
  FiPlus, 
  FiLogOut, 
  FiChevronDown,
  FiUser,
  FiHash
} from "react-icons/fi";

const LeftSidebar = () => {
  const [activeChat, setActiveChat] = useState("general");
  const [expandedSection, setExpandedSection] = useState({
    dms: true,
    groups: true,
  });

  // Mock data
  const directMessages = [
    { id: "1", name: "Alex Johnson", lastMessage: "Hey, how are you?", unread: 2 },
    { id: "2", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
  ];

  const groupChats = [
    { id: "general", name: "General", members: 12, unread: 5 },
    { id: "random", name: "Random", members: 8, unread: 0 },
  ];

  const toggleSection = (section) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
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
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="relative"
        >
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
        whileHover={{ scale: 1.02, backgroundColor: "#4F46E5" }} // indigo-600
        whileTap={{ scale: 0.98 }}
        className="mx-4 mt-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center space-x-2 font-medium"
      >
        <FiPlus />
        <span>New Chat</span>
      </motion.button>

      {/* Direct Messages Section */}
      <div className="mt-6 px-4">

        {/* -----------------chat toogle button---------------------------- */}
        <button
          onClick={() => toggleSection("dms")}
          className="w-full flex items-center justify-between text-gray-600 hover:text-indigo-600"
        >
          <div className="flex items-center space-x-2">
            <FiMessageSquare />
            <span>Direct Messages</span>
          </div>
          <motion.div
            animate={{ rotate: expandedSection.dms ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown />
          </motion.div>
        </button>

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
                <motion.div
                  key={dm.id}
                  whileHover={{ backgroundColor: "#EEF2FF" }} // indigo-50
                  onClick={() => setActiveChat(dm.id)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    activeChat === dm.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
                  }`}   
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 mr-3 flex items-center justify-center text-indigo-600">
                    {dm.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{dm.name}</p>
                    <p className="text-xs text-gray-500 truncate">{dm.lastMessage}</p>
                  </div>
                  {dm.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {dm.unread}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Group Chats Section */}
      <div className="mt-4 px-4 pb-4">
        <button
          onClick={() => toggleSection("groups")}
          className="w-full flex items-center justify-between text-gray-600 hover:text-indigo-600"
        >
          <div className="flex items-center space-x-2">
            <FiUsers />
            <span>Group Chats</span>
          </div>
          <motion.div
            animate={{ rotate: expandedSection.groups ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown />
          </motion.div>
        </button>

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
                <motion.div
                  key={group.id}
                  whileHover={{ backgroundColor: "#EEF2FF" }} // indigo-50
                  onClick={() => setActiveChat(group.id)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    activeChat === group.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 mr-3 flex items-center justify-center text-indigo-600">
                    <FiHash size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{group.name}</p>
                    <p className="text-xs text-gray-500">{group.members} members</p>
                  </div>
                  {group.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {group.unread}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeftSidebar;