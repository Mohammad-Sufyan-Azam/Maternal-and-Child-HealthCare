import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './Home/HomeLayout';
import UploadLayout from './Upload/UploadLayout';



const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout/>} />
        <Route path="/Upload" element={<UploadLayout/>} />
        {/* Add more routes for other pages if needed */}
      </Routes>
    </Router>
    </>
  );
};

export default App;
