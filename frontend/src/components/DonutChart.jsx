import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ title, labels, data, colors }) {
  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: colors.map(() => '#1f2937'),
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9ca3af',
          padding: 16,
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}`
        }
      }
    }
  };

  const hasData = data.some((d) => d > 0);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {hasData ? (
        <div style={{ height: '220px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[220px] text-gray-500 text-sm">
          No data available
        </div>
      )}
    </div>
  );
}

export default DonutChart;