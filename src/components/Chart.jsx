//https://www.chartjs.org/docs/latest/getting-started/integration.html <-- How to implement

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChartComponent = ({ chartData, chartOptions }) => {
  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChartComponent;