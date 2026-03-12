import React, { useEffect, useState } from 'react'
import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Thumbnails = () => {

  const [image, setImage] = useState([]);

  // api call to get all images
  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`${API_URL}/media/admin/get-images`);

      if(response && response.data){
        // console.log(response.data.data)
        setImage(response.data.data);  //store images in state
      }
      else{
        console.log("Internal server error")
      }
    }

    fetchImages();
  }, [])

  return (
    <section className='flex flex-col pt-24 h-screen w-full' aria-label="YouTube thumbnails portfolio">
      
      {/* Heading */}
      <h2 className='text-primaryText select-none font-carterone font-semibold text-5xl uppercase text-center p-6'>
        Thumbnails
      </h2>

      {/* Glass Container */}
      <div className='w-[95%] mx-auto h-[70vh] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5'>

        {/* Scroll Area */}
        <div className='h-full overflow-y-auto no-scrollbar'>

          {/* Thumbnail Grid */}
          <div className='grid grid-cols-3 gap-7 p-4'>
            {/* images */}
            {
              image.map((img, index) => (
                <div className="rounded-lg select-none border border-white/20 overflow-hidden hover:scale-105 transition duration-300">
                  <img src={img.imageURL} alt="thumbnail" className="w-full h-full object-cover"/>
                </div>
              ))
            }
           
          </div>

        </div>
      </div>

    </section>
  )
}

export default Thumbnails