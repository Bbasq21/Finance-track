// src/components/ExpenseList/ExpenseList.tsx
import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { EditExpenseModal } from "./EditExpenseModal";
import type { Expense } from "../../types/expense";

const ITEMS_PER_PAGE = 5;

const CATEGORY_ICONS: Record<string, { icon: string; iconClass: string }> = {
  Comida: { icon: "restaurant", iconClass: "icon-food" },
  Transporte: { icon: "directions_car", iconClass: "icon-transport" },
  Entretenimiento: { icon: "movie", iconClass: "icon-entertainment" },
  Salud: { icon: "medical_services", iconClass: "icon-health" },
  Otros: { icon: "inventory_2", iconClass: "icon-otros" },
};

const BADGE_CLASS: Record<string, string> = {
  Comida: "badge-comida",
  Transporte: "badge-transporte",
  Entretenimiento: "badge-entretenimiento",
  Salud: "badge-salud",
  Otros: "badge-otros",
};

interface ExpenseListProps {
  filteredExpenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  filteredExpenses,
}) => {
  const { loading, error, removeExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = filteredExpenses.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="expense-table-card">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="expense-table-card">
        <div className="empty-state" style={{ color: "#ef4444" }}>
          {error}
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
      await removeExpense(id);
    }
  };

  const handleEdit = (id: string) => {
    const expenseToEdit = filteredExpenses.find((exp) => exp.id === id);
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
    }
  };

  return (
    <>
      <div className="expense-table-card">
        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            No se encontraron gastos. ¡Agrega uno para empezar!
          </div>
        ) : (
          <>
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th style={{ textAlign: "right" }}>Monto</th>
                  <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.map((expense) => {
                  const meta =
                    CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Otros;
                  const badgeCls =
                    BADGE_CLASS[expense.category] || "badge-otros";
                  return (
                    <tr key={expense.id}>
                      <td>
                        <div className="expense-date">
                          {formatDate(expense.date)}
                        </div>
                      </td>
                      <td>
                        <div className="expense-desc">
                          <span
                            className={`expense-desc-icon ${meta.iconClass}`}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: "20px" }}
                            >
                              {meta.icon}
                            </span>
                          </span>
                          {expense.description || (
                            <span
                              style={{
                                fontStyle: "italic",
                                color: "var(--text-muted)",
                              }}
                            >
                              Sin descripción
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`category-badge ${badgeCls}`}>
                          {expense.category}
                        </span>
                      </td>
                      <td
                        className="expense-amount"
                        style={{ textAlign: "right" }}
                      >
                        {formatCurrency(expense.amount)}
                      </td>
                      <td
                        className="expense-actions"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          className="btn me-1"
                          onClick={() => handleEdit(expense.id)}
                          title="Editar"
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "18px" }}
                          >
                            edit
                          </span>
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(expense.id)}
                          title="Eliminar"
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "18px" }}
                          >
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="table-pagination">
              <span className="pagination-info">
                Mostrando {startIdx + 1}-
                {Math.min(startIdx + ITEMS_PER_PAGE, filteredExpenses.length)}{" "}
                de {filteredExpenses.length} movimientos
              </span>
              <div className="pagination-buttons">
                <button
                  className="btn-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Anterior
                </button>
                <button
                  className="btn-page"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </>
  );
};
