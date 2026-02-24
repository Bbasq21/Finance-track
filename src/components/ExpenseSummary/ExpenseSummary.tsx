
// src/components/ExpenseSummary/ExpenseSummary.tsx
import React, { useMemo } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { formatCurrency } from '../../utils/formatters';

export const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpenses();

  // useMemo memoriza el cálculo. Solo se vuelve a ejecutar si "expenses" cambia.
  const { total, totalByCategory } = useMemo(() => {
    let total = 0;
    // Usamos un objeto (Record) para agrupar dinámicamente las sumas por categoría
    const totalByCategory: Record<string, number> = {};

    expenses.forEach((expense) => {
      // Suma global
      total += expense.amount;
      
      // Suma por categoría
      if (totalByCategory[expense.category]) {
        totalByCategory[expense.category] += expense.amount;
      } else {
        totalByCategory[expense.category] = expense.amount;
      }
    });

    return { total, totalByCategory };
  }, [expenses]);

  return (
    <div className="row mb-4 g-3">
      {/* Tarjeta Izquierda: Gasto Total */}
      <div className="col-12 col-md-4">
        <div className="card text-white bg-primary shadow-sm h-100 border-0">
          <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
            <h6 className="card-title text-uppercase fw-bold opacity-75 mb-2">Gasto Total</h6>
            <h2 className="display-6 fw-bold mb-0 text-nowrap">
              {formatCurrency(total)}
            </h2>
          </div>
        </div>
      </div>

      {/* Tarjeta Derecha: Desglose por Categorías */}
      <div className="col-12 col-md-8">
        <div className="card shadow-sm h-100 border-0">
          <div className="card-body">
            <h6 className="card-title text-muted text-uppercase fw-bold mb-3">
              Total por Categoría
            </h6>
            <div className="row g-3">
              {Object.entries(totalByCategory).length > 0 ? (
                Object.entries(totalByCategory).map(([category, amount]) => (
                  <div key={category} className="col-6 col-sm-4">
                    <div className="p-3 border rounded bg-light text-center h-100 d-flex flex-column justify-content-center">
                      <span className="d-block text-muted small fw-bold mb-1">
                        {category}
                      </span>
                      <span className="d-block fw-bold text-dark text-nowrap">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted fst-italic py-3">
                  Aún no hay gastos registrados.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};