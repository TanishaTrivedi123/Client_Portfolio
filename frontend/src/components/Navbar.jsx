import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className='absolute z-30 top-6 left-0 right-0 w-full lg:max-w-5xl mx-auto h-14 p-4 sm:p-8 text-primaryText bg-hidden lg:bg-black backdrop-blur-sm flex lg:justify-center lg:items-center rounded-full' aria-label="Main Navigation">

      {/* Desktop Menu */}
      <ul className='hidden lg:flex gap-14'>
        <li className='font-quintessential select-none font-medium text-lg cursor-default'><NavLink to="/" className={({ isActive }) => `font-semibold px-5 py-2 rounded-full ${isActive ? "bg-orangeColor" : ""}`}>Home</NavLink></li>
        <li className='font-quintessential select-none font-medium text-lg cursor-default'><NavLink to="/thumbnails" className={({isActive}) => `font-semibold px-4 py-2 rounded-full ${isActive ? "bg-orangeColor" : ""}`}>Thumbnails</NavLink></li>
        <li className='font-quintessential select-none font-medium text-lg cursor-default'><NavLink to="/videos" className={({isActive}) => `font-semibold px-4 py-2 rounded-full ${isActive ? "bg-orangeColor" : ""}`}>Edits</NavLink></li>
        <li className='font-quintessential select-none font-medium text-lg cursor-default'><NavLink to="/contact" className={({isActive}) => `font-semibold px-4 py-2 rounded-full ${isActive ? "bg-orangeColor" : ""}`}>Contact Me</NavLink></li>
        <li className='font-quintessential select-none font-medium text-lg cursor-default'><NavLink to="/about" className={({isActive}) => `font-semibold px-4 py-2 rounded-full ${isActive ? "bg-orangeColor" : ""}`}>About Me</NavLink></li>
      </ul>

      {/* Mobile / Tablet Hamburger */}
      <div className='lg:hidden ml-4'>
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? <HiX className='w-9 h-9' /> : <HiMenu className='w-9 h-9' />}
        </button>
      </div>

      {/* Mobile / Tablet Dropdown */}
      {menuOpen && (
        <div className='absolute top-16 left-0 w-full bg-primaryBg backdrop-blur-sm flex flex-col items-center py-4 lg:hidden'>
          <NavLink to="/" className={({isActive}) => `font-quintessential select-none font-medium py-2 text-lg w-full text-center ${isActive ? "bg-orangeColor rounded-full" : ""}`} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/thumbnails" className={({isActive}) => `font-quintessential select-none font-medium py-2 text-lg w-full text-center ${isActive ? "bg-orangeColor rounded-full" : ""}`} onClick={toggleMenu}>Thumbnails</NavLink>
          <NavLink to="/videos" className={({isActive}) => `font-quintessential select-none font-medium py-2 text-lg w-full text-center ${isActive ? "bg-orangeColor rounded-full" : ""}`} onClick={toggleMenu}>Edits</NavLink>
          <NavLink to="/contact" className={({isActive}) => `font-quintessential select-none font-medium py-2 text-lg w-full text-center ${isActive ? "bg-orangeColor rounded-full" : ""}`} onClick={toggleMenu}>Contact Me</NavLink>
          <NavLink to="/about" className={({isActive}) => `font-quintessential select-none font-medium py-2 text-lg w-full text-center ${isActive ? "bg-orangeColor rounded-full" : ""}`} onClick={toggleMenu}>About Me</NavLink>
        </div>
      )}

    </nav>
  )
}

export default Navbar;