import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EnterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    const expireTime = localStorage.getItem("expireTime");
    const currentTime = new Date().getTime();

    if (admin !== "true" || !expireTime || currentTime > parseInt(expireTime)) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("expireTime");
      navigate("/admin"); // 🔐 Redirect to login if expired
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-2xl p-8 border border-pink-400/30 text-center">
        <h1 className="text-3xl font-bold text-pink-400 mb-8 tracking-wider uppercase font-poppins">
          Admin Panel
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/add-thumbnail")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg font-outfit"
          >
            <FaPlus />
            Add Thumbnail
          </button>

          <button
            onClick={() => navigate("/add-short-videos")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg font-outfit"
          >
            <FaPlus />
            Add Short Video
          </button>

          <button
            onClick={() => navigate("/add-category")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg font-outfit"
          >
            <FaPlus />
            Add Category for Thumbnail
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterPage;
