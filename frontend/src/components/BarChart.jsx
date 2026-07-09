import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ title, labels, data, color = '#3b82f6' }) {
  const chartData = {
    labels,
    datasets: [{
      label: title,
      data,
      backgroundColor: color,
      borderRadius: 6,
      borderSkipped: false
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', font: { size: 11 } },
        grid: { color: '#374151' }
      },
      y: {
        ticks: { color: '#9ca3af', stepSize: 1, font: { size: 11 } },
        grid: { color: '#374151' },
        beginAtZero: true
      }
    }
  };

  const hasData = data.some((d) => d > 0);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {hasData ? (
        <div style={{ height: '220px' }}>
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[220px] text-gray-500 text-sm">
          No data available
        </div>
      )}
    </div>
  );
}

export default BarChart;