import React from "react";

const AboutMe = () => {
  return (
    <section className="bg-primaryBg min-h-screen w-full pt-24 flex justify-center items-start">
      <div className="max-w-6xl w-full flex flex-col items-center gap-8 py-5 px-4">

        {/* Top Side: Image */}
        <div className="flex justify-center w-full">
          <img
            src="/path-to-your-image.jpg" // replace with your image path
            alt="Anuj Trivedi"
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover border-2 border-gray-950 shadow-lg"
          />
        </div>

        {/* Bottom Side: Text */}
        <div className="flex-1 text-primaryText text-center">
          <h2 className="text-3xl font-carterone sm:text-4xl md:text-5xl font-semibold mb-6">
            Hi, I’m Anuj Trivedi 👋
          </h2>
          <p className="text-sm font-quintessential font-normal sm:text-base md:text-lg opacity-80 mb-3">
            I am a creative Thumbnail Designer and Video Editor. I help content creators stand out with eye-catching visuals and professional video editing.
          </p>
          <p className="text-sm font-quintessential font-normal sm:text-base md:text-lg opacity-80 mb-3">
            Over the years, I have collaborated with YouTubers, small businesses, and social media influencers, bringing their ideas to life with engaging thumbnails and professionally edited videos. I believe that great visuals are the key to capturing attention in today's digital world.
          </p>
          <p className="text-sm font-quintessential font-normal sm:text-base md:text-lg opacity-80 mb-3">
            My passion lies in combining creativity with technical skills to craft content that resonates with audiences and drives engagement. Every frame, every detail matters to me.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;