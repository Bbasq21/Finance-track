import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
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
    createdAt: "2026-02-20T10:00:00.000Z",
  },
  {
    id: "2",
    amount: 200000, // Comida 1
    category: "Comida" as ExpenseCategory,
    date: "2026-02-21",
    description: "Mercado",
    createdAt: "2026-02-21T10:00:00.000Z",
  },
  {
    id: "3",
    amount: 150000, // Comida 2
    category: "Comida" as ExpenseCategory,
    date: "2026-02-22",
    description: "Cena",
    createdAt: "2026-02-22T10:00:00.000Z",
  },
  {
    id: "4",
    amount: 50000,
    category: "Entretenimiento" as ExpenseCategory,
    date: "2026-02-23",
    description: "Cine",
    createdAt: "2026-02-23T10:00:00.000Z",
  },
];

// Total MOCK = 100k (Transporte) + 350k (Comida) + 50k (Entretenimiento) = 500,000

export const mockUseExpensesValues = {
  expenses: MOCK_EXPENSES,
  loading: false,
  error: null,
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
