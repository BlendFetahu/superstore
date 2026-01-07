import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Nëse s'ka token, e kthen te login. Nëse ka, e lejon të shohë faqen (children)
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;