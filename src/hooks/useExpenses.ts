import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContextDef";

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error("useExpenses debe ser usado dentro de un ExpenseProvider");
  }

  return context;
};
