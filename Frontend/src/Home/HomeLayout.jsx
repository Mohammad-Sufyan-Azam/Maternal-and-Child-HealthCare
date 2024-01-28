import React from 'react';
import Sidebar from './SideBar'; // You may need to create Sidebar component separately
// import css styles
import './homelayout.css';

const HomeLayout = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="main-content">
        <h1 className='topHeading'>Maternal and Childcare Health Analysis</h1>

        {/* Dashboard sections */}
        <section className="dashboard-section">
          <h2>Overview</h2>
          {/* Placeholder content */}
          <p>This is the overview section of your dashboard.</p>
        </section>

        <section className="dashboard-section">
          <h2>WhatsApp Analysis</h2>
          {/* Placeholder content */}
          <p>Here you can display analytics charts and graphs.</p>
        </section>

        <section className="dashboard-section">
          <h2>Zoom Analysis</h2>
          {/* Placeholder content */}
          <p>Configure settings for your dashboard here.</p>
        </section>
      </main>
    </div>
  );
};

export default HomeLayout;
