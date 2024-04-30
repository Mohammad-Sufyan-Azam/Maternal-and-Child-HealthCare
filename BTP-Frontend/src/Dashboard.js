import React from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import InfoBox from './InfoBox';
import TaskList from './TaskList';
import { faServer, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import { useState, useEffect } from 'react';
  // MODIFIED




const Dashboard = () => {

  const baseURL = 'http://localhost:8000/' ;
  const [groupLen, setGroupLen] = useState([]);
  const [msgtoday, setMsgToday] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + 'getNumberOfGroups'); 
            const data = await response.json();
            setGroupLen(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchData();
      }, []);

  useEffect(() => {
    // instead of group name all groups of moderators should be called
    let gname = 'OG'
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + 'MessageSentToday/' + gname); 
            const data = await response.json();
            setMsgToday(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchData();
      }, []);


  return (
    <div className="container-fluid dashboard">
      <div className="row info-boxes justify-content-center">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faServer} title="Messages Sent Today" value={msgtoday} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faShoppingCart} title="Groups" value={groupLen} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faUser} title="Tasks Remaining" value="3"/>
        </div>
      </div>
      {/* Graphs */}
      <div className="graphs mt-4">
        <div className="row">
          <div className="col-12"> 
            <div className="card">
              <div className="card-body">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      
           
            <div className="row mt-4">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <BarChart />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <TaskList />
              
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
