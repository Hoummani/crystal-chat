import React from 'react';
import { motion } from 'framer-motion';


// variant
const loaderVariant = {
  animationOne: {
    x: [-50, 50],
    y:[0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut"
      }
    }
  }
}
export function Loader() {
  return (
    <div className="">
      <span>
        <motion.i 
          className="fas fa-circle font-semibold text-teal-500 text-xs tracking-tight" 
          variants={loaderVariant}
          animate="animationOne"
        />
      </span>
    </div>
  )
}