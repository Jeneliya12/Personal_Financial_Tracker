import React, { createContext, useState, useContext } from "react";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState([]);

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <BudgetContext.Provider value={{ budget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
