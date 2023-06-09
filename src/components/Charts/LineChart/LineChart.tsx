import React, { FC } from 'react';
import { Plugin, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import '../ChartConfig';

// Styles
import classes from './LineChart.module.scss';

export interface ChartInt {
  labelsArr: string[];
  data: number[];
}

const hoverLine: Plugin = {
  id: 'hoverLine',
  afterDatasetsDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { bottom },
      scales: { x, y }
    } = chart;
    if (tooltip && tooltip.getActiveElements().length > 0) {
      const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
      const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#F36D25';
      ctx.moveTo(xCoor, yCoor);
      ctx.lineTo(xCoor, bottom);
      ctx.stroke();
      ctx.closePath();
    }
  }
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Total profit',
      font: {
        size: 16
      },
      color: '#171725'
    }
  },
  scales: {
    x: {
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

const LineChart: FC<ChartInt> = ({ labelsArr, data }) => {
  const lineChartData: ChartData<'line'> = {
    labels: labelsArr,
    datasets: [
      {
        data,
        borderColor: '#F36D25',
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const bgColor = ['rgba(243, 109, 37, 0.2)', 'rgba(243, 109, 37, 0)'];
          const { ctx, chartArea } = context.chart;
          const gradientBg = ctx.createLinearGradient(
            0,
            chartArea ? chartArea.top : 0,
            0,
            chartArea ? chartArea.bottom : 0
          );
          const colorTranches = 1 / (bgColor.length - 1);
          for (let i = 0; i < bgColor.length; i += 1) {
            gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
          }
          return gradientBg;
        }
      }
    ]
  };
  return (
    <Line
      options={options}
      data={lineChartData}
      plugins={[hoverLine]}
      className={classes.chart}
    />
  );
};
export default LineChart;
