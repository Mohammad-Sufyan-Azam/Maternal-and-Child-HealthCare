import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCube, faTable, faChartBar, faCalendar,
  faChevronDown, faChevronUp, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

import profilePicture from './assets/pp.jpg'; // Adjust the path as necessary

const user = {
  name: "Angela D'souza",
  profilePicture: profilePicture,
};

const routes = [
  { path: "/", name: "Dashboard", icon: faTachometerAlt },
  { path: "/chats", name: "Chats", icon: faCube, dropdown: true, subRoutes: ['Zoom', 'WhatsApp'] },
  { path: "/moderators", name: "Moderators", icon: faTable, dropdown: true, subRoutes: ['Mod 1', 'Mod 2'] },
  { path: "/groups", name: "Groups", icon: faTable, dropdown: true, subRoutes: ['Group 1', 'Group 2'] },
  { path: "/statistics", name: "Statistics", icon: faChartBar, dropdown: true, subRoutes: ['Stats 1', 'Stats 2'] },
  { path: "/calendar", name: "Calendar", icon: faCalendar },
];

function CSidebar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate(); // useNavigate for redirection

  const handleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const logout = () => {
    // Placeholder for your logout logic, e.g., clear token
    localStorage.removeItem('jwtToken'); // Example: clear JWT token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-between">
          <h5 className="brand-name">Kushal Ma</h5>
        </div>
        <hr/>
        <div className="user-section d-flex align-items-center justify-content-start">
          <img src={user.profilePicture} alt={user.name} className="user-profile-picture" />
          <span className="user-name">{user.name}</span>
        </div>
        <hr />
        <ul className="nav flex-column">
          {routes.map((route, index) => (
            <li key={index} className={`nav-item ${openDropdownIndex === index && route.dropdown ? 'open' : ''}`}>
              {route.dropdown ? (
                <>
                  <div className="nav-link" onClick={() => handleDropdown(index)}>
                    <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                    <span className="link-text">{route.name}</span>
                    <FontAwesomeIcon icon={openDropdownIndex === index ? faChevronUp : faChevronDown} className="icon-small dropdown-toggle" />
                  </div>
                  {openDropdownIndex === index && (
                    <ul className="dropdown">
                      {route.subRoutes.map((subRoute, subIndex) => (
                        <li key={subIndex}>
                          <NavLink to={`${route.path}/${subRoute.toLowerCase()}`} className={({ isActive }) => isActive ? "nav-link dropdown-link active" : "nav-link dropdown-link"}>
                            {subRoute}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink to={route.path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                  <span className="link-text">{route.name}</span>
                </NavLink>
              )}
            </li>
          ))}
          <li className="nav-item">
            <div className="nav-link" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
              <span className="link-text">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CSidebar;
