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
      className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[300px] scroll-snap-align-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
            ? "w-[200px] sm:w-[240px] md:w-[300px]"
            : "w-[300px] sm:w-[420px] md:w-[560px]"
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
  const [videos, setVideos] = useState([]);
  const [signedUrls, setSignedUrls] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [scrollPadding, setScrollPadding] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    };
    fetchSignedUrls();
  }, [videos]);

  const displayVideos =
    signedUrls.length === videos.length
      ? signedUrls.map((url, i) => ({
          src: url,
          orientation: videos[i]?.orientation || "portrait",
        }))
      : [];

  const handlePlay = (index) => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-[620px] bg-black pt-40 sm:pt-36 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden mb-0">
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />

      {/* Updated heading size for better visibility */}
      <h2 className="text-4xl sm:text-5xl md:text-5xl text-[#03A9F4] text-center mb-6 sm:mb-8 px-4 leading-tight drop-shadow-[0_0_15px_#7F5AF0] font-extrabold relative z-10">
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
        className={`relative z-10 gap-6 sm:gap-8 md:gap-12 ${
          displayVideos.length === 1
            ? "flex justify-center items-center"
            : "flex overflow-x-auto no-scrollbar"
        }`}
        style={{
          minHeight: "500px",
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
        {isLoading ? (
          <SkeletonLoaderBox
            count={6}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] h-[220px] sm:h-[280px] md:h-[340px]"
          />
        ) : displayVideos.length === 0 ? (
          <p className="text-white text-center text-xl w-full">
            No videos found.
          </p>
        ) : (
          displayVideos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              index={index}
              onPlay={() => handlePlay(index)}
              isPlaying={playingIndex === index}
              orientation={video.orientation}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Videos;
