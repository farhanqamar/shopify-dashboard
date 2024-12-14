import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  mainHeadline: string;
  total?: string;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, options, total, mainHeadline }) => {
  return (
    <div className="bg-white p-4 sm:rounded-lg shadow-md w-full lg:w-[50%] 2xl:w-[32%]">      
      <div className="text-xl font-semibold mb-2">{mainHeadline}</div>
      <div className="text-3xl font-bold text-gray-800 mb-4">{total}</div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
