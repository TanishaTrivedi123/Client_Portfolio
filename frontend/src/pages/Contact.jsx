import React, { useEffect } from "react";
import gsap from "gsap";
import FloatingDots from "../components/shared/FloatingDots";

const Contact = () => {
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
    <div className="relative bg-black text-[#E0E0E0] min-h-screen flex justify-center items-start pt-32 px-4 pb-16 overflow-hidden">
      {/* Dark Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-black to-[#1a1a1a]" />

      {/* Glowing Abstract Shapes */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-[#7F5AF0]/10 rotate-45 blur-3xl rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#7F5AF0]/10 -rotate-12 blur-2xl rounded-full opacity-20 animate-pulse"></div>

      {/* ✨ Floating dots background */}
      <ul className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <li
            key={i}
            className="absolute bg-[#D946EF] rounded-full opacity-50 animate-floating-dot"
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

      {/* Content */}
      <div className="gsap-about max-w-2xl w-full text-center relative z-10">
        <h2 className="text-4xl font-bold text-[#7F5AF0] mb-10 drop-shadow-lg font-poppins">
          Contact Me
        </h2>

        <p
          className="gsap-about text-lg text-[#E0E0E0] leading-relaxed mb-10 font-outfit tracking-wide
          drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
        >
          If you're looking for
          <span className="text-[#D946EF] font-semibold">
            {" "}
            high-quality video editing
          </span>
          ,
          <span className="text-[#D946EF] font-semibold">
            {" "}
            eye-catching thumbnails
          </span>
          , or any kind of
          <span className="text-[#D946EF] font-semibold">
            {" "}
            creative visual content
          </span>
          — you're in the right place. Whether it's for
          <span className="text-[#D946EF] font-semibold"> YouTube</span>,
          <span className="text-[#D946EF] font-semibold"> Instagram</span>, or
          professional branding, I specialize in crafting
          <span className="text-[#D946EF] font-semibold">
            {" "}
            visually appealing
          </span>{" "}
          and
          <span className="text-[#D946EF] font-semibold">
            {" "}
            engaging videos
          </span>{" "}
          tailored to your vision. Let’s bring your ideas to life — feel free to
          contact me anytime!
        </p>

        <div className="gsap-about text-left bg-[#1c1c1c] backdrop-blur-sm border border-[#7F5AF0]/30 rounded-xl p-8 shadow-lg shadow-[#7F5AF0]/10 hover:shadow-[#7F5AF0]/30 space-y-6 font-poppins">
          <div className="flex items-center space-x-4">
            <span className="text-[#7F5AF0] text-xl">📞</span>
            <span className="text-[#E0E0E0] text-lg font-medium">
              +91 72239 78547
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#7F5AF0] text-xl">✉️</span>
            <span className="text-[#E0E0E0] text-lg font-medium">
              antrivofficial@gmail.com
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#7F5AF0] text-xl">📍</span>
            <span className="text-[#E0E0E0] text-lg font-medium">
              Dewas, Madhya Pradesh
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#7F5AF0] text-xl">🔗</span>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7F5AF0] hover:text-[#D946EF] hover:underline font-medium transition duration-300"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
