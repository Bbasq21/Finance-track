import axios from 'axios';
import type { Expense, CreateExpenseDTO } from '../types/expense';

const API_URL = 'https://699ced5e83e60a406a44b779.mockapi.io/api/v1'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const expenseService = {
  
  getAll: async (): Promise<Expense[]> => {
    const response = await apiClient.get<Expense[]>('/expenses');
    return response.data;
  },

  create: async (expense: CreateExpenseDTO): Promise<Expense> => {
    const response = await apiClient.post<Expense>('/expenses', expense);
    return response.data;
  },
  update: async (id: string, expense: Partial<CreateExpenseDTO>): Promise<Expense> => {
    const response = await apiClient.put<Expense>(`/expenses/${id}`, expense);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/expenses/${id}`);
  },
};