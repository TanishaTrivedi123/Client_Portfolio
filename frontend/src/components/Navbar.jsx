import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Thumbnails", path: "/thumbnails" },
    { name: "Videos", path: "/Videos" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F1C]/90 backdrop-blur-sm py-3"
            : "bg-[#0A0F1C] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-poppins cursor-pointer sm:text-3xl md:text-4xl"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#7F5AF0]">My</span>
                <span className="text-[#E0E0E0]">Portfolio</span>
              </motion.div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  {item.name === "Contact" ? (
                    <NavLink
                      to={item.path}
                      className="bg-[#7F5AF0] text-black px-5 py-3 rounded-lg font-semibold text-xl md:text-2xl lg:text-xl shadow transition hover:scale-105 hover:shadow-lg font-outfit"
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative text-[#E0E0E0] font-orbitron font-medium group transition md:text-2xl lg:text-xl ${
                          isActive ? "text-[#7F5AF0]" : ""
                        }`
                      }
                    >
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#7F5AF0] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[#7F5AF0] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#0A0F1C]/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg z-40"
            >
              <div className="px-6 py-6 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        item.name === "Contact"
                          ? "block bg-[#7F5AF0] text-black text-lg md:text-xl font-semibold py-3 px-5 rounded-md shadow transition hover:scale-105 font-poppins"
                          : `block text-[#E0E0E0] font-semibold py-2 border-b border-gray-800 transition font-outfit text-xl md:text-2xl ${
                              isActive ? "text-[#7F5AF0]" : ""
                            }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
