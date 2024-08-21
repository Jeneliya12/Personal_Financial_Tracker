import React, { createContext, useState, useContext } from "react";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
  const [savingsGoal, setSavingsGoal] = useState(0); // Default savings goal

  const updateSavingsGoal = (newGoal) => {
    setSavingsGoal(newGoal.goal);
  };

  return (
    <SavingsContext.Provider value={{ savingsGoal, updateSavingsGoal }}>
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  return useContext(SavingsContext);
}
