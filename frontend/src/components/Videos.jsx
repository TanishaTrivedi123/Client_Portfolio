import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Videos = () => {

  const [video, setVideo] = useState([]);

   // api call to get all images
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`${API_URL}/media/admin/get-videos`);

      if(response && response.data){
        // console.log(response.data.data)
        setVideo(response.data.data);  //store images in state
      }
      else{
        console.log("Internal server error")
      }
    }

    fetchVideos();
  }, [])

  return (
    <section className="flex flex-col pt-24 h-screen w-full" aria-label="Video portfolio">

      {/* Heading */}
      <h2 className="text-primaryText select-none font-carterone font-semibold  text-5xl uppercase text-center p-6">
        Edits
      </h2>

      {/* Glass Container */}
      <div className="w-[85%] lg:w-[95%] mx-auto h-[70vh] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-2 lg:p-5 ">

        {/* Scroll Area */}
        <div className="h-full overflow-y-auto no-scrollbar">

          {/* Masonry Layout */}
          <div className="columns-3 lg:columns-4 gap-5 p-4">

            {video.map((video, index) => (

              <div
                key={index}
                className="mb-5 select-none break-inside-avoid rounded-lg border border-white/20 overflow-hidden hover:scale-105 transition duration-300"
              >

                <video
                  src={video.videoURL}
                  controls
                  className="w-full object-cover"
                />

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Videos;