import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './Home/HomeLayout';
// import UploadLayout from './Upload/UploadLayout';
import Modify from './Modify/ModifyFields.jsx';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout/>} />
        {/* <Route path="/Upload" element={<UploadLayout/>} /> */}
        <Route path="/Modify" element={<Modify/>} />
        {/* Add more routes for other pages if needed */}
      </Routes>
    </Router>
    </>
  );
};

export default App;