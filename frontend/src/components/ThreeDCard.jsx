import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import FloatingDots from "../components/shared/FloatingDots";

const ThreeDCard = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const rotatingRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setVolume = (video) => {
    if (video) {
      video.volume = 1;
      video.muted = false;
    }
  };

  const togglePlayPause = (video, setPlaying) => {
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  };

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      if (rotatingRef.current) {
        angle += 0.3;
        rotatingRef.current.style.transform = `rotateY(${angle}deg)`;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full px-4 pt-16 pb-24 relative flex flex-col items-center justify-center bg-[#0A0F1C] overflow-hidden"
    >
      {/* Glowing Background Circle */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 w-[1000px] h-[1000px] bg-black rounded-full blur-[200px] -translate-x-1/2" />
      </div>

      {/* Floating Dots Overlay */}
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />

      {/* Heading */}
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold font-poppins mb-4 bg-gradient-to-r from-[#7b5af0] via-[#8f3eff] to-[#3ad4f0] bg-clip-text text-transparent">
          Explore Our Amazing Visuals
        </h2>
        <p className="text-xl md:text-[1.35rem] text-[#b0c8d8] opacity-90 max-w-2xl mx-auto font-outfit leading-relaxed">
          Dive into a world of immersive experiences with stunning imagery and
          dynamic visuals.
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 z-10">
        {/* Left Image */}
        <div
          className="group relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-4 border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_20px_40px_rgba(123,90,240,0.4)]"
          style={{ transform: "perspective(1000px) rotateY(15deg)" }}
        >
          <img
            src="photo1.jpg"
            loading="lazy"
            alt="Left Thumbnail"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Center Video */}
        <div className="group relative w-full max-w-xs aspect-[9/16] rounded-[2.5rem] overflow-hidden border-4 border-[#1a1a2e] bg-[#1a1a2e] shadow-[inset_0_0_20px_rgba(123,90,240,0.2),_0_15px_35px_rgba(58,212,240,0.6)] transition-transform duration-500 hover:scale-[1.03]">
          <video
            ref={videoRef}
            src="video2.mp4"
            loading="lazy"
            loop
            playsInline
            className="w-full h-full object-cover rounded-[2.5rem] relative z-10"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
          />

          {/* Play/Pause Button */}
          <div className="absolute bottom-4 left-4 z-40">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  setVolume(videoRef.current);
                  togglePlayPause(videoRef.current, setIsPlaying);
                }
              }}
              className="text-3xl text-black bg-[#f6c610cc] hover:bg-[#f6c610] p-3 rounded-full shadow-xl transition "
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>

          {/* Glass Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 z-10 pointer-events-none rounded-[2.5rem]" />
        </div>

        {/* Right Image */}
        <div
          className="group relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-4 border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_20px_40px_rgba(123,90,240,0.4)]"
          style={{ transform: "perspective(1000px) rotateY(-15deg)" }}
        >
          <img
            src="photo2.jpg"
            alt="Right Thumbnail"
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Button */}
      <div className="mt-20 relative z-10 flex flex-wrap gap-8 md:gap-10 justify-center">
        <NavLink to="/thumbnails">
          <motion.button
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-gradient-to-r from-[#7b5af0] via-[#8f3eff] to-[#3ad4f0] text-black py-3 px-9 rounded-xl font-semibold shadow-[0_0_30px_rgba(123,90,240,0.6)] hover:shadow-[0_0_45px_rgba(58,212,240,0.9)] overflow-hidden transition-all duration-300 font-poppins"
          >
            <span className="underline decoration-black decoration-2 underline-offset-2 hover:text-white transition-colors duration-300">
              View Thumbnails →
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8f3eff] via-[#3ad4f0] to-[#7b5af0] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
            <div className="absolute -inset-1 rounded-xl border-2 border-[#8f3eff] opacity-0 group-hover:opacity-60 animate-pulse blur-md" />
          </motion.button>
        </NavLink>

        <NavLink to="/videos">
          <motion.button
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-gradient-to-r from-[#7b5af0] via-[#8f3eff] to-[#3ad4f0] text-black py-3 px-9 rounded-xl font-semibold shadow-[0_0_30px_rgba(123,90,240,0.6)] hover:shadow-[0_0_45px_rgba(58,212,240,0.9)] overflow-hidden transition-all duration-300 font-poppins"
          >
            <span className="underline decoration-black decoration-2 underline-offset-2 hover:text-white transition-colors duration-300">
              View Edits →
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8f3eff] via-[#3ad4f0] to-[#7b5af0] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
            <div className="absolute -inset-1 rounded-xl border-2 border-[#8f3eff] opacity-0 group-hover:opacity-60 animate-pulse blur-md" />
          </motion.button>
        </NavLink>
      </div>
    </motion.section>
  );
};

export default ThreeDCard;
