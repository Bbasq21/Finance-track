// src/components/ExpenseForm/ExpenseForm.tsx
import React, { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import type { ExpenseCategory } from "../../types/expense";

// Definimos las categorías disponibles para el select
const CATEGORIES: ExpenseCategory[] = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Otros",
];

export const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();

  // Estados locales para los inputs controlados
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<ExpenseCategory>("Comida");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de seguridad (el HTML5 'required' ya hace gran parte del trabajo)
    if (!amount || !date) return;

    // Llamamos a la función de nuestro Contexto para guardar en la API
    await addExpense({
      amount: Number(amount),
      category,
      date,
      description,
    });

    // Limpiamos el formulario tras guardar exitosamente
    setAmount("");
    setCategory("Comida");
    setDate("");
    setDescription("");
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body p-4">
        <h5 className="card-title mb-4 fw-bold text-primary">
          Agregar Nuevo Gasto
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Campo: Monto */}
            <div className="col-md-6">
              <label htmlFor="amount" className="form-label text-muted">
                Monto
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  required
                  min="1"
                />
              </div>
            </div>

            {/* Campo: Categoría */}
            <div className="col-md-6">
              <label htmlFor="category" className="form-label text-muted">
                Categoría
              </label>
              <select
                className="form-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo: Fecha */}
            <div className="col-md-6">
              <label htmlFor="date" className="form-label text-muted">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Campo: Descripción */}
            <div className="col-md-6">
              <label htmlFor="description" className="form-label text-muted">
                Descripción (Opcional)
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Almuerzo de trabajo"
              />
            </div>

            {/* Botón de Submit */}
            <div className="col-12 mt-4 text-end">
              <button type="submit" className="btn btn-primary px-4">
                Guardar Gasto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
