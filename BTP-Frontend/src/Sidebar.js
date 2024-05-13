import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCube, faTable, faChartBar, faCalendar,
  faChevronDown, faChevronUp, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

import WhatsApp from './Whatsapp';
import GRP from './GRP';
import Dashboard from './Dashboard';

import profilePicture from './assets/pp.jpg';

const user = {
  name: "Divya Prabha",
  profilePicture: profilePicture,
};

const routes = [
  { path: "/homepage", name: "Dashboard", icon: faTachometerAlt, component: Dashboard },
  {
    name: "Chats", icon: faCube, dropdown: true, subRoutes: [
      { name: 'Zoom', path: '/chats/zoom' },
      { name: 'WhatsApp', path: '/chats/whatsapp', component: WhatsApp }
    ]
  },
  {
    name: "Groups", icon: faTable, dropdown: true, subRoutes: [
      { name: 'Group 1', path: '/groups/group-1', component: GRP },
      { name: 'Group 2', path: '/groups/group-2' }
    ]
  },
  {
    name: "Statistics", icon: faChartBar, dropdown: true, subRoutes: [
      { name: 'Stats 1', path: '/statistics/stats1' },
      { name: 'Stats 2', path: '/statistics/stats2' }
    ]
  },
  { path: "/calendar", name: "Calendar", icon: faCalendar }
];

function Sidebar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // hook for redirecting

  const handleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const logout = () => {
    // Implement logout logic here, e.g., clearing tokens
    localStorage.removeItem('jwtToken'); // Example: clear token
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
            <li key={index} className={`nav-item ${openDropdownIndex === index ? 'open' : ''}`}>
              {route.dropdown ? (
                <div className={`nav-link dropdown-toggle ${isActiveRoute(route.path) ? 'active' : ''}`} onClick={() => handleDropdown(index)}>
                  <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                  <span className="link-text">{route.name}</span>
                  <FontAwesomeIcon icon={openDropdownIndex === index ? faChevronUp : faChevronDown} className="icon-small" />
                </div>
              ) : (
                <NavLink to={route.path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                  <span className="link-text">{route.name}</span>
                </NavLink>
              )}
              {route.dropdown && openDropdownIndex === index && (
                <ul className="dropdown">
                  {route.subRoutes.map((subRoute, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subRoute.path} className={({ isActive }) => isActive ? "nav-link dropdown-link active" : "nav-link dropdown-link"}>
                        {subRoute.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
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

export default Sidebar;
