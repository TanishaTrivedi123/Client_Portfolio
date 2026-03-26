import React from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Videos = ({videos = [], setVideos, loading}) => {
  const token = localStorage.getItem("token");

  //fetch delete API
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async (video) => {
     try{
      const res = await axios.delete(`${API_URL}/media/admin/delete-video/${video._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if(res){
        toast.success("Video was successfully deleted")

        // ui se turant hatao us image ko
        setVideos(prev => prev.filter((vdo) => vdo._id != video._id))
      }
    }
    catch(error){
      console.log(error)
      toast.error("Video was not successfully deleted");
    }
  }

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
              <div className="columns-2 relative lg:columns-4 gap-5 p-4">

                {videos.map((video, index) => (

                  <div
                    key={index}
                    className="mb-5 relative select-none break-inside-avoid rounded-lg border border-white/20 overflow-hidden hover:scale-105 transition duration-300"
                  >

                    {/* DELETE ICON */}
                    {
                      token && (
                        <button onClick={() => handleDelete(video)} className="absolute z-10 top-2 right-2 bg-red-500 hover:bg-red-800 text-white p-2 rounded-full transition">
                            <MdDelete size={20} />
                        </button>
                      )
                    }

                    <video
                      src={video.videoURL}
                      preload="metadata"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      className="w-full object-cover z-0"
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