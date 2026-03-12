import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UploadImage = () => {
    const fileRef = useRef();
    const [videoName, setVideoName] = useState("Click to select video");
    const [videoType, setVideoType] = useState("");

    // ------------------------function to show the video name on ui------------------------
    const handleVideo = (e) => {
        const file = e.target.files[0];
        console.log(file);
        
        if(file){
            setVideoName(file.name);
        }
    }

    // // --------------------------now send the image to backend so it saves the image---------------------
    const handleSubmit = async () => {
        const file = fileRef.current.files[0];
        
        if(!file){
            toast.error("No file selected");
            return;
        }

        if(!videoType){
          toast.error("Please select video type");
          return;
        }

        // Browser se file ko JSON me nahi bhej sakte, kyunki file binary hoti hai. Isliye FormData ka use hota hai.
        // Browser ke liye binary file ko send karne ka standard way FormData hai.
        const formData = new FormData();
        formData.append("video", file);
        formData.append("videoType", videoType);

        try{
            const response = await axios.post(`${API_URL}/media/admin/add-video`, formData, 
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            toast.success(response.data.msg); 
        }
        catch(error){
            console.log(error);
            toast.error("Upload Failed");
        }
    }

  return (
    <>
    <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="bg-zinc-900 p-10 rounded-xl shadow-2xl w-[420px]">
            <h2 className="text-white select-none text-2xl text-center mb-8 font-semibold font-carterone">
            Upload Video
          </h2>

           {/* Hidden Input */}
           <input type="file" ref={fileRef} onChange={handleVideo} accept="video/*" className='hidden' />

           {/* Fake Input UI */}
           <div onClick={() => fileRef.current.click()}
            className="w-full p-3 rounded-md bg-zinc-800 text-gray-300 border border-zinc-700 cursor-pointer hover:border-gray-400 transition mb-5"
          >
            {videoName}
          </div>

          {/* Video Type Select */}
        <select value={videoType} onChange={(e) => setVideoType(e.target.value)}
          className="w-full p-3 select-none rounded-md bg-zinc-800 text-gray-300 border border-zinc-700 mb-5 focus:outline-none"
        >
          <option value="">Select Video Type</option>
          <option value="horizontal">Horizontal</option>
          <option value="reel">Reel (Vertical)</option>
        </select>

           <button onClick={handleSubmit}
            className="w-full mt-6 p-3 select-none bg-white text-black font-medium font-quintessential rounded-md hover:bg-gray-300 transition"
          >
            Upload Image
          </button>

        </div>
    </div>
    </>
  )
}

export default UploadImage