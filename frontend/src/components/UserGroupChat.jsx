import { FiHash } from "react-icons/fi";

const UserGroupChat = ({ 
  group, 
  isActive, 
  onClick 
}) => (
  <div
    onClick={onClick}
    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-indigo-50 ${
      isActive ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
    }`}
  >
    <div className="w-8 h-8 rounded-full bg-indigo-100 mr-3 flex items-center justify-center text-indigo-600">
      <FiHash size={14} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="truncate font-medium">{group.name}</p>
      <p className="text-xs text-gray-500">
        {group.members} members
      </p>
    </div>
    {group.unread > 0 && (
      <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {group.unread}
      </span>
    )}
  </div>
);

export default UserGroupChat;