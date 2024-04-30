import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PieBarInd from './PieBarInd';
import GrpMsgAct from './GrpMsgAct';

const GRP = () => {
  return (
    <div style={{ paddingLeft: '250px', paddingTop: '20px' }}> 
      <Navbar />
      <Sidebar />
      <h1 style={{ textAlign: 'center', paddingTop:'30px' }}>Group 1</h1>
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap', 
          marginTop: '30px'
        }}>
          <div style={{
            width: 'calc(50% - 2%)', 
            margin: '0 1%',
            boxSizing: 'border-box'
          }}>
            <PieBarInd />
          </div>
          <div style={{
            width: 'calc(50% - 2%)', 
            margin: '0 1%',
            boxSizing: 'border-box'
          }}>
            <GrpMsgAct />
          </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        <button style={{ padding: '10px 20px' }}>Group Members</button>
      </div>
    </div>
  );
};

export default GRP;
