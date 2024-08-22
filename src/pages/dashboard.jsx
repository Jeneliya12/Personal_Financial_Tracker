import React, { useState, lazy } from "react";
import Header from "../components/header/header";
import Navbar from "../components/header/navbar";
import LoadingSpinner from "../components/loadingspinner/loadingspinner";
import DelayedSuspense from "../components/loadingspinner/delayedsuspense";
import { useFinancialData } from "../hooks/usefinancialdata";
import DashboardSummary from "../pages/dashboardsummary";
import TransactionHistory from "../pages/transactionhistory";

const BudgetExpensesChart = lazy(() => {
  console.log("Attempting to load BudgetExpensesChart");
  return import("../components/chart/budgetexpenseschart");
});

const LOW_SAVINGS_THRESHOLD = 100;

function Dashboard() {
  const {
    budget,
    totalExpenses,
    totalIncome,
    balance,
    savings,
    savingsPercentage,
    transactions,
    warning,
    savingsGoal,
  } = useFinancialData();
  const [view, setView] = useState("both");

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

  return (
    <div className="bg-black text-white w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-black overflow-auto">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-8">
              YOUR REMAINING BALANCE IS: ${balance.toLocaleString()}
            </h1>
          </div>

          <DashboardSummary
            balance={balance}
            getDisplayValue={getDisplayValue}
            totalExpenses={totalExpenses}
            savings={savings}
            savingsPercentage={savingsPercentage}
            warning={warning}
            savingsGoal={savingsGoal}
            LOW_SAVINGS_THRESHOLD={LOW_SAVINGS_THRESHOLD}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 h-52">
            <TransactionHistory transactions={transactions} />
            <DelayedSuspense delay={1000} fallback={<LoadingSpinner />}>
              <BudgetExpensesChart
                budget={budget}
                totalExpenses={totalExpenses}
                savings={savings}
              />
            </DelayedSuspense>
          </div>
        </main>
      </div>

      {warning && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bg-red-600 text-white p-4 rounded-lg">
          <p className="text-sm sm:text-base">{warning}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
