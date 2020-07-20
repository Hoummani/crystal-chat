import React from 'react';
import { motion } from 'framer-motion';

export function Button() {
  return (
    <motion.button 
      type="button"
      className="group w-full lg:w-1/3 md:w-2/3 
        py-2 px-4 mr-4 border border-transparent 
        text-sm leading-5 font-medium rounded-md text-white 
        bg-teal-500 hover:bg-teal-400"
      initial={{ scale: 1 }}
      animate={{ scale: 1.2 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
    >
      Sign In
    </motion.button>
  )
}