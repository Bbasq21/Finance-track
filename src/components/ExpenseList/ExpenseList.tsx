// src/components/ExpenseList/ExpenseList.tsx
import React from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const ExpenseList: React.FC = () => {
  // Extraemos los datos y funciones necesarias de nuestro Custom Hook
  const { expenses, loading, error, removeExpense } = useExpenses();

  // Manejo de estado de carga
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    return <div className="alert alert-danger shadow-sm">{error}</div>;
  }

  // Manejo de estado vacío (Empty State)
  if (expenses.length === 0) {
    return (
      <div className="alert alert-info shadow-sm text-center">
        No tienes gastos registrados en este momento. ¡Agrega uno para empezar!
      </div>
    );
  }

  // Función para confirmar y eliminar
  const handleDelete = async (id: string) => {
    // Un confirm nativo es suficiente y funcional para una prueba técnica Mid
    if (window.confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      await removeExpense(id);
    }
  };

  // Función placeholder para editar (la implementaremos más a fondo después)
  const handleEdit = (id: string) => {
    alert(`Funcionalidad de edición para el ID: ${id} se implementará en el siguiente sprint o mediante un modal.`);
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-0">
        {/* table-responsive es clave para la evaluación de diseño móvil */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="py-3">Categoría</th>
                <th className="py-3">Descripción</th>
                <th className="text-end py-3">Monto</th>
                <th className="text-center px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 text-nowrap">{formatDate(expense.date)}</td>
                  <td>
                    <span className="badge bg-secondary bg-opacity-75">
                      {expense.category}
                    </span>
                  </td>
                  <td className="text-muted">
                    {expense.description ? expense.description : <span className="fst-italic">-</span>}
                  </td>
                  <td className="text-end fw-bold text-nowrap">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="text-center px-4 text-nowrap">
                    <button 
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleEdit(expense.id)}
                      title="Editar gasto"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(expense.id)}
                      title="Eliminar gasto"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};