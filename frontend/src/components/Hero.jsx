import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Floating Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#f6c610] rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-20 relative z-10 py-10 sm:py-20"
      >
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left -mt-14 md:mt-0">
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
            I’m a skilled Video Editor and Thumbnail Designer, dedicated to
            crafting eye-catching videos and impactful designs. Whether it’s
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

        {/* Right Side Image with 3D background */}
        <div className="w-full md:w-1/2 flex justify-center mt-20 md:mt-0 mb-10 md:mb-0 relative perspective-[1200px]">
          {/* Circular glowing background */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#f6c61044] to-[#f6c61011] blur-3xl shadow-[0_0_80px_#f6c61055] z-0"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, rotateX: 10 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
            whileHover={{ scale: 1.08, rotateY: 6 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative z-10 w-[320px] h-[360px] sm:w-[350px] sm:h-[390px] md:w-[400px] md:h-[440px] rounded-[2rem] overflow-hidden shadow-[0_12px_50px_#f6c610aa] border-4 border-[#f6c610]"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 0 60px #f6c61066, 0 0 30px #f6c61088 inset",
            }}
          >
            <img
              src="photo5.png"
              loading="lazy"
              alt="Client"
              className="w-full h-full object-cover rounded-[2rem] brightness-[1.05] contrast-[1.1] scale-x-[-1]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Horizontal Partition */}
      <div className="absolute bottom-8 sm:bottom-14 md:bottom-20 w-full flex justify-center items-center z-10 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-6xl h-[2px] bg-gradient-to-r from-transparent via-[#f6c610] to-transparent"
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#f6c610] shadow-[0_0_20px_#f6c610,0_0_40px_#f6c610] animate-pulse"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
