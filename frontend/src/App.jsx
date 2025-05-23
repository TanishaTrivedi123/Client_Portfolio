import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./Admin/Admin";
import EnterPage from "./AdminAuthorized/EnterPage";
import { ToastContainer } from "react-toastify";
import AddThumbnail from "./AdminAuthorized/AddThumbnail";
import AddShortVideos from "./AdminAuthorized/AddShortVideos";

const App = () => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent right-click menu
    };

    // Attach event listener when the component mounts
    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
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
      </Routes>
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
