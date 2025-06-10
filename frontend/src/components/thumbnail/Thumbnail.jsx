import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import FloatingDots from "../shared/FloatingDots";
import { API_URL } from "../../utils/api";
import SkeletonLoaderBox from "../shared/SkeletonLoaderBox";

const Thumbnail = () => {
  const scrollRef = useRef(null);
  const { categoryName } = useParams();

  const [images, setImages] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // ensures we wait for images

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setHasFetched(false); // reset before new fetch
        let url = `${API_URL}/thumbnails`;
        if (categoryName) {
          url += `?category=${encodeURIComponent(categoryName)}`;
        }

        const start = Date.now();
        const res = await axios.get(url);
        const end = Date.now();
        const elapsed = end - start;
        const delay = Math.max(1500 - elapsed, 0); // min 1.5s

        setTimeout(() => {
          setImages(res.data || []);
          setHasFetched(true); // fetching done
        }, delay);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImages([]);
        setHasFetched(true);
      }
    };

    fetchImages();

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [categoryName]);

  const shouldShowLoader = !hasFetched || images.length === 0;

  return (
    <section className="w-full bg-black pt-40 sm:pt-36 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden relative">
      <FloatingDots />

      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#03A9F4] text-center mb-14 sm:mb-16 px-4 leading-tight drop-shadow-[0_0_15px_#7F5AF0] font-extrabold ">
        {categoryName ? (
          <>
            Showing thumbnails for:{" "}
            <span className="font-bold text-[#FF3CAC]">{categoryName}</span>
          </>
        ) : (
          <>All Thumbnails</>
        )}
      </h2>

      {shouldShowLoader ? (
        <SkeletonLoaderBox
          count={6}
          className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] 
               h-[220px] sm:h-[280px] md:h-[340px]"
        />
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
