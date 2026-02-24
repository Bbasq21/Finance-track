// src/hooks/useExpenses.ts
import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContextDef";

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  // Validación estricta: nos aseguramos de que el hook se use dentro del Provider
  if (context === undefined) {
    throw new Error("useExpenses debe ser usado dentro de un ExpenseProvider");
  }

  return context;
};
