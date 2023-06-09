import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../ChartConfig';

// Types
import { ExpertizeVariant } from 'types/user';

const options = {
  responsive: true,
  hoverOffset: 3,
  cutout: '85%'
};

const doughnutChartData = {
  labels: Object.values(ExpertizeVariant).map((option) => option),
  datasets: [
    {
      data: [15000, 10000, 18000, 19000, 20000, 30000, 22000, 18500, 19000],
      backgroundColor: [
        'rgba(155, 81, 224, 1)',
        'rgba(205, 113, 249, 1)',
        'rgba(240, 98, 146, 1)',
        'rgba(221, 44, 0, 1)',
        'rgba(243, 109, 37, 0.5)',
        'rgba(245, 138, 80, 1)',
        'rgba(255, 180, 0, 1)',
        'rgba(2, 136, 209, 0.5)',
        'rgba(83, 109, 254, 1)'
      ]
    }
  ]
};

const DoughnutChart: FC = () => {
  return <Doughnut options={options} data={doughnutChartData} />;
};
export default DoughnutChart;
