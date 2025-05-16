"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../utils/api";

const Thumbnail = () => {
  const scrollRef = useRef(null);
  const [scrollCenter, setScrollCenter] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [images, setImages] = useState([]);
  const [signedUrls, setSignedUrls] = useState([]);
  const cardRefs = useRef([]);
  const [styles, setStyles] = useState([]);

  // Use signedUrls if available, else fallback to images' original URL
  const displayImages =
    signedUrls.length === images.length
      ? signedUrls.map((url) => ({ src: url }))
      : images.map((item) => ({ src: item.image?.url || "" }));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setScrollCenter(scrollLeft + clientWidth / 2);
      setAtStart(scrollLeft <= 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch thumbnails data from backend
  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const res = await axios.get(`${API_URL}/thumbnails`);
        setImages(res.data);
      } catch (err) {
        console.error("Failed to load thumbnails:", err);
      }
    };
    fetchThumbnails();
  }, []);

  // Fetch signed URLs after images load
  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (images.length === 0) return;
      try {
        const urls = await Promise.all(
          images.map(async (img) => {
            if (!img.public_id) return img.image?.url || "";
            const res = await axios.get(
              `/secure-media/${img.resource_type || "image"}/${img.public_id}`
            );
            return res.data.url;
          })
        );
        setSignedUrls(urls);
      } catch (err) {
        console.error("Failed to fetch signed URLs:", err);
      }
    };
    fetchSignedUrls();
  }, [images]);

  // Calculate card styles for 3D effect on scroll
  useEffect(() => {
    if (!scrollRef.current || cardRefs.current.length === 0) return;

    const newStyles = cardRefs.current.map((card) => {
      if (!card) return { scale: 1, translateY: 0, rotateY: 0 };
      const container = scrollRef.current;
      const cardCenter =
        card.offsetLeft - container.scrollLeft + card.offsetWidth / 2;
      const containerCenter = container.clientWidth / 2;
      const distance = containerCenter - cardCenter;

      const scale = Math.max(0.9, 1 - Math.abs(distance) / 1500);
      const translateY = Math.max(-8, Math.min(8, -distance / 80));
      const rotateY = Math.max(-15, Math.min(15, distance / 40));

      return { scale, translateY, rotateY };
    });

    setStyles(newStyles);
  }, [scrollCenter, images]);

  const getRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 6 + 6}px`,
  });

  return (
    <section className="relative w-full bg-gradient-to-r from-[#141414] via-[#232323] to-[#0d0d0d] py-24 overflow-hidden">
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
        className="text-center text-4xl md:text-5xl font-bold text-[#f6c610] mb-6 tracking-wide z-10 drop-shadow-lg font-poppins"
      >
        Thumbnails
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-base md:text-lg max-w-3xl mx-auto text-gray-300 px-4 mb-14 z-10 relative font-outfit"
      >
        A glimpse into the creative journey — each thumbnail here is designed
        with precision and purpose, curated for real clients to maximize clicks,
        boost visibility, and leave a lasting impression.
      </motion.p>

      <div className="absolute inset-0 w-full h-full z-0">
        {Array.from({ length: 10 }).map((_, index) => {
          const pos = getRandomPosition();
          return (
            <div
              key={index}
              className="absolute bg-[#f6c610] rounded-full animate-pulse"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.size,
                height: pos.size,
              }}
            />
          );
        })}
      </div>

      <div
        ref={scrollRef}
        className="relative flex overflow-x-auto no-scrollbar gap-6 md:gap-10 z-10 px-4 md:px-0"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          overflowY: "hidden",
          paddingLeft: "calc(50vw - 100px)",
          paddingRight: "calc(50vw - 100px)",
          scrollBehavior: "smooth",
        }}
      >
        {displayImages.map((img, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="scroll-snap-align-center min-w-[250px] sm:min-w-[350px] md:min-w-[500px] lg:min-w-[600px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] flex-shrink-0 relative"
            style={{
              scale: styles[index]?.scale || 1,
              transform: `translateY(${
                styles[index]?.translateY || 0
              }px) rotateY(${styles[index]?.rotateY || 0}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.3s ease",
            }}
          >
            <div className="absolute inset-0 w-full h-full z-0">
              {Array.from({ length: 10 }).map((_, index) => {
                const pos = getRandomPosition();
                return (
                  <div
                    key={index}
                    className="absolute bg-[#f6c610] rounded-full animate-pulse"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.size,
                      height: pos.size,
                    }}
                  />
                );
              })}
            </div>

            <motion.div className="relative w-full h-full rounded-[2rem] bg-[#0d0d0d] border-[10px] border-[#0d0d0d] shadow-[0_0_25px_rgba(246,198,16,0.4)] flex items-center justify-center overflow-hidden">
              <motion.img
                src={img.src}
                alt={`Thumbnail ${index}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* Scroll hints */}
      {atStart && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-r-xl text-[#f6c610] flex items-center gap-2 z-20 animate-fadeIn">
          <span className="text-xl">&#8594;</span>
          <span className="font-medium md:inline">Scroll Right</span>
        </div>
      )}
      {atEnd && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0d0d0de6] backdrop-blur-sm rounded-l-xl text-[#f6c610] flex items-center gap-2 z-20 animate-fadeIn">
          <span className="font-medium md:inline">Scroll Left</span>
          <span className="text-xl">&#8592;</span>
        </div>
      )}
    </section>
  );
};

export default Thumbnail;
