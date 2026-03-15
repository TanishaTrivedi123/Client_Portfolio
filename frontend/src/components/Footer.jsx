import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-sm border-t border-white/20 text-primaryText" aria-label="Website footer">
      
      <div className="max-w-7xl mx-auto px-6 py-4 lg:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <h3 className="text-lg select-none font-carterone font-semibold mb-2">
            Hi, I’m Anuj Trivedi
          </h3>
          <p className="text-sm select-none font-quintessential opacity-80 mb-2">
            I create eye-catching thumbnails and edit videos that help creators stand out online.
          </p>
          <p className="text-sm font-quintessential opacity-70">
            Let’s bring your content to life!
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:scale-110 transition">
            <FaInstagram />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaEnvelope />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaLinkedin />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaDiscord />
          </a>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-xs select-none font-quintessential opacity-70 border-t border-white/10 py-3">
        © {new Date().getFullYear()} Anuj Trivedi • All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;