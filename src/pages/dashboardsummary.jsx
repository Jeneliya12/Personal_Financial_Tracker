const DashboardSummary = ({
  balance,
  getDisplayValue,
  totalExpenses,
  savings,
  savingsGoal = 0,
}) => {
  // Calculate remaining balance after expenses
  const remainingBalance = balance - totalExpenses;

  // Determine if a savings goal is set
  const isSavingsGoalSet = savingsGoal > 0;

  // Determine message conditions only if a savings goal is set
  const remainingBalanceEqualsGoal =
    isSavingsGoalSet && remainingBalance === savingsGoal;
  const remainingBalanceExceedsGoal =
    isSavingsGoalSet && remainingBalance > savingsGoal;
  const remainingBalanceLessThanGoal =
    isSavingsGoalSet && remainingBalance < savingsGoal;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center h-64">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 flex items-center">
          <img
            src="/assets/images/income.jpg"
            alt="Income/Budget"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg mr-2"
          />
          Income
        </h2>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400">
          ${getDisplayValue().toLocaleString()}
        </h2>
      </div>
      <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center h-64">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 flex items-center">
          <img
            src="/assets/images/expense.jpg"
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
            src="/assets/images/saving.jpg"
            alt="Savings"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg mr-2"
          />
          Savings Goal
        </h2>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400">
          ${savingsGoal.toLocaleString()}
        </h2>
        {isSavingsGoalSet && remainingBalanceExceedsGoal && (
          <p className="mt-4 text-green-400 text-lg font-semibold">
            🎉 Congratulations! You've exceeded your savings goal!
          </p>
        )}
        {isSavingsGoalSet && remainingBalanceEqualsGoal && (
          <p className="mt-4 text-green-400 text-lg font-semibold">
            🎉 Congratulations! You've met your savings goal!
          </p>
        )}
        {isSavingsGoalSet && remainingBalanceLessThanGoal && (
          <p className="mt-4 text-red-500 text-lg font-semibold">
            ⚠️ Warning: You've not met your saving goals.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardSummary;
