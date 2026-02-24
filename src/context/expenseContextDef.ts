import { createContext } from "react";
import type { Expense, CreateExpenseDTO } from "../types/expense";

export interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: CreateExpenseDTO) => Promise<void>;
  editExpense: (
    id: string,
    expense: Partial<CreateExpenseDTO>,
  ) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined,
);
