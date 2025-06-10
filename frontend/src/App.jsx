import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Loader from "./components/Loader/Loader"; // Import your loader component

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    // Show loader when route changes
    setLoading(true);

    // Simulate loading time (you can remove this in production or adjust the time)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 1 second delay for demo

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger when route changes

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Initial load time can be slightly longer

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {loading ? (
        <Loader /> // Show only loader when loading
      ) : (
        <>
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </div>
  );
};

export default App;
