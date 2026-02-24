# 💰 ExpenseTracker — Seguimiento de Gastos Personales

App web para registrar, visualizar y gestionar gastos personales. Dashboard con resumen por categorías, CRUD completo contra una API REST, filtros combinados y pruebas unitarias.

> **Deploy en producción:** https://finance-track-brown.vercel.app/

---

## 🛠️ Stack Técnico

| Capa              | Tecnología                                |
| ----------------- | ----------------------------------------- |
| **Framework**     | React 19 + TypeScript                     |
| **Bundler**       | Vite                                      |
| **Estilos**       | Bootstrap 5                               |
| **Estado global** | Context API + Custom Hook (`useExpenses`) |
| **Backend**       | MockAPI (REST, sin configuración extra)   |
| **Testing**       | Vitest + React Testing Library            |
| **Deploy**        | Vercel                                    |

---

## ✨ Features

- **Dashboard** — 4 tarjetas de resumen: balance total + top 3 categorías con montos y conteo de movimientos.
- **CRUD completo** — Crear, editar y eliminar gastos con modal dedicado y validaciones en formulario.
- **Filtros combinados** — Por categoría (select), rango de fechas (inicio/fin) y búsqueda por descripción. Se aplican simultáneamente con `useMemo`.
- **Botón "Limpiar Filtros"** — Renderizado condicional: solo aparece si hay al menos un filtro activo.
- **Paginación** — Tabla con navegación de 5 items por página.
- **Confirmación de eliminación** — Alerta nativa antes de borrar un gasto.
- **Formato localizado** — Moneda en COP y fechas en español colombiano (`Intl.DateTimeFormat`).

---

## 🚀 Ejecución Local

No necesitas configurar variables de entorno. MockAPI ya está integrada directamente en el código.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Bbasq21/Finance-track.git
cd finance-track

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

La app abre en `http://localhost:5173`.

---

## 🧪 Pruebas Unitarias

31 tests cubriendo componentes clave y utilidades:

```bash
npm run test
```

| Archivo                     | Qué valida                                                                |
| --------------------------- | ------------------------------------------------------------------------- |
| `formatters.test.ts`        | Formato de moneda COP y fechas, edge cases con valores inválidos          |
| `filters.test.ts`           | Filtrado por categoría, rango de fechas y combinaciones                   |
| `ExpenseSummary.test.tsx`   | Cálculos matemáticos de totales, renderizado vacío                        |
| `ExpenseList.test.tsx`      | Loading, errores, paginación, confirmación al eliminar, apertura de modal |
| `ExpenseForm.test.tsx`      | Validación de campos requeridos, envío exitoso con datos correctos        |
| `EditExpenseModal.test.tsx` | Inicialización con datos del gasto, envío de edición                      |

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ExpenseForm/          # Modal para agregar gastos
│   ├── ExpenseList/          # Tabla + modal de edición
│   └── ExpenseSummary/       # Tarjetas de resumen del dashboard
├── context/                  # ExpenseContext + Provider
├── hooks/                    # useExpenses (consume el context)
├── services/                 # Cliente Axios contra MockAPI
├── types/                    # Interfaces TypeScript (Expense, CreateExpenseDTO)
└── utils/                    # formatters.ts, filters.ts
```

---

## 📦 Build de Producción

```bash
npm run build
```

Genera el bundle optimizado en `/dist`. TypeScript se compila primero (`tsc -b`) y luego Vite empaqueta.
