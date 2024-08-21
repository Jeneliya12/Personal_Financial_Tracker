// Example context implementation
import React, { createContext, useState, useContext } from "react";

const IncomeContext = createContext();

export function IncomeProvider({ children }) {
  const [incomes, setIncomes] = useState([]);

  const addIncome = async (incomeData) => {
    // Add your logic here to update state or send data to backend
    setIncomes([...incomes, incomeData]);
  };

  return (
    <IncomeContext.Provider value={{ incomes, addIncome }}>
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  return useContext(IncomeContext);
}
