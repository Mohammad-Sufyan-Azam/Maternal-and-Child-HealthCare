import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartAnnotation from 'chartjs-plugin-annotation';
import { useState, useEffect } from 'react';

Chart.register(ChartAnnotation);

const BarChart = () => {
  const baseURL = 'http://localhost:8000/' ;
  const [recdata, setrecdata] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + 'MessagesForBarCharts'); 
            const data = await response.json();
            setrecdata(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchData();
      }, []);

  console.log(recdata);
  let final_dataset = [];
  
//   let index = 0;
//   for (let key in recdata) {
//     if (recdata.hasOwnProperty(key)) {
//         // console.log(key + ': ' + recdata[key]);
//         let backgroundColor = `rgb(${75 * index}, ${192 * index}, ${192 * index})`;
//         let borderColor = `rgba(${75 / index}, ${192 / index}, ${192 / index}, 0.2)`;

//         final_dataset.push( { label: key,
//           data: recdata[key],
//           fill: false,
//           backgroundColor,
//           borderColor});       
//           index++; 
// }

    
//   }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Group Activity',
        data: recdata, 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ],
  };


  const getMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

 
  const median = getMedian(data.datasets[0].data);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total Groups Activity'
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: median,
            yMax: median,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              content: 'Median',
              enabled: true,
              position: 'end'
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No of Messages'
        },
        beginAtZero: true,
        ticks:{
            stepSize: 25,
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '400px', height: '300px', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
