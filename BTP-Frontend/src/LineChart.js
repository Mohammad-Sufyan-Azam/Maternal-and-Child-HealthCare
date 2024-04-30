import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-annotation';
import ChartAnnotation from 'chartjs-plugin-annotation';
import { useState, useEffect } from 'react';

Chart.register(ChartAnnotation);

const LineChart = () => {
  const baseURL = 'http://localhost:8000/' ;
  const [recdata, setrecdata] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + 'MessagesForCharts'); 
            const data = await response.json();
            setrecdata(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchData();
      }, []);

  // if (recdata !== undefined) {
  //   let length =  recdata.length;
  // const finalDataset = Array.from({ length }, () => ({}));

  // for (let i = 0; i < length; i++) {
  //   finalDataset[i] = {
  //     label: recdata[i].label,
  //     data: recdata[i].data,
  //     fill: false,
  //     backgroundColor: 'rgb(75,192,192)',
  //     borderColor: 'rgba(75,192,192,0.2)',
  //     key: i
  //   };

  // }
  // console.log(recdata)
  // console.log(recdata.length)
  // console.log(finalDataset);
  // }
  let final_dataset = [];
  const dictionary = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  };
  
  let index = 0;
  for (let key in recdata) {
    if (recdata.hasOwnProperty(key)) {
        // console.log(key + ': ' + recdata[key]);
        let backgroundColor = `rgb(${75 * index}, ${192 * index}, ${192 * index})`;
        let borderColor = `rgba(${75 / index}, ${192 / index}, ${192 / index}, 0.2)`;

        final_dataset.push( { label: key,
          data: recdata[key],
          fill: false,
          backgroundColor,
          borderColor});       
          index++; 
}

    
  }
  
  
  console.log(final_dataset);
  


 
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: final_dataset,
  };

  
  const getMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

 
  const allData = data.datasets.flatMap(dataset => dataset.data);

 
  const median = getMedian(allData);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Groups Comparing Activity Total'
      },
      legend: {
        display: true,
        position: 'top'
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
          text: 'Month'
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
  const datasets = recdata && Object.keys(recdata).map((label, index) => ({
    label: label,
    data: recdata[label],
    fill: false,
    backgroundColor: 'rgb(75,192,192)',
    borderColor: 'rgba(75,192,192,0.2)',
    key: index
}));

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh' 
    }}>
      <div style={{ width: '900px', height: '400px' }}>
      
        <Line data={data} options={options} />

        
      </div>
    </div>
  );
};

export default LineChart;
