// src/components/Dashboard.js
import React from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useExpenses } from "../context/expensecontext";

function Dashboard() {
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );
  const income = 20000; // Example static income value
  const balance = income - totalExpenses;

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">
              YOUR BALANCE IS: ${balance.toLocaleString()}
            </h1>
          </div>
          <div className="flex items-center justify-center flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1 max-w-lg bg-gray-800 p-8 rounded-lg flex flex-col items-center">
              <h2 className="text-4xl font-semibold mb-4">Income/Budget</h2>
              <h2 className="text-3xl text-gray-400">
                ${income.toLocaleString()}
              </h2>
            </div>
            <div className="flex-1 max-w-lg bg-gray-800 p-8 rounded-lg flex flex-col items-center">
              <h2 className="text-4xl font-semibold mb-4">Expenses</h2>
              <h2 className="text-3xl text-gray-400">
                ${totalExpenses.toLocaleString()}
              </h2>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Transaction History</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="py-2 px-4">{expense.date}</td>
                    <td className="py-2 px-4">{expense.description}</td>
                    <td
                      className={`py-2 px-4 ${
                        expense.amount < 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {expense.amount < 0
                        ? `- $${Math.abs(expense.amount)}`
                        : `+ $${expense.amount}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
