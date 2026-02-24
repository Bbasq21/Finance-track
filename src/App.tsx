// src/App.tsx
import React from 'react';
import { ExpenseSummary } from './components/ExpenseSummary/ExpenseSummary';
import { ExpenseForm } from './components/ExpenseForm/ExpenseForm';
import { ExpenseList } from './components/ExpenseList/ExpenseList';

function App() {
  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm mb-4 py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 text-primary fw-bold mb-0">
            📊 Control de Gastos
          </h1>
          {/* Aquí podrías agregar un perfil de usuario o botón de logout en el futuro */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Sección 1: Resumen de Gastos (Ocupa todo el ancho) */}
        <section aria-label="Resumen de gastos">
          <ExpenseSummary />
        </section>

        {/* Sección 2: Layout de dos columnas para Formulario y Lista */}
        <div className="row g-4">
          {/* Columna Izquierda: Formulario (Ocupa 4 de 12 columnas en escritorio) */}
          <div className="col-12 col-lg-4">
            <ExpenseForm />
          </div>

          {/* Columna Derecha: Lista de Gastos (Ocupa 8 de 12 columnas en escritorio) */}
          <div className="col-12 col-lg-8">
            {/* Aquí irán los filtros en el siguiente paso */}
            <ExpenseList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;