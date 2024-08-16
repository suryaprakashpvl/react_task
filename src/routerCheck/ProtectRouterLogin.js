import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteLogin = () => {
  const isAuthenticated = !!localStorage.getItem('authToken'); 

  return isAuthenticated ?  <Navigate to="/home" replace />: <Outlet />;
};

export default ProtectedRouteLogin;
