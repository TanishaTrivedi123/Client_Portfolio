import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa"; // Import play and pause icons from React Icons
import FloatingDots from "../components/FloatingDots";

const ThreeDCard = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const rotatingRef = useRef(null);
  const videoRef = useRef(null);
  const [tiltLeft, setTiltLeft] = useState(false);
  const [tiltRight, setTiltRight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const setVolume = (video) => {
    if (video) {
      video.volume = 1; // Ensure the volume is set to 100%
      video.muted = false; // Unmute video by default
    }
  };

  const togglePlayPause = (video, setPlaying) => {
    if (video.paused) {
      video.play();
      setPlaying(true); // Set state to playing
    } else {
      video.pause();
      video.currentTime = 0; // Reset video to start
      setPlaying(false); // Set state to paused
    }
  };

  const stopVideo = (video, setPlaying) => {
    video.pause();
    video.currentTime = 0; // Reset the video to the start
    setPlaying(false); // Set state to paused
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
      className="w-full px-4 pt-16 pb-24 relative flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 w-[1000px] h-[1000px] bg-black rounded-full blur-[200px] transform -translate-x-1/2" />
      </div>

      {/* Floating Dots */}
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />

      {/* Heading */}
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#f6c610] font-poppins mb-4">
          Explore Our Amazing Visuals
        </h2>
        <p className="text-xl md:text-[1.35rem] text-white opacity-80 max-w-2xl mx-auto font-outfit leading-relaxed">
          Dive into a world of immersive experiences with stunning imagery and
          dynamic visuals.
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 z-10">
        {/* Left Image */}
        <div
          className="group relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-4 border-[#0d0d0d] bg-[#0d0d0d] shadow-[0_10px 30px rgba(0, 0, 0, 0.6)]"
          style={{
            transform: "perspective(1000px) rotateY(15deg)",
            boxShadow: "0 20px 40px rgba(246, 198, 16, 0.4)", // soft yellow shadow below
          }}
        >
          <img
            src="photo1.jpg"
            loading="lazy"
            alt="Left Thumbnail"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Center Video Styled like a Phone */}
        <div
          className="group relative w-full max-w-xs aspect-[9/16] rounded-[2.5rem] overflow-hidden border-4 border-[#0d0d0d] bg-[#0d0d0d] shadow-[0_20px_60px_#f6c610aa] transition-transform duration-500 hover:scale-[1.03]"
          style={{
            boxShadow:
              "inset 0 0 20px rgba(246, 198, 16, 0.2), 0 15px 35px rgba(246, 198, 16, 0.6)",
            borderRadius: "40px", // More rounded edges for a phone look
          }}
        >
          {/* Video Content */}
          <video
            ref={videoRef}
            src="video2.mp4"
            loading="lazy"
            loop
            playsInline
            className="w-full h-full object-cover rounded-[2.5rem] relative z-10"
            controlsList="nodownload nofullscreen noremoteplayback" // This removes download, fullscreen, and remote playback options
            disablePictureInPicture // Disable the PiP button
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
              className="text-3xl text-[#f6c610] bg-black bg-opacity-60 p-3 rounded-full shadow-lg transition hover:scale-110"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>

          {/* Screen Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 z-10 pointer-events-none rounded-[2.5rem]" />
        </div>

        {/* Right Image */}
        <div
          className="group relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-4 border-[#0d0d0d] bg-[#0d0d0d] shadow-[0_10px 30px rgba(0, 0, 0, 0.6)]"
          style={{
            transform: "perspective(1000px) rotateY(-15deg)",
            boxShadow: "0 20px 40px rgba(246, 198, 16, 0.4)",
          }}
        >
          <img
            src="photo2.png"
            alt="Right Thumbnail"
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Button */}
      <NavLink to="/projects">
        <motion.button
          whileHover={{ scale: 1.08, y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-20 relative z-10 group bg-[#f6c610] text-black py-3 px-9 rounded-xl font-semibold shadow-[0_0_30px_#f6c61080] hover:shadow-[0_0_45px_#f6c610cc] overflow-hidden transition-all duration-300 font-poppins"
        >
          <span className="underline decoration-black decoration-2 underline-offset-2 hover:text-white transition-colors duration-300">
            View More →
          </span>

          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-[#f6c610] to-yellow-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
          <div className="absolute -inset-1 rounded-xl border-2 border-yellow-300 opacity-0 group-hover:opacity-60 animate-pulse blur-md" />
        </motion.button>
      </NavLink>

      {/* Keyframes for Floating Dots */}
      <style>
        {`
          @keyframes floatDot {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-10px) scale(1.1); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 0.7; }
          }
        `}
      </style>
    </motion.section>
  );
};

export default ThreeDCard;
