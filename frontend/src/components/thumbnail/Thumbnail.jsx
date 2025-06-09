import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import FloatingDots from "../FloatingDots";
import { API_URL } from "../../utils/api";

// 🌟 Skeleton Loader with responsive thumbnail size + spacing
const SkeletonThumbnail = () => {
  const dummyArray = Array.from({ length: 6 });

  return (
    <div className="flex overflow-x-auto gap-6 px-4 no-scrollbar py-4">
      {dummyArray.map((_, index) => (
        <motion.div
          key={index}
          className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] 
                     h-[220px] sm:h-[280px] md:h-[340px] 
                     rounded-[1.8rem] flex-shrink-0 
                     border-[6px] border-black 
                     bg-gradient-to-br from-[#1e1b33] to-[#2b2645] 
                     animate-pulse shadow-[0_0_45px_#673AB780]"
          style={{
            boxShadow:
              "inset 0 0 0 3px #000, 0 0 20px rgba(103, 58, 183, 0.6), 0 10px 25px rgba(3, 169, 244, 0.3)",
          }}
        ></motion.div>
      ))}
    </div>
  );
};

const Thumbnail = () => {
  const scrollRef = useRef(null);
  const { categoryName } = useParams(); // may be undefined on homepage

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        let url = `${API_URL}/thumbnails`;
        if (categoryName) {
          url += `?category=${encodeURIComponent(categoryName)}`;
        }

        const start = Date.now(); // timer start
        const res = await axios.get(url);
        const end = Date.now(); // timer end

        const elapsed = end - start;
        const delay = Math.max(1500 - elapsed, 0); // at least 1.5s loader

        setTimeout(() => {
          setImages(res.data || []);
          setIsLoading(false);
        }, delay);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImages([]);
        setIsLoading(false);
      }
    };

    fetchImages();

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [categoryName]);

  return (
    <section className="w-full bg-black pt-40 sm:pt-36 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden relative">
      <FloatingDots />

      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#03A9F4] text-center mb-14 sm:mb-16 px-4 leading-tight">
        {categoryName ? (
          <>
            Showing thumbnails for:{" "}
            <span className="font-bold text-[#FF3CAC]">{categoryName}</span>
          </>
        ) : (
          <>All Thumbnails</>
        )}
      </h2>

      {isLoading ? (
        <SkeletonThumbnail />
      ) : images.length === 0 ? (
        <p className="text-center text-[#f6c610] text-xl">
          No thumbnails found.
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 no-scrollbar py-4"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] 
                 h-[220px] sm:h-[280px] md:h-[340px] 
                 rounded-[1.8rem] overflow-hidden flex-shrink-0 
                 border-[6px] border-black bg-black 
                 shadow-[0_0_45px_#673AB780]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              style={{
                boxShadow:
                  "inset 0 0 0 3px #000, 0 0 20px rgba(103, 58, 183, 0.6), 0 10px 25px rgba(3, 169, 244, 0.3)",
              }}
            >
              <img
                src={img.image?.url || img.url}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover rounded-[1.5rem]"
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Thumbnail;
