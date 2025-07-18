import React from 'react'
import { useState } from 'react';
import {motion} from "framer-motion"

const Tooltip = () => {
 const [showTooltip, setShowTooltip] = useState(false);

return (
  <div className="relative">
    <motion.div
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Hover me
    </motion.div>

    {showTooltip && (
      <div className="absolute top-full mt-1 bg-black text-white text-sm px-2 py-1 rounded">
        I'm a tooltip!
      </div>
    )}
  </div>
);
}

export default Tooltip