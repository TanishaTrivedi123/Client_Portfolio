import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddThumbnail = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !selectedCategory) {
      toast.warn("Please select image and category");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", selectedCategory);

    try {
      const res = await axios.post(`${API_URL}/add-thumbnail`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image uploaded successfully!");

      const originalUrl = res.data.thumbnail.image.url;
      const enhancedUrl = originalUrl.replace(
        "/upload/",
        "/upload/q_auto,f_auto/"
      );
      setUploadedUrl(enhancedUrl);

      const timestamp = new Date().toISOString();
      setImages((prev) => [{ url: enhancedUrl, timestamp }, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#0d0d0d] p-8 rounded-2xl shadow-lg w-full max-w-md border border-pink-400">
        <h2 className="text-2xl font-semibold text-center text-pink-400  mb-6 font-poppins">
          Upload Thumbnail
        </h2>

        <div className="flex justify-center mb-6">
          <div
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 flex items-center justify-center bg-[#1a1a1a] hover:scale-105 transition-transform duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Thumbnail preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <FaImage className="text-5xl text-gray-500" />
            )}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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

export default AddThumbnail;
