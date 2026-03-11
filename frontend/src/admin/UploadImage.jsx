import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UploadImage = () => {
    const fileRef = useRef();
    const [imageName, setImageName] = useState("Click to select image");

    // ------------------------function to show the image name on ui------------------------
    const handleImage = (e) => {
        const file = e.target.files[0];
        
        if(file){
            setImageName(file.name);
        }
    }

    // --------------------------now send the image to backend so it saves the image---------------------
    const handleSubmit = async () => {
        const file = fileRef.current.files[0];
        
        if(!file){
            toast.error("No file selected");
            return;
        }

        // Browser se file ko JSON me nahi bhej sakte, kyunki file binary hoti hai. Isliye FormData ka use hota hai.
        // Browser ke liye binary file ko send karne ka standard way FormData hai.
        const formData = new FormData();
        formData.append("image", file);

        try{
            const response = await axios.post(`${API_URL}/media/admin/add-image`, formData, 
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
            <h2 className="text-white text-3xl text-center mb-8 font-semibold font-carterone">
            Upload Image
          </h2>

           {/* Hidden Input */}
           <input type="file" ref={fileRef} accept="image/*" onChange={handleImage} className='hidden' />

           {/* Fake Input UI */}
           <div onClick={() => fileRef.current.click()}
            className="w-full p-3 rounded-md bg-zinc-800 text-gray-300 border border-zinc-700 cursor-pointer hover:border-gray-400 transition"
          >
            {imageName}
          </div>

           <button onClick={handleSubmit}
            className="w-full mt-6 p-3 bg-white text-black font-medium font-quintessential rounded-md hover:bg-gray-300 transition"
          >
            Upload Image
          </button>

        </div>
    </div>
    </>
  )
}

export default UploadImage