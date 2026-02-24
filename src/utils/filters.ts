// src/utils/filters.ts
import type { Expense } from '../types/expense';

export const filterExpenses = (
  expenses: Expense[],
  categoryFilter: string,
  startDate: string,
  endDate: string
): Expense[] => {
  return expenses.filter((expense) => {
    // 1. Filtrar por categoría
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;

    // 2. Filtrar por fecha inicial (mayor o igual a)
    const matchesStartDate = startDate ? new Date(expense.date) >= new Date(startDate) : true;

    // 3. Filtrar por fecha final (menor o igual a)
    const matchesEndDate = endDate ? new Date(expense.date) <= new Date(endDate) : true;

    return matchesCategory && matchesStartDate && matchesEndDate;
  });
};