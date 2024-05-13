import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import WhatsApp from './Whatsapp';
import GRP from './GRP';
import ControllerHomePage from './ControllerHomePage';
import SAHomePage from './SAHomePage';
import backgroundImage from './assets/WABg.jpeg'; 
import CalendarComponent from './calendar'; // Adjust the path as necessary

function App() {
  const [activeTab, setActiveTab] = useState('login');  // Ensure login is the default active tab

  const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const showTabs = location.pathname === '/' || location.pathname === '/signup';

    
    const handleNavigation = (path) => {
      setActiveTab(path);
      navigate(`/${path}`);
    };


    useEffect(() => {
      // Set active tab based on current location
      if (location.pathname === '/') {
        setActiveTab('login');
      } else if (location.pathname === '/signup') {
        setActiveTab('signup');
      }
    }, [location]);

    return (
      
      <>
        {showTabs && (
          
          <div className="tabs">
            <button 
              className={activeTab === 'login' ? 'active-tab' : 'inactive-tab'}
              onClick={() => handleNavigation('')}
              >
              LOGIN
            </button>
            <button 
              className={activeTab === 'signup' ? 'active-tab' : 'inactive-tab'}
              onClick={() => handleNavigation('signup')}
              >
              SIGNUP
            </button>
          </div>
        )}
      </>
    );
  };

    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/ControllerHomePage" element={<ControllerHomePage />} />
            <Route path="/SAHomePage" element={<SAHomePage />} />
            <Route path="/chats/whatsapp" element={<WhatsApp />} />
            <Route path="/groups/group-1" element={<GRP />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;
