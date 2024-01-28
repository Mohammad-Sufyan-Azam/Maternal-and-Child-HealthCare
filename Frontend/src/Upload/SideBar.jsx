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
        <ul className='sideList'>
          <li>
            <Link className='sideOption' to="/">Home</Link>
          </li>
          <li>
            <Link className='sideOption' to='/whatsApp-Analysis'>WhatsApp Analysis</Link>
          </li>
          <li>
            <Link className='sideOption' to='/zoom-Analysis'>Zoom Analysis</Link>
          </li>
          <li>
            <Link className='sideOptionActive'>Upload</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </aside>
  );
};

export default Sidebar;
