import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./Admin/Admin";
import EnterPage from "./AdminAuthorized/EnterPage";
import { ToastContainer } from "react-toastify";
import AddThumbnail from "./AdminAuthorized/AddThumbnail";
import AddShortVideos from "./AdminAuthorized/AddShortVideos";
import VideosContainer from "./pages/VideosContainer";
import ThumbnailContainer from "./pages/ThumbnailContainer";
import AddCategoryForm from "./AdminAuthorized/AddCategoryForm";
import Thumbnail from "./components/thumbnail/Thumbnail";

const App = () => {
  // useEffect(() => {
  //   // Disable right-click
  //   const handleContextMenu = (event) => {
  //     event.preventDefault(); // Prevent right-click menu
  //   };

  //   // Attach event listener when the component mounts
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Cleanup on unmount
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thumbnails" element={<ThumbnailContainer />} />
          <Route path="/thumbnails/:categoryName" element={<Thumbnail />} />
          <Route path="/videos" element={<VideosContainer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin login route */}
          <Route path="/admin" element={<Admin />} />
          {/* Protected admin panel */}
          <Route
            path="/EnterPage"
            element={<ProtectedRoute element={<EnterPage />} />}
          />
          <Route
            path="/add-thumbnail"
            element={<ProtectedRoute element={<AddThumbnail />} />}
          />
          <Route
            path="/add-short-videos"
            element={<ProtectedRoute element={<AddShortVideos />} />}
          />
          <Route
            path="/add-category"
            element={<ProtectedRoute element={<AddCategoryForm />} />}
          />
        </Routes>
      </main>
      <Footer />
      {/* ToastContainer after footer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      ;
    </div>
  );
};

export default App;
