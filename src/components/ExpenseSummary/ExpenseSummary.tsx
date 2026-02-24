// src/components/ExpenseSummary/ExpenseSummary.tsx
import { useMemo } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { formatCurrency } from "../../utils/formatters";

const CATEGORY_META: Record<string, { icon: string; iconClass: string }> = {
  Comida: { icon: "🍽️", iconClass: "icon-food" },
  Transporte: { icon: "🚗", iconClass: "icon-transport" },
  Entretenimiento: { icon: "🎬", iconClass: "icon-entertainment" },
  Salud: { icon: "❤️", iconClass: "icon-health" },
  Otros: { icon: "📦", iconClass: "icon-otros" },
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

  // Get the top 3 categories by amount
  const topCategories = Object.entries(categoryData)
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 3);

  return (
    <div className="summary-cards">
      {/* Total Balance Card */}
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">Total Balance</span>
          <span className="summary-card-icon icon-total">💰</span>
        </div>
        <div className="summary-card-amount">{formatCurrency(total)}</div>
        <div className="summary-card-sub">{expenses.length} Transactions</div>
      </div>

      {/* Category Cards */}
      {topCategories.map(([category, data]) => {
        const meta = CATEGORY_META[category] || CATEGORY_META.Otros;
        return (
          <div className="summary-card" key={category}>
            <div className="summary-card-header">
              <span className="summary-card-label">{category}</span>
              <span className={`summary-card-icon ${meta.iconClass}`}>
                {meta.icon}
              </span>
            </div>
            <div className="summary-card-amount">
              {formatCurrency(data.amount)}
            </div>
            <div className="summary-card-sub">{data.count} Transactions</div>
          </div>
        );
      })}

      {/* Fill remaining slots if less than 3 categories */}
      {topCategories.length < 3 &&
        Array.from({ length: 3 - topCategories.length }).map((_, i) => (
          <div className="summary-card" key={`empty-${i}`}>
            <div className="summary-card-header">
              <span className="summary-card-label">—</span>
              <span className="summary-card-icon icon-otros">📊</span>
            </div>
            <div className="summary-card-amount">{formatCurrency(0)}</div>
            <div className="summary-card-sub">0 Transactions</div>
          </div>
        ))}
    </div>
  );
};
