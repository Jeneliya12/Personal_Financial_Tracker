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
    labels: ["Budget", "Expenses", "Savings"], // Labels for the chart
    datasets: [
      {
        label: "Amount",
        data: [budget, totalExpenses, savings], // Data points for the chart
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"], // Colors for each dataset entry
        borderColor: ["#388e3c", "#c62828", "#1976d2"], // Border colors for each dataset entry
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure chart resizes properly
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Set the legend text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Customize tooltip label
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
            // Format y-axis ticks
            return `$${value.toLocaleString()}`;
          },
          color: "#ffffff", // Set y-axis tick color to white
        },
      },
      x: {
        ticks: {
          color: "#ffffff", // Set x-axis tick color to white
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-full h-full max-h-[500px] overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white text-center">
        Budget vs Expenses vs Savings
      </h2>
      <div className="relative w-full h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetExpensesChart;
