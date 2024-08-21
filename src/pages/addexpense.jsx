import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useExpenses } from "../context/ExpenseContext";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { addExpense } = useExpenses();

  const predefinedCategories = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Health",
    "Others",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const expenseData = {
      amount: parseFloat(amount),
      description,
      date,
      category,
    };
    addExpense(expenseData);
    handleReset();
  };

  const handleReset = () => {
    setAmount("");
    setDescription("");
    setDate("");
    setCategory("");
  };

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-semibold mb-6">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-lg font-medium mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-medium mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-lg font-medium mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-lg font-medium mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                >
                  <option value="">Select a category</option>
                  {predefinedCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddExpense;
