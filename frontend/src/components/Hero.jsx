import React from 'react'

const Hero = () => {
  return (
    <section className='w-full bg-black h-[80vh] lg:h-screen relative overflow-hidden' aria-label="Hero Section">

      <div className='absolute bg-sectionBg top-6 left-4 right-4 bottom-4 sm:top-6 sm:left-6 sm:right-6 sm:bottom-6 md:top-4 md:left-5 md:right-5 md:bottom-4 rounded-2xl flex flex-col items-center text-center px-4 sm:px-6 md:px-8 justify-start pt-12 gap-2 overflow-hidden lg:overflow-hidden lg:justify-center lg:gap-0'>

        {/* Heading */}
        <h1 className='font-carterone text-primaryText select-none font-extrabold uppercase text-3xl sm:text-4xl md:text-6xl leading-snug sm:leading-snug md:leading-tight max-w-full sm:max-w-xl md:max-w-5xl lg:absolute lg:top-44 lg:-translate-y-1/2 pt-5 relative z-10'>
          Video Editor <span className='block lg:inline text-orangeColor font-quintessential'>&</span> Thumbnail Designer
        </h1>

        {/* Experience badge — mobile only, shown below heading */}
        <p className='block lg:hidden select-none text-primaryText px-4 py-1.5 rounded-full bg-orangeColor font-quintessential font-semibold uppercase border border-white/20 text-[13px] relative z-10 mt-4'>
          2+ Years of Experience
        </p>

        {/* Image — height fixed via parent div, scroll pe resize nahi hogi */}
        <div className='absolute bottom-0 left-0 right-0 flex justify-center items-end z-10 h-[50%] lg:h-full'>
          <img
            src="/heroImage.png"
            className='h-full w-auto max-w-none object-contain object-bottom lg:h-[65vh]'
            alt="My Image"
          />
        </div>

        {/* Desktop experience badge */}
        <p className='hidden lg:block select-none text-primaryText px-4 py-1.5 mt-4 rounded-full bg-orangeColor font-quintessential font-semibold uppercase border border-white/20 text-base relative z-30 lg:absolute lg:right-24 lg:bottom-60'>
          2+ Years of Experience
        </p>

        {/* Desktop subheading */}
        <p className='hidden lg:block font-quintessential text-primaryText mt-7 font-semibold select-none text-lg sm:text-xl md:text-2xl text-center px-4 lg:absolute lg:left-14 lg:bottom-28 lg:text-left lg:p-4 lg:leading-9'>
          Turning raw footage into engaging{' '}
          <br className='hidden lg:block' />
          stories and designing{' '}
          <br className='hidden lg:block' />
          thumbnails that{' '}
          <br className='hidden lg:block' />
          grab attention{' '}
          <br className='hidden lg:block' />
          and boost{' '}
          <br className='hidden lg:block' />
          clicks.
        </p>

      </div>

    </section>
  )
}

export default Hero