import React from 'react';
import SASidebar from './SASidebar';
import Navbar from './Navbar';
import ControllerDashboard from './ControllerDashboard';
const ControllerHomePage = () => {
  return (
    <div>
      <Navbar />
      <SASidebar />
      <ControllerDashboard/>
      
    </div>
  );
};

export default ControllerHomePage;
