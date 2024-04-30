import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, faCube, faTable, faMapMarkerAlt, faChartBar, faCalendar, 
  faFile, faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const user = {
  name: "Tania Andrew",
  profilePicture: "./src/assets/pp.png",
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

  const handleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
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
                <NavLink to={route.path} className="nav-link" activeClassName="active">
                  <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                  <span className="link-text">{route.name}</span>
                </NavLink>
                {route.dropdown && (
                  <FontAwesomeIcon 
                    icon={openDropdownIndex === index ? faChevronUp : faChevronDown} 
                    onClick={() => handleDropdown(index)} 
                    className="icon-small dropdown-toggle" 
                  />
                )}
                {route.dropdown && openDropdownIndex === index && (
                  <ul className="dropdown">
                    {route.subRoutes.map((subRoute, subIndex) => (
                      <li key={subIndex}>
                        <NavLink to={`${route.path}/${subRoute.toLowerCase()}`} className="nav-link dropdown-link">
                          {subRoute}
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

export default CSidebar;