"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { API_URL } from "../../utils/api";
import SkeletonVideos from "../videos/SkeletonVideos";
import FloatingDots from "../../components/FloatingDots";

const CARD_WIDTH = 300;

const VideoCard = ({ video, index, onPlay, isPlaying, isCentered }) => {
  const videoRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.6, // Trigger when 60% visible
  });

  const setRefs = (node) => {
    videoRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying && inView) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isPlaying, inView]);

  const handleContextMenu = (e) => e.preventDefault();

  return (
    <motion.div
      className={`flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] scroll-snap-align-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isCentered ? 1.05 : 0.96,
      }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      style={{
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
      }}
    >
      <div
        onClick={onPlay}
        className="relative cursor-pointer transition-all duration-500 rounded-[2.5rem] bg-[#0d0d0d] border-[6px] border-black 
                     bg-gradient-to-br from-[#1e1b33] to-[#2b2645] shadow-[0_0_45px_#673AB780] "
        style={{
          aspectRatio: "9 / 16",
          maxWidth: "300px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay rounded-[2.5rem]" />
        <video
          ref={setRefs}
          src={inView ? video.src : undefined} // only set src when in view
          className="w-full h-full object-cover rounded-[2.5rem]"
          preload={inView ? "metadata" : "none"} // preload only when visible
          playsInline
          muted
          controls={false}
          disablePictureInPicture
          onContextMenu={handleContextMenu}
        />
        <button
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute bottom-4 right-4 bg-[#f6c610cc] hover:bg-[#f6c610] text-black rounded-full p-3 shadow-xl"
        >
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

const Videos = () => {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [videos, setVideos] = useState([]);
  const [signedUrls, setSignedUrls] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [centeredIndex, setCenteredIndex] = useState(null);
  const [initialHintVisible, setInitialHintVisible] = useState(true);
  const [scrollPadding, setScrollPadding] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // State for dots positions
  const [dots, setDots] = useState(
    Array.from({ length: 15 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 6 + 6,
      directionX: (Math.random() - 0.5) * 0.1, // slow movement
      directionY: (Math.random() - 0.5) * 0.1,
    }))
  );

  useEffect(() => {
    const updateScrollPadding = () => {
      const screenCenterOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
      setScrollPadding(screenCenterOffset > 0 ? screenCenterOffset : 0);
    };

    updateScrollPadding();
    window.addEventListener("resize", updateScrollPadding);

    return () => window.removeEventListener("resize", updateScrollPadding);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);

      const center = scrollLeft + clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(el.children).forEach((child, index) => {
        const box = child.getBoundingClientRect();
        const distance = Math.abs(
          box.left + box.width / 2 - window.innerWidth / 2
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCenteredIndex(closestIndex);
      setInitialHintVisible(false);
    };

    el.addEventListener("scroll", handleScroll);

    requestAnimationFrame(() => {
      const screenCenterOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
      el.scrollLeft = 0 - screenCenterOffset;
      handleScroll();
    });

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/videos`);
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;

    const fetchSignedUrls = async () => {
      try {
        const urls = await Promise.all(
          videos.map(async (vid) => {
            if (!vid.public_id) return vid.video?.url || "";
            const res = await axios.get(
              `/secure-media/${vid.resource_type || "video"}/${vid.public_id}`
            );
            return res.data.url;
          })
        );
        setSignedUrls(urls);
      } catch (err) {
        console.error("Failed to fetch signed video URLs:", err);
      }
    };

    fetchSignedUrls();
  }, [videos]);

  const displayVideos =
    signedUrls.length === videos.length
      ? signedUrls.map((url) => ({ src: url }))
      : videos.map((item) => ({ src: item.video?.url || "" }));

  const handlePlay = (index) => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  // Animate dots floating movement continuously
  useEffect(() => {
    let animationFrameId;

    const animateDots = () => {
      setDots((prevDots) =>
        prevDots.map(({ top, left, size, directionX, directionY }) => {
          let newTop = top + directionY;
          let newLeft = left + directionX;

          // Bounce dots inside 0-100% box
          if (newTop > 100) {
            newTop = 100;
            directionY = -directionY;
          } else if (newTop < 0) {
            newTop = 0;
            directionY = -directionY;
          }

          if (newLeft > 100) {
            newLeft = 100;
            directionX = -directionX;
          } else if (newLeft < 0) {
            newLeft = 0;
            directionX = -directionX;
          }

          return {
            top: newTop,
            left: newLeft,
            size,
            directionX,
            directionY,
          };
        })
      );
      animationFrameId = requestAnimationFrame(animateDots);
    };

    animationFrameId = requestAnimationFrame(animateDots);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative w-full min-h-[720px] bg-gradient-to-r from-[#141414] via-[#232323] to-[#0d0d0d] pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />
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
        Edits (Short Videos)
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

      {/* Floating Dots */}
      <div className="absolute inset-0 w-full h-full z-0">
        {dots.map(({ top, left, size }, index) => (
          <div
            key={index}
            className="absolute bg-[#f6c610] rounded-full animate-pulse"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              filter: "drop-shadow(0 0 2px #f6c610)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="relative flex overflow-x-auto no-scrollbar gap-8 md:gap-12 z-10"
        style={{
          minHeight: "720px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          overflowY: "hidden",
          paddingLeft: `${scrollPadding}px`,
          paddingRight: `${scrollPadding}px`,
          maxWidth: "100vw",
          alignItems: "center",
        }}
      >
        {displayVideos.length === 0 ? (
          <SkeletonVideos />
        ) : (
          displayVideos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              index={index}
              onPlay={() => handlePlay(index)}
              isPlaying={playingIndex === index}
              isCentered={centeredIndex === index}
            />
          ))
        )}
      </div>

      {/* Scroll Left Indicator (appears only at END) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: atEnd ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-l-xl text-[#f6c610] flex items-center gap-2 z-20 pointer-events-none select-none"
      >
        <span className="font-medium md:inline">Scroll Left</span>
        <span className="text-xl">&#8592;</span>
      </motion.div>

      {/* Scroll Right Indicator (appears only at START) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: atStart ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-r-xl text-[#f6c610] flex items-center gap-2 z-20 pointer-events-none select-none"
      >
        <span className="text-xl">&#8594;</span>
        <span className="font-medium md:inline">Scroll Right</span>
      </motion.div>
    </section>
  );
};

export default Videos;
