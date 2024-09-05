import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartComponentProps<T> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  xLabel: string;
  yLabel: string;
}

const BarChartComponent = <T,>({ data, xKey, yKey, xLabel, yLabel }: BarChartComponentProps<T>) => {
  // Transformar los datos para Chart.js
  const chartData = {
    labels: data.map((item) => item[xKey] as string), // Las etiquetas del eje X
    datasets: [
      {
        label: yLabel,
        data: data.map((item) => item[yKey] as number), // Los datos del eje Y
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: xLabel,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;
