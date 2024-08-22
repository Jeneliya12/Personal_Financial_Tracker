import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import Navbar from "../components/header/navbar";
import { useBudget } from "../context/budgetcontext";
import { useIncome } from "../context/incomecontext";

function AddBudget() {
  const { budget, updateBudget } = useBudget();
  const { addIncome } = useIncome();
  const [newBudget, setNewBudget] = useState(budget);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const navigate = useNavigate();

  const handleBudgetSubmit = (event) => {
    event.preventDefault();
    if (newBudget) {
      updateBudget(parseFloat(newBudget));
    }
    handleBudgetReset();
    navigate("/");
  };

  const handleIncomeSubmit = async (event) => {
    event.preventDefault();
    if (label && amount && incomeSource) {
      const incomeData = {
        label,
        amount: parseFloat(amount),
        source: incomeSource,
      };
      try {
        await addIncome(incomeData);
        handleIncomeReset();
        navigate("/");
      } catch (error) {
        console.error("Error adding income:", error);
      }
    }
  };

  const handleBudgetReset = () => {
    setNewBudget("");
  };

  const handleIncomeReset = () => {
    setLabel("");
    setAmount("");
    setIncomeSource("");
  };

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black">
          <div className="flex flex-col md:flex-row gap-8 mx-auto max-w-4xl">
            <div className="bg-gray-800 p-8 rounded-lg flex-1">
              <h2 className="text-3xl font-semibold mb-6">
                Update Your Budget
              </h2>
              <form onSubmit={handleBudgetSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-lg font-medium mb-2"
                  >
                    Set Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-primary-dark"
                  >
                    Update Budget
                  </button>
                  <button
                    type="button"
                    onClick={handleBudgetReset}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Reset Budget
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg flex-1">
              <h2 className="text-3xl font-semibold mb-6">Add Income Source</h2>
              <form onSubmit={handleIncomeSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="label"
                    className="block text-lg font-medium mb-2"
                  >
                    Label
                  </label>
                  <input
                    type="text"
                    id="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="e.g., Salary, Freelance Work"
                    className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    required
                  />
                </div>
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
                    htmlFor="incomeSource"
                    className="block text-lg font-medium mb-2"
                  >
                    Income Source
                  </label>
                  <input
                    type="text"
                    id="incomeSource"
                    value={incomeSource}
                    onChange={(e) => setIncomeSource(e.target.value)}
                    placeholder="e.g., Company Name, Platform"
                    className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-primary-dark"
                  >
                    Add Income Source
                  </button>
                  <button
                    type="button"
                    onClick={handleIncomeReset}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Reset Income
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddBudget;
