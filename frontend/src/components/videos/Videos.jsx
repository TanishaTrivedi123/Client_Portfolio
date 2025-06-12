"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { API_URL } from "../../utils/api";
import SkeletonLoaderBox from "../shared/SkeletonLoaderBox";
import FloatingDots from "../shared/FloatingDots";

const CARD_WIDTH = 300;

const VideoCard = ({
  video,
  index,
  onPlay,
  isPlaying,
  isCentered,
  orientation = "portrait",
}) => {
  const videoRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.6 });

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

  return (
    <motion.div
      className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] scroll-snap-align-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isCentered ? 1.05 : 0.96,
      }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
      }}
    >
      <div
        onClick={onPlay}
        className={`relative cursor-pointer transition-all duration-500 rounded-[2.5rem] border-[6px] border-black 
    shadow-[0_0_45px_#673AB780] overflow-hidden bg-gradient-to-br from-[#1e1b33] to-[#2b2645] ${
      orientation === "portrait"
        ? "w-[240px] sm:w-[280px] md:w-[300px]"
        : "w-[420px] sm:w-[480px] md:w-[560px]"
    }`}
        style={{
          aspectRatio: orientation === "portrait" ? "9 / 16" : "16 / 9",
          maxWidth: orientation === "portrait" ? "300px" : "560px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay rounded-[2.5rem]" />
        <video
          ref={setRefs}
          src={inView ? video.src : undefined}
          className="w-full h-full object-cover rounded-[2.5rem]"
          preload={inView ? "metadata" : "none"}
          playsInline
          muted
          controls={false}
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
        />
        <button
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
  const { categoryName } = useParams();
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [videos, setVideos] = useState([]);
  const [signedUrls, setSignedUrls] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [centeredIndex, setCenteredIndex] = useState(null);
  const [scrollPadding, setScrollPadding] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Adjust scroll padding based on screen size
  useEffect(() => {
    const updateScrollPadding = () => {
      const screenCenterOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
      setScrollPadding(screenCenterOffset > 0 ? screenCenterOffset : 0);
    };

    updateScrollPadding();
    window.addEventListener("resize", updateScrollPadding);
    return () => window.removeEventListener("resize", updateScrollPadding);
  }, []);

  // Scroll logic
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
    };

    el.addEventListener("scroll", handleScroll);

    requestAnimationFrame(() => {
      const screenCenterOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
      el.scrollLeft = 0 - screenCenterOffset;
      handleScroll();
    });

    return () => el.removeEventListener("scroll", handleScroll);
  }, [videos]);

  // Fetch videos on mount or category change
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setVideos([]);
        setSignedUrls([]);
        const res = await axios.get(
          categoryName
            ? `${API_URL}/videos?category=${categoryName}`
            : `${API_URL}/videos`
        );
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    };
    fetchVideos();
  }, [categoryName]);

  // Get signed URLs
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
      } finally {
        setIsLoading(false); // Done only after signed URLs
      }
    };

    fetchSignedUrls();
  }, [videos]);

  const displayVideos =
    signedUrls.length === videos.length
      ? signedUrls.map((url, i) => ({
          src: url,
          orientation: videos[i]?.orientation || "portrait", // default to portrait
        }))
      : [];

  const handlePlay = (index) => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-[720px] bg-gradient-to-r from-[#141414] via-[#232323] to-[#0d0d0d] pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />

      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#03A9F4] text-center mb-14 sm:mb-16 px-4 leading-tight drop-shadow-[0_0_15px_#7F5AF0] font-extrabold">
        {categoryName ? (
          <>
            Showing thumbnails for:{" "}
            <span className="font-bold text-[#FF3CAC]">{categoryName}</span>
          </>
        ) : (
          <>All Videos</>
        )}
      </h2>

      <div
        ref={scrollRef}
        className={`relative z-10 gap-8 md:gap-12 ${
          displayVideos.length === 1
            ? "flex justify-center items-center"
            : "flex overflow-x-auto no-scrollbar"
        }`}
        style={{
          minHeight: "720px",
          scrollSnapType: displayVideos.length === 1 ? "none" : "x mandatory",
          WebkitOverflowScrolling: "touch",
          overflowY: "hidden",
          paddingLeft:
            displayVideos.length === 1 ? "0px" : `${scrollPadding}px`,
          paddingRight:
            displayVideos.length === 1 ? "0px" : `${scrollPadding}px`,
          maxWidth: "100vw",
          alignItems: "center",
        }}
      >
        {isLoading || displayVideos.length === 0 ? (
          <SkeletonLoaderBox
            count={6}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] 
               h-[220px] sm:h-[280px] md:h-[340px]"
          />
        ) : (
          displayVideos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              index={index}
              onPlay={() => handlePlay(index)}
              isPlaying={playingIndex === index}
              isCentered={centeredIndex === index}
              orientation={video.orientation}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Videos;
