import React, { useEffect } from 'react'
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
      <Route path='/thumbnails' element={<ThumbnailPage />} />

      {/* Video Page */}
      <Route path='/videos' element={<VideoPage />} />

      {/* About Page */}
      <Route path='/about' element={<AboutMePage />}/>

      {/* Contact Page */}
      <Route path='/contact' element={<ContactMePage />}/>

      {/* Page for any other endpoint */}
      <Route path='*' element={<PageNotFound />}/>

      {/* -------------------------Admin login and admin dashboard------------------------- */}
      {/* Admin login */}
      <Route path='/admin' element={<AdminLogin />} />

      {/* Admin Dashboard */}
      <Route path='/admin/dashboard' element={<ProtectedRoute ><AdminDashboard /></ProtectedRoute>} />

      {/*------------------------ Admin dashboard after login (Protected)----------------------*/}
      <Route path='/admin/dashboard/upload-image' element={<ProtectedRoute><UploadImage /></ProtectedRoute>}/>

      <Route path='/admin/dashboard/upload-video' element={<ProtectedRoute><UploadVideo /></ProtectedRoute>}/>
      
    </Routes>
    <Footer />
    <ToastContainer />
    </>
  )
}

export default App