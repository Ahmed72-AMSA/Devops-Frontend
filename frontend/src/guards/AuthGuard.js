import React from 'react';
import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 

  if (token && roles.includes(userRole)) {
    return children; 
  } else {
    localStorage.clear();
    return <Navigate to="/login" />; 
  }
};
