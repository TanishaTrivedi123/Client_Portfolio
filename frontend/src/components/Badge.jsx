import React from 'react'

const skills = [
  "Video Editing", "Color Grading", "Motion Graphics", "Cinematic Edits", "Dynamic Transitions", 
  "Seamless Cuts", "Short-form Editing", "Long-form Editing", "YouTube Editing", "Reels / Shorts Editing", 
  "Creative Effects", "Engaging Visuals", "Click-Worthy Thumbnails", "Eye-Catching Layouts", 
  "Contrast & Color Balance", "Attention-Grabbing Design", "Custom Thumbnail Design", "Creative Visual Concepts"
];

const Badge = () => {
  return (
    <section className='p-6 sm:p-10 w-full flex flex-col justify-center items-center' aria-label="Video editing and thumbnail design skills">
      
      {/* Section Heading */}
      <h2 className='text-primaryText font-carterone font-semibold text-3xl sm:text-3xl md:text-4xl text-center select-none p-3'>
        Editing & Thumbnail Expertise
      </h2>

      {/* Skills Badges */}
      <div className='text-primaryText mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-4'>
        {skills.map((val, key) => (
          <span 
            key={key}
            className="px-3 sm:px-4 py-1 sm:py-1.5 font-quintessential font-medium bg-white/10 border select-none border-white/20 rounded-full text-xs sm:text-sm md:text-sm uppercase tracking-wide transition duration-300 hover:bg-white hover:text-black hover:scale-105 cursor-default"
          >
            {val}
          </span>
        ))}
      </div>

    </section>
  )
}

export default Badge;