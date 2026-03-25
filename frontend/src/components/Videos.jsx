import React, { useEffect } from "react";
import axios from "axios";

const Videos = ({videos = [], loading}) => {

  return (
    <section className="flex mb-44 flex-col pt-28 h-screen w-full" aria-label="Video portfolio">

      {/* Heading */}
      <h2 className="text-primaryText select-none font-carterone font-semibold text-5xl uppercase text-center p-6">
        Edits
      </h2>

      {/* Glass Container */}
      <div className="w-[85%] lg:w-[95%] mx-auto h-[90vh] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-2 lg:p-5 ">

        {/* Scroll Area */}
        <div className="h-full overflow-y-auto no-scrollbar">
          {
            loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader font-quintessential font-semibold text-primaryText"></div>
              </div>
            ) : (
              <div className="columns-2 lg:columns-4 gap-5 p-4">

                {videos.map((video, index) => (

                  <div
                    key={index}
                    className="mb-5 select-none break-inside-avoid rounded-lg border border-white/20 overflow-hidden hover:scale-105 transition duration-300"
                  >

                    <video
                      src={video.videoURL}
                      preload="metadata"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      className="w-full object-cover"
                    />

                  </div>

                ))}

              </div>
            )
          }
        </div>

      </div>

    </section>
  );
};

export default Videos;