export type ExpenseCategory = 'Comida' | 'Transporte' | 'Entretenimiento' | 'Salud' | 'Otros';

export interface Expense {
  id: string; 
  amount: number; 
  category: ExpenseCategory; 
  date: string; 
  description?: string; 
}

export type CreateExpenseDTO = Omit<Expense, 'id'>;