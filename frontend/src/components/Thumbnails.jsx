import React, { useEffect} from 'react'

const Thumbnails = ({images = [], loading}) => {

  return (
    <section className='flex flex-col mb-40 pt-24 h-screen w-full' aria-label="YouTube thumbnails portfolio">
      
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
                    <div key={index} className="rounded-lg select-none border border-white/20 overflow-hidden hover:scale-105 transition duration-300">
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