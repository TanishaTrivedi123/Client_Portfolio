import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // ✅ Scroll on page refresh/first load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // <-- this runs once on mount

  return null;
};

export default ScrollToTop;
