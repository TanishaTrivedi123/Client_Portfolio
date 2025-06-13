import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../utils/api";
import SkeletonLoaderBox from "../shared/SkeletonLoaderBox";

const VideoCategoryButtons = () => {
  const [categories, setCategories] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setHasFetched(false);
        const res = await axios.get(`${API_URL}/categories/video`);
        const videoCategories = res.data.filter((cat) => cat.type === "video");
        setCategories(videoCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setHasFetched(true);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/videos/${encodeURIComponent(categoryName)}`);
  };

  const shouldShowLoader = !hasFetched || categories.length === 0;

  return (
    <div className="pt-0 mb-6 sm:mb-36 lg:mb-12 z-10 relative px-4 sm:px-6">
      {shouldShowLoader ? (
        <SkeletonLoaderBox
          count={10}
          className="min-w-[120px] h-[36px] sm:h-[48px] lg:h-[64px]"
        />
      ) : (
        <div
          className={`
            no-scrollbar grid lg:grid-cols-6 gap-4 sm:gap-6
            overflow-x-auto lg:overflow-x-visible
            grid-flow-col lg:grid-flow-row
            auto-cols-[minmax(120px,1fr)] sm:auto-cols-[minmax(160px,1fr)]
            snap-x snap-mandatory lg:snap-none
            scrollbar-hide pb-4 px-2 py-2 sm:py-3 lg:py-4
          `}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat._id || cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              whileHover={{ scale: 1.06, color: "#E0E0E0" }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative font-semibold rounded-lg sm:rounded-xl
                text-xs sm:text-base lg:text-lg
                py-1.5 px-3 sm:py-3 sm:px-6 lg:py-4 lg:px-8
                bg-transparent text-[#E0E0E0]
                transition duration-300 ease-in-out
                cursor-pointer flex items-center justify-center
                select-none border border-[#7F5AF0]
                backdrop-blur-md overflow-hidden snap-start
              `}
              style={{
                boxShadow:
                  "0 0 8px #7F5AF0, 0 0 12px #3EECAC, 0 0 16px #FF61D2",
                minWidth: "120px",
              }}
            >
              <span
                className="absolute inset-0 z-[-1] rounded-lg sm:rounded-xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(127,90,240,0.25), transparent 70%)",
                  filter: "blur(6px) sm:blur(8px)",
                }}
              />
              <span className="absolute inset-0 rounded-lg sm:rounded-xl z-[-2]" />
              {cat.name}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCategoryButtons;
