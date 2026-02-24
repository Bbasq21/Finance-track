// src/utils/formatters.ts

// Formatea un número a moneda (Pesos Colombianos o Dólares, según prefieras)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Formatea la fecha para que sea más legible en la tabla
export const formatDate = (dateString: string): string => {
  if (!dateString) return "Fecha inválida";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Fecha inválida";

  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
