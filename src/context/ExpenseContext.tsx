import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Expense, CreateExpenseDTO } from "../types/expense";
import { expenseService } from "../services/api";
import { ExpenseContext } from "./expenseContextDef";

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (err) {
      setError("Error al cargar los gastos. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (newExpense: CreateExpenseDTO) => {
    try {
      const createdExpense = await expenseService.create(newExpense);
      setExpenses((prev) => [...prev, createdExpense]);
    } catch (err) {
      setError("Error al guardar el gasto.");
      console.error(err);
    }
  };

  const editExpense = async (
    id: string,
    updatedData: Partial<CreateExpenseDTO>,
  ) => {
    try {
      const updatedExpense = await expenseService.update(id, updatedData);
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? updatedExpense : exp)),
      );
    } catch (err) {
      setError("Error al actualizar el gasto.");
      console.error(err);
    }
  };

  const removeExpense = async (id: string) => {
    try {
      await expenseService.delete(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      setError("Error al eliminar el gasto.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        fetchExpenses,
        addExpense,
        editExpense,
        removeExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
