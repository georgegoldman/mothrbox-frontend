// components/TraditionsCurveChart.tsx
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TraditionsCurveChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Traditions',
        data: [0, 20, 40, 60, 80, 100, 120, 140],
        borderColor: '#4BC0C0', // Teal color
        backgroundColor: 'rgba(75, 192, 192, 0.1)', // Light teal fill
        tension: 0.4, // Controls curve amount (0 = straight, 1 = very curved)
        fill: true,
        pointBackgroundColor: '#4BC0C0',
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 140,
        ticks: {
          stepSize: 20,
          callback: (value: number) => value % 40 === 0 ? value : '', // Show only 0, 40, 80, 120, 140
        },
        grid: {
          color: (context: any) => 
            context.tick.value % 40 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
  };

  return <Line data={data}  />;
}