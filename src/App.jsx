import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AddExpense from "./pages/addExpense";
import AddBudget from "./pages/addbudget";
import ViewSpending from "./pages/viewspending";
import { ExpenseProvider } from "./context/expensecontext";
import { BudgetProvider } from "./context/budgetcontext";
import ErrorBoundary from "./components/errorboundary"; // Correct path and default import

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <BudgetProvider>
          <ExpenseProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/update-budget" element={<AddBudget />} />
              <Route path="/view-spending" element={<ViewSpending />} />
            </Routes>
          </ExpenseProvider>
        </BudgetProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
