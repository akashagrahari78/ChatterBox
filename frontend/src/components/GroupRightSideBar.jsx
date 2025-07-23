import { motion } from "framer-motion";
import { FiSearch, FiVolume2, FiStar, FiSettings } from "react-icons/fi";

const GroupRightSideBar = () => {
  // Mock data - replace with real data from context
  const participants = [
    { id: 1, name: "Alex Johnson", role: "Admin", online: true },
    { id: 2, name: "Sam Wilson", role: "Member", online: true },
    { id: 3, name: "Jordan Lee", role: "Member", online: false }
  ];

  const files = [
    { id: 1, name: "Project_Overview.pdf", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Meeting_Notes.docx", type: "doc", size: "1.1 MB" }
  ];

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 h-screen bg-white border-l  border-gray-200 flex flex-col"
    >
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Participants Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-700">Participants (3)</h3>
          <button className="text-indigo-600 hover:text-indigo-800">
            <FiVolume2 size={18} />
          </button>
        </div>
        <div className="space-y-2">
          {participants.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ backgroundColor: "#F5F3FF" }} // indigo-50
              className="flex items-center p-2 rounded-lg cursor-pointer"
            >
              <div className="relative mr-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {user.name.charAt(0)}
                </div>
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
              <button className="text-gray-400 hover:text-yellow-500">
                <FiStar size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Files Section */}
      <div className="p-4 border-b border-gray-200 flex-1">
        <h3 className="font-semibold text-gray-700 mb-3">Shared Files</h3>
        <div className="space-y-2">
          {files.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ backgroundColor: "#F5F3FF" }}
              className="flex items-center p-2 rounded-lg cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                {file.type === "pdf" ? "📄" : "📝"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <button className="flex items-center justify-center w-full p-2 rounded-lg text-indigo-600 hover:bg-indigo-50">
          <FiSettings className="mr-2" />
          <span>Chat Settings</span>
        </button>
      </div>
    </motion.div>
  );
};

export default GroupRightSideBar;