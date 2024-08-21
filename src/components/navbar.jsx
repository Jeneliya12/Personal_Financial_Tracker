import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to handle menu open/close

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 border-r border-gray-600 p-6 fixed top-0 left-0 h-full z-50 md:relative md:w-64 md:h-auto transition-width duration-300">
      {/* Toggle Button */}
      <button className="md:hidden text-white mb-4" onClick={handleToggle}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navbar Links */}
      <div
        className={`md:block ${
          isOpen ? "block" : "hidden"
        } transition-opacity duration-300`}
      >
        <ul className="space-y-4">
          <li className="flex items-center">
            <Link
              to="/"
              className="block text-blue-400 hover:underline flex items-center"
            >
              <img
                src="/home.png"
                alt="Logo"
                className="h-8 w-8 rounded-full mr-2" // Make the image round
              />
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/add-expense"
              className="block text-blue-400 hover:underline flex items-center"
            >
              <img
                src="/expense.jpg"
                alt="Expense Icon"
                className="h-8 w-8 rounded-full mr-2" // Make the image round
              />
              Add an Expense
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/update-budget"
              className="block text-blue-400 hover:underline flex items-center"
            >
              <img
                src="/income.jpg"
                alt="Budget Icon"
                className="h-8 w-8 rounded-full mr-2" // Make the image round
              />
              Add / Update Your Budget
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/add-saving"
              className="block text-blue-400 hover:underline flex items-center"
            >
              <img
                src="/saving.jpg"
                alt="Savings Icon"
                className="h-8 w-8 rounded-full mr-2" // Make the image round
              />
              Add Savings
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/view-spending"
              className="block text-blue-400 hover:underline flex items-center"
            >
              <img
                src="/category.jpg"
                alt="Spending Icon"
                className="h-8 w-8 rounded-full mr-2" // Make the image round
              />
              View Spending in Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
