// src/components/ExpenseList/ExpenseList.tsx
import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { EditExpenseModal } from "./EditExpenseModal";
import type { Expense } from "../../types/expense";

const ITEMS_PER_PAGE = 5;

const CATEGORY_ICONS: Record<string, { icon: string; iconClass: string }> = {
  Comida: { icon: "🍽️", iconClass: "icon-food" },
  Transporte: { icon: "🚗", iconClass: "icon-transport" },
  Entretenimiento: { icon: "🎬", iconClass: "icon-entertainment" },
  Salud: { icon: "❤️", iconClass: "icon-health" },
  Otros: { icon: "📦", iconClass: "icon-otros" },
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
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
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
                            {meta.icon}
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
                          ✏️
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(expense.id)}
                          title="Eliminar"
                        >
                          🗑️
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
                Showing {startIdx + 1}-
                {Math.min(startIdx + ITEMS_PER_PAGE, filteredExpenses.length)}{" "}
                of {filteredExpenses.length} results
              </span>
              <div className="pagination-buttons">
                <button
                  className="btn-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
                <button
                  className="btn-page"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
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
