import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();  // Using the user from AuthContext

  if (!user) {
    return <Navigate to="/signin" />; // Redirect to login if no user found
  }

  return element; // Allow access to protected route
};

export default ProtectedRoute;
