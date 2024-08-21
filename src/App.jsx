import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AddExpense from "./components/addexpense";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
