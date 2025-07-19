import React from 'react'
import { useState } from 'react';
import {motion} from 'framer-motion'

const Layout = () => {
      const [isOpen, setIsOpen] = useState(false);

   return (
    <div className="p-4">
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 bg-gray-200 px-4 py-2 rounded">
        Toggle
      </button>

      <motion.div layout transition={{duration: 0.3}} className="bg-blue-400 p-4 rounded-md">
        <p>This layout animates</p>
        {isOpen && (
          <motion.div layout className="mt-2 bg-white text-black p-2 rounded">
            Expanded content
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Layout