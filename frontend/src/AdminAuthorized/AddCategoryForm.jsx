import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { toast } from "react-toastify";

const CategoryForm = ({ onAdd }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("thumbnail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      return toast.error("Please enter a category name");
    }

    try {
      const res = await axios.post(`${API_URL}/add-category`, {
        name: categoryName.trim(),
        type: categoryType, // ✅ correct value user ke select ke hisab se
      });

      setCategoryName(""); // ✅ only reset name
      // setCategoryType("thumbnail"); ❌ remove this line
      toast.success("✅ Category added successfully!");
      if (onAdd) onAdd(res.data.category);
    } catch (err) {
      toast.error("⚠️ Category already exists or something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-xl p-8 border border-pink-400">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-6 text-center font-poppins tracking-wide">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-pink-500 bg-black text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          >
            <option value="thumbnail">Thumbnail</option>
            <option value="video">Video</option>
          </select>

          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 rounded-md border border-pink-500 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF61C7] via-[#7F5AF0] to-[#2e026d] hover:brightness-110 text-black font-semibold py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg font-outfit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
