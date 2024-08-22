import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetExpensesChart = ({ budget, totalExpenses, savings }) => {
  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [budget, totalExpenses, savings],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        borderColor: ["#388e3c", "#c62828", "#1976d2"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff",
          usePointStyle: true, // Use point style for the legend
          pointStyle: "rectRounded", // Rounded rectangle style
          generateLabels: (chart) => {
            const { data } = chart;
            return data.labels.map((label, index) => ({
              text: label,
              fillStyle: data.datasets[0].backgroundColor[index],
              strokeStyle: data.datasets[0].borderColor[index],
              lineWidth: 2,
              hidden: false,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
          color: "#ffffff",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-full h-auto">
      <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold mb-4 text-white text-center">
        Income vs Expenses vs Savings
      </h2>
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetExpensesChart;
