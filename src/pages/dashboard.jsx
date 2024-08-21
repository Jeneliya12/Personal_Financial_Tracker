import React, { lazy } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useExpenses } from "../context/expensecontext";
import { useBudget } from "../context/budgetcontext";
import LoadingSpinner from "../components/loadingspinner"; // Import the LoadingSpinner component
import DelayedSuspense from "../components/delayedsuspense"; // Import the DelayedSuspense component

// Lazy load the BudgetExpensesChart component
const BudgetExpensesChart = lazy(() => {
  console.log("Attempting to load BudgetExpensesChart");
  return import("../components/budgetexpenseschart");
});

function Dashboard() {
  const { expenses } = useExpenses();
  const { budget } = useBudget();

  // Calculate totals for expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );
  const balance = budget - totalExpenses;

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black overflow-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4 mt-8">
              YOUR REMAINING BALANCE IS: ${balance.toLocaleString()}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mx-20">
            <div className="bg-gray-800 p-8 rounded-lg flex flex-col items-center h-64">
              <h2 className="text-4xl font-semibold mb-4">Income/Budget</h2>
              <h2 className="text-3xl text-gray-400">
                ${budget.toLocaleString()}
              </h2>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg flex flex-col items-center h-64">
              <h2 className="text-4xl font-semibold mb-4">Expenses</h2>
              <h2 className="text-3xl text-gray-400">
                ${totalExpenses.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mx-20">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">
                Transaction History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 px-4">Description</th>
                      <th className="py-2 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-2 px-4">{expense.category}</td>
                        <td
                          className={`py-2 px-4 ${
                            expense.amount < 0
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {expense.amount < 0
                            ? `- $${Math.abs(expense.amount)}`
                            : `+ $${expense.amount}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <DelayedSuspense delay={1000} fallback={<LoadingSpinner />}>
              <BudgetExpensesChart
                budget={budget}
                totalExpenses={totalExpenses}
              />
            </DelayedSuspense>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
