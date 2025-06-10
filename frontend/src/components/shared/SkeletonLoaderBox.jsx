// src/components/shared/SkeletonLoaderBox.jsx

import React from "react";
import { motion } from "framer-motion";

const SkeletonLoaderBox = ({ count = 6, className = "" }) => {
  const dummyArray = Array.from({ length: count });

  return (
    <div className="flex overflow-x-auto gap-6 px-4 no-scrollbar py-4">
      {dummyArray.map((_, index) => (
        <motion.div
          key={index}
          className={`relative rounded-[1.8rem] flex-shrink-0 
            border-[6px] border-black 
            bg-gradient-to-br from-[#1e1b33] to-[#2b2645] 
            animate-pulse shadow-[0_0_45px_#673AB780]
            ${className}`}
          style={{
            boxShadow:
              "inset 0 0 0 3px #000, 0 0 20px rgba(103, 58, 183, 0.6), 0 10px 25px rgba(3, 169, 244, 0.3)",
          }}
        >
          {/* Blur glow layer */}
          <span
            className="absolute inset-0 z-[-1] rounded-xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(127,90,240,0.25), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoaderBox;
