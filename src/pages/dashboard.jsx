import React, { useState, lazy } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useExpenses } from "../context/expensecontext";
import { useBudget } from "../context/budgetcontext";
import { useIncome } from "../context/incomecontext";
import { useSavings } from "../context/savingscontext";
import LoadingSpinner from "../components/loadingspinner";
import DelayedSuspense from "../components/delayedsuspense";

// Lazy load the BudgetExpensesChart component
const BudgetExpensesChart = lazy(() => {
  console.log("Attempting to load BudgetExpensesChart");
  return import("../components/budgetexpenseschart");
});

function Dashboard() {
  const { expenses } = useExpenses();
  const { budget } = useBudget();
  const { incomes } = useIncome();
  const { savingsGoal } = useSavings(); // Retrieve savings goal data

  const [view, setView] = useState("both");
  const [warning, setWarning] = useState("");

  // Calculate totals for expenses and income
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );
  const totalIncome = incomes.reduce(
    (total, income) => total + parseFloat(income.amount || 0),
    0
  );
  const balance = budget - totalExpenses;

  // Calculate savings and ensure it defaults to 0 if no savingsGoal is set
  const savings =
    savingsGoal > 0 ? Math.max(savingsGoal - totalExpenses, 0) : 0;

  // Define a threshold for low savings
  const LOW_SAVINGS_THRESHOLD = 100; // Example threshold for low savings

  // Calculate savings progress
  const savingsProgress = Math.min(savings, savingsGoal); // Limit progress to goal
  const savingsPercentage =
    savingsGoal > 0 ? (savingsProgress / savingsGoal) * 100 : 0;

  // Calculate values based on selected view
  const getDisplayValue = () => {
    switch (view) {
      case "budget":
        return budget;
      case "income":
        return totalIncome;
      case "both":
        return budget + totalIncome;
      default:
        return budget;
    }
  };

  // Combine expenses and incomes for transaction history
  const transactions = [
    ...expenses.map((expense) => ({
      description: expense.category,
      amount: -parseFloat(expense.amount),
    })),
    ...incomes.map((income) => ({
      description: income.label,
      amount: parseFloat(income.amount),
    })),
  ];

  if (budget > 0) {
    transactions.push({
      description: "Budget",
      amount: budget,
    });
  }

  transactions.sort((a, b) => b.amount - a.amount);

  React.useEffect(() => {
    // Check if savings are below the threshold and savings goal is set
    if (savings > 0 && savings < LOW_SAVINGS_THRESHOLD) {
      setWarning("Warning: Your savings are getting low!");
    } else {
      setWarning(""); // Clear warning if savings are sufficient or savings goal is not set
    }
  }, [savings, savingsGoal]);

  return (
    <div className="bg-black text-white w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 bg-black overflow-auto">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-8 text-center">
              YOUR REMAINING BALANCE IS: ${balance.toLocaleString()}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center h-64">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 flex items-center">
                <img
                  src="/income.jpg"
                  alt="Income/Budget"
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg mr-2"
                />
                Income/Budget
              </h2>
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400">
                ${getDisplayValue().toLocaleString()}
              </h2>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center h-64">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 flex items-center">
                <img
                  src="/expense.jpg"
                  alt="Expenses"
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg mr-2"
                />
                Expenses
              </h2>
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400">
                ${totalExpenses.toLocaleString()}
              </h2>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center h-64">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 flex items-center">
                <img
                  src="/saving.jpg"
                  alt="Savings"
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg mr-2"
                />
                Savings
              </h2>
              <h2
                className={`text-lg sm:text-xl md:text-2xl ${
                  savings < LOW_SAVINGS_THRESHOLD && savingsGoal > 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                ${savingsGoal.toLocaleString()} - $
                {totalExpenses.toLocaleString()} = ${savings.toLocaleString()}
              </h2>
              <div className="mt-4 w-full bg-gray-700 rounded">
                <div
                  className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l"
                  style={{ width: `${savingsPercentage}%` }}
                >
                  {savingsPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg relative">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                Transaction History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 px-4 text-sm sm:text-base">
                        Description
                      </th>
                      <th className="py-2 px-4 text-sm sm:text-base">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-4 px-6 text-center text-gray-400"
                        >
                          <div className="flex items-center justify-center space-x-4 m-16">
                            <img
                              src="/transaction.jpg"
                              alt="No transactions"
                              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
                            />
                            <span className="text-sm sm:text-base">
                              No transactions to display
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="py-2 px-4 text-sm sm:text-base">
                            {transaction.description}
                          </td>
                          <td
                            className={`py-2 px-4 text-sm sm:text-base ${
                              transaction.amount < 0
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {transaction.amount < 0
                              ? `- $${Math.abs(
                                  transaction.amount
                                ).toLocaleString()}`
                              : `+ $${transaction.amount.toLocaleString()}`}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <DelayedSuspense delay={1000} fallback={<LoadingSpinner />}>
              <BudgetExpensesChart
                budget={budget}
                totalExpenses={totalExpenses}
                savings={savings} // Pass the savings value
              />
            </DelayedSuspense>
          </div>
        </main>
      </div>

      {warning && (
        <div className="fixed bottom-4 left-4 bg-red-600 text-white p-4 rounded-lg">
          <p className="text-sm sm:text-base">{warning}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
