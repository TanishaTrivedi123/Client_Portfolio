import React from "react";

const AboutMe = () => {
  return (
    <section className="bg-primaryBg relative w-full pt-4 mb-4 lg:mb-1 lg:pt-24 flex justify-center items-start">
      
      <div className="w-full top-6 left-4 right-4 bottom-4 sm:top-6 sm:left-6 sm:right-6 sm:bottom-6 md:top-4 md:left-5 md:right-5 md:bottom-4 rounded-2xl flex flex-col items-center text-center px-4 sm:px-6 md:px-8 justify-start pt-12 gap-2 overflow-hidden lg:overflow-hidden lg:justify-center lg:gap-0">

        {/* HEADING */}
        <div className="lg:mt-0 p-4 mt-2">
          <h1 className="text-primaryText font-quintessential font-normal 
            text-3xl sm:text-4xl select-none md:text-5xl lg:text-6xl text-center">
            <span className="font-quintessential text-5xl sm:text-4xl select-none md:text-5xl lg:text-7xl">I'm</span> <span className="text-orangeColor font-quintessential text-5xl sm:text-4xl select-none md:text-5xl lg:text-7xl">Anuj</span> <br /> Video Editor & Thumbnail Designer
          </h1>
        </div>

        {/* IMAGE */}
        <div className="p-3 select-none text-primaryText flex justify-center -mt-24 lg:-mt-32 items-center w-full">
          <img 
            src="/aboutImage.png" 
            alt="My Image" 
            className="w-[600px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-full lg:h-[450px] object-cover lg:object-contain"
          />
        </div>

        {/* ⭐ Experience */}
        <div className="flex flex-col select-none text-primaryText items-center gap-1 
                        lg:absolute lg:right-36 lg:top-2/3">
          
          <img 
            src="/5starImages.png" 
            alt="star images" 
            className="w-24 bg-white/10 backdrop-blur-md rounded-full px-4 h-9 lg:h-11 sm:w-28 md:w-32 lg:w-36 object-cover"
          />

          <div className="m-2">
          <p className="text-primaryText text-base font-quintessential font-semibold leading-tight">
            2+ Years Experience
          </p>
          </div>
        </div>

        {/* Paragraph */}
        <div className="font-quintessential select-none text-primaryText text-center px-2
                        lg:absolute lg:top-2/3 lg:left-16 lg:text-left 
                        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm leading-relaxed break-words">
          <p>
            Specializing in high-impact video editing and eye-catching thumbnail design, delivering content that boosts engagement and strengthens digital presence. With 2+ years of experience, focused on creating visuals that not only look great but perform effectively across platforms.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;