import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { vi } from "vitest";
import { ExpenseContext } from "./context/expenseContextDef";
import type { Expense, ExpenseCategory } from "./types/expense";

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    amount: 100000,
    category: "Transporte" as ExpenseCategory,
    date: "2026-02-20",
    description: "Gasolina",
  },
  {
    id: "2",
    amount: 200000,
    category: "Comida" as ExpenseCategory,
    date: "2026-02-21",
    description: "Mercado",
  },
  {
    id: "3",
    amount: 150000,
    category: "Comida" as ExpenseCategory,
    date: "2026-02-22",
    description: "Cena",
  },
  {
    id: "4",
    amount: 50000,
    category: "Entretenimiento" as ExpenseCategory,
    date: "2026-02-23",
    description: "Cine",
  },
];

// Total MOCK = 100k (Transporte) + 350k (Comida) + 50k (Entretenimiento) = 500,000

export const mockUseExpensesValues = {
  expenses: MOCK_EXPENSES,
  loading: false,
  error: null as string | null,
  fetchExpenses: vi.fn(),
  addExpense: vi.fn(),
  editExpense: vi.fn(),
  removeExpense: vi.fn(),
};

// Render custom with Context Provider
export const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    providerValue?: Partial<typeof mockUseExpensesValues>;
  },
) => {
  const mergedValue = {
    ...mockUseExpensesValues,
    ...options?.providerValue,
  };

  return render(
    <ExpenseContext.Provider value={mergedValue}>{ui}</ExpenseContext.Provider>,
    options,
  );
};
