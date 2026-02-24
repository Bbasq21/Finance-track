import type { Expense } from "../types/expense";

export const filterExpenses = (
  expenses: Expense[],
  categoryFilter: string,
  startDate: string,
  endDate: string,
): Expense[] => {
  return expenses.filter((expense) => {
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const matchesStartDate = startDate
      ? new Date(expense.date) >= new Date(startDate)
      : true;
    const matchesEndDate = endDate
      ? new Date(expense.date) <= new Date(endDate)
      : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });
};
