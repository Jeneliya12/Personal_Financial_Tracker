import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useSavings } from "../context/savingscontext";

function AddSaving() {
  const [goal, setGoal] = useState("");
  const { updateSavingsGoal } = useSavings();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const savingsGoalData = {
      goal: parseFloat(goal),
    };

    try {
      updateSavingsGoal(savingsGoalData);
      console.log("Savings goal updated successfully.");
      handleReset();
      navigate("/"); // Redirect to the Dashboard ("/" route)
    } catch (error) {
      console.error("Error updating savings goal:", error);
    }
  };

  const handleReset = () => {
    setGoal("");
  };

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-black">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-semibold mb-6">Set Savings Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="goal"
                  className="block text-lg font-medium mb-2"
                >
                  Savings Goal
                </label>
                <input
                  type="number"
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Set Goal
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddSaving;
