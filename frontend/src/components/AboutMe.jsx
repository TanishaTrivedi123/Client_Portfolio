import React from "react";

const AboutMe = () => {
  return (
    <section className="bg-primaryBg relative w-full pt-9 lg:pt-24 flex justify-center items-start">
      
      <div className="w-full min-h-[80vh] flex flex-col items-center gap-6 py-5 px-4">

        {/* HEADING */}
        <div className="lg:mt-4 p-4 mt-7">
          <h1 className="text-primaryText font-carterone font-normal 
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
            I'm <span className="text-orangeColor">Anuj</span>, <br /> Video Editor & Thumbnail Designer
          </h1>
        </div>

        {/* IMAGE */}
        <div className="p-3 text-primaryText flex justify-center -mt-28 lg:-mt-40 items-center w-full">
          <img 
            src="/aboutImage.png" 
            alt="My Image" 
            className="w-[600px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-full lg:h-[450px] object-cover lg:object-contain"
          />
        </div>

        {/* ⭐ Experience */}
        <div className="flex flex-col text-primaryText items-center gap-1 
                        lg:absolute lg:right-36 lg:top-2/3">
          
          <img 
            src="/5starImages.png" 
            alt="star images" 
            className="w-24 h-9 lg:h-14 sm:w-28 md:w-32 lg:w-36 object-cover"
          />

          <p className="text-primaryText text-base font-quintessential font-semibold leading-tight">
            2+ Years Experience
          </p>

        </div>

        {/* Paragraph */}
        <div className="font-quintessential text-primaryText text-center px-2
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