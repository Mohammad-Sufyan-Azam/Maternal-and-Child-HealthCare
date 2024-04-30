import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartAnnotation from 'chartjs-plugin-annotation';

// Register the annotation plugin
Chart.register(ChartAnnotation);

const ComparingMod = () => {
  const data = {
    labels: ['Moderator 1', 'Moderator 2', 'Moderator 3', 'Moderator 4', 'Moderator 5'],
    datasets: [
      {
        label: 'Moderators Activity',
        data: [5, 10, 15, 7, 8],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 1,
      }
    ],
  };

  // Function to calculate median
  const getMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  // Calculate median
  const median = getMedian(data.datasets[0].data);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Moderators Activity (Per Month)'
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
          text: 'Moderators'
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

  return (
    <div style={{ width: '400px', height: '300px', margin: '20px auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComparingMod;
