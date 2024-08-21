// src/hooks/useDashboardData.js
import { useState, useEffect } from "react";

// Simulate fetching data from an API or other sources
const fetchDashboardData = () => {
  // In a real-world application, you might fetch this data from an API
  return {
    balance: 18000,
    income: 20000,
    expenses: 2000,
    transactions: [
      { date: "2024-08-15", description: "Groceries", amount: -150 },
      { date: "2024-08-10", description: "Salary", amount: 2000 },
      { date: "2024-08-08", description: "Electric Bill", amount: -75 },
    ],
  };
};

const useDashboardData = () => {
  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    transactions: [],
  });

  useEffect(() => {
    // Fetch data on component mount
    const fetchedData = fetchDashboardData();
    setData(fetchedData);
  }, []);

  return data;
};

export default useDashboardData;
