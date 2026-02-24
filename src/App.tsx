// src/App.tsx
import { useState } from "react";
import { ExpenseSummary } from "./components/ExpenseSummary/ExpenseSummary";
import { ExpenseForm } from "./components/ExpenseForm/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList/ExpenseList";
import { useExpenses } from "./hooks/useExpenses";
import type { ExpenseCategory } from "./types/expense";

const CATEGORIES: ExpenseCategory[] = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Otros",
];

function App() {
  const { expenses } = useExpenses();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = selectedCategory
      ? expense.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? expense.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-vh-100" style={{ background: "var(--bg-main)" }}>
      {/* Navbar */}
      <nav className="app-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="navbar-brand">
            <span className="brand-icon">ET</span>
            ExpenseTracker
          </div>
          <div className="nav-actions">
            <span className="nav-link" style={{ cursor: "pointer" }}>
              Settings
            </span>
            <button className="nav-icon" title="Notificaciones">
              🔔
            </button>
            <div className="nav-avatar">B</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-4">
        {/* Dashboard Header */}
        <div className="dashboard-header d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <h2>Dashboard</h2>
            <p>Overview of your financial health</p>
          </div>
          <div className="date-range-badge">
            📅{" "}
            {new Date().toLocaleDateString("es-CO", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <ExpenseSummary />

        {/* Filter Bar */}
        <div className="filter-bar">
          <select
            className="form-select"
            style={{ maxWidth: "180px" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">🔽 All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search transactions..."
            style={{ maxWidth: "280px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="ms-auto">
            <button
              className="btn-add-expense"
              onClick={() => setShowAddModal(true)}
            >
              + Add Expense
            </button>
          </div>
        </div>

        {/* Expense Table */}
        <ExpenseList filteredExpenses={filteredExpenses} />
      </main>

      {/* Add Expense Modal */}
      {showAddModal && <ExpenseForm onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

export default App;
