import React from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useExpenses } from "../context/expensecontext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function ViewSpending() {
  const { expenses } = useExpenses();

  // Calculate spending by category
  const categoryTotals = expenses.reduce((totals, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += parseFloat(expense.amount || 0);
    return totals;
  }, {});

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#ff9f40",
          "#4bc0c0",
          "#f7464a",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Spending by Category
            </h2>
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-md h-80 md:h-96">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(categoryTotals).map(
                    ([category, total], index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-2 px-4">{category}</td>
                        <td className="py-2 px-4 text-red-400">
                          ${total.toLocaleString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewSpending;
