import React, { useState } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCube, faTable, faChartBar, faCalendar,
  faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';


import WhatsApp from './Whatsapp';
import GRP from './GRP';
import Dashboard from './Dashboard';
import Zoom from './Zoom';

const user = {
  name: "Tania Andrew",
  profilePicture: ".src/assets/pp.png", 
};

const routes = [
  { path: "/homepage", name: "Dashboard", icon: faTachometerAlt, component: Dashboard },
  { name: "Chats", icon: faCube, dropdown: true, subRoutes: [
    
    { name: 'Zoom', path: '/chats/zoom', component: Zoom },
    { name: 'WhatsApp', path: '/chats/whatsapp', component: WhatsApp }  
  ] },
  { name: "Groups", icon: faTable, dropdown: true, subRoutes: [
    { name: 'Group 1', path: '/groups/group-1', component: GRP },
    { name: 'Group 2' } 
  ] },
  { name: "Statistics", icon: faChartBar, dropdown: true, subRoutes: [
    { name: 'Stats 1' }, 
    { name: 'Stats 2' } 
  ] },
  { path: "/calendar", name: "Calendar", icon: faCalendar },
];

function Sidebar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const location = useLocation();

  const handleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
 // Function to determine if the route is active
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
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
            <React.Fragment key={index}>
              <li className={`nav-item ${openDropdownIndex === index ? 'open' : ''}`}>
                {route.dropdown ? (
                  <div className={`nav-link ${isActiveRoute(route.path) ? 'active' : ''}`} onClick={() => handleDropdown(index)}>
                    <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                    <span className="link-text">{route.name}</span>
                    <FontAwesomeIcon 
                      icon={openDropdownIndex === index ? faChevronUp : faChevronDown} 
                      className="icon-small dropdown-toggle" 
                    />
                  </div>
                ) : (
                  <NavLink to={route.path} className="nav-link" activeClassName="active">
                    <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                    <span className="link-text">{route.name}</span>
                  </NavLink>
                )}
                {route.dropdown && openDropdownIndex === index && (
                  <ul className="dropdown">
                    {route.subRoutes.map((subRoute, subIndex) => (
                      <li key={subIndex}>
                        <NavLink to={subRoute.path} className="nav-link dropdown-link" activeClassName="active">
                          {subRoute.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
