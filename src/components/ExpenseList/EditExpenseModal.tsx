// src/components/ExpenseList/EditExpenseModal.tsx
import { useState } from "react";
import type { Expense, ExpenseCategory } from "../../types/expense";
import { useExpenses } from "../../hooks/useExpenses";

interface EditExpenseModalProps {
  expense: Expense;
  onClose: () => void;
}

const CATEGORIES: ExpenseCategory[] = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Otros",
];

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  expense,
  onClose,
}) => {
  const { editExpense } = useExpenses();

  const [amount, setAmount] = useState<number>(expense.amount);
  const [category, setCategory] = useState<ExpenseCategory>(expense.category);
  const [date, setDate] = useState<string>(expense.date);
  const [description, setDescription] = useState<string>(
    expense.description || "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editExpense(expense.id, {
      amount: Number(amount),
      category,
      date,
      description,
    });

    onClose();
  };

  return (
    <>
      <div className="expense-modal-backdrop" onClick={onClose}></div>
      <div className="expense-modal-wrapper">
        <div className="expense-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="expense-modal-header">
            <div>
              <h4>Editar Gasto</h4>
              <p>Actualiza los detalles de tu gasto</p>
            </div>
            <button className="expense-modal-close" onClick={onClose}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                close
              </span>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="expense-modal-body">
              {/* Amount */}
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    min="1"
                  />
                  <span className="input-group-text">COP</span>
                </div>
              </div>

              {/* Category + Date row */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ExpenseCategory)
                    }
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label className="form-label">Descripción</label>
                  <span
                    className="form-label"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Opcional
                  </span>
                </div>
                <textarea
                  className="form-control"
                  placeholder="ej. Almuerzo con el equipo en la cafetería..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="expense-modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-save-expense">
                <span
                  className="material-symbols-outlined me-1"
                  style={{ fontSize: "18px", verticalAlign: "text-bottom" }}
                >
                  check
                </span>{" "}
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
