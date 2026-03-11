import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className='absolute z-10 top-0 w-full h-20 p-4 sm:p-8 text-primaryText bg-white/10 backdrop-blur-sm flex justify-between items-center' aria-label="Main Navigation">
      
      {/* Logo / Brand */}
      <div className='font-quintessential font-semibold text-2xl'>
        <Link to="/">Anuj Trivedi</Link>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden lg:flex gap-14'>
        <li className='font-quintessential font-medium text-lg cursor-default'><Link to="/">Home</Link></li>
        <li className='font-quintessential font-medium text-lg cursor-default'><Link to="/thumbnails">Thumbnails</Link></li>
        <li className='font-quintessential font-medium text-lg cursor-default'><Link to="/videos">Edits</Link></li>
        <li className='font-quintessential font-medium text-lg cursor-default'><Link to="/contact">Contact Me</Link></li>
        <li className='font-quintessential font-medium text-lg cursor-default'><Link to="/about">About Me</Link></li>
      </ul>

      {/* Mobile / Tablet Hamburger */}
      <div className='lg:hidden flex items-center'>
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? <HiX className='w-7 h-7' /> : <HiMenu className='w-7 h-7' />}
        </button>
      </div>

      {/* Mobile / Tablet Dropdown */}
      {menuOpen && (
        <div className='absolute top-20 left-0 w-full bg-primaryBg backdrop-blur-sm flex flex-col items-center py-4 lg:hidden border-t border-white/20'>
          <Link to="/" className='font-quintessential font-medium py-2 text-lg w-full text-center hover:bg-white/10 transition' onClick={toggleMenu}>Home</Link>
          <Link to="/thumbnails" className='font-quintessential font-medium py-2 text-lg w-full text-center hover:bg-white/10 transition' onClick={toggleMenu}>Thumbnails</Link>
          <Link to="/videos" className='font-quintessential font-medium py-2 text-lg w-full text-center hover:bg-white/10 transition' onClick={toggleMenu}>Edits</Link>
          <Link to="/contact" className='font-quintessential font-medium py-2 text-lg w-full text-center hover:bg-white/10 transition' onClick={toggleMenu}>Contact Me</Link>
          <Link to="/about" className='font-quintessential font-medium py-2 text-lg w-full text-center hover:bg-white/10 transition' onClick={toggleMenu}>About Me</Link>
        </div>
      )}

    </nav>
  )
}

export default Navbar;