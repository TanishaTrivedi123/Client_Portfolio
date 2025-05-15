"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../utils/api";

const Videos = () => {
  const scrollRef = useRef(null);
  const [scrollCenter, setScrollCenter] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [originalMedia, setOriginalMedia] = useState([]);
  const videoRefs = useRef([]);
  const cardRefs = useRef([]);
  const [styles, setStyles] = useState([]);
  const [aspectRatios, setAspectRatios] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/videos`);
        const formatted = res.data.map((item) => ({
          src: item.video.url,
          type: "video",
        }));
        setOriginalMedia(formatted);
        // Initialize styles and aspectRatios arrays
        setStyles(
          Array(formatted.length).fill({ scale: 1, translateY: 0, rotateY: 0 })
        );
        setAspectRatios(Array(formatted.length).fill(16 / 9));
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setScrollCenter(scrollLeft + clientWidth / 2);
      setAtStart(scrollLeft <= 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const getRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 8 + 8}px`,
  });

  const setVolume = (video) => {
    if (video) {
      video.volume = 1;
      video.muted = false;
    }
  };

  const stopVideo = (video) => {
    video.pause();
    video.currentTime = 0;
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayingIndex(index);
    } else {
      video.pause();
      if (playingIndex === index) setPlayingIndex(null);
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== playingIndex) stopVideo(video);
    });
  }, [playingIndex]);

  useEffect(() => {
    const updateStyles = () => {
      const newStyles = originalMedia.map((_, index) => {
        const card = cardRefs.current[index];
        if (!card || !scrollRef.current)
          return { scale: 1, translateY: 0, rotateY: 0 };

        const cardCenter =
          card.offsetLeft - scrollRef.current.scrollLeft + card.offsetWidth / 2;
        const containerCenter = scrollRef.current.clientWidth / 2;
        const distance = containerCenter - cardCenter;

        const scale = Math.max(0.85, 1 - Math.abs(distance) / 1500);
        const translateY = Math.max(-20, Math.min(20, -distance / 50));
        const rotateY = Math.max(-25, Math.min(25, distance / 20));

        return { scale, translateY, rotateY };
      });

      setStyles(newStyles);
    };

    updateStyles();
    const id = requestAnimationFrame(updateStyles);
    return () => cancelAnimationFrame(id);
  }, [scrollCenter, originalMedia.length]);

  return (
    <section className="relative w-full py-6 overflow-hidden bg-gradient-to-r from-[#141414] via-[#232323] to-[#0d0d0d]">
      {/* Background Dots */}
      <svg
        className="absolute inset-0 w-full h-full z-0 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#f6c610" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center text-5xl font-bold text-[#f6c610] mb-6 tracking-wide z-10 drop-shadow-lg font-poppins"
      >
        Edits (Short Videos)
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-lg md:text-xl max-w-3xl mx-auto text-gray-300 px-4 mb-16 z-10 relative font-outfit"
      >
        Dive into a realm where every frame tells a story. From cinematic cuts
        to dynamic transitions, these edits capture moments that move, inspire,
        and leave a lasting impact.
      </motion.p>

      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => {
          const pos = getRandomPosition();
          return (
            <div
              key={index}
              className="absolute bg-[#f6c610] rounded-full animate-pulse opacity-70"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.size,
                height: pos.size,
                animationDuration: `${Math.random() * 3 + 3}s`,
              }}
            />
          );
        })}
      </div>

      {/* Scrollable Videos */}
      <div
        ref={scrollRef}
        className="relative flex overflow-x-auto no-scrollbar gap-8 z-10 px-0 scroll-smooth"
        style={{ scrollSnapType: "x mandatory", overflowY: "hidden" }}
      >
        <div className="shrink-0 w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[25vw]" />

        {originalMedia.map((media, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="scroll-snap-align-center flex-shrink-0 w-[70vw] sm:w-[50vw] md:w-[320px] lg:w-[340px] xl:w-[360px] mt-6 relative group"
            style={{
              scale: styles[index]?.scale,
              transform: `translateY(${styles[index]?.translateY}px) rotateY(${styles[index]?.rotateY}deg)`,
              transformStyle: "preserve-3d",
              aspectRatio: aspectRatios[index] || "16/9",
            }}
          >
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, dotIndex) => {
                const pos = getRandomPosition();
                return (
                  <div
                    key={dotIndex}
                    className="absolute bg-[#f6c610] rounded-full animate-pulse opacity-50"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.size,
                      height: pos.size,
                      animationDuration: `${Math.random() * 4 + 3}s`,
                    }}
                  />
                );
              })}
            </div>

            <motion.div
              className="relative w-full h-full rounded-[2rem] bg-black shadow-[0_12px_25px_rgba(246,198,16,0.2)] border-[12px] border-[#0d0d0d] flex items-center justify-center overflow-hidden"
              style={{
                aspectRatio: "9 / 19.5",
                boxShadow: "inset 0 0 0 3px #0d0d0d",
              }}
            >
              <motion.video
                src={media.src}
                loading="lazy"
                muted
                loop
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="w-full h-full object-cover rounded-[1.8rem]"
                ref={(el) => {
                  videoRefs.current[index] = el;
                  if (el) {
                    setVolume(el);
                    el.onloadedmetadata = () => {
                      const ratio = el.videoWidth / el.videoHeight;
                      setAspectRatios((prev) => {
                        const updated = [...prev];
                        updated[index] = ratio;
                        return updated;
                      });
                    };
                  }
                }}
              />
              <button
                className="absolute bottom-4 left-4 text-white bg-[#f6c610] p-3 rounded-full group-hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => togglePlayPause(index)}
              >
                {playingIndex === index ? (
                  <FaPause className="text-2xl" />
                ) : (
                  <FaPlay className="text-2xl" />
                )}
              </button>
            </motion.div>
          </motion.div>
        ))}

        <div className="shrink-0 w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[25vw]" />
      </div>

      {/* Scroll Indicators */}
      {atStart && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-r-xl text-[#f6c610] flex items-center gap-2 z-20 animate-fadeIn">
          <span className="text-xl">&#8594;</span>
          <span className="font-medium">Scroll Right</span>
        </div>
      )}
      {atEnd && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-l-xl text-[#f6c610] flex items-center gap-2 z-20 animate-fadeIn">
          <span className="font-medium">Scroll Left</span>
          <span className="text-xl">&#8592;</span>
        </div>
      )}
    </section>
  );
};

export default Videos;
