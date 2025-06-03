import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#f6c610] rounded-full opacity-70"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-20 relative z-10 py-6 sm:py-20"
      >
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left -mt-24 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#f6c610] via-yellow-400 to-white bg-clip-text text-transparent font-poppins"
            style={{ lineHeight: "1.2" }}
          >
            Anuj Trivedi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 font-outfit font-medium"
          >
            I'm a skilled Video Editor and Thumbnail Designer, dedicated to
            crafting eye-catching videos and impactful designs. Whether it's
            editing YouTube or Instagram content or designing attention-grabbing
            thumbnails, I bring your vision to life with precision and style.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.5 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex flex-col items-center gap-2"
        >
          <div className="w-[4px] h-52 bg-gradient-to-b from-[#f6c610] via-[#f6c61099] to-transparent rounded-full shadow-[0_0_15px_#f6c61088]" />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#f6c610] shadow-[0_0_12px_#f6c610]"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        {/* Updated Image Section for Better Mobile Spacing */}
        <div className="w-full md:w-1/2 flex justify-center -mt-16 sm:-mt-20 md:-mt-24 mb-4 sm:mb-8 md:mb-0 relative z-10">
          <img
            src="photo8.png"
            loading="lazy"
            alt="Anuj Trivedi"
            className="w-[360px] h-[480px]
       sm:w-[520px] sm:h-[520px] 
       md:w-[480px] md:h-[560px] 
       lg:w-[680px] lg:h-[760px] 
       xl:w-[620px] xl:h-[700px] 
       object-cover rounded-3xl
       transition-transform duration-300 hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Horizontal Divider */}
      <div className="absolute bottom-8 sm:bottom-14 md:bottom-20 w-full flex justify-center items-center z-10 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-[#f6c610] to-transparent"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f6c610]"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(246, 198, 16, 0.7)",
                "0 0 0 10px rgba(246, 198, 16, 0)",
                "0 0 0 20px rgba(246, 198, 16, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
