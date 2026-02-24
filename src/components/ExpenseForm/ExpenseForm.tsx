import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import type { ExpenseCategory } from "../../types/expense";

const CATEGORIES: ExpenseCategory[] = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Otros",
];

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose }) => {
  const { addExpense } = useExpenses();

  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<ExpenseCategory>("Comida");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date) return;

    await addExpense({
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
          <div className="expense-modal-header">
            <div>
              <h4>Agregar Nuevo Gasto</h4>
              <p>Lleva el control de tus hábitos de gasto</p>
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

          <form onSubmit={handleSubmit}>
            <div className="expense-modal-body">
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    required
                    min="1"
                  />
                  <span className="input-group-text">COP</span>
                </div>
              </div>

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

              <div className="mb-1">
                <label className="form-label">Adjuntar Recibo</label>
                <div className="receipt-drop-area">
                  <span
                    className="material-symbols-outlined me-2"
                    style={{ fontSize: "20px", verticalAlign: "middle" }}
                  >
                    attach_file
                  </span>{" "}
                  Suelta un archivo o haz clic para subir
                </div>
              </div>
            </div>

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
                Guardar Gasto
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
