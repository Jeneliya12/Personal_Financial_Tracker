import { useState, useEffect } from "react";
import { useExpenses } from "../context/expensecontext";
import { useBudget } from "../context/budgetcontext";
import { useIncome } from "../context/incomecontext";
import { useSavings } from "../context/savingscontext";

const LOW_SAVINGS_THRESHOLD = 100;

export function useFinancialData() {
  const { expenses } = useExpenses();
  const { budget } = useBudget();
  const { incomes } = useIncome();
  const { savingsGoal } = useSavings();

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );

  const totalIncome = incomes.reduce(
    (total, income) => total + parseFloat(income.amount || 0),
    0
  );

  const balance = budget - totalExpenses;

  const savings =
    savingsGoal > 0 ? Math.max(savingsGoal - totalExpenses, 0) : 0;
  const savingsProgress = Math.min(savings, savingsGoal);
  const savingsPercentage =
    savingsGoal > 0 ? (savingsProgress / savingsGoal) * 100 : 0;

  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (savings > 0 && savings < LOW_SAVINGS_THRESHOLD) {
      setWarning("Warning: Your savings are getting low!");
    } else {
      setWarning("");
    }
  }, [savings, savingsGoal]);

  const transactions = [
    ...expenses.map((expense) => ({
      description: expense.category,
      amount: -parseFloat(expense.amount),
    })),
    ...incomes.map((income) => ({
      description: income.label,
      amount: parseFloat(income.amount),
    })),
  ];

  if (budget > 0) {
    transactions.push({
      description: "Budget",
      amount: budget,
    });
  }

  transactions.sort((a, b) => b.amount - a.amount);

  return {
    budget,
    totalExpenses,
    totalIncome,
    balance,
    savings,
    savingsPercentage,
    transactions,
    warning,
    savingsGoal,
  };
}
