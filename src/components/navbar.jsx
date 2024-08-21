import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 border-r border-gray-600 p-6 w-64">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="block text-blue-400 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add-expense"
            className="block text-blue-400 hover:underline"
          >
            Add an Expense
          </Link>
        </li>
        <li>
          <Link
            to="/update-budget"
            className="block text-blue-400 hover:underline"
          >
            Add / Update Your Budget
          </Link>
        </li>
        <li>
          <Link
            to="/view-categories"
            className="block text-blue-400 hover:underline"
          >
            View Spending in Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
