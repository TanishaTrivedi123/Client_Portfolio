import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EnterPage from "../AdminAuthorized/EnterPage";
import { API_URL } from "../utils/api";

const Admin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const SecretKeyRef = useRef();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSecretKeyHandler = async (event) => {
    event.preventDefault();
    const secretKey = SecretKeyRef.current.value.trim();

    if (!secretKey) {
      toast.warning("Please enter the secret kay! ");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/verify-admin`, {
        secretKey: secretKey,
      });

      if (response.data.success) {
        toast.success("Welcome to the authorized panel!");

        const expireTime = new Date().getTime() + 5 * 60 * 1000;
        //Save admin authentication status
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("expireTime", expireTime);

        // Redirect to EnterPage
        navigate("/EnterPage");
      } else {
        toast.error("Invalid key entered!");
      }
    } catch (error) {
      console.error("Error verifying secret key!");
      toast.error("Server error! Please try again later!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-2xl p-8 border border-[#f6c610]/40 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-[#f6c610] mb-8 tracking-wide">
          Admin Access
        </h2>

        <form onSubmit={onSecretKeyHandler}>
          <label className="block text-[#f6c610] text-sm font-medium mb-2">
            Enter Secret Key
          </label>

          <div className="relative">
            <input
              ref={SecretKeyRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-black text-white border border-[#f6c610] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f6c610]"
              placeholder="••••••••"
            />
            <span
              onClick={togglePassword}
              className="absolute inset-y-0 right-3 flex items-center text-[#f6c610] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#f6c610] hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
