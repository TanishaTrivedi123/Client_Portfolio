import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black backdrop-blur-sm text-[#E0E0E0] py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* About Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#7F5AF0] mb-4 font-poppins">
            About Me
          </h2>
          <p className="text-sm text-[#E0E0E0] leading-relaxed max-w-xs font-outfit">
            I’m Anuj Trivedi, a passionate Video Editor and Thumbnail Designer.
            I aim to bring ideas to life with creativity, detail, and impactful
            visuals.
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#7F5AF0] mb-4 font-poppins">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-[#E0E0E0] font-outfit">
            <li>
              <a href="/" className="hover:text-[#D946EF] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#D946EF] transition">
                About
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-[#D946EF] transition">
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#D946EF] transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#7F5AF0] mb-4 font-poppins">
            Connect
          </h2>
          <div className="flex gap-4 text-[#7F5AF0] text-lg">
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
      <div className="text-center text-sm text-[#E0E0E0] mt-10 border-t border-[#7F5AF0] pt-2 font-outfit">
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
