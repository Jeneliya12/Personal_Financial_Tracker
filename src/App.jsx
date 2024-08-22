import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AddExpense from "./pages/addExpense";
import AddBudget from "./pages/addbudget";
import AddSaving from "./pages/addsaving";
import ViewSpending from "./pages/viewspending";
import { SavingsProvider } from "./context/savingscontext";
import { ExpenseProvider } from "./context/expensecontext";
import { BudgetProvider } from "./context/budgetcontext";
import { IncomeProvider } from "./context/incomecontext";
import ErrorBoundary from "./components/error/errorboundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <BudgetProvider>
          <ExpenseProvider>
            <IncomeProvider>
              <SavingsProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-expense" element={<AddExpense />} />
                  <Route path="/update-budget" element={<AddBudget />} />
                  <Route path="/add-saving" element={<AddSaving />} />
                  <Route path="/view-spending" element={<ViewSpending />} />
                </Routes>
              </SavingsProvider>
            </IncomeProvider>
          </ExpenseProvider>
        </BudgetProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
