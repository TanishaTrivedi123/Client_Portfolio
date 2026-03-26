import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThumbnailPage from "./pages/ThumbnailPage"
import VideoPage from './pages/VideoPage'
import AboutMePage from './pages/AboutMePage'
import ContactMePage from './pages/ContactMePage'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import UploadImage from './admin/UploadImage'
import UploadVideo from './admin/UploadVideo'
import ProtectedRoute from './routes/ProtectedRoute'
import { jwtDecode } from "jwt-decode";
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'

const App = () => {
  const [video, setVideo] = useState([]);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch images and videos at the mount of the page
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

  const fetchData = async () => {
    try {

      const [videoResponse, imageResponse] = await Promise.all([
        axios.get(`${API_URL}/media/admin/get-videos`),
        axios.get(`${API_URL}/media/admin/get-images`)
      ]);

      if(videoResponse && videoResponse.data && videoResponse.data.data.length > 0){
        console.log(videoResponse.data.data)
        setVideo(videoResponse.data.data);
      }

      if(imageResponse && imageResponse.data && imageResponse.data.data.length > 0){
        // console.log(imageResponse.data.data)
        setImage(imageResponse.data.data);
      }

      setLoading(false);

    }
    catch(error){
      console.log("Internal server error", error);
    }

  }

  fetchData();

  }, [])

  // auto logout when token expired
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000  //convert to ms
      const currentTime = Date.now();

      const timeleft = expiryTime - currentTime;

      if(timeleft <= 0){
        localStorage.removeItem("token");
      }
      else{
        setTimeout(() => {
          localStorage.removeItem("token");
        }, timeleft)
      }
    }
  }, [])

  return (
    <>
    <Navbar />
    <Routes>

      {/* Home Page */}
      <Route path='/' element={<HomePage />} />
      
      {/* Thumbnail Page */}
      <Route path='/thumbnails' element={<ThumbnailPage images={image} setImages={setImage} loading={loading} />} />

      {/* Video Page */}
      <Route path='/videos' element={<VideoPage videos={video} setVideos={setVideo} loading={loading} />} />

      {/* About Page */}
      <Route path='/about' element={<AboutMePage />}/>

      {/* Contact Page */}
      <Route path='/contact' element={<ContactMePage />}/>

      {/* -------------------------Admin login and admin dashboard------------------------- */}
      {/* Admin login */}
      <Route path='/admin' element={<AdminLogin />} />

      {/* Admin Dashboard */}
      <Route path='/admin/dashboard' element={<ProtectedRoute ><AdminDashboard /></ProtectedRoute>} />

      {/*------------------------ Admin dashboard after login (Protected)----------------------*/}
      <Route path='/admin/dashboard/upload-image' element={<ProtectedRoute><UploadImage /></ProtectedRoute>}/>

      <Route path='/admin/dashboard/upload-video' element={<ProtectedRoute><UploadVideo /></ProtectedRoute>}/>

      {/* Page for any other endpoint */}
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    <Footer />
    <ToastContainer />
    </>
  )
}

export default App