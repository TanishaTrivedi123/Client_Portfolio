import React, { useEffect } from "react";
import gsap from "gsap";
import FloatingDots from "../components/shared/FloatingDots";

const About = () => {
  useEffect(() => {
    gsap.fromTo(
      ".gsap-about",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="relative bg-black text-[#E0E0E0] min-h-screen flex justify-center items-start pt-32 px-4 pb-20 overflow-hidden">
      {/* Textured background overlays */}
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0d0d0d] z-0"></div>

      {/* ✨ Floating dots background */}
      <ul className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <li
            key={i}
            className="absolute bg-[#f6c610] rounded-full opacity-50 animate-floating-dot"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </ul>

      {/* Dots Background */}
      <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm" />
      <FloatingDots />

      <div className="max-w-4xl w-full text-center relative z-10">
        <img
          src="photo7.png"
          loading="lazy"
          alt="Client"
          className="gsap-about w-64 h-64 mx-auto mb-8 rounded-full border-4 border-gradient-to-r from-[#7F5AF0] via-[#D946EF] to-[#00FFF7] object-cover shadow-[0_0_20px_#7F5AF0] transition-transform duration-500 hover:scale-105 animate-float"
        />
        <h2 className="gsap-about text-4xl font-bold text-[#7F5AF0] mb-8 drop-shadow-xl font-poppins tracking-wide">
          About Me
        </h2>
        <p className="gsap-about text-lg text-[#E0E0E0] leading-relaxed mb-6 font-outfit">
          Hey there! I’m a passionate and detail-oriented{" "}
          <span className="text-[#7F5AF0] font-semibold font-poppins">
            Video Editor
          </span>{" "}
          and{" "}
          <span className="text-[#7F5AF0] font-semibold font-poppins">
            Thumbnail Designer
          </span>{" "}
          — driven by creativity and a strong commitment to quality. I’ve been
          shaping visual stories and digital experiences since my school days,
          and it’s something I genuinely love doing.
        </p>
        <p className="gsap-about text-lg text-[#E0E0E0] leading-relaxed mb-6 font-outfit">
          Starting my journey back in 10th grade, I’ve put in countless hours
          honing my skills and learning how to turn simple ideas into visually
          stunning results. I believe every project is an opportunity to create
          something memorable — whether it’s a scroll-stopping thumbnail or a
          video that truly connects with its viewers.
        </p>
        <p className="gsap-about text-lg text-[#E0E0E0] leading-relaxed mb-6 font-outfit">
          I’ve had the pleasure of editing videos and designing content for
          YouTubers and Instagram creators, helping them elevate their content
          and boost engagement. From reels to long-form edits, I bring a
          creative and thoughtful approach to every piece.
        </p>
        <p className="gsap-about text-lg text-[#E0E0E0] leading-relaxed mb-6 font-outfit">
          You can check out some of the thumbnails and videos I’ve created for
          real clients in the{" "}
          <span className="text-[#7F5AF0] font-semibold font-poppins">
            Thumbnails
          </span>{" "}
          and{" "}
          <span className="text-[#7F5AF0] font-semibold font-poppins">
            Videos
          </span>{" "}
          section — every design reflects a story and a purpose.
        </p>
        <p
          className="gsap-about text-lg text-[#E0E0E0] leading-relaxed font-outfit tracking-wide
          drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
        >
          If you're looking for someone who’s dedicated, reliable, and truly
          enjoys the craft of visual storytelling — I’m here to make your
          content shine. Let’s bring your vision to life!
        </p>
      </div>
    </div>
  );
};

export default About;
