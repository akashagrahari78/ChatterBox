import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const ChatToggleButton = ({ 
  icon: Icon, 
  label, 
  isExpanded, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between text-gray-600 hover:text-indigo-600"
  >
    <div className="flex items-center space-x-2">
      <Icon />
      <span>{label}</span>
    </div>
    <motion.div
      animate={{ rotate: isExpanded ? 0 : -90 }}
      transition={{ duration: 0.2 }}
    >
      <FiChevronDown />
    </motion.div>
  </button>
);

export default ChatToggleButton;