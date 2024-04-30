import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import WhatsApp from './Whatsapp';
import Zoom from './Zoom';
import GRP from './GRP';
import ControllerHomePage from './ControllerHomePage';
import SAHomePage from './SAHomePage';


function App() {
  const [activeTab, setActiveTab] = useState('login');

  const Layout = () => {
    const location = useLocation();
    const showTabs = location.pathname === '/' || location.pathname === '/signup';
    
    return (
      <>
        {showTabs && (
          <div className="tabs">
            <Link to="/" className={activeTab === 'login' ? 'active-tab' : 'inactive-tab'} onClick={() => setActiveTab('login')}>LOGIN</Link>
            <Link to="/signup" className={activeTab === 'signup' ? 'active-tab' : 'inactive-tab'} onClick={() => setActiveTab('signup')}>SIGNUP</Link>
          </div>
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Layout /><Login /></>} />
          <Route path="/signup" element={<><Layout /><SignUp /></>} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="*" element={<><Layout /><Login /></>} />
          <Route path="/ControllerHomePage" element={<ControllerHomePage />} />
          <Route path="/SAHomePage"  element={<SAHomePage />} />
          <Route path="/chats/whatsapp" element={<WhatsApp />} />
          <Route path="/chats/zoom" element={<Zoom/>} />
          <Route path="/groups/group-1" element={<GRP/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;