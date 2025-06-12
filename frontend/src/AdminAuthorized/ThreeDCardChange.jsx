import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaImage, FaVideo } from "react-icons/fa";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ThreeDCardChange = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(""); // "image" or "video"
  const [position, setPosition] = useState(""); // "left", "center", "right"
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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !type || !position) {
      toast.warn("Please select file, type and position");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("position", position);

    try {
      const res = await axios.post(`${API_URL}/assets/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Media uploaded successfully!");
      console.log("Uploaded asset:", res.data);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#0d0d0d] p-8 rounded-2xl shadow-lg w-full max-w-md border border-pink-400">
        <h2 className="text-2xl font-semibold text-center text-pink-400 mb-6 font-poppins">
          Upload Visual Asset
        </h2>

        {/* Media Preview */}
        <div className="flex justify-center mb-6">
          <div
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 flex items-center justify-center bg-[#1a1a1a] hover:scale-105 transition-transform duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              type === "video" ? (
                <video src={preview} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              )
            ) : (
              <FaImage className="text-5xl text-gray-500" />
            )}
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Type Dropdown */}
        <div className="mb-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1a1a1a] text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Type --</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Position Dropdown */}
        <div className="mb-6">
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1a1a1a] text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Position --</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Submit Button */}
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-bold py-2 rounded-md transition duration-300 font-outfit"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ThreeDCardChange;
