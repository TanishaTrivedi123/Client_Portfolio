import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../utils/api";

const CategoryButtons = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/thumbnails/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="pt-24 flex flex-wrap justify-center gap-12 mb-12 z-10 relative px-4 sm:px-8">
      {categories.length === 0 ? (
        <p className="text-[#7F5AF0] text-xl">No categories available</p>
      ) : (
        categories.map((cat) => (
          <motion.button
            key={cat._id || cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            whileHover={{
              scale: 1.06,
              color: "#E0E0E0",
            }}
            whileTap={{
              scale: 0.97,
            }}
            className={`
              relative font-semibold rounded-xl
              text-lg sm:text-xl md:text-2xl
              py-4 px-10
              bg-transparent text-[#E0E0E0]
              transition duration-300 ease-in-out
              cursor-pointer
              flex items-center justify-center
              select-none border border-[#7F5AF0]

              flex-basis-full max-w-full
              sm:flex-basis-[48%] sm:max-w-[48%]
              md:flex-basis-[31%] md:max-w-[31%]
              lg:flex-basis-[28%] lg:max-w-[28%]
              min-w-[250px]
              backdrop-blur-md
              overflow-hidden
            `}
            style={{
              boxShadow: "0 0 12px #7F5AF0, 0 0 18px #3EECAC, 0 0 24px #FF61D2", // permanent multi-color shadow
            }}
          >
            {/* Glow gradient background layer */}
            <span
              className="absolute inset-0 z-[-1] rounded-xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(127,90,240,0.25), transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <span className="absolute inset-0 rounded-xl z-[-2]" />
            {cat.name}
          </motion.button>
        ))
      )}
    </div>
  );
};

export default CategoryButtons;
