import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div>
      <motion.h1
        initial={{ x: -100, opacity: 0 }} //The starting state of the component
        animate={{ x: 0, opacity: 1 }} //The final state
        transition={{ duration: 0.5, delay: 0.5, ease: "anticipate" }} //How the animation behaves
        className="text-4xl font-bold"
      >
        My Porfolio
      </motion.h1>
      <div>
        {/* ----------------whileHover, whileInView,whileTap,  */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl font-bold "
        >
          Hover Me
        </motion.button>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-blue-500 p-4 text-white rounded-xl"
      >
        Animated Box
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        I fade in when I enter the viewport!
      </motion.div>
       
       <motion.div
  onHoverStart={() => console.log("Hovered in")}
  onHoverEnd={() => console.log("Hovered out")}
  className="w-32 h-32 bg-red-500"
>
  Hover over me!
</motion.div>


      {/* ------------------drag----------------------- */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 100, top: 0, bottom: 100 }}
        className="w-32 h-32 bg-green-500"
      >
        I'm bound!
      </motion.div>
      <motion.div
        drag
        whileDrag={{ scale: 1.1, rotate: 5 }}
        className="w-32 h-32 bg-pink-400"
      >
        Stylish drag!
      </motion.div>
    </div>
  );
};

export default Header;
