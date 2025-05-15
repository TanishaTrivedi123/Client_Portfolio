import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* About Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#f6c610] mb-4 font-poppins">
            About Me
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs font-outfit">
            I’m Anuj Trivedi, a passionate Video Editor and Thumbnail Designer.
            I aim to bring ideas to life with creativity, detail, and impactful
            visuals.
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#f6c610] mb-4 font-poppins">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-gray-400 font-outfit">
            <li>
              <a href="/" className="hover:text-[#f6c610] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#f6c610] transition">
                About
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-[#f6c610] transition">
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#f6c610] transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#f6c610] mb-4 font-poppins">
            Connect
          </h2>
          <div className="flex gap-4 text-[#f6c610] text-lg">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:scale-110 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:scale-110 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:scale-110 transition" />
            </a>
            <a href="mailto:anuj@example.com">
              <FaEnvelope className="hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6 font-outfit">
        {" "}
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
