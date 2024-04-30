import React from 'react';
import CSidebar from './CSidebar';
import Navbar from './Navbar';
import ControllerDashboard from './ControllerDashboard';
const ControllerHomePage = () => {
  return (
    <div>
      <Navbar />
      <CSidebar />
      <ControllerDashboard/>
      
    </div>
  );
};

export default ControllerHomePage;
