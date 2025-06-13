import React from "react";
import { motion } from "framer-motion";

const HeadingDescription = () => {
  return (
    <div className="z-10 relative pt-12 sm:pt-16 md:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          text-center 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-extrabold 
          tracking-wide 
          text-[#7F5AF0]
          drop-shadow-[0_0_15px_#7F5AF0]  
          font-poppins
          mb-6
        "
      >
        Thumbnails
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          text-center 
          text-base sm:text-lg md:text-xl 
          max-w-3xl 
          mx-auto 
          text-[#E0E0E0] 
          font-outfit
          leading-loose
          px-2 sm:px-4
          tracking-wide
          drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]
        "
      >
        A glimpse into the creative journey — each thumbnail here is designed
        with precision and purpose, curated for real clients to maximize clicks,
        boost visibility, and leave a lasting impression.
      </motion.p>
    </div>
  );
};

export default HeadingDescription;
