import React from 'react'
import { useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion'

const Animate = () => {
const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-6 text-center">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Box
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-400 text-white p-4 rounded"
          >
            👋 Hello! I'm animated in and out.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Animate