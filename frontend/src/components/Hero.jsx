import React from 'react'

const Hero = () => {
  return (
    <section className='w-full h-screen relative' aria-label="Hero Section">

      {/* Video */}
      <video 
        src="/herovideo1.mp4" 
        autoPlay 
        muted 
        loop 
        className='absolute top-0 left-0 object-cover w-full h-full opacity-[0.9]'
      ></video>

      {/* Text over video */}
      <div className='text-primaryText w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 mt-9 md:mt-9'>

        {/* Heading */}
        <h1 className='font-carterone select-none font-extrabold text-4xl sm:text-4xl md:text-6xl leading-snug sm:leading-snug md:leading-tight max-w-full sm:max-w-xl md:max-w-4xl uppercase'>
          Cinematic Video Editing & Scroll-Stopping Thumbnails
        </h1>

        {/* Experience */}
        <p className='mt-8 sm:mt-8 md:mt-12 select-none px-4 sm:px-4 py-2 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm font-quintessential font-semibold uppercase cursor-default border border-white/20 text-sm sm:text-base md:text-base'>
          2+ Years of Experience
        </p>

        {/* Sub Heading */}
        <p className='font-quintessential font-semibold select-none text-xl sm:text-xl md:text-2xl mt-8 sm:mt-8 md:mt-12 max-w-lg sm:max-w-lg md:max-w-2xl'>
          Turning raw footage into engaging stories and designing thumbnails that grab attention and boost clicks.
        </p>
      </div>

    </section>
  )
}

export default Hero