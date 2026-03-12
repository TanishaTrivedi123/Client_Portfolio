import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaDiscord } from "react-icons/fa";

const ContactMe = () => {
  return (
    <section className="min-h-screen w-full pt-24 flex flex-col items-center justify-center bg-primaryBg">

      {/* Heading */}
      <h2 className="text-primaryText select-none font-carterone font-semibold  text-5xl text-center mb-10">
        Contact Me
      </h2>

      {/* Contact Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 lg:p-10 max-w-sm lg:max-w-xl w-full text-center shadow-lg">

        {/* Description */}
        <p className="text-primaryText select-none font-quintessential font-normal text-lg opacity-80 mb-8">
  I'm a creative Thumbnail Designer and Video Editor. If you have a project, need eye-catching visuals, or want to bring your video ideas to life, feel free to reach out. I love collaborating with creators to make content that stands out.
</p>

        {/* Icons */}
        <div className="flex justify-center gap-10 text-3xl text-primaryText mb-6">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <FaInstagram />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:example@gmail.com"
            className="hover:scale-125 transition duration-300"
          >
            <FaEnvelope />
          </a>

          <a
            href="mailto:example@gmail.com"
            className="hover:scale-125 transition duration-300"
          >
            <FaDiscord />
          </a>

        </div>

      </div>

    </section>
  );
};

export default ContactMe;