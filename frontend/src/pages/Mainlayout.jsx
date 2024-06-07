
import React from 'react';
import './MainLayout.css'; // Import CSS file for background styling

const Layout = ({ children }) => {
  return (
    <div className="background">
    {children}
    </div>
  );
};

export default Layout;
