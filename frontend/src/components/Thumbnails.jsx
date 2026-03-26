import React from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const Thumbnails = ({images = [], setImages, loading}) => {
  const token = localStorage.getItem("token");

  //fetch delete API
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async (image) => {
    try{
      const res = await axios.delete(`${API_URL}/media/admin/delete-image/${image._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if(res){
        toast.success("Image was successfully deleted")

        // ui se turant hatao us image ko
        setImages(prev => prev.filter((img) => img._id != image._id))
      }
    }
    catch(error){
      print(error);
      toast.error("Image was not successfully deleted");
    }
  }

  return (
    <section className='flex flex-col mb-40 pt-28 h-screen w-full' aria-label="YouTube thumbnails portfolio">
      
      {/* Heading */}
      <h2 className='text-primaryText select-none font-carterone font-semibold text-5xl uppercase text-center p-6'>
        Thumbnails
      </h2>

      {/* Glass Container */}
      <div className='w-[85%] lg:w-[95%] mx-auto h-[90vh] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-2 lg:p-5'>

        {/* Scroll Area */}
        <div className='h-full overflow-y-auto no-scrollbar'>
          {
            loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader font-quintessential font-semibold text-primaryText"></div>
              </div>
            ) : ( 
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-7 p-4'>
                {
                  images.map((img, index) => (
                    <div key={index} className="relative rounded-lg select-none border border-white/20 overflow-hidden hover:scale-105 transition duration-300">
                      
                      {/* DELETE ICON */}
                      {
                        token && (
                          <button onClick={() => handleDelete(img)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-800 text-white p-2 rounded-full transition">
                        <MdDelete size={20} />
                      </button>
                        )
                      }

                      <img src={img.imageURL}  loading="lazy" alt="thumbnail" className="w-full h-full object-cover"/>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>

      </div>

    </section>
  )
}

export default Thumbnails