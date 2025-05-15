import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem("isAdmin") == "true"; // check if admin

  return isAdmin ? element : <Navigate to="/admin" />; //Redirect if not admin
};

export default ProtectedRoute;
