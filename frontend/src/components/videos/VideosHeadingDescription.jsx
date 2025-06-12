"use client";
import React from "react";
import { motion } from "framer-motion";

const VideosHeadingDescription = () => {
  return (
    <>
      <div className="z-10 relative pt-24 sm:pt-28 md:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-extrabold 
          tracking-wide 
          text-[#7F5AF0]
          drop-shadow-[0_0_15px_#7F5AF0]  
          font-poppins
          mb-6"
        >
          Videos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center 
          text-base sm:text-lg md:text-xl 
          max-w-3xl 
          mx-auto 
          text-[#E0E0E0] 
          font-outfit
          leading-loose
          px-2 sm:px-4
          tracking-wide
          drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
        >
          Crafted for impact — these short clips have boosted engagement, told
          compelling stories, and delivered real results.
        </motion.p>
      </div>
    </>
  );
};

export default VideosHeadingDescription;
