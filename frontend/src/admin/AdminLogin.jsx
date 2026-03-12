import React, { useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AdminLogin = () => {
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const password = passwordRef.current.value; 

        if(password == ""){
            toast.error("Password is required");
            return;
        }
        
        try{
            const response = await axios.post(`${API_URL}/auth/admin/login`, {
                password
            });

            // set the token in localstorage
            localStorage.setItem("token", response.data.token);

            toast.success(response.data.msg);
            navigate("/admin/dashboard");
        }
        catch(error){
            console.log(error);
            toast.error("Internal Server Error")
        }
    }

  return (
    <>
    <div className="h-screen w-full flex items-center justify-center bg-black">

        <div className="bg-zinc-900 p-10 rounded-xl shadow-2xl w-[380px]">

            <h2 className="text-white select-none font-carterone text-3xl font-semibold text-center p-2 mb-8">
                Admin Panel
            </h2>

            <div className="flex flex-col gap-6">

                <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter admin password"
                    className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 outline-none border border-zinc-700 focus:border-gray-400 transition"
                />

                <button onClick={handleSubmit}
                    className="w-full p-3 bg-white select-none text-black border border-zinc-700 font-medium font-quintessential rounded-md hover:bg-gray-300 transition"
                >
                    Login
                </button>

            </div>

        </div>

    </div>
    </>
  )
}

export default AdminLogin