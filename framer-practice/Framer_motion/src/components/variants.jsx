import React from 'react'
import {delay, motion} from "framer-motion"

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  }, 
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.5
    }
  }
}

const Variants = () => {
  return (
    <motion.div
    // initial  = {{x: "100vw"}}
    // animate = {{x: 0}}
    //transition={{type: 'spring', delay: 0.5}} 
      
    variants={containerVariants}
    initial = "hidden"
    animate = "animate"
    
    >

    <h3 className='text-black-200'>Step1 : Choose Your Base</h3>
    </motion.div>
  )
}

export default Variants