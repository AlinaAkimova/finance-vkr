import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import '../ChartConfig';

// Styles
import classes from './BarChart.module.scss';

export interface ChartInt {
  title: string;
  labelsArr: string[];
  data: number[];
}

const BarChart: FC<ChartInt> = ({ title, labelsArr, data }) => {
  const barChartData = {
    labels: labelsArr,
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(243, 109, 37, 0.9)',
          'rgba(243, 109, 37, 0.9)',
          'rgba(243, 109, 37, 0.7)',
          'rgba(243, 109, 37, 0.8)',
          'rgba(243, 109, 37, 1)',
          'rgba(243, 109, 37, 0.5)',
          'rgba(243, 109, 37, 0.9)',
          'rgba(243, 109, 37, 0.6)',
          'rgba(243, 109, 37, 1)',
          'rgba(243, 109, 37, 0.9)',
          'rgba(243, 109, 37, 0.7)',
          'rgba(243, 109, 37, 0.8)'
        ],
        barPercentage: 0.5,
        borderRadius: 5,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16
        },
        color: '#171725'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        }
      },
      y: {
        min: 0,
        grid: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <Bar options={options} data={barChartData} className={classes.chart} />
  );
};
export default BarChart;
