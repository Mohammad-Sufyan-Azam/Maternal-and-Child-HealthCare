import React from 'react';
import TotalModerators from './TotalModerators';
import ComparingModerators from './ComparingModerators';
import InfoBox from './InfoBox';
import TaskList from './TaskList';
import { faServer, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const SADashboard = () => {
  return (
    <div className="container-fluid dashboard">
      <div className="row info-boxes justify-content-center">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faServer} title="Messages Sent Today" value="5" />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faShoppingCart} title="Groups" value="2" />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <InfoBox icon={faUser} title="Tasks Remaining" value="3"/>
        </div>
      </div>
      {/* Graphs */}
      <div className="graphs mt-4">
        <div className="row">
          <div className="col-12"> {/* Use full width */}
            <div className="card">
              <div className="card-body">
                <TotalModerators />
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* New Row for BarChart and TaskList */}
            <div className="row mt-4">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <ComparingModerators />
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

export default SADashboard;
