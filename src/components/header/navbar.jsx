import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 border-r border-gray-600 p-4 fixed top-0 left-0 h-full z-50 transition-all duration-300 md:w-64 md:relative md:h-auto md:flex md:flex-col">
      <button
        className="md:hidden text-white mb-4"
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
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
          {[
            { to: "/", imgSrc: "/assets/images/home.png", text: "Home" },
            {
              to: "/update-budget",
              imgSrc: "/assets/images/income.jpg",
              text: "Add / Update Your Income",
            },
            {
              to: "/add-expense",
              imgSrc: "/assets/images/expense.jpg",
              text: "Add an Expense",
            },
            {
              to: "/add-saving",
              imgSrc: "/assets/images/saving.jpg",
              text: "Add Saving Goals",
            },
            {
              to: "/view-spending",
              imgSrc: "/assets/images/category.jpg",
              text: "View Spending in Categories",
            },
          ].map(({ to, imgSrc, text }) => (
            <li key={to} className="flex items-center">
              <Link
                to={to}
                className="block text-blue-400 hover:underline flex items-center"
              >
                <img
                  src={imgSrc}
                  alt={`${text} Icon`}
                  className="h-8 w-8 rounded-full mr-2"
                />
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
