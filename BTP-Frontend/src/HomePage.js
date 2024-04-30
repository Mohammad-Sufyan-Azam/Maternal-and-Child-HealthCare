// HomePage.js
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Dashboard/>
      
    </div>
  );
};

export default HomePage;
