import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-black">

        <div className="bg-zinc-900 p-10 rounded-xl shadow-2xl w-[380px]">

          <h2 className="text-white text-3xl font-carterone font-semibold font-opensans text-center mb-8">
            Admin Dashboard
          </h2>

          <div className="flex flex-col gap-5">

            <button onClick={() => navigate("/admin/dashboard/upload-image")}
              className="w-full p-3 bg-white text-black font-medium font-quintessential rounded-md border border-zinc-700 hover:bg-gray-300 transition"
            >
              Upload Image
            </button>

            <button onClick={() => navigate("/admin/dashboard/upload-video")}
              className="w-full p-3 bg-white text-black font-medium font-quintessential rounded-md border border-zinc-700 hover:bg-gray-300 transition"
            >
              Upload Video
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default AdminDashboard