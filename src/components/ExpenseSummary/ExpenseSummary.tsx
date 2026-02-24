import { useMemo } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { formatCurrency } from "../../utils/formatters";

const CATEGORY_META: Record<string, { icon: string; iconClass: string }> = {
  Comida: { icon: "restaurant", iconClass: "icon-food" },
  Transporte: { icon: "directions_car", iconClass: "icon-transport" },
  Entretenimiento: { icon: "movie", iconClass: "icon-entertainment" },
  Salud: { icon: "medical_services", iconClass: "icon-health" },
  Otros: { icon: "inventory_2", iconClass: "icon-otros" },
};

export const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpenses();

  const { total, categoryData } = useMemo(() => {
    let total = 0;
    const categoryData: Record<string, { amount: number; count: number }> = {};

    expenses.forEach((expense) => {
      total += expense.amount;
      if (!categoryData[expense.category]) {
        categoryData[expense.category] = { amount: 0, count: 0 };
      }
      categoryData[expense.category].amount += expense.amount;
      categoryData[expense.category].count += 1;
    });

    return { total, categoryData };
  }, [expenses]);

  const topCategories = Object.entries(categoryData)
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 3);

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">Balance Total</span>
          <span className="summary-card-icon icon-total">
            <span className="material-symbols-outlined">account_balance</span>
          </span>
        </div>
        <div className="summary-card-amount">{formatCurrency(total)}</div>
        <div className="summary-card-sub">{expenses.length} Movimientos</div>
      </div>

      {topCategories.map(([category, data]) => {
        const meta = CATEGORY_META[category] || CATEGORY_META.Otros;
        return (
          <div className="summary-card" key={category}>
            <div className="summary-card-header">
              <span className="summary-card-label">{category}</span>
              <span className={`summary-card-icon ${meta.iconClass}`}>
                <span className="material-symbols-outlined">{meta.icon}</span>
              </span>
            </div>
            <div className="summary-card-amount">
              {formatCurrency(data.amount)}
            </div>
            <div className="summary-card-sub">{data.count} Movimientos</div>
          </div>
        );
      })}

      {topCategories.length < 3 &&
        Array.from({ length: 3 - topCategories.length }).map((_, i) => (
          <div className="summary-card" key={`empty-${i}`}>
            <div className="summary-card-header">
              <span className="summary-card-label">—</span>
              <span className="summary-card-icon icon-otros">
                <span className="material-symbols-outlined">bar_chart</span>
              </span>
            </div>
            <div className="summary-card-amount">{formatCurrency(0)}</div>
            <div className="summary-card-sub">0 Movimientos</div>
          </div>
        ))}
    </div>
  );
};
