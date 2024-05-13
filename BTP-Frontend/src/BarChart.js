import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartAnnotation from 'chartjs-plugin-annotation';


Chart.register(ChartAnnotation);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Group Activity',
        data: [90, 180, 130, 170, 140, 140, 130, 132, 113, 129, 122, 146], 
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
