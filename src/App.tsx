import { useState, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesCategory = selectedCategory
        ? expense.category === selectedCategory
        : true;
      const matchesSearch = searchQuery
        ? expense.description?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesStartDate = startDate ? expense.date >= startDate : true;
      const matchesEndDate = endDate ? expense.date <= endDate : true;
      return (
        matchesCategory && matchesSearch && matchesStartDate && matchesEndDate
      );
    });
  }, [expenses, selectedCategory, searchQuery, startDate, endDate]);

  const hasActiveFilters =
    selectedCategory !== "" ||
    searchQuery !== "" ||
    startDate !== "" ||
    endDate !== "";

  const clearFilters = (): void => {
    setSelectedCategory("");
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-vh-100" style={{ background: "var(--bg-main)" }}>
      <nav className="app-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="navbar-brand">
            <span className="brand-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                account_balance_wallet
              </span>
            </span>
            ExpenseTracker
          </div>
          <div className="nav-actions">
            <span className="nav-link" style={{ cursor: "pointer" }}>
              Ajustes
            </span>
            <button className="nav-icon" title="Notificaciones">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                notifications
              </span>
            </button>
            <div className="nav-avatar">B</div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="dashboard-header d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <h2>Dashboard</h2>
            <p>Un vistazo a tu salud financiera</p>
          </div>
          <div className="date-range-badge">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              calendar_today
            </span>{" "}
            {new Date().toLocaleDateString("es-CO", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        <ExpenseSummary />

        <div className="filter-bar">
          <div className="row g-2 align-items-end w-100">
            <div className="col-12 col-sm-6 col-md-auto">
              <label className="form-label mb-1 small text-muted">
                Categoría
              </label>
              <select
                className="form-select"
                style={{ minWidth: "160px" }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-auto">
              <label className="form-label mb-1 small text-muted">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-auto">
              <label className="form-label mb-1 small text-muted">
                Fecha Fin
              </label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label mb-1 small text-muted">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Busca tus movimientos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {hasActiveFilters && (
              <div className="col-auto">
                <button
                  className="btn d-flex align-items-center gap-1"
                  onClick={clearFilters}
                  style={{ marginTop: "auto" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    filter_alt_off
                  </span>
                  Limpiar Filtros
                </button>
              </div>
            )}

            <div className="col-auto ms-auto">
              <button
                className="btn-add-expense"
                onClick={() => setShowAddModal(true)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  add
                </span>{" "}
                Agregar Gasto
              </button>
            </div>
          </div>
        </div>

        <ExpenseList filteredExpenses={filteredExpenses} />
      </main>

      {showAddModal && <ExpenseForm onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

export default App;
