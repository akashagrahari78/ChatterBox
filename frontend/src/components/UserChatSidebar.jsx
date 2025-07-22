import { motion } from "framer-motion";
import { useContext } from "react";
import { FiSearch, FiStar, FiUser, FiImage, FiFile, FiTrash2, FiVolume2 } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";

const UserChatSidebar = () => {
    // { currentUser }
      const {sharedMedia} = useContext(ChatContext) 


  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 h-screen bg-white border-l border-gray-200 flex flex-col"
    >
      {/* --------------User Profile Header */}
      <div className="p-4 border-b  border-gray-200 flex flex-col items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
            <FiUser />
          </div>
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </motion.div>
        
        <h3 className="font-semibold text-lg">Alex Johnson</h3>
        <p className="text-sm text-gray-500 mb-3">Online</p>
        
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
            <FiVolume2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
            <FiStar size={18} />
          </button>
        </div>
      </div>

      {/* Search in Conversation */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search in conversation..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
          />
          
          <div>
          <FiSearch className="absolute bg-indigo-50 hover:bg-indigo-100 rounded-full  left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Shared Media */}
      <div className="p-4 border-b border-gray-200 flex-1">
        <h3 className="font-semibold text-gray-700 mb-3">Shared Media</h3>
        <div className="grid grid-cols-3 gap-2">
          {sharedMedia.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {item.type === "image" ? (
                <FiImage className="text-gray-400 text-xl" />
              ) : (
                <FiFile className="text-gray-400 text-xl" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Options</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center p-2 text-red-500 hover:bg-red-50 rounded-lg">
            <FiTrash2 className="mr-2" />
            <span>Delete Conversation</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserChatSidebar;