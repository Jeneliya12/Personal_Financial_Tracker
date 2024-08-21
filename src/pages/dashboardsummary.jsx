import React from "react";

const DashboardSummary = ({
  balance,
  getDisplayValue,
  totalExpenses,
  savings,
  savingsPercentage,
  warning,
}) => {
  return (
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
          ${savingsGoal.toLocaleString()} - ${totalExpenses.toLocaleString()} =
          ${savings.toLocaleString()}
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
  );
};

export default DashboardSummary;
