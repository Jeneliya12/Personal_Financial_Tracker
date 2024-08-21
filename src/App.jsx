import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AddExpense from "./pages/addExpense";
import { ExpenseProvider } from "./context/expensecontext";

function App() {
  return (
    <Router>
      <ExpenseProvider>
        <div className="flex h-screen">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-expense" element={<AddExpense />} />
            </Routes>
          </div>
        </div>
      </ExpenseProvider>
    </Router>
  );
}

export default App;
