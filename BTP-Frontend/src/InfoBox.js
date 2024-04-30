import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InfoBox.css';

const InfoBox = ({ icon, title, value, footer }) => {
  return (
    <div className="card info-box">
      <div className="card-body">
        <div className="info-icon">
          <FontAwesomeIcon icon={icon} size="1x" />
        </div>
        <h5 className="info-title">{title}</h5>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );
};

export default InfoBox;
