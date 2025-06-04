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
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-sm py-3" : "bg-black py-4"
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
                <span className="text-[#f6c610] ">My</span>
                <span className="text-white">Portfolio</span>
              </motion.div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
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
                      className="bg-[#f6c610] text-black px-5 py-3 rounded-lg font-semibold text-xl shadow transition hover:scale-105 hover:shadow-lg font-outfit" // Increased text size
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={
                        ({ isActive }) =>
                          `relative text-white font-orbitron text-xl font-medium group transition ${
                            isActive ? "text-[#f6c610]" : ""
                          }` // Increased text size here as well
                      }
                    >
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#f6c610] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#f6c610] focus:outline-none"
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
              className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg z-40"
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
                      className={
                        ({ isActive }) =>
                          item.name === "Contact"
                            ? "block bg-[#f6c610] text-black text-lg font-semibold py-3 px-5 rounded-md shadow transition hover:scale-105 font-poppins"
                            : `block text-white text-xl font-semibold py-2 border-b border-gray-800 transition font-outfit  ${
                                isActive ? "text-[#f6c610]" : ""
                              }` // Increased text size for mobile as well
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
