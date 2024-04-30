import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GrpMsgAct = () => {
  const [selectedMonth, setSelectedMonth] = useState('Jan');

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'No. of Messages',
        data: [10, 25, 15, 32],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255,0.2)',
        barThickness: 40,
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `G1 Activity for ${selectedMonth}` 
      },
      legend: {
        display: false, 
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No. of Messages'
        },
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> 
      <div style={{ width: '900px', margin: '20px' }}>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <label htmlFor="month-selector-act">Select Month: </label>
          <select id="month-selector-act" value={selectedMonth} onChange={handleMonthChange}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div style={{ height: '500px' }}> 
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GrpMsgAct;