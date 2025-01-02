import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./auth";

const ProtectedRoute = ({ element }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return element;
};

export default ProtectedRoute;
