// src/components/BudgetExpensesChart.js
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

const BudgetExpensesChart = ({ budget, totalExpenses }) => {
  const data = {
    labels: ["Budget", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [budget, totalExpenses],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#388e3c", "#c62828"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Budget vs Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetExpensesChart;
