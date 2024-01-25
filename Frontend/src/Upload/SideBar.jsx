import React from 'react';
import './sidebar.css'; // Import css modules stylesheet as styles
import { Link, Outlet } from 'react-router-dom'; // Import Link for routing


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Logo</h2>
      </div>
      <nav className="nav">
        <ul>
          <li className='sideList'>
            <Link className='sideOption' to="/">Home</Link>
          </li>
          <li>
            <span className='sideOption'>Analytics</span>
          </li>
          <li>
            <span className='sideOption'>Settings</span>
          </li>
          <li>
            <span className='sideOptionActive'>Upload</span>
          </li>
          <Outlet />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
