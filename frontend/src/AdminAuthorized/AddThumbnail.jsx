import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import { API_URL } from "../utils/api";

const AddThumbnail = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [images, setImages] = useState([]); // Store images in array
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warn("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(`${API_URL}/add-thumbnail`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image uploaded successfully!");

      // 🔥 Enhance the image URL quality
      const originalUrl = res.data.thumbnail.image.url;
      const enhancedUrl = originalUrl.replace(
        "/upload/",
        "/upload/q_auto,f_auto/"
      );

      setUploadedUrl(enhancedUrl);

      // Generate unique timestamp to maintain order
      const timestamp = new Date().toISOString();

      // Prepend the new image URL with timestamp to ensure proper order
      setImages((prevImages) => [
        { url: enhancedUrl, timestamp },
        ...prevImages,
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#0d0d0d] p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#f6c610]">
        <h2 className="text-2xl font-semibold text-center text-[#f6c610] mb-6">
          Upload Thumbnail
        </h2>

        {/* Preview Circle */}
        <div className="flex justify-center mb-6">
          <div
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-4 border-[#f6c610] flex items-center justify-center bg-[#1a1a1a] hover:scale-105 transition-transform duration-300"
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

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-[#f6c610] text-black font-bold py-2 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddThumbnail;
