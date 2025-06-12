import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaVideo } from "react-icons/fa";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [videoType, setVideoType] = useState(""); // 🆕 New state
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    const expireTime = localStorage.getItem("expireTime");
    const currentTime = new Date().getTime();
    if (admin !== "true" || !expireTime || currentTime > parseInt(expireTime)) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("expireTime");
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories/video`);
        const filtered = res.data.filter(
          (cat) => cat.type?.toLowerCase() === "video"
        );
        setCategories(filtered);
      } catch (err) {
        console.error("Error fetching video categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video || !selectedCategory || !videoType) {
      toast.warn("Please select video, category, and type");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("category", selectedCategory);
    formData.append("format", videoType === "reel" ? "portrait" : "landscape");
    formData.append("type", "video");

    try {
      const res = await axios.post(`${API_URL}/add-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Video uploaded successfully!");
      const originalUrl = res.data.video.video.url;
      const enhancedUrl = originalUrl.replace(
        "/upload/",
        "/upload/q_auto,f_auto/"
      );
      setUploadedUrl(enhancedUrl);
      const timestamp = new Date().toISOString();
      setVideos((prev) => [{ url: enhancedUrl, timestamp }, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#0d0d0d] p-8 rounded-2xl shadow-lg w-full max-w-md border border-pink-400">
        <h2 className="text-2xl font-semibold text-center text-pink-400 mb-6 font-poppins">
          Upload Video
        </h2>

        {/* Preview Circle */}
        <div className="flex justify-center mb-6">
          <div
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 flex items-center justify-center bg-[#1a1a1a] hover:scale-105 transition-transform duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <video
                src={preview}
                className="object-cover w-full h-full"
                playsInline
                muted
                autoPlay
                loop
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              />
            ) : (
              <FaVideo className="text-5xl text-gray-500" />
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Category Dropdown */}
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1a1a1a] text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🆕 Video Type Dropdown */}
        <div className="mb-6">
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1a1a1a] text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Video Type --</option>
            <option value="reel">Portrait Video (9:16)</option>
            <option value="normal">Landscape Video (16:9)</option>
          </select>
        </div>

        {/* Submit Button */}
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-bold py-2 rounded-md transition duration-300 font-outfit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
